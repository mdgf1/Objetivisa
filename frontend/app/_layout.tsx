import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import TopBar from "../components/TopBar";
import { TooltipLayer } from "../components/TooltipLayer";
import ConceptPanel from "../components/ConceptPanel";
import { EditorLayer } from "../components/EditorLayer";
import { LanguageProvider } from "../contexts/LanguageContext";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { TooltipProvider } from "../contexts/TooltipContext";
import { ConceptsProvider } from "../contexts/ConceptsContext";
import { ConceptPanelProvider } from "../contexts/ConceptPanelContext";
import { EditorProvider } from "../contexts/EditorContext";

function Layout() {
  const { colors, theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <TopBar />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }} />
      <ConceptPanel />
      <TooltipLayer />
      <EditorLayer />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ConceptsProvider>
          <ConceptPanelProvider>
            <EditorProvider>
              <TooltipProvider>
                <Layout />
              </TooltipProvider>
            </EditorProvider>
          </ConceptPanelProvider>
        </ConceptsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
