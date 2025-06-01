import { databases } from "@/lib/appwrite";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_TASK_COLLECTION_ID,
} from "@/lib/constants";
import { TASK_IS_DONE_ENUM } from "@/types/database";
import { ID } from "react-native-appwrite";

export const getTasks = async ({ queries = [] }: { queries?: string[] }) => {
  try {
    const response = await databases.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPWRITE_TASK_COLLECTION_ID!,
      queries
    );

    return response.documents;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Failed to fetch tasks");
  }
};

export const deleteTaskById = async (id: string) => {
  try {
    await databases.deleteDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_TASK_COLLECTION_ID!,
      id
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error occurred");
  }
};

export const createTask = async ({
  userId,
  title,
}: {
  userId: string;
  title: string;
}) => {
  try {
    await databases.createDocument(
      APPWRITE_DATABASE_ID!,
      APPWRITE_TASK_COLLECTION_ID!,
      ID.unique(),
      {
        user_id: userId,
        title,
        created_at: new Date().toISOString(),
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error occurred");
  }
};

export const toggleTaskComplete = async ({
  taskId,
  isDone,
}: {
  taskId: string;
  isDone: TASK_IS_DONE_ENUM;
}) => {
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
      throw new Error(error.message);
    }
    throw new Error("Error occurred");
  }
};
