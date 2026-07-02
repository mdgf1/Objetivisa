import { useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { usePartyDetail } from "../hooks/usePartyDetail";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useStyles } from "../hooks/useStyles";
import makeStyles from "../styles/PartyPanel.styles";

type Tab = "positions" | "people" | "history";

const TAB_LABELS: Record<Tab, { pt: string; en: string }> = {
  positions: { pt: "Posições", en: "Positions" },
  people:    { pt: "Pessoas", en: "People" },
  history:   { pt: "História", en: "History" },
};

const TABS: Tab[] = ["positions", "people", "history"];

type Props = {
  partyId: string;
  /** Party display name for the header. */
  partyName?: string;
  /** Party colour for the header swatch. */
  color?: string;
  onClose?: () => void;
};

/** Content for the SidePanel card: a party's positions, people and history across three tabs. */
export default function PartyPanel({ partyId, partyName, color, onClose }: Props) {
  const s = useStyles(makeStyles);
  const { colors } = useTheme();
  const { lang } = useLanguage();
  const { detail, loading, error } = usePartyDetail(partyId);
  const [tab, setTab] = useState<Tab>("positions");

  return (
    <View style={s.container}>
      <View style={s.header}>
        {color && <View style={[s.swatch, { backgroundColor: color }]} />}
        <Text style={s.title}>{partyName ?? partyId}</Text>
        {onClose && (
          <TouchableOpacity style={s.close} onPress={onClose}>
            <Text style={s.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={s.tabs}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t}
            style={[s.tab, tab === t && s.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[s.tabText, tab === t && s.tabTextActive]}>{TAB_LABELS[t][lang]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={s.centered}><ActivityIndicator color={colors.accent} /></View>
      ) : error ? (
        <View style={s.centered}><Text style={{ color: colors.accent }}>{error}</Text></View>
      ) : !detail ? (
        <View style={s.centered}><Text style={s.muted}>—</Text></View>
      ) : (
        <ScrollView style={s.body}>
          {tab === "positions" &&
            detail.positions.map((p, i) => (
              <View key={i} style={s.position}>
                <Text style={s.positionTopic}>{p.topic}</Text>
                <Text style={s.positionText}>{p.summary}</Text>
              </View>
            ))}

          {tab === "people" &&
            detail.people.map((p, i) => (
              <View key={i} style={s.person}>
                {p.imageUrl ? (
                  <Image source={{ uri: p.imageUrl }} style={s.avatar} />
                ) : (
                  <View style={s.avatar} />
                )}
                <View>
                  <Text style={s.personName}>{p.name}</Text>
                  <Text style={s.personRole}>{p.role}</Text>
                </View>
              </View>
            ))}

          {tab === "history" &&
            detail.history.map((e, i) => (
              <View key={i} style={s.event}>
                <Text style={s.year}>{e.year}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.eventTitle}>{e.title}</Text>
                  <Text style={s.eventText}>{e.description}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
      )}
    </View>
  );
}
