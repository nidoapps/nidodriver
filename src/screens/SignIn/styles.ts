import { theme } from "@/theme";
import { colors } from "@/themeColors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    marginVertical: 15,
  },
  linkContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  link: {
    color: colors.light.primary,
    textDecorationLine: "none",
  },
});
