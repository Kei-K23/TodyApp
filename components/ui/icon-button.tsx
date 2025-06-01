import { COLORS } from "@/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
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

interface IconButtonProps {
  onPress?: () => void;
  variant?: Variant;
  icon: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  iconColor?: string;
}

const IconButton = ({
  icon,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  style = {},
  iconSize = 28,
  iconColor,
}: IconButtonProps) => {
  const { backgroundColor, textColor, borderColor } = VARIANTS[variant];

  const btnStyle = {
    backgroundColor,
    borderColor,
    opacity: disabled || loading ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      style={[styles.button, btnStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <Ionicons name={icon} size={iconSize} color={iconColor || textColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconButton;
