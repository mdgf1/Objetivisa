import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, LayoutChangeEvent } from "react-native";
import { PolicyCategory, PolicyGroup } from "../data_types/policies";
import { useStyles } from "../hooks/useStyles";
import { useTheme } from "../contexts/ThemeContext";
import makeStyles from "../styles/Parliament.styles";
import { useTooltipContext } from "../contexts/TooltipContext";
import { useConceptPanel } from "../contexts/ConceptPanelContext";
import { CATEGORY_PALETTE as PALETTE } from "../constants/palette";

// Dark red used for the parliament outline.
const OUTLINE = "#7f1d1d";

type Seat = {
  group: PolicyGroup;
  categoryId: string;
  categoryName: string;
  color: string;
  x: number;
  y: number;
  size: number;
};

type Section = { name: string; color: string; startFrac: number; endFrac: number };

type Model = {
  seats: Seat[];
  sections: Section[];
  cx: number;
  cy: number;
  maxR: number;
  ry: number;
  conic: string;
};

const NROWS = 3;
// vertical squash: < 1 makes the hemicycle an ellipse (flatter than a semicircle)
const ELLIPSE = 0.9;
// seat rows sit as concentric arcs, spread to fill most of the ellipse
const INNER_FRAC = 0.44; // innermost row radius, as a fraction of maxR
const ROW_GAP = 0.22;    // radial spacing between rows, as a fraction of maxR
// blank wedge left between adjacent category benches, as a fraction of the full arc
const BENCH_GAP = 0.035;
// inner "well": a blank ellipse kept white in the centre so the wedge colours don't
// converge into a messy point. Fraction of maxR (kept inside the innermost seat row).
const WELL_FRAC = 0.28;

function hexToRgba(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Distributes `n` seats across rows, weighting outer (longer) rows more, summing exactly to n. */
function seatsPerRow(n: number, weights: number[]): number[] {
  const total = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w) => (n * w) / total);
  const counts = raw.map(Math.floor);
  let remainder = n - counts.reduce((a, b) => a + b, 0);
  raw.map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac)
    .forEach(({ i }) => { if (remainder-- > 0) counts[i]++; });
  return counts;
}

function buildModel(categories: PolicyCategory[], w: number, h: number): Model {
  const n = categories.reduce((sum, c) => sum + c.groups.length, 0);
  const empty: Model = { seats: [], sections: [], cx: 0, cy: 0, maxR: 0, ry: 0, conic: "" };
  if (!w || !h || n === 0) return empty;

  const margin = 48;
  // smaller ellipse, vertically centred in the available space
  const maxR = 0.55 * Math.min((w - 2 * margin) / 2, (h - 2 * margin) / ELLIPSE);
  const ry = maxR * ELLIPSE; // vertical radius
  const cx = w / 2;
  const cy = h / 2 + ry / 2; // base line sits just below centre

  const radii = Array.from({ length: NROWS }, (_, r) => maxR * (INNER_FRAC + r * ROW_GAP));

  // Each category is its own "bench": a wedge of the arc, separated from its neighbours by a
  // blank gap. A bench's angular width is ∝ its policy count, so bigger categories are wider.
  // `f` runs 0 → 1 across the whole arc (f=0 is the left edge, angle π).
  const gaps = Math.max(0, categories.length - 1) * BENCH_GAP;
  const usable = 1 - gaps; // arc fraction available to benches once gaps are removed

  const seats: Seat[] = [];
  const sections: Section[] = [];
  let cursor = 0;
  categories.forEach((cat, ci) => {
    const cnt = cat.groups.length;
    const width = usable * (cnt / n);
    const startF = cursor;
    const endF = cursor + width;
    const color = PALETTE[ci % PALETTE.length];
    sections.push({ name: cat.name, color, startFrac: startF, endFrac: endF });

    // spread this bench's balls across its own rows (each row ∝ radius, evenly spaced within
    // the bench so the gap to the neighbouring ball is uniform).
    const rowCounts = seatsPerRow(cnt, radii);
    const localSlots = radii.flatMap((R, r) =>
      Array.from({ length: rowCounts[r] }, (_, i) => {
        const f = startF + ((i + 0.5) / rowCounts[r]) * width;
        return { R, f, angle: Math.PI * (1 - f) };
      })
    );
    localSlots.sort((a, b) => a.f - b.f); // left → right within the bench

    localSlots.forEach((slot, i) => {
      const group = cat.groups[i];
      seats.push({
        group,
        categoryId: cat.id,
        categoryName: cat.name,
        color,
        x: cx + slot.R * Math.cos(slot.angle),
        y: cy - slot.R * ELLIPSE * Math.sin(slot.angle), // y squashed → seats on ellipse arcs
        size: 0,
      });
    });

    cursor = endF + BENCH_GAP;
  });

  // 4) one uniform ball size: as large as possible without overlapping the nearest neighbour
  let minDist = Infinity;
  for (let i = 0; i < seats.length; i++)
    for (let j = i + 1; j < seats.length; j++)
      minDist = Math.min(minDist, Math.hypot(seats[i].x - seats[j].x, seats[i].y - seats[j].y));
  const size = Math.max(10, Math.min(44, (isFinite(minDist) ? minDist : 30) * 0.9));
  seats.forEach((seat) => { seat.size = size; });

  // conic-gradient fill, spanning the top semicircle (from -90deg = left, clockwise to +90deg
  // = right). Each bench is a flat-coloured wedge; the little gap cone between two benches is
  // left un-stopped, so the gradient interpolates from one bench's colour into the next.
  const stops = sections
    .map((s) => `${hexToRgba(s.color, 0.3)} ${180 * s.startFrac}deg ${180 * s.endFrac}deg`)
    .join(", ");
  const conic = `conic-gradient(from -90deg, ${stops}, transparent 180deg 360deg)`;

  return { seats, sections, cx, cy, maxR, ry, conic };
}

