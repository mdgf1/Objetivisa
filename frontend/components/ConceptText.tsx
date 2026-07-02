import { Text } from "react-native";
import { useTooltipContext } from "../contexts/TooltipContext";
import { useTheme } from "../contexts/ThemeContext";
import { useConcepts } from "../contexts/ConceptsContext";
import { useConceptPanel } from "../contexts/ConceptPanelContext";

type Segment =
  | { type: "text"; content: string }
  | { type: "concept"; id: string; display: string | null };

function parse(text: string): Segment[] {
  const segments: Segment[] = [];
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) segments.push({ type: "text", content: text.slice(last, m.index) });
    segments.push({ type: "concept", id: m[1], display: m[2] ?? null });
    last = m.index + m[0].length;
  }
  if (last < text.length) segments.push({ type: "text", content: text.slice(last) });
  return segments;
}

type Props = {
  text: string;
  style?: any;
  // depth = the depth level that concept links in this text will open
  depth: number;
};

export function ConceptText({ text, style, depth }: Props) {
  const { openTooltip, onLeaveTooltip } = useTooltipContext();
  const { getConcept } = useConcepts();
  const { openConcept } = useConceptPanel();
  const { colors } = useTheme();
  const segments = parse(text);

  return (
    <Text style={style}>
      {segments.map((seg, i) => {
        if (seg.type === "text") return seg.content;
        const concept = getConcept(seg.id);
        const display = seg.display ?? concept?.name ?? seg.id;
        // unknown concept (not in the backend map): render as plain text
        if (!concept) return <Text key={i}>{display}</Text>;
        return (
          <Text
            key={i}
            style={{ color: colors.accent, fontWeight: "600", cursor: "pointer" } as any}
            {...({
              dataSet: { conceptId: seg.id },
              onMouseEnter: (e: any) =>
                openTooltip(seg.id, e.nativeEvent.clientX, e.nativeEvent.clientY, depth),
              onMouseLeave: () => onLeaveTooltip(depth),
              onClick: () => openConcept(seg.id),
            } as any)}
          >
            {display}
          </Text>
        );
      })}
    </Text>
  );
}
