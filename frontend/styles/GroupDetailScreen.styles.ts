import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    scroll:       { flex: 1 },
    content:      { maxWidth: 720, width: "100%", alignSelf: "center", padding: 32 },
    back:         { color: c.textMuted, fontSize: 13, marginBottom: 24 },
    hero:         { flexDirection: "row", alignItems: "center", gap: 20, marginBottom: 32 },
    heroIcon:     { width: 64, height: 64 },
    heroEmoji:    { fontSize: 48 },
    groupName:    { color: c.textMuted, fontSize: 13, fontWeight: "600", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 },
    optionName:   { color: c.textPrimary, fontSize: 28, fontWeight: "700" },
    description:  { color: c.textSecondary, fontSize: 16, lineHeight: 26, marginBottom: 32 },
    divider:      { height: 1, backgroundColor: c.border, marginBottom: 28 },
    reasonTitle:  { color: c.textMuted, fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 12 },
    reason:       { color: c.textSecondary, fontSize: 15, lineHeight: 26 },
  });
