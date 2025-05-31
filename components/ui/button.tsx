import { COLORS } from "@/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const VARIANTS = {
  primary: {
    backgroundColor: COLORS.primary,
    textColor: "#FFFFFF",
    borderColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: "#E5E7EB",
    textColor: "#1F2937",
    borderColor: "#D1D5DB",
  },
  outline: {
    backgroundColor: "transparent",
    textColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: "transparent",
    textColor: COLORS.primary,
    borderColor: "transparent",
  },
} as const;

type Variant = keyof typeof VARIANTS;

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  textStyle?: any;
  iconSize?: number;
  iconColor?: string;
}

const Button = ({
  title,
  onPress,
  variant = "primary",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  style = {},
  textStyle = {},
  iconSize = 20,
  iconColor,
}: ButtonProps) => {
  const { backgroundColor, textColor, borderColor } = VARIANTS[variant];

  const btnStyle = {
    backgroundColor,
    borderColor,
    opacity: disabled || loading ? 0.6 : 1,
  };

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor || textColor}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
      {icon && iconPosition === "right" && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor || textColor}
          style={styles.icon}
        />
      )}
    </>
  );

  return (
    <TouchableOpacity
      style={[styles.button, btnStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>{content}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default Button;
