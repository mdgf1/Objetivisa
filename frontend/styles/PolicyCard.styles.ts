import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    chip:  { backgroundColor: c.bgCard, borderWidth: 1, borderColor: c.border, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, flexDirection: "row", alignItems: "center", gap: 8 },
    icon:  { fontSize: 20 },
    label: { color: c.textCard, fontWeight: "500" },
  });
