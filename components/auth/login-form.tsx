import { commonStyles } from "@/styles/styles";
import React from "react";
import { Text, View } from "react-native";
import Input from "../ui/input";

interface LoginFormProps {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const LoginForm = ({ setEmail, setPassword }: LoginFormProps) => {
  return (
    <View>
      <Text style={{ ...commonStyles.headerText, textAlign: "center" }}>
        Welcome Back!
      </Text>
      <Text
        style={{
          ...commonStyles.smallSubtitleText,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Your work faster and structured with TodoApp
      </Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Input
          label="Email Address"
          placeholder="johndoe@example.com"
          keyboardType="email-address"
          leftIcon="mail"
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          placeholder="********"
          secureTextEntry
          leftIcon="lock-closed"
          onChangeText={setPassword}
        />
      </View>
    </View>
  );
};

export default LoginForm;
