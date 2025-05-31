import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ToastProps {
  type: "success" | "error" | "info";
  message: string;
}

const TYPE_STYLES = {
  success: {
    icon: "checkmark-circle",
    color: "#22C55E",
  },
  error: {
    icon: "close-circle",
    color: "#EF4444",
  },
  info: {
    icon: "information-circle",
    color: "#3B82F6",
  },
} as const;

const Toast = ({ type, message }: ToastProps) => {
  const { icon, color } = TYPE_STYLES[type];

  return (
    <View style={[styles.toastContainer]}>
      <View style={[styles.toast, { borderLeftColor: color }]}>
        <Ionicons name={icon} size={20} color={color} style={styles.icon} />
        <Text style={[styles.message, { color }]}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 4,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  message: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  icon: {
    marginRight: 4,
  },
});

export default Toast;
