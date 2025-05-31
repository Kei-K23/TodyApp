import TaskItem from "@/components/tasks/task-item";
import FloatingButton from "@/components/ui/floating-button";
import { useToast } from "@/components/ui/toast-provider";
import { client, databases } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_TASK_COLLECTION_ID,
} from "@/lib/constants";
import { COLORS, commonStyles, FONT_SIZES } from "@/styles/styles";
import { Task, TASK_IS_DONE_ENUM } from "@/types/database";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const TasksScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTasksRefresh, setIsTasksRefresh] = useState(false);
  const { showToast } = useToast();
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

  const fetchTasks = async () => {
    try {
      setIsTasksRefresh(true);
      const response = await databases.listDocuments(
        APPWRITE_DATABASE_ID!,
        APPWRITE_TASK_COLLECTION_ID!,
        [
          Query.equal("user_id", user?.$id!),
          Query.greaterThanEqual("created_at", startOfDay),
          Query.lessThan("created_at", endOfDay),
          Query.orderAsc("is_done"),
          Query.orderDesc("created_at"),
        ]
      );

      setTasks(response.documents as Task[]);
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
      await databases.updateDocument(
        APPWRITE_DATABASE_ID!,
        APPWRITE_TASK_COLLECTION_ID!,
        taskId,
        {
          is_done:
            isDone === TASK_IS_DONE_ENUM.DONE
              ? TASK_IS_DONE_ENUM.NOT_DONE
              : TASK_IS_DONE_ENUM.DONE,
        }
      );
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
  }, [user]);

  return (
    <SafeAreaView
      style={{
        ...commonStyles.container,
        paddingVertical: 20,
        backgroundColor: COLORS.background,
      }}
    >
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Today</Text>
        <Text style={styles.subHeaderTitle}>
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          })}
        </Text>
      </View>

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
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 20,
  },
});

export default TasksScreen;
