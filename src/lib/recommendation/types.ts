export type Evidence = {
  source: "qloo" | "user";
  label: string;
  description?: string;
};

export type Candidate = {
  id: string;
  name: string;
  evidence: Evidence[];
};

export type RankedCandidate = Candidate & {
  fitScore: number;
  confidence: number;
  strengths: string[];
  tradeoffs: string[];
};