export type Colors = typeof lightColors;

export const lightColors = {
  bg: "#e8e2d8",
  bgCard: "#dfd8cc",
  border: "#c8c0b0",
  textPrimary: "#1a1410",
  textSecondary: "#5a5044",
  textMuted: "#9c9080",
  textCard: "#2c2418",
  accent: "#8b1a1a",
  accentText: "#8b1a1a",
};

export const darkColors = {
  bg: "#0f172a",
  bgCard: "#1e293b",
  border: "#334155",
  textPrimary: "#ffffff",
  textSecondary: "#94a3b8",
  textMuted: "#475569",
  textCard: "#e2e8f0",
  accent: "#8b1a1a",
  accentText: "#ef4444",
};

// kept for any legacy direct import — resolves to light
export const colors = lightColors;
