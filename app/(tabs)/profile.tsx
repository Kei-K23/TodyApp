import { useAuth } from "@/lib/auth-context";
import { COLORS, commonStyles, FONT_SIZES } from "@/styles/styles";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, signOut } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  if (!user) return null;

  return (
    <SafeAreaView
      style={{
        ...commonStyles.container,
        paddingVertical: 20,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <Pressable style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.xxxlarge,
    fontWeight: "bold",
  },
  name: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.gray,
  },
  signOutButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  signOutText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
  },
});

export default Profile;
