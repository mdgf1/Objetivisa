import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    container: { flex: 1 },

    header: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
    icon: { fontSize: 40 },
    headerText: { flex: 1 },
    title: { color: c.textPrimary, fontSize: 22, fontWeight: "800" },
    tag: {
      fontSize: 11,
      fontWeight: "700",
      letterSpacing: 1,
      textTransform: "uppercase",
      marginTop: 4,
    },
    close: { padding: 4 },
    closeText: { color: c.textSecondary, fontSize: 20, fontWeight: "700" },

    optionName: { color: c.accentText, fontSize: 16, fontWeight: "700", marginTop: 16 },
    optionDesc: { color: c.textSecondary, fontSize: 14, lineHeight: 21, marginTop: 6 },

    divider: { height: 1, backgroundColor: c.border, marginVertical: 20 },

    sectionTitle: { color: c.textPrimary, fontSize: 14, fontWeight: "700", marginBottom: 8 },
    body: { color: c.textSecondary, fontSize: 14, lineHeight: 22 },

    empty: { color: c.textMuted, fontSize: 14, fontStyle: "italic" },
  });
