import { commonStyles } from "@/styles/styles";
import React from "react";
import { Text, View } from "react-native";
import Input from "../ui/input";

interface RegisterFormProps {
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

const RegisterForm = ({
  setEmail,
  setPassword,
  setUsername,
}: RegisterFormProps) => {
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
        <Input
          label="Username"
          placeholder="John Doe"
          leftIcon="person"
          onChangeText={setUsername}
        />
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

export default RegisterForm;
