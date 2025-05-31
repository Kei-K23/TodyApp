import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import Button from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { COLORS, commonStyles } from "@/styles/styles";
import { useRouter } from "expo-router";
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
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, signIn, signUp } = useAuth();
  const router = useRouter();

  const handleClearInputs = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    const errorMsg = await signIn({ email, password });
    if (errorMsg) {
      return;
    }
    router.replace("/(tabs)/tasks");
  };

  const handleRegister = async () => {
    if (!email || !password || !username) {
      return;
    }

    const errorMsg = await signUp({ email, password, username });
    if (errorMsg) {
      return;
    }
    router.replace("/(tabs)/tasks");
  };

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
            {authForm === "login" ? (
              <LoginForm setEmail={setEmail} setPassword={setPassword} />
            ) : (
              <RegisterForm
                setEmail={setEmail}
                setPassword={setPassword}
                setUsername={setUsername}
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              disabled={isLoading}
              title={authForm === "login" ? "Login" : "Register"}
              onPress={() => {
                if (authForm === "login") {
                  handleLogin();
                } else {
                  handleRegister();
                }
              }}
            />
            <Text
              onPress={() => {
                setAuthForm((prev) =>
                  prev === "login" ? "register" : "login"
                );
                handleClearInputs();
              }}
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
