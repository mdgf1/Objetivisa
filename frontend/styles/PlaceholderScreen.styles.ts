import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    container:  { flex: 1, alignItems: "center", justifyContent: "center" },
    title:      { fontSize: 28, fontWeight: "bold", color: c.textPrimary, marginBottom: 8 },
    subtitle:   { color: c.textSecondary },
    button:     { backgroundColor: c.bgCard, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 },
    buttonText: { color: c.textPrimary, fontWeight: "500" },
  });
