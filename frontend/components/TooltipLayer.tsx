import { View, Text } from "react-native";
import { useTooltipContext } from "../contexts/TooltipContext";
import { CONCEPTS } from "../data_types/concepts";
import { ConceptText } from "./ConceptText";
import { useStyles } from "../hooks/useStyles";
import makeStyles from "../styles/ConceptTooltip.styles";

function ConceptTooltip({
  conceptId, x, y, depth,
}: {
  conceptId: string;
  x: number;
  y: number;
  depth: number;
}) {
  const { onEnterTooltip, onLeaveTooltip } = useTooltipContext();
  const s = useStyles(makeStyles);
  const concept = CONCEPTS[conceptId];
  if (!concept) return null;

  const clampedX =
    typeof window !== "undefined"
      ? Math.min(x + 12, window.innerWidth - 320)
      : x + 12;
  const clampedY =
    typeof window !== "undefined"
      ? Math.min(y + 8, window.innerHeight - 200)
      : y + 8;

  return (
    <View
      style={[s.tooltip, { top: clampedY, left: clampedX }]}
      {...({
        onMouseEnter: () => onEnterTooltip(depth),
        onMouseLeave: () => onLeaveTooltip(depth),
      } as any)}
    >
      <Text style={s.name}>{concept.name}</Text>
      <ConceptText text={concept.explanation} style={s.body} depth={depth + 1} />
    </View>
  );
}

export function TooltipLayer() {
  const { tooltips } = useTooltipContext();
  if (tooltips.length === 0) return null;

  return (
    <>
      {tooltips.map((t) => (
        <ConceptTooltip
          key={`${t.depth}-${t.conceptId}`}
          conceptId={t.conceptId}
          x={t.x}
          y={t.y}
          depth={t.depth}
        />
      ))}
    </>
  );
}
