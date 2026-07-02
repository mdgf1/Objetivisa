import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    container:    { flex: 1 },

    header:       { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 16 },
    swatch:       { width: 14, height: 14, borderRadius: 7 },
    title:        { color: c.textPrimary, fontSize: 22, fontWeight: "700" },
    close:        { marginLeft: "auto", padding: 4 },
    closeText:    { color: c.textMuted, fontSize: 20 },

    tabs:         { flexDirection: "row", borderBottomWidth: 1, borderColor: c.border, marginBottom: 12 },
    tab:          { paddingVertical: 10, paddingHorizontal: 16 },
    tabActive:    { borderBottomWidth: 2, borderColor: c.accent },
    tabText:      { color: c.textMuted, fontSize: 14, fontWeight: "500" },
    tabTextActive:{ color: c.accentText },

    body:         { flex: 1 },

    // positions
    position:     { marginBottom: 16 },
    positionTopic:{ color: c.textPrimary, fontSize: 15, fontWeight: "600", marginBottom: 2 },
    positionText: { color: c.textSecondary, fontSize: 13, lineHeight: 18 },

    // people
    person:       { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
    avatar:       { width: 44, height: 44, borderRadius: 22, backgroundColor: c.border },
    personName:   { color: c.textPrimary, fontSize: 15, fontWeight: "600" },
    personRole:   { color: c.textMuted, fontSize: 12 },

    // history
    event:        { flexDirection: "row", gap: 12, marginBottom: 14 },
    year:         { color: c.accentText, fontSize: 14, fontWeight: "700", width: 44 },
    eventTitle:   { color: c.textPrimary, fontSize: 15, fontWeight: "600", marginBottom: 2 },
    eventText:    { color: c.textSecondary, fontSize: 13, lineHeight: 18 },

    centered:     { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
    muted:        { color: c.textMuted, fontSize: 13 },
  });
