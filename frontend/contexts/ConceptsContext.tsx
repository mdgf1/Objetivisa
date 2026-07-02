import { createContext, useContext, useCallback, useEffect, useState, ReactNode } from "react";
import { Concept, ConceptMap } from "../data_types/concepts";
import { PolicyCategory } from "../data_types/policies";
import { api } from "../services/api";
import { categoryColor } from "../constants/palette";
import { useLanguage } from "./LanguageContext";

type ConceptsState = {
  concepts: ConceptMap;
  getConcept: (id: string) => Concept | undefined;
  refresh: () => void;
};

const ConceptsContext = createContext<ConceptsState>({
  concepts: {},
  getConcept: () => undefined,
  refresh: () => {},
});

// A policy group is a concept with extra data on top: its description is the classification
// reason, and it carries icon / category / current option for a richer tooltip.
function policyConcepts(categories: PolicyCategory[]): Concept[] {
  return categories.flatMap((cat, ci) =>
    cat.groups.map((g) => {
      const current = g.options.find((o) => o.id === g.currentOptionId);
      return {
        id: g.id,
        name: g.name,
        description: g.classificationReason ?? "",
        kind: "policy" as const,
        icon: g.icon,
        categoryName: cat.name,
        categoryColor: categoryColor(ci),
        currentOptionName: current?.name,
        currentOptionDescription: current?.description,
      };
    })
  );
}

export function ConceptsProvider({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const [concepts, setConcepts] = useState<ConceptMap>({});

  // Concepts and policy groups are merged into one lookup so both are referenceable via
  // [[id]] and render through the same tooltip chain.
  const load = useCallback(() => {
    let active = true;
    Promise.all([api.concepts(lang), api.categories(lang)])
      .then(([rawConcepts, categories]) => {
        if (!active) return;
        const map: ConceptMap = {};
        for (const c of rawConcepts) map[c.id] = { ...c, kind: "concept" };
        // policy groups take precedence if an id collides (they carry the richer data)
        for (const p of policyConcepts(categories)) map[p.id] = p;
        setConcepts(map);
      })
      .catch(() => {
        // concepts are non-critical; leave the map empty so links render as plain text
        if (active) setConcepts({});
      });
    return () => {
      active = false;
    };
  }, [lang]);

  useEffect(() => load(), [load]);

  return (
    <ConceptsContext.Provider value={{ concepts, getConcept: (id) => concepts[id], refresh: load }}>
      {children}
    </ConceptsContext.Provider>
  );
}

export const useConcepts = () => useContext(ConceptsContext);
