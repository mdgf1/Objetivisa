import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    container: { flex: 1, padding: 24 },
    heading:   { fontSize: 22, fontWeight: "700", color: c.textPrimary, marginBottom: 4 },
    hint:      { color: c.textSecondary, marginBottom: 20 },
    list:      { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    chip:      { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: c.bgCard,
                 borderWidth: 1, borderColor: c.border, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 14 },
    chipActive:{ borderColor: c.accent },
    dot:       { width: 12, height: 12, borderRadius: 6 },
    chipText:  { color: c.textPrimary, fontWeight: "500" },
  });
