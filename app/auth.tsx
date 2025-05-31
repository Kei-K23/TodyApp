import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import Button from "@/components/ui/button";
import { COLORS, commonStyles } from "@/styles/styles";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthScreen = () => {
  const [authForm, setAuthForm] = useState<"login" | "register">("login");

  return (
    <SafeAreaView style={commonStyles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formWrapper}>
            {authForm === "login" ? <LoginForm /> : <RegisterForm />}
          </View>

          <View style={styles.buttonContainer}>
            <Button title={authForm === "login" ? "Login" : "Register"} />
            <Text
              onPress={() =>
                setAuthForm((prev) => (prev === "login" ? "register" : "login"))
              }
              style={styles.authFormSwitcherText}
            >
              {authForm === "login"
                ? "New to TodyApp? Register here!"
                : "Already have an account? Login here!"}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  formWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    marginBottom: 10,
  },
  authFormSwitcherText: {
    color: COLORS.gray,
    marginTop: 10,
    textAlign: "center",
  },
});

export default AuthScreen;
