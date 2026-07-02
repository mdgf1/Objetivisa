import { View, Text, ActivityIndicator } from "react-native";
import { usePolicies } from "../hooks/usePolicies";
import Parliament from "../components/Parliament";
import { useTheme } from "../contexts/ThemeContext";

export default function VisionScreen() {
  const { categories, loading, error } = usePolicies();
  const { colors } = useTheme();

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
    <View style={{ flex: 1 }}>
      <Parliament categories={categories} />
    </View>
  );
}
