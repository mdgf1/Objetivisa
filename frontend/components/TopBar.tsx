import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import makeStyles from "../styles/TopBar.styles";
import { useStyles } from "../hooks/useStyles";
import { useTheme } from "../contexts/ThemeContext";

export default function TopBar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const s = useStyles(makeStyles);

  return (
    <View style={s.bar}>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={s.logo}>Objetivisa</Text>
      </TouchableOpacity>
      <View style={s.buttons}>
        <TouchableOpacity style={s.btn} onPress={() => router.push("/editor")}>
          <Text style={s.btnText}>Editor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.themeBtn}
          onPress={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Text style={s.themeText}>{theme === "light" ? "🌙" : "☀️"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
