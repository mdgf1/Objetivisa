import { TouchableOpacity, View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { PolicyGroup, Party } from "../data_types/policies";
import makeStyles from "../styles/PolicyGroupCard.styles";
import { useStyles } from "../hooks/useStyles";

type Props = { group: PolicyGroup; parties: Party[] };

export default function PolicyGroupCard({ group }: Props) {
  const router = useRouter();
  const s = useStyles(makeStyles);
  const current = group.options.find((o) => o.id === group.currentOptionId);

  return (
    <TouchableOpacity style={s.card} onPress={() => router.push(`/group/${group.id}`)}>
      <View style={s.header}>
        {current?.iconUrl ? (
          <Image source={{ uri: current.iconUrl }} style={s.iconImage} />
        ) : (
          <Text style={s.icon}>{group.icon}</Text>
        )}
        <View>
          <Text style={s.name}>{group.name}</Text>
          {current && <Text style={s.currentLabel}>{current.name}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}
