import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import TopBar from "../components/TopBar";
import { TooltipLayer } from "../components/TooltipLayer";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { TooltipProvider } from "../contexts/TooltipContext";

function Layout() {
  const { colors, theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <TopBar />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
      <TooltipLayer />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Layout />
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
