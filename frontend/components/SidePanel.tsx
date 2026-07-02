import { useEffect, useRef, useState } from "react";
import { Animated, useWindowDimensions, ViewStyle, StyleProp } from "react-native";
import { useStyles } from "../hooks/useStyles";
import makeStyles from "../styles/SidePanel.styles";

type Props = {
  /** Content rendered inside the card. */
  children: React.ReactNode;
  /** Width fraction while the panel holds attention (hovered / focused). Default 0.7. */
  expandedRatio?: number;
  /** Width fraction while the user is interacting outside the panel. Default 0.5. */
  collapsedRatio?: number;
  /** Whether the panel is shown. Toggling this plays the slide in / out animation. */
  visible?: boolean;
  /**
   * When provided, the panel runs in "dismiss mode": it expands/collapses as the cursor
   * hovers in and out of it, and a click outside closes it via this callback. Without it,
   * the legacy click-to-focus collapse behaviour is used.
   */
  onDismiss?: () => void;
  /** While locked, the panel ignores outside clicks / hover (e.g. an editor modal is open). */
  locked?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * A left-anchored card. It slides in from the left when shown and out (quickly) when hidden.
 * In dismiss mode it grows to `expandedRatio` while hovered and shrinks to `collapsedRatio`
 * while the cursor is elsewhere; a click outside closes it.
 */
export default function SidePanel({
  children,
  expandedRatio = 0.7,
  collapsedRatio = 0.5,
  visible = true,
  onDismiss,
  locked = false,
  style,
}: Props) {
  const s = useStyles(makeStyles);
  const { width } = useWindowDimensions();
  const dismissMode = !!onDismiss;

  const [active, setActive] = useState(true); // hovered (dismiss) / focused (legacy)
  const [mounted, setMounted] = useState(visible); // stay in the DOM through the exit anim
  const activeRef = useRef(active);
  activeRef.current = active;
  const panelRef = useRef<any>(null);

  const targetWidth = width * (active ? expandedRatio : collapsedRatio);
  const animWidth = useRef(new Animated.Value(targetWidth)).current;
  const slideX = useRef(new Animated.Value(visible ? 0 : -width)).current;

  // resize animation whenever the target width (hover/focus or window) changes
  useEffect(() => {
    Animated.timing(animWidth, { toValue: targetWidth, duration: 200, useNativeDriver: false }).start();
  }, [targetWidth, animWidth]);

  // slide in when shown; slide out to the left (quickly) then unmount when hidden
  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.timing(slideX, { toValue: 0, duration: 240, useNativeDriver: false }).start();
    } else {
      Animated.timing(slideX, { toValue: -(width + 40), duration: 160, useNativeDriver: false })
        .start(({ finished }) => { if (finished) setMounted(false); });
    }
  }, [visible, width, slideX]);

  // web only: hover resizes (dismiss mode); click outside closes (dismiss) or collapses (legacy)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onMove = (e: MouseEvent) => {
      if (!dismissMode || locked) return; // frozen size while locked
      const node = panelRef.current as HTMLElement | null;
      if (!node) return;
      const inside = node.contains(e.target as Node);
      if (inside !== activeRef.current) setActive(inside);
    };
    const onDown = (e: MouseEvent) => {
      if (locked) return; // an editor menu/modal is open — don't dismiss/collapse
      if (e.button === 2) return; // ignore right-clicks (context menu)
      const node = panelRef.current as HTMLElement | null;
      if (!node) return;
      const inside = node.contains(e.target as Node);
      if (dismissMode) {
        if (!inside) onDismiss!();
      } else {
        setActive(inside);
      }
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [dismissMode, onDismiss, locked]);

  if (!mounted) return null;

  return (
    <Animated.View
      ref={panelRef}
      style={[s.panel, { width: animWidth, transform: [{ translateX: slideX }] }, style]}
    >
      <Animated.View style={s.content}>{children}</Animated.View>
    </Animated.View>
  );
}
