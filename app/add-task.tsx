import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { useToast } from "@/components/ui/toast-provider";
import { databases } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import {
  APPWRITE_DATABASE_ID,
  APPWRITE_TASK_DATABASE_ID,
} from "@/lib/constants";
import { commonStyles, FONT_SIZES } from "@/styles/styles";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ID } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const AddTaskScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleTaskCreate = async () => {
    if (!title || !user) return;

    try {
      setIsLoading(true);
      await databases.createDocument(
        APPWRITE_DATABASE_ID!,
        APPWRITE_TASK_DATABASE_ID!,
        ID.unique(),
        {
          user_id: user.$id,
          title,
        }
      );

      showToast("Task added", "success");
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
              placeholder="Write a new task..."
              multiline={true}
              style={styles.inputField}
              textAlignVertical="top"
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.footerButtonContainer}>
            <Button
              title={"Save"}
              onPress={handleTaskCreate}
              loading={isLoading}
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
  },
});

export default AddTaskScreen;
