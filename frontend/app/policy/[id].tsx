import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import s from "../../styles/PlaceholderScreen.styles";
import { colors } from "../../styles/shared";

export default function PolicyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return (
    <View style={s.container}>
      <Text style={s.title}>{id}</Text>
      <Text style={s.subtitle}>
        Parliamentary decisions related to{" "}
        <Text style={{ color: colors.accentText }}>{id}</Text> policy will appear here.
      </Text>
      <TouchableOpacity style={s.button} onPress={() => router.back()}>
        <Text style={s.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
