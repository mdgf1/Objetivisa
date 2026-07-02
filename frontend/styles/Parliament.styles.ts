import { StyleSheet } from "react-native";
import { Colors } from "./shared";

export default (c: Colors) =>
  StyleSheet.create({
    container: { flex: 1, overflow: "hidden" },

    // section fills + delimiting lines live behind the seats
    backdrop: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 },
    clip:     { position: "absolute", overflow: "hidden" },
    circle:   { position: "absolute" },
    arc:      { position: "absolute", borderWidth: 1, backgroundColor: "transparent" },
    line:     { position: "absolute" },

    // absolutely-positioned seat (ball). Position/size are set inline per seat.
    seat: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 999,
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.15)",
    },
    seatIcon: { textAlign: "center" },

    // legend, top-left
    legend: { position: "absolute", top: 20, left: 20, gap: 8 },
    legendRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    legendDot: { width: 12, height: 12, borderRadius: 6 },
    legendText: { color: c.textSecondary, fontSize: 13, fontWeight: "500" },

    // hovered-seat description card, shown in the "well" (centred, bottom of arc)
    well: {
      position: "absolute",
      width: 300,
      backgroundColor: c.bgCard,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.border,
      padding: 16,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
    },
    wellIcon: { fontSize: 34, marginBottom: 6 },
    wellTitle: { color: c.textPrimary, fontSize: 16, fontWeight: "700", textAlign: "center" },
    wellTag: { fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", marginTop: 4 },
    wellDesc: { color: c.textSecondary, fontSize: 13, lineHeight: 19, textAlign: "center", marginTop: 8 },
    wellOption: { color: c.textMuted, fontSize: 12, marginTop: 8, fontStyle: "italic" },
  });
