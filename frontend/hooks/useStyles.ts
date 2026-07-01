import { useMemo } from "react";
import { Colors } from "../styles/shared";
import { useTheme } from "../contexts/ThemeContext";

export function useStyles<T>(factory: (c: Colors) => T): T {
  const { colors } = useTheme();
  return useMemo(() => factory(colors), [colors]);
}
