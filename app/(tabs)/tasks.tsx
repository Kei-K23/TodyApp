import Button from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TasksScreen = () => {
  const { user, signOut } = useAuth();

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
      <Text>{user?.name}</Text>
      <Link href={"/landing"}>Auth</Link>
      <Button title="logout" onPress={signOut} />
    </View>
  );
};

export default TasksScreen;
