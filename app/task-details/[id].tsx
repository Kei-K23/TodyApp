import { deleteTaskById } from "@/api/task";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { useToast } from "@/components/ui/toast-provider";
import { databases } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_TASK_COLLECTION_ID,
} from "@/lib/constants";
import { COLORS, commonStyles, FONT_SIZES } from "@/styles/styles";
import { Task } from "@/types/database";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TaskDetailsScreen = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [isTaskFetching, setIsTasksFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { showToast } = useToast();
  const { user } = useAuth();

  const fetchTaskById = async () => {
    try {
      setIsTasksFetching(true);
      const response = await databases.getDocument(
        APPWRITE_DATABASE_ID!,
        APPWRITE_TASK_COLLECTION_ID!,
        id as string
      );

      setTask(response as Task);
      setTitle(response.title);
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
        return;
      }
      showToast("Error occurred", "error");
      setTask(null);
    } finally {
      setIsTasksFetching(false);
    }
  };

  const handleTaskUpdate = async () => {
    if (!title || !user || !id) return;

    try {
      setIsLoading(true);
      await databases.updateDocument(
        APPWRITE_DATABASE_ID!,
        APPWRITE_TASK_COLLECTION_ID!,
        id as string,
        {
          user_id: user.$id,
          title,
        }
      );

      showToast("Task updated", "success");
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
        return;
      }
      showToast("Error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskDelete = async () => {
    if (!user || !id) return;

    try {
      setIsDeleteLoading(true);

      await deleteTaskById(id as string);

      showToast("Task deleted", "success");

      setTitle("");
      setTask(null);

      router.back();
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message);
      }
    } finally {
      setIsDeleteLoading(false);
    }
  };

  useEffect(() => {
    if (user && id) {
      fetchTaskById();
    }
  }, [id, user]);

  return (
    <SafeAreaView style={commonStyles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formWrapper}>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                height: 50,
              }}
            >
              <IconButton
                icon="close"
                iconColor="black"
                variant="ghost"
                iconSize={40}
                onPress={() => {
                  router.back();
                }}
              />
            </View>
            <TextInput
              placeholder="Loading..."
              multiline={true}
              style={styles.inputField}
              textAlignVertical="top"
              onChangeText={setTitle}
              value={title}
            />
          </View>

          <View style={styles.footerButtonContainer}>
            <IconButton
              icon="trash-bin"
              variant="outline"
              iconColor={COLORS.red}
              style={styles.deleteBtn}
              iconSize={24}
              onPress={handleTaskDelete}
              loading={isTaskFetching || isLoading || isDeleteLoading}
            />
            <Button
              title={isLoading ? "Saving..." : "Save"}
              disabled={isTaskFetching || isLoading || isDeleteLoading}
              onPress={handleTaskUpdate}
              style={{ flex: 1 }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    fontSize: FONT_SIZES.xxxlarge,
    fontWeight: "600",
    minHeight: 100,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formWrapper: {
    flex: 1,
  },
  footerButtonContainer: {
    marginBottom: 10,
    flexDirection: "row",
    gap: 8,
  },
  deleteBtn: {
    borderColor: COLORS.red,
    width: 50,
  },
});

export default TaskDetailsScreen;
