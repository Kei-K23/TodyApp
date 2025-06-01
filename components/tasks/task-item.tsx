import { COLORS } from "@/styles/styles";
import { Task, TASK_IS_DONE_ENUM } from "@/types/database";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface TaskItemProps {
  task: Task;
  onToggleComplete?: (task: Task) => void;
  style?: ViewStyle;
}

const TaskItem = ({ task, onToggleComplete, style }: TaskItemProps) => {
  const router = useRouter();
  const isCompleted = task.is_done === TASK_IS_DONE_ENUM.DONE ? true : false;

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/task-details/${task.$id}`);
      }}
      style={[styles.container, style]}
    >
      <TouchableOpacity onPress={() => onToggleComplete?.(task)}>
        <Ionicons
          name={isCompleted ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={isCompleted ? COLORS.primary : COLORS.gray}
          style={styles.icon}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text
          numberOfLines={2}
          style={[styles.text, isCompleted && styles.completedText]}
        >
          {task.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: 18,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.black,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: COLORS.gray,
  },
});

export default TaskItem;
