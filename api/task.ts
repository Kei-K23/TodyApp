import { databases } from "@/lib/appwrite";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_TASK_COLLECTION_ID,
} from "@/lib/constants";

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
