import { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePolicies } from "../../../hooks/usePolicies";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useTheme } from "../../../contexts/ThemeContext";
import makeStyles from "../../../styles/EditorScreen.styles";
import { useStyles } from "../../../hooks/useStyles";
import { api } from "../../../services/api";
import { PolicyGroup, PolicyOption } from "../../../data_types/policies";

const STANCES = [
  { code: "strongly_support", label: "SS", color: "#16a34a" },
  { code: "support",          label: "S",  color: "#4ade80" },
  { code: "neutral",          label: "N",  color: "#94a3b8" },
  { code: "oppose",           label: "O",  color: "#fb923c" },
  { code: "strongly_oppose",  label: "SO", color: "#ef4444" },
];

type OptionState = {
  name: string;
  description: string;
  stances: Record<string, string>;
};

export default function GroupEditorScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { categories, parties } = usePolicies();
  const { lang } = useLanguage();
  const { colors } = useTheme();
  const router = useRouter();
  const s = useStyles(makeStyles);

  const group = categories.flatMap((c) => c.groups).find((g) => g.id === id);

  const [groupName, setGroupName] = useState("");
  const [classificationReason, setClassificationReason] = useState("");
  const [currentOptionId, setCurrentOptionId] = useState("");
  const [options, setOptions] = useState<Record<string, OptionState>>({});
  const [groupSaved, setGroupSaved] = useState(false);
  const [optionSaved, setOptionSaved] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!group) return;
    setGroupName(group.name);
    setClassificationReason(group.classificationReason ?? "");
    setCurrentOptionId(group.currentOptionId);
    const opts: Record<string, OptionState> = {};
    group.options.forEach((o) => {
      const stances: Record<string, string> = {};
      o.stances.forEach((st) => { stances[st.partyId] = st.stance; });
      opts[o.id] = { name: o.name, description: o.description ?? "", stances };
    });
    setOptions(opts);
  }, [group]);

  if (!group) return null;

  const saveGroup = async () => {
    await api.saveGroup(id, lang, { name: groupName, currentOptionId, classificationReason });
    setGroupSaved(true);
    setTimeout(() => setGroupSaved(false), 2000);
  };

  const saveOption = async (opt: PolicyOption) => {
    const state = options[opt.id];
    await api.saveOption(opt.id, lang, { name: state.name, description: state.description });
    await Promise.all(
      parties.map((p) => api.saveStance(opt.id, p.id, state.stances[p.id] ?? "neutral"))
    );
    setOptionSaved((prev) => ({ ...prev, [opt.id]: true }));
    setTimeout(() => setOptionSaved((prev) => ({ ...prev, [opt.id]: false })), 2000);
  };

  const setOptionField = (optId: string, field: "name" | "description", value: string) =>
    setOptions((prev) => ({ ...prev, [optId]: { ...prev[optId], [field]: value } }));

  const setStance = (optId: string, partyId: string, stance: string) =>
    setOptions((prev) => ({
      ...prev,
      [optId]: { ...prev[optId], stances: { ...prev[optId].stances, [partyId]: stance } },
    }));

  return (
    <ScrollView style={s.scroll}>
      <View style={s.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.back}>← Voltar</Text>
        </TouchableOpacity>

        {/* Group info */}
        <Text style={s.sectionTitle}>Informação do grupo</Text>
        <Text style={s.label}>Nome</Text>
        <TextInput style={s.input} value={groupName} onChangeText={setGroupName} />
        <Text style={s.label}>Porquê esta classificação?</Text>
        <TextInput style={s.textarea} value={classificationReason} onChangeText={setClassificationReason} multiline />
        <Text style={s.label}>Opção atual</Text>
        <View style={s.optionPillRow}>
          {group.options.map((o) => {
            const selected = currentOptionId === o.id;
            return (
              <TouchableOpacity
                key={o.id}
                style={[s.optionPill, { borderColor: selected ? colors.accent : colors.border, backgroundColor: selected ? colors.accent : colors.bgCard }]}
                onPress={() => setCurrentOptionId(o.id)}
              >
                <Text style={[s.optionPillText, { color: selected ? "#fff" : colors.textSecondary }]}>{options[o.id]?.name || o.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {groupSaved && <Text style={s.savedText}>Guardado!</Text>}
        <TouchableOpacity style={s.saveBtn} onPress={saveGroup}>
          <Text style={s.saveBtnText}>Guardar grupo</Text>
        </TouchableOpacity>

        <View style={s.divider} />

        {/* Options */}
        <Text style={s.sectionTitle}>Opções</Text>
        {group.options.map((opt) => {
          const state = options[opt.id];
          if (!state) return null;
          return (
            <View key={opt.id} style={s.optionCard}>
              <Text style={s.optionTitle}>{opt.id}</Text>
              <Text style={s.label}>Nome</Text>
              <TextInput style={s.input} value={state.name} onChangeText={(v) => setOptionField(opt.id, "name", v)} />
              <Text style={s.label}>Descrição</Text>
              <TextInput style={s.textarea} value={state.description} onChangeText={(v) => setOptionField(opt.id, "description", v)} multiline />
              <Text style={s.label}>Posições dos partidos</Text>
              {parties.map((party) => (
                <View key={party.id} style={s.stanceRow}>
                  <Text style={s.partyLabel}>{party.id.toUpperCase()}</Text>
                  {STANCES.map((st) => {
                    const active = state.stances[party.id] === st.code;
                    return (
                      <TouchableOpacity
                        key={st.code}
                        style={[s.stanceBtn, { borderColor: active ? st.color : colors.border, backgroundColor: active ? st.color : colors.bgCard }]}
                        onPress={() => setStance(opt.id, party.id, st.code)}
                      >
                        <Text style={[s.stanceBtnText, { color: active ? "#fff" : colors.textMuted }]}>{st.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
              {optionSaved[opt.id] && <Text style={s.savedText}>Guardado!</Text>}
              <TouchableOpacity style={s.saveBtn} onPress={() => saveOption(opt)}>
                <Text style={s.saveBtnText}>Guardar opção</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