export default function Parliament({ categories }: { categories: PolicyCategory[] }) {
  const s = useStyles(makeStyles);
  const { colors } = useTheme();
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const fillRef = useRef<any>(null);
  const svgRef = useRef<any>(null);

  const model = useMemo(() => buildModel(categories, dims.w, dims.h), [categories, dims]);

  // A ball behaves like a concept reference: hovering it opens a policy tooltip in the shared
  // tooltip chain (depth 1). Its own description can reference deeper concepts (depth 2+).
  const { tooltips, openTooltip, onLeaveTooltip } = useTooltipContext();
  const { openConcept } = useConceptPanel();
  const activeId = tooltips.find((t) => t.depth === 1)?.conceptId ?? null;

  // Apply the conic-gradient fill and draw the outlines as an SVG overlay via the DOM node.
  // SVG gives a perfectly uniform stroke width (a CSS ellipse border does not), and
  // react-native-web filters unknown style keys so we set these directly on the node.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (fillRef.current) (fillRef.current as HTMLElement).style.backgroundImage = model.conic;
    if (svgRef.current) {
      const { cx, cy, maxR, ry } = model;
      const innerR = maxR * WELL_FRAC;
      const innerRy = innerR * ELLIPSE;
      (svgRef.current as HTMLElement).innerHTML =
        maxR > 0
          ? `<svg width="100%" height="100%" style="position:absolute;top:0;left:0;overflow:visible">
              <path d="M ${cx - innerR} ${cy} A ${innerR} ${innerRy} 0 0 1 ${cx + innerR} ${cy} Z" fill="${colors.bg}" />
              <path d="M ${cx - maxR} ${cy} A ${maxR} ${ry} 0 0 1 ${cx + maxR} ${cy}" fill="none" stroke="${OUTLINE}" stroke-width="2" />
              <path d="M ${cx - innerR} ${cy} A ${innerR} ${innerRy} 0 0 1 ${cx + innerR} ${cy}" fill="none" stroke="${OUTLINE}" stroke-width="2" />
              <line x1="${cx - maxR}" y1="${cy}" x2="${cx - innerR}" y2="${cy}" stroke="${OUTLINE}" stroke-width="2" />
              <line x1="${cx + innerR}" y1="${cy}" x2="${cx + maxR}" y2="${cy}" stroke="${OUTLINE}" stroke-width="2" />
            </svg>`
          : "";
    }
  }, [model, colors.bg]);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setDims({ w: width, h: height });
  };

  const { cx, cy, maxR, ry } = model;

  return (
    <View style={s.container} onLayout={onLayout}>
      {maxR > 0 && (
        <View style={s.backdrop} pointerEvents="none">
          {/* top half of the ellipse only — wrapper clips away the bottom half */}
          <View style={[s.clip, { left: cx - maxR, top: cy - ry, width: maxR * 2, height: ry }]}>
            {/* section fills: a circle with the conic gradient, squashed into an ellipse */}
            <View
              ref={fillRef}
              style={[
                s.circle,
                { left: 0, top: ry - maxR, width: maxR * 2, height: maxR * 2, borderRadius: maxR, transform: [{ scaleY: ELLIPSE }] },
              ]}
            />
          </View>
          {/* outlines (outer arc, inner well arc, split baseline) drawn as one SVG overlay
              for a uniform stroke width — see the useEffect that sets innerHTML */}
          <View ref={svgRef} style={s.backdrop} pointerEvents="none" />
        </View>
      )}

      {/* legend */}
      <View style={s.legend}>
        {categories.map((cat, ci) => (
          <View key={cat.id} style={s.legendRow}>
            <View style={[s.legendDot, { backgroundColor: PALETTE[ci % PALETTE.length] }]} />
            <Text style={s.legendText}>{cat.name}</Text>
          </View>
        ))}
      </View>

      {/* seats — each ball is a concept reference: hover opens its policy tooltip */}
      {model.seats.map((seat) => {
        const active = seat.group.id === activeId;
        return (
          <View
            key={seat.group.id}
            style={[
              s.seat,
              {
                left: seat.x - seat.size / 2,
                top: seat.y - seat.size / 2,
                width: seat.size,
                height: seat.size,
                backgroundColor: seat.color,
                transform: [{ scale: active ? 1.7 : 1 }],
                zIndex: active ? 10 : 1,
                cursor: "pointer",
              } as any,
            ]}
            onTouchEnd={() => openConcept(seat.group.id)}
            {...({
              onMouseEnter: (e: any) =>
                openTooltip(seat.group.id, e.nativeEvent.clientX, e.nativeEvent.clientY, 1),
              onMouseLeave: () => onLeaveTooltip(1),
              onClick: () => openConcept(seat.group.id),
            } as any)}
          >
            <Text style={[s.seatIcon, { fontSize: seat.size * 0.5 }]}>{seat.group.icon}</Text>
          </View>
        );
      })}
    </View>
  );
}
