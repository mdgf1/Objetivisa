// Rich party detail shown inside the SidePanel card (Positions / People / History tabs).
// Mirrors the backend `PartyDetail` model served from GET /api/parties/{id}/detail.

export type PartyPosition = {
  topic: string;
  summary: string;
};

export type PartyPerson = {
  name: string;
  role: string;
  imageUrl: string | null;
};

export type PartyHistoryEvent = {
  year: number;
  title: string;
  description: string;
};

export type PartyDetail = {
  id: string;
  positions: PartyPosition[];
  people: PartyPerson[];
  history: PartyHistoryEvent[];
};
