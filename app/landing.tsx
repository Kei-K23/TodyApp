import Button from "@/components/ui/button";
import { COLORS, commonStyles } from "@/styles/styles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LandingScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        ...commonStyles.container,
        paddingVertical: 20,
        backgroundColor: COLORS.background,
      }}
    >
      <Text style={{ ...commonStyles.headerText, textAlign: "center" }}>
        Welcome to <Text style={{ color: COLORS.primary }}>TodoApp</Text>
      </Text>
      <Image
        source={require("../assets/images/landing_screen_img.svg")}
        style={styles.image}
        contentFit="contain"
      />
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            ...commonStyles.headerText,
            textAlign: "center",
          }}
        >
          Your convenience in making a todo list
        </Text>
      </View>
      <Text
        style={{
          ...commonStyles.smallSubtitleText,
          textAlign: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        Here&apos;s a mobile platform that helps you create task or to list so
        that it can help you in every job easier and faster.
      </Text>
      <Button
        title="Continue with email"
        icon="mail"
        onPress={() => {
          router.push("/auth");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
  },
  separatorContainer: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default LandingScreen;
