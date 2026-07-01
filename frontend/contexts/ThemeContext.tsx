import { createContext, useContext, useState, ReactNode } from "react";
import { Colors, lightColors, darkColors } from "../styles/shared";

export type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  colors: Colors;
};

const ThemeContext = createContext<ThemeState>({
  theme: "light",
  setTheme: () => {},
  colors: lightColors,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const colors = theme === "dark" ? darkColors : lightColors;
  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
