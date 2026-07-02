import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { usePolicies } from "../hooks/usePolicies";
import { useStyles } from "../hooks/useStyles";
import { useTheme } from "../contexts/ThemeContext";
import SidePanel from "../components/SidePanel";
import PartyPanel from "../components/PartyPanel";
import makeStyles from "../styles/ElectionsScreen.styles";

export default function ElectionsScreen() {
  const s = useStyles(makeStyles);
  const { colors } = useTheme();
  const { parties, loading, error } = usePolicies();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = parties.find((p) => p.id === selectedId) ?? null;

  return (
    <View style={s.container}>
      <Text style={s.heading}>Elections Map</Text>
      <Text style={s.hint}>Select a party to open its card.</Text>

      {loading ? (
        <ActivityIndicator color={colors.accent} />
      ) : error ? (
        <Text style={{ color: colors.accent }}>{error}</Text>
      ) : (
        <View style={s.list}>
          {parties.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[s.chip, selectedId === p.id && s.chipActive]}
              onPress={() => setSelectedId(p.id)}
            >
              <View style={[s.dot, { backgroundColor: p.color }]} />
              <Text style={s.chipText}>{p.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selected && (
        <SidePanel>
          <PartyPanel
            partyId={selected.id}
            partyName={selected.name}
            color={selected.color}
            onClose={() => setSelectedId(null)}
          />
        </SidePanel>
      )}
    </View>
  );
}
