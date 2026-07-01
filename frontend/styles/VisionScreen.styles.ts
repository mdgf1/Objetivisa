import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    scroll:         { flex: 1 },
    columns:        { flexDirection: "row", padding: 20, gap: 16, alignItems: "flex-start" },
    column:         { flex: 1 },
    categoryHeader: { color: c.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 },
  });
