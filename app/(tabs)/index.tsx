import React from "react";
import { Text, View } from "react-native";

const Index = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 30,
        }}
      >
        Hello World
      </Text>
      <Text>Hello React Native</Text>
    </View>
  );
};

export default Index;
