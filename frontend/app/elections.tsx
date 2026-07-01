import { View, Text } from "react-native";
import makeStyles from "../styles/PlaceholderScreen.styles";
import { useStyles } from "../hooks/useStyles";

export default function ElectionsScreen() {
  const s = useStyles(makeStyles);
  return (
    <View style={s.container}>
      <Text style={s.title}>Elections Map</Text>
      <Text style={s.subtitle}>Coming soon.</Text>
    </View>
  );
}
