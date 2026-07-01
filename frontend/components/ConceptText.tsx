import { Text } from "react-native";
import { useTooltipContext } from "../contexts/TooltipContext";
import { useTheme } from "../contexts/ThemeContext";
import { CONCEPTS } from "../data_types/concepts";

type Segment =
  | { type: "text"; content: string }
  | { type: "concept"; id: string; display: string };

function parse(text: string): Segment[] {
  const segments: Segment[] = [];
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) segments.push({ type: "text", content: text.slice(last, m.index) });
    const id = m[1];
    const display = m[2] ?? CONCEPTS[id]?.name ?? id;
    segments.push({ type: "concept", id, display });
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
  const { colors } = useTheme();
  const segments = parse(text);

  return (
    <Text style={style}>
      {segments.map((seg, i) => {
        if (seg.type === "text") return seg.content;
        if (!CONCEPTS[seg.id]) return <Text key={i}>{seg.display}</Text>;
        return (
          <Text
            key={i}
            style={{ color: colors.accent, fontWeight: "600" }}
            {...({
              onMouseEnter: (e: any) =>
                openTooltip(seg.id, e.nativeEvent.clientX, e.nativeEvent.clientY, depth),
              onMouseLeave: () => onLeaveTooltip(depth),
            } as any)}
          >
            {seg.display}
          </Text>
        );
      })}
    </Text>
  );
}
