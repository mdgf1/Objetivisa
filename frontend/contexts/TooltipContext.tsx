import { createContext, useContext, useState, useRef, ReactNode } from "react";

export type TooltipEntry = {
  conceptId: string;
  x: number;
  y: number;
  depth: number;
};

type TooltipContextType = {
  tooltips: TooltipEntry[];
  openTooltip: (conceptId: string, x: number, y: number, depth: number) => void;
  onEnterTooltip: (depth: number) => void;
  onLeaveTooltip: (depth: number) => void;
  keepAlive: () => void;
  closeAll: () => void;
  /** While frozen, the chain never auto-closes (e.g. while an editor menu/modal is open). */
  freeze: (value: boolean) => void;
};

const TooltipContext = createContext<TooltipContextType>({
  tooltips: [],
  openTooltip: () => {},
  onEnterTooltip: () => {},
  onLeaveTooltip: () => {},
  keepAlive: () => {},
  closeAll: () => {},
  freeze: () => {},
});

// grace period before a chain of tooltips closes, giving the cursor time to travel from
// a concept link to the tooltip it opened (or from one tooltip to the next). Kept short so
// dismissing a tooltip feels snappy, but long enough to bridge the gap to the next one.
const HIDE_DELAY = 90;

export function TooltipProvider({ children }: { children: ReactNode }) {
  const [tooltips, setTooltips] = useState<TooltipEntry[]>([]);
  // a single shared timer: the whole chain closes together unless the cursor lands on
  // another tooltip/link in time. Going back up the chain collapses deeper tooltips.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // while frozen (an editor menu/modal is open), the chain is held open
  const frozen = useRef(false);

  const cancelTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const freeze = (value: boolean) => {
    frozen.current = value;
    if (value) cancelTimer();
  };

  // Open a tooltip at `depth`, keeping every shallower (ancestor) tooltip in place.
  const openTooltip = (conceptId: string, x: number, y: number, depth: number) => {
    cancelTimer();
    setTooltips((prev) => [...prev.filter((t) => t.depth < depth), { conceptId, x, y, depth }]);
  };

  // Cursor entered a tooltip in the chain: keep it (and its ancestors) alive, and collapse
  // anything deeper — this is the "moving from the top one back to a previous one" case.
  const onEnterTooltip = (depth: number) => {
    cancelTimer();
    setTooltips((prev) => prev.filter((t) => t.depth <= depth));
  };

  // Cursor left a tooltip or a concept link: schedule the whole chain to close. Any enter /
  // move / open before the timer fires cancels it, so navigating deeper keeps everything.
  const onLeaveTooltip = (_depth: number) => {
    cancelTimer();
    if (frozen.current) return; // held open while an editor menu/modal is up
    timer.current = setTimeout(() => setTooltips([]), HIDE_DELAY);
  };

  // Any movement inside a tooltip keeps the chain alive. Needed because moving off an inner
  // concept link back into the tooltip body fires the link's leave but no tooltip enter.
  const keepAlive = () => cancelTimer();

  const closeAll = () => {
    cancelTimer();
    setTooltips([]);
  };

  return (
    <TooltipContext.Provider
      value={{ tooltips, openTooltip, onEnterTooltip, onLeaveTooltip, keepAlive, closeAll, freeze }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

export const useTooltipContext = () => useContext(TooltipContext);
