import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePolicies } from "../../hooks/usePolicies";
import { useLanguage } from "../../contexts/LanguageContext";
import makeStyles from "../../styles/GroupDetailScreen.styles";
import { useStyles } from "../../hooks/useStyles";
import { ConceptText } from "../../components/ConceptText";

const T = {
  pt: { back: "← Voltar", reason: "Porquê esta classificação?" },
  en: { back: "← Back", reason: "Why this classification?" },
};

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { categories } = usePolicies();
  const { lang } = useLanguage();
  const router = useRouter();
  const s = useStyles(makeStyles);
  const t = T[lang];

  const group = categories.flatMap((c) => c.groups).find((g) => g.id === id);
  const current = group?.options.find((o) => o.id === group.currentOptionId);

  if (!group || !current) return null;

  return (
    <ScrollView style={s.scroll}>
      <View style={s.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.back}>{t.back}</Text>
        </TouchableOpacity>

        <View style={s.hero}>
          {current.iconUrl ? (
            <Image source={{ uri: current.iconUrl }} style={s.heroIcon} />
          ) : (
            <Text style={s.heroEmoji}>{group.icon}</Text>
          )}
          <View>
            <Text style={s.groupName}>{group.name}</Text>
            <Text style={s.optionName}>{current.name}</Text>
          </View>
        </View>

        <ConceptText text={current.description ?? ""} style={s.description} depth={1} />

        <View style={s.divider} />

        <Text style={s.reasonTitle}>{t.reason}</Text>
        <ConceptText text={group.classificationReason ?? ""} style={s.reason} depth={1} />
      </View>
    </ScrollView>
  );
}
