export type Stance = "strongly_support" | "support" | "neutral" | "oppose" | "strongly_oppose";

export type AgendaPriority = { categoryId: string; priority: number };

export type Party = { id: string; name: string; color: string; agendaPriorities: AgendaPriority[] };

export type PartyStance = { partyId: string; stance: Stance };

export type PolicyOption = {
  id: string;
  name: string;
  description: string;
  iconUrl: string | null;
  stances: PartyStance[];
};

export type PolicyGroup = {
  id: string;
  name: string;
  icon: string;
  currentOptionId: string;
  classificationReason: string;
  options: PolicyOption[];
};

export type PolicyCategory = {
  id: string;
  name: string;
  groups: PolicyGroup[];
};
