import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    tooltip: {
      position: "fixed" as any,
      width: 300,
      backgroundColor: c.bgCard,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: c.border,
      padding: 14,
      zIndex: 9999,
      // web shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
    },
    name: {
      color: c.textPrimary,
      fontWeight: "700",
      fontSize: 13,
      marginBottom: 8,
    },
    body: {
      color: c.textSecondary,
      fontSize: 13,
      lineHeight: 20,
    },
    link: {
      fontWeight: "600",
    },

    // richer card used when the concept is a policy group (centred, with icon + tag)
    policyTooltip: {
      alignItems: "center",
    },
    policyIcon: { fontSize: 32, marginBottom: 4 },
    policyName: {
      color: c.textPrimary,
      fontWeight: "700",
      fontSize: 15,
      textAlign: "center",
    },
    policyTag: {
      fontSize: 10,
      fontWeight: "700",
      letterSpacing: 1,
      textTransform: "uppercase",
      marginTop: 4,
      marginBottom: 8,
      textAlign: "center",
    },
    policyOption: {
      color: c.textMuted,
      fontSize: 12,
      marginTop: 8,
      fontStyle: "italic",
      textAlign: "center",
    },
  });
