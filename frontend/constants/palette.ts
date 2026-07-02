// One distinct colour per policy category, assigned by category order.
// Shared by the hemicycle (Parliament) and the concept lookup (policy tooltips).
export const CATEGORY_PALETTE = ["#3b82f6", "#f59e0b", "#a855f7", "#10b981", "#ef4444"];

export const categoryColor = (index: number) =>
  CATEGORY_PALETTE[index % CATEGORY_PALETTE.length];
