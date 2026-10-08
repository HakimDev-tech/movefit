export type PriorityLevel = "low" | "medium" | "high";

export type MoveFitRequest = {
  city: string;
  lifestyle: string;
  avoid?: string;
  constraints?: {
    commute?: string;
    budget?: string;
    priorities?: string[];
  };
};

export type PreferenceSignal = {
  concept: string;
  importance: PriorityLevel;
  source: "user" | "inferred";
};

export type UserProfile = {
  city: string;
  interests: PreferenceSignal[];
  avoid: PreferenceSignal[];
  constraints: Record<string, unknown>;
};