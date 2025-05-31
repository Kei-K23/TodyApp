import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconColor?: string;
  iconSize?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  iconColor = "#6B7280", // default gray-500
  iconSize = 20,
  secureTextEntry,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          error && { borderColor: "#EF4444" }, // red-500
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={iconSize}
            color={iconColor}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[styles.input, inputStyle]}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#9CA3AF" // gray-400
          {...rest}
        />
        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={iconSize}
            color={iconColor}
            style={styles.icon}
          />
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#374151", // gray-700
    marginBottom: 4,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D1D5DB", // gray-300
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F9FAFB", // gray-50
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: "#111827", // gray-900
  },
  icon: {
    marginHorizontal: 5,
  },
  errorText: {
    color: "#EF4444", // red-500
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;
