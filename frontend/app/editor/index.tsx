import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { usePolicies } from "../../hooks/usePolicies";
import makeStyles from "../../styles/EditorScreen.styles";
import { useStyles } from "../../hooks/useStyles";

export default function EditorIndexScreen() {
  const { categories, loading } = usePolicies();
  const router = useRouter();
  const s = useStyles(makeStyles);

  if (loading) return null;

  return (
    <ScrollView style={s.scroll}>
      <View style={s.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.back}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={s.pageTitle}>Editor</Text>

        {categories.map((cat) => (
          <View key={cat.id}>
            <Text style={s.categoryTitle}>{cat.name}</Text>
            {cat.groups.map((group) => (
              <View key={group.id} style={s.groupRow}>
                <Text style={s.groupName}>{group.name}</Text>
                <TouchableOpacity
                  style={s.editBtn}
                  onPress={() => router.push(`/editor/group/${group.id}`)}
                >
                  <Text style={s.editBtnText}>Editar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
