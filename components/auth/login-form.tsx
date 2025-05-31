import { commonStyles } from "@/styles/styles";
import React from "react";
import { Text, View } from "react-native";
import Input from "../ui/input";

const LoginForm = () => {
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
        Your work faster and structured with Todyapp
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
        />
        <Input
          label="Password"
          placeholder="********"
          secureTextEntry
          leftIcon="lock-closed"
        />
      </View>
    </View>
  );
};

export default LoginForm;
