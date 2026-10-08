# MoveFit — Recommendation Engine Principles

**Status:** Design principles before implementation  
**Version:** 0.1  
**Last updated:** 2026-10-08

---

# 1. Purpose

The recommendation engine is responsible for converting:

```text
User preferences
+
Practical constraints
+
Qloo-derived evidence
````

into:

```text
Ranked neighborhood candidates
+
Reasons
+
Trade-offs
+
Confidence
```

The engine is the part of MoveFit that makes the product a decision tool rather than a generic AI interface.

---

# 2. Fundamental Responsibility

The engine must answer:

> **"Given this person's priorities and the evidence available for each candidate, which candidate is the best fit, and why?"**

It must not answer:

> "Which neighborhood is objectively best?"

There is no universal best neighborhood.

---

# 3. Responsibility Split

```text
Gemini
→ Understand language

Qloo
→ Provide intelligence / relationships / local evidence

MoveFit
→ Decide
```

The final ranking belongs to MoveFit.

---

# 4. Decision Pipeline

The conceptual pipeline is:

```text
Raw user input
      ↓
Structured user profile
      ↓
Candidate generation
      ↓
Evidence normalization
      ↓
Hard constraint filtering
      ↓
Preference evaluation
      ↓
Priority weighting
      ↓
Ranking
      ↓
Trade-off analysis
      ↓
Confidence
      ↓
Explanation
```

---

# 5. Hard Constraints First

Hard constraints are evaluated before preference ranking.

Example:

```text
Maximum acceptable commute = 45 minutes
```

If reliable data confirms:

```text
Candidate A = 75 minutes
```

Candidate A should not receive a normal lifestyle score and remain competitive as though the constraint did not exist.

The system should either:

* eliminate the candidate; or
* clearly mark it as constraint-violating if the product needs to show it for transparency.

---

# 6. Soft Preferences

Soft preferences influence ranking.

Example:

```text
User values:
- cafés
- bookstores
- architecture
- walkability
```

A candidate with stronger evidence for these preferences should generally rank higher.

However, a candidate should not receive an extreme score merely because one category is strong.

The system should evaluate the complete profile.

---

# 7. Explicit vs Inferred Preferences

Every preference should have a provenance.

Conceptually:

```ts
type PreferenceSignal = {
  concept: string;
  importance: "low" | "medium" | "high";
  source: "explicit" | "inferred";
};
```

Explicit:

```text
"I love bookstores."
```

Inferred:

```text
"I like spending quiet afternoons reading."
```

The distinction matters because inferred preferences should be treated more cautiously.

---

# 8. Evidence Model

The decision engine must operate on evidence, not prose.

Conceptually:

```text
Candidate
   ↓
Evidence[]
   ↓
Preference evaluation
```

Evidence should identify:

* source;
* candidate;
* relevant concept/entity;
* relationship;
* strength where available;
* metadata required for interpretation.

The engine should not parse arbitrary AI-generated paragraphs to determine whether a neighborhood matches the user.

---

# 9. Evidence Coverage

A candidate may appear weak simply because evidence is missing.

Therefore:

```text
No evidence
≠
Negative evidence
```

This distinction is critical.

Example:

If Qloo provides no evidence regarding bookstores for Candidate A, MoveFit must not conclude:

```text
Candidate A has few bookstores.
```

It can only conclude:

```text
Bookstore fit could not be established from available evidence.
```

---

# 10. Confidence

Confidence should reflect evidence quality.

Conceptually:

```text
confidence =
    evidence completeness
    +
    evidence quality
    +
    locality certainty
    +
    constraint certainty
