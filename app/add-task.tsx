import IconButton from "@/components/ui/icon-button";
import { COLORS, commonStyles } from "@/styles/styles";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddTaskScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        ...commonStyles.container,
        paddingVertical: 20,
        backgroundColor: COLORS.background,
      }}
    >
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          height: 50,
        }}
      >
        <IconButton
          icon="close"
          iconColor="black"
          variant="ghost"
          iconSize={40}
          onPress={() => {
            router.back();
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 30,
        }}
      >
        AddTaskScreen
      </Text>
    </SafeAreaView>
  );
};

export default AddTaskScreen;
