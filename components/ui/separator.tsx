import { COLORS } from "@/styles/styles";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface SeparatorProps {
  style?: StyleProp<ViewStyle>;
}

const Separator = ({ style }: SeparatorProps) => {
  return <View style={[styles.separator, style]} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    flex: 1,
  },
});

export default Separator;
