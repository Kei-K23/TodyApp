import TaskItem from "@/components/tasks/task-item";
import FloatingButton from "@/components/ui/floating-button";
import { databases } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_TASK_DATABASE_ID,
} from "@/lib/constants";
import { COLORS, commonStyles } from "@/styles/styles";
import { Task } from "@/types/database";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const TasksScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTasksRefresh, setIsTasksRefresh] = useState(false);
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

  const fetchTasks = async () => {
    try {
      setIsTasksRefresh(true);
      const response = await databases.listDocuments(
        APPWRITE_DATABASE_ID!,
        APPWRITE_TASK_DATABASE_ID!,
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
      setTasks([]);
    } finally {
      setIsTasksRefresh(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <SafeAreaView
      style={{
        ...commonStyles.container,
        paddingVertical: 20,
        backgroundColor: COLORS.background,
      }}
    >
      <Text
        style={{
          fontSize: 30,
        }}
      >
        Hello World
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <TaskItem task={item} />}
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

export default TasksScreen;
