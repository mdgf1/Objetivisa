import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    panel: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      backgroundColor: c.bgCard,
      borderRightWidth: 1,
      borderColor: c.border,
      // subtle shadow so it reads as a floating card over the content
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 0 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    content: {
      flex: 1,
      padding: 24,
    },
  });