```

The exact formula must be validated through implementation and testing.

Confidence must never simply represent model certainty.

---

# 11. Ranking Dimensions

The initial conceptual dimensions are:

```text
Lifestyle fit
Practical fit
Constraint compliance
Evidence confidence
```

Potential dimensions such as:

* budget;
* commute;
* walkability;

should only be included if reliable data exists.

Do not create a scoring dimension merely because it sounds useful.

---

# 12. Priority Weighting

The user should be able to indicate relative importance.

Conceptually:

```text
Lifestyle      70%
Commute        30%
```

The ranking engine uses those priorities to compare candidates.

The exact formula must remain open until:

1. Qloo evidence semantics are understood;
2. available practical data is known;
3. the candidate model is implemented;
4. real test cases reveal weaknesses.

---

# 13. No Arbitrary Weights

Do not begin with:

```text
Lifestyle = 40%
Budget = 30%
Commute = 20%
Walkability = 10%
```

unless those values have a documented product reason.

Default weights should be:

* simple;
* understandable;
* configurable;
* deterministic.

If defaults are used, they must be treated as product defaults rather than objective truths.

---

# 14. MoveFit Fit Score

If the product uses a numerical score, it must be explicitly labeled:

> **MoveFit Fit Score**

It is not:

* a Qloo score;
* an objective neighborhood score;
* a safety score;
* a quality-of-life score;
* a market score.

The score represents:

> **How well the candidate matches this user's current priorities according to the available evidence.**

---

# 15. Score Transparency

Users do not necessarily need to see the entire mathematical formula.

They do need to understand:

* which dimensions matter;
* where the candidate is strong;
* where it is weak;
* what trade-off exists;
* why changing priorities changes the ranking.

Example:

```text
Lifestyle       Strong
Commute         Moderate
Budget          Strong
Evidence        High
```

This is preferable to displaying:

```text
87.392
```

without explanation.

---

# 16. Candidate Ranking

The ranking should produce:

```text
1. Best fit
2. Strong alternative
3. Alternative with a different trade-off
```

The number of displayed candidates should remain small enough for comparison.

Do not overwhelm the user with dozens of neighborhoods.

---

# 17. Alternatives Must Be Meaningful

An alternative should not simply be:

> "The second-highest score."

It should ideally represent a useful decision alternative.

For example:

```text
Neighborhood A
Best lifestyle match

Neighborhood B
Better commute

Neighborhood C
Better budget fit
```

This helps the user understand the decision space.

---

# 18. Trade-offs

Every candidate can have strengths and weaknesses.

MoveFit should identify:

```text
Strongest advantage
Main compromise
```

Example:

```text
Strongest advantage:
Excellent fit for your café, bookstore and
walkability preferences.

Main compromise:
Your commute would likely be less convenient.
```

Only make claims that are supported by available data.

---

# 19. What If? Calculation

What If? changes priorities while keeping the candidate evidence constant whenever possible.

Example:

Initial:

```text
Lifestyle = 70
Commute = 30
```

Modified:

```text
Lifestyle = 40
Commute = 60
```

The engine recalculates:

```text
same candidates
+
same evidence
+
new priorities
=
new ranking
```

This makes the interaction understandable and reproducible.

---

# 20. What If? Explanation

When the ranking changes, MoveFit should explain:

1. which priority changed;
2. which candidate benefited;
3. which candidate lost relative position;
4. why.

Example:

```text
The ranking changed because commute now carries
more weight than lifestyle.

Neighborhood B moved above Neighborhood A because
its practical fit is stronger.
```

---

# 21. Determinism

Given:

```text
same profile
+
same evidence
+
same configuration
```

the ranking must remain the same.

Do not ask Gemini to "choose the best neighborhood" on every request.

That would introduce unnecessary nondeterminism.

---

# 22. Recommendation Explanation

The explanation layer should receive structured decision data.

Conceptually:

```text
Decision engine
      ↓
{
  winner,
  strengths,
  weaknesses,
  evidence,
  tradeoffs,
  confidence
}
      ↓
Gemini
      ↓
