import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#4CAF50",
  secondary: "#FFC107",
  background: "#F5F5F5",
  white: "#FFFFFF",
  black: "#212121",
  gray: "#9E9E9E",
  lightGray: "#E0E0E0",
  red: "#F44336",
};

const FONT_SIZES = {
  small: 14,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 26,
  xxxlarge: 34,
};

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 18,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  headerText: {
    fontSize: FONT_SIZES.xxlarge,
    fontWeight: "bold",
    color: COLORS.black,
  },
  titleText: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: "bold",
    color: COLORS.black,
  },
  subtitleText: {
    fontSize: FONT_SIZES.large,
    color: COLORS.gray,
  },
  smallSubtitleText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.gray,
  },
  todoText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.black,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    fontSize: FONT_SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginVertical: 8,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { COLORS, commonStyles, FONT_SIZES };
