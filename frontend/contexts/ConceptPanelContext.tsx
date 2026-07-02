import { createContext, useContext, useState, ReactNode } from "react";

type ConceptPanelState = {
  openId: string | null;
  openConcept: (id: string) => void;
  closeConcept: () => void;
};

const ConceptPanelContext = createContext<ConceptPanelState>({
  openId: null,
  openConcept: () => {},
  closeConcept: () => {},
});

/** Holds which concept's in-depth card is currently shown in the left side panel. */
export function ConceptPanelProvider({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <ConceptPanelContext.Provider
      value={{ openId, openConcept: setOpenId, closeConcept: () => setOpenId(null) }}
    >
      {children}
    </ConceptPanelContext.Provider>
  );
}

export const useConceptPanel = () => useContext(ConceptPanelContext);
