import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import { usePolicies } from "../hooks/usePolicies";
import PolicyGroupCard from "../components/PolicyGroupCard";
import makeStyles from "../styles/VisionScreen.styles";
import { useStyles } from "../hooks/useStyles";
import { useTheme } from "../contexts/ThemeContext";

export default function VisionScreen() {
  const { categories, parties, loading, error } = usePolicies();
  const { colors } = useTheme();
  const s = useStyles(makeStyles);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: colors.accent }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={s.scroll}>
      <View style={s.columns}>
        {categories.map((cat) => (
          <View key={cat.id} style={s.column}>
            <Text style={s.categoryHeader}>{cat.name}</Text>
            {cat.groups.map((group) => (
              <PolicyGroupCard key={group.id} group={group} parties={parties} />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
