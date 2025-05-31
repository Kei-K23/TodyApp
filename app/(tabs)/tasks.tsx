import FloatingButton from "@/components/ui/floating-button";
import { COLORS, commonStyles } from "@/styles/styles";
import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TasksScreen = () => {
  const router = useRouter();

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
      <FloatingButton
        onPress={() => {
          router.push("/add-task");
        }}
      />
    </SafeAreaView>
  );
};

export default TasksScreen;
