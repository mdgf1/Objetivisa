import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    card:         { backgroundColor: c.bgCard, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: c.border },
    header:       { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
    icon:         { fontSize: 18 },
    iconImage:    { width: 32, height: 32 },
    name:         { color: c.textPrimary, fontWeight: "500", fontSize: 14 },
    currentLabel: { color: c.textMuted, fontSize: 12, marginTop: 2 },
  });