human-readable explanation
```

Gemini should not be given responsibility for recomputing the ranking.

---

# 23. No Hallucinated Evidence

The explanation system must not add facts that do not exist in the evidence.

If evidence says:

```text
Relevant café entities were found.
```

the explanation may say:

```text
Your preference for cafés is supported by
the available local evidence.
```

It must not invent:

```text
The neighborhood has 47 independent cafés.
```

unless such a fact actually exists in validated data.

---

# 24. Missing Data

When data is missing:

```text
missing
```

must remain distinct from:

```text
poor fit
```

This is one of the most important reliability rules in the engine.

---

# 25. Contradictory Preferences

Users may provide conflicting preferences.

Example:

```text
I want a quiet neighborhood.
I also want lots of nightlife.
```

The system should not silently choose one.

Gemini should identify the tension.

MoveFit should represent both preferences and their priorities.

If necessary, the UI can state:

```text
These preferences pull in different directions.
Your priority settings will determine the trade-off.
```

---

# 26. Unsupported Constraints

If the user requests something that MoveFit cannot reliably evaluate:

```text
"I need exactly 18 minutes from my apartment."
```

but the available data cannot support that precision, the engine must not pretend it can.

It should either:

* ask for a broader constraint;
* use a supported approximation;
* exclude that criterion.

---

# 27. Scoring Formula Development

The final scoring formula should be developed in stages.

### Stage 1

Define conceptual dimensions.

### Stage 2

Collect real Qloo responses.

### Stage 3

Create representative user profiles.

### Stage 4

Manually evaluate expected outcomes.

### Stage 5

Implement a simple deterministic formula.

### Stage 6

Test edge cases.

### Stage 7

Adjust only where a real product weakness is demonstrated.

Do not optimize the formula for arbitrary numerical elegance.

---

# 28. Test Profiles

At minimum, test profiles should include:

## Profile A — Quiet cultural

```text
Likes:
bookstores
cafés
architecture
walking

Avoids:
nightlife
very busy areas
```

## Profile B — Social

```text
Likes:
restaurants
events
social activity
nightlife

Avoids:
very quiet environments
```

## Profile C — Practical

```text
High priority:
commute
budget

Moderate:
lifestyle
```

## Profile D — Mixed priorities

```text
Lifestyle = 50
Commute = 50
```

These profiles should expose whether ranking behavior makes intuitive sense.

---

# 29. Edge Cases

Test:

* no preferences;
* only one preference;
* many preferences;
* contradictory preferences;
* all high priorities;
* no hard constraints;
* very restrictive hard constraints;
* no candidates;
* one candidate;
* candidates with incomplete evidence;
* equal candidate scores;
* identical priority values;
* invalid priority configuration;
* Qloo unavailable.

---

# 30. Ranking Stability

Small changes to priorities should not create absurd ranking jumps unless the candidates are genuinely close.

Example:

```text
Lifestyle 70 → 69
```

should not normally produce:

```text
Candidate A → #1
Candidate C → #8
```

unless the underlying scores are extremely close.

This should be tested.

---

# 31. Tie Handling

If two candidates are effectively equivalent under the available evidence, the engine should not invent precision.

Possible output:

```text
Very close match
```

rather than:

```text
A = 82.314
B = 82.313
```

---

# 32. Ranking Output

Conceptual output:

```ts
type RankedCandidate = {
  candidateId: string;
  rank: number;
  fitLevel: "strong" | "good" | "mixed" | "weak";
  dimensions: Record<string, unknown>;
  strengths: string[];
  tradeoffs: string[];
  confidence: "high" | "medium" | "low";
};
```

This is conceptual.

The final type must be designed from actual implementation requirements.

---

# 33. Engine Invariants

The following must always remain true:

```text
Hard constraints are evaluated before normal ranking.

Missing evidence is not negative evidence.

Gemini does not choose the winner.

Qloo does not choose the winner.

MoveFit owns the final ranking.

Scores are reproducible.

What If? uses deterministic recalculation.

No factual explanation is generated without evidence.

No false precision.
```

---

# 34. Definition of Done

The recommendation engine is ready when:

* candidate data is normalized;
* hard constraints work;
* soft preferences work;
* priorities affect ranking;
* rankings are deterministic;
* evidence is traceable;
* missing evidence is handled correctly;
* trade-offs are generated;
* What If? recalculates correctly;
* explanations cannot introduce unsupported facts;
* representative profiles pass manual evaluation.

---

# 35. Core Principle

> **The recommendation engine should make the decision understandable, not make the decision look artificially precise.**

```
```
