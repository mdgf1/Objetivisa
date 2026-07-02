import { View, Text } from "react-native";
import { useTooltipContext } from "../contexts/TooltipContext";
import { useConcepts } from "../contexts/ConceptsContext";
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
  const { onEnterTooltip, onLeaveTooltip, keepAlive } = useTooltipContext();
  const { getConcept } = useConcepts();
  const s = useStyles(makeStyles);
  const concept = getConcept(conceptId);
  if (!concept) return null;

  const clampedX =
    typeof window !== "undefined"
      ? Math.min(x + 12, window.innerWidth - 320)
      : x + 12;
  const clampedY =
    typeof window !== "undefined"
      ? Math.min(y + 8, window.innerHeight - 200)
      : y + 8;

  const isPolicy = concept.kind === "policy";

  return (
    <View
      style={[s.tooltip, isPolicy && s.policyTooltip, { top: clampedY, left: clampedX }]}
      {...({
        onMouseEnter: () => onEnterTooltip(depth),
        onMouseMove: () => keepAlive(),
        onMouseLeave: () => onLeaveTooltip(depth),
      } as any)}
    >
      {isPolicy ? (
        <>
          {!!concept.icon && <Text style={s.policyIcon}>{concept.icon}</Text>}
          <Text style={s.policyName}>{concept.name}</Text>
          {!!concept.categoryName && (
            <Text style={[s.policyTag, { color: concept.categoryColor }]}>{concept.categoryName}</Text>
          )}
          {!!concept.description && (
            <ConceptText text={concept.description} style={s.body} depth={depth + 1} />
          )}
          {!!concept.currentOptionName && (
            <Text style={s.policyOption}>{concept.currentOptionName}</Text>
          )}
        </>
      ) : (
        <>
          <Text style={s.name}>{concept.name}</Text>
          <ConceptText text={concept.description} style={s.body} depth={depth + 1} />
        </>
      )}
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
