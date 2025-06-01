import { getTasks, toggleTaskComplete } from "@/api/task";
import TaskItem from "@/components/tasks/task-item";
import FloatingButton from "@/components/ui/floating-button";
import { useToast } from "@/components/ui/toast-provider";
import { client } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_TASK_COLLECTION_ID,
} from "@/lib/constants";
import { COLORS, commonStyles, FONT_SIZES } from "@/styles/styles";
import { Task, TASK_IS_DONE_ENUM } from "@/types/database";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const TasksScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTasksRefresh, setIsTasksRefresh] = useState(false);
  const { showToast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { startOfDay, endOfDay } = useMemo(() => {
    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);
    return {
      startOfDay: start.toISOString(),
      endOfDay: end.toISOString(),
    };
  }, [selectedDate]);

  const fetchTasks = async () => {
    try {
      setIsTasksRefresh(true);
      const response = await getTasks({
        queries: [
          Query.equal("user_id", user?.$id!),
          Query.greaterThanEqual("created_at", startOfDay),
          Query.lessThan("created_at", endOfDay),
          Query.orderAsc("is_done"),
          Query.orderDesc("created_at"),
        ],
      });

      setTasks(response as Task[]);
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
        return;
      }
      showToast("Error occurred", "error");
      setTasks([]);
    } finally {
      setIsTasksRefresh(false);
    }
  };

  const handleToggleTaskComplete = async (
    taskId: string,
    isDone: TASK_IS_DONE_ENUM
  ) => {
    try {
      await toggleTaskComplete({ taskId, isDone });
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
        return;
      }
      showToast("Error occurred", "error");
    }
  };

  useEffect(() => {
    if (user) {
      const taskChannel = `databases.${APPWRITE_DATABASE_ID}.collections.${APPWRITE_TASK_COLLECTION_ID}.documents`;

      const taskChannelUnsubscribe = client.subscribe(taskChannel, () => {
        fetchTasks();
      });

      fetchTasks();

      return () => {
        taskChannelUnsubscribe();
      };
    }
  }, [user, selectedDate]);

  return (
    <SafeAreaView
      style={{
        ...commonStyles.container,
        paddingVertical: 20,
        backgroundColor: COLORS.background,
      }}
    >
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setSelectedDate(date);
            }
          }}
        />
      )}
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Today</Text>
        <Text
          style={styles.subHeaderTitle}
          onPress={() => {
            setShowDatePicker(true);
          }}
        >
          {selectedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          })}
        </Text>
      </View>

      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggleComplete={async (task) => {
                await handleToggleTaskComplete(task.$id, task.is_done);
              }}
            />
          )}
          onRefresh={fetchTasks}
          refreshing={isTasksRefresh}
        />
      ) : (
        <Text style={styles.noTasksTitle}>No tasks found</Text>
      )}

      <FloatingButton
        onPress={() => {
          router.push("/add-task");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: FONT_SIZES.xxxlarge,
    fontWeight: "bold",
  },
  subHeaderTitle: {
    fontSize: FONT_SIZES.xxxlarge,
    color: COLORS.gray,
  },
  noTasksTitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.gray,
    textAlign: "center",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 20,
  },
});

export default TasksScreen;
