// A glossary concept fetched from the backend (/api/concepts?lang=).
// Descriptions may reference other concepts via [[id]] or [[id|display text]] markup.
//
// A policy group *is* a concept (id/name/description) with extra policy-specific data on
// top, so it renders as a richer tooltip and can be referenced with [[group_id]] like any
// other concept. `kind` distinguishes the two at render time.
export type Concept = {
  id: string;
  name: string;
  description: string;
  kind: "concept" | "policy";
  // in-depth "card" body shown in the side panel (authored via the card editor)
  card?: string | null;
  // policy extras — present only when kind === "policy"
  icon?: string;
  categoryName?: string;
  categoryColor?: string;
  currentOptionName?: string;
  currentOptionDescription?: string;
};

export type ConceptMap = Record<string, Concept>;
