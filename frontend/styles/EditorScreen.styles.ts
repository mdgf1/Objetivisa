import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    scroll:        { flex: 1 },
    content:       { maxWidth: 900, width: "100%", alignSelf: "center", padding: 32 },
    back:          { color: c.textMuted, fontSize: 13, marginBottom: 24 },
    pageTitle:     { color: c.textPrimary, fontSize: 22, fontWeight: "700", marginBottom: 24 },

    // group list
    categoryTitle: { color: c.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, marginTop: 24 },
    groupRow:      { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: c.bgCard, borderRadius: 10, borderWidth: 1, borderColor: c.border, padding: 14, marginBottom: 8 },
    groupName:     { color: c.textPrimary, fontSize: 14, fontWeight: "500" },
    editBtn:       { backgroundColor: c.bg, borderRadius: 6, borderWidth: 1, borderColor: c.border, paddingVertical: 4, paddingHorizontal: 12 },
    editBtnText:   { color: c.textSecondary, fontSize: 12, fontWeight: "600" },

    // group editor
    sectionTitle:  { color: c.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 12, marginTop: 28 },
    label:         { color: c.textSecondary, fontSize: 12, marginBottom: 4 },
    input:         { backgroundColor: c.bgCard, borderWidth: 1, borderColor: c.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: c.textPrimary, fontSize: 14, marginBottom: 12 },
    textarea:      { backgroundColor: c.bgCard, borderWidth: 1, borderColor: c.border, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, color: c.textPrimary, fontSize: 14, marginBottom: 12, minHeight: 90, textAlignVertical: "top" },
    saveBtn:       { backgroundColor: c.accent, borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20, alignSelf: "flex-start", marginBottom: 8 },
    saveBtnText:   { color: "#fff", fontWeight: "700", fontSize: 13 },
    savedText:     { color: "#16a34a", fontSize: 12, marginBottom: 8 },
    divider:       { height: 1, backgroundColor: c.border, marginVertical: 24 },

    // current option selector
    optionPill:    { borderRadius: 8, borderWidth: 1, paddingVertical: 6, paddingHorizontal: 12, marginRight: 8, marginBottom: 8 },
    optionPillRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
    optionPillText:{ fontSize: 13, fontWeight: "500" },

    // option card
    optionCard:    { backgroundColor: c.bgCard, borderRadius: 10, borderWidth: 1, borderColor: c.border, padding: 16, marginBottom: 16 },
    optionTitle:   { color: c.textMuted, fontSize: 11, fontWeight: "700", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 12 },

    // stance buttons
    stanceRow:     { flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 6 },
    partyLabel:    { color: c.textSecondary, fontSize: 12, fontWeight: "600", width: 40 },
    stanceBtn:     { borderRadius: 6, borderWidth: 1, paddingVertical: 3, paddingHorizontal: 7 },
    stanceBtnText: { fontSize: 11, fontWeight: "700" },
  });
