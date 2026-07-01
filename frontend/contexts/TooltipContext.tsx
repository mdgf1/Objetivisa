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
  closeFrom: (depth: number) => void;
  onEnterTooltip: (depth: number) => void;
  onLeaveTooltip: (depth: number) => void;
};

const TooltipContext = createContext<TooltipContextType>({
  tooltips: [],
  openTooltip: () => {},
  closeFrom: () => {},
  onEnterTooltip: () => {},
  onLeaveTooltip: () => {},
});

export function TooltipProvider({ children }: { children: ReactNode }) {
  const [tooltips, setTooltips] = useState<TooltipEntry[]>([]);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const cancelTimer = (depth: number) => {
    if (timers.current[depth]) {
      clearTimeout(timers.current[depth]);
      delete timers.current[depth];
    }
  };

  const openTooltip = (conceptId: string, x: number, y: number, depth: number) => {
    cancelTimer(depth);
    setTooltips((prev) => [
      ...prev.filter((t) => t.depth < depth),
      { conceptId, x, y, depth },
    ]);
  };

  const closeFrom = (depth: number) => {
    setTooltips((prev) => prev.filter((t) => t.depth < depth));
  };

  // Called when mouse enters a tooltip element
  const onEnterTooltip = (depth: number) => {
    cancelTimer(depth);
    // collapse any deeper tooltips (moving back up the chain)
    setTooltips((prev) => prev.filter((t) => t.depth <= depth));
  };

  // Called when mouse leaves a tooltip element OR a concept link
  const onLeaveTooltip = (depth: number) => {
    cancelTimer(depth);
    timers.current[depth] = setTimeout(() => {
      closeFrom(depth);
    }, 180);
  };

  return (
    <TooltipContext.Provider value={{ tooltips, openTooltip, closeFrom, onEnterTooltip, onLeaveTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
}

export const useTooltipContext = () => useContext(TooltipContext);
