import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    bar:        { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: c.border, backgroundColor: c.bgCard },
    logo:       { color: c.textPrimary, fontWeight: "700", fontSize: 16 },
    buttons:    { flexDirection: "row", gap: 8 },
    btn:        { backgroundColor: c.bg, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: c.border },
    btnText:    { color: c.textSecondary, fontSize: 13, fontWeight: "500" },
    langBtn:    { backgroundColor: c.bg, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderColor: c.border },
    langText:   { color: c.textMuted, fontSize: 13, fontWeight: "700" },
    langActive: { color: c.textPrimary },
    themeBtn:   { backgroundColor: c.bg, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderColor: c.border },
    themeText:  { fontSize: 14 },
  });
