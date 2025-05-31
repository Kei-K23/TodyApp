import Button from "@/components/ui/button";
import { COLORS, commonStyles } from "@/styles/styles";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LandingScreen = () => {
  return (
    <SafeAreaView
      style={{
        ...commonStyles.container,
        paddingVertical: 50,
        backgroundColor: COLORS.background,
      }}
    >
      <Text style={{ ...commonStyles.headerText, textAlign: "center" }}>
        Welcome to <Text style={{ color: COLORS.primary }}>TodyApp</Text>
      </Text>
      <Image
        source={require("../assets/images/landing_screen_img.svg")}
        style={styles.image}
        contentFit="contain"
      />
      <Text style={{ ...commonStyles.titleText }}>
        Your convenience in making a todo list
      </Text>
      <Text>
        Here&apos;s a mobile platform that helps you create task or to list so
        that it can help you in every job easier and faster.
      </Text>
      <Button title="Click" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
  },
});

export default LandingScreen;
