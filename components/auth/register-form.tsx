import { commonStyles } from "@/styles/styles";
import React from "react";
import { Text, View } from "react-native";
import Input from "../ui/input";

const RegisterForm = () => {
  return (
    <View>
      <Text style={{ ...commonStyles.headerText, textAlign: "center" }}>
        Create account
      </Text>
      <Text
        style={{
          ...commonStyles.smallSubtitleText,
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Create your account and feel the benefits
      </Text>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Input label="Username" placeholder="John Doe" leftIcon="person" />
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

export default RegisterForm;
