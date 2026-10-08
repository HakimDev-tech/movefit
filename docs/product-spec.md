````md
# MoveFit — Product Specification

**Status:** Draft for implementation  
**Version:** 0.1  
**Last updated:** 2026-10-08

---

## 1. Product Overview

### Product name

**MoveFit**

### Tagline

**Find where you fit.**

### Core question

> **Which neighborhood fits me?**

### Product category

Personalized neighborhood decision tool.

### One-sentence description

MoveFit helps people choose where to live in an unfamiliar city by combining how they live, what they value, their practical constraints, and Qloo's cultural and local intelligence.

---

# 2. Problem

Choosing where to live in a new city is usually treated as a geographic or financial problem.

People commonly compare:

- rent;
- distance to work or university;
- transportation;
- safety;
- amenities;
- general neighborhood reputation.

These factors matter, but they do not fully answer the more personal question:

> **"Would I actually enjoy living here?"**

Two neighborhoods can be similarly priced and similarly connected while feeling completely different.

A person who values:

- independent cafés;
- bookstores;
- cultural venues;
- architecture;
- walkable streets;
- a quieter atmosphere;

may strongly prefer a different neighborhood from someone who values:

- restaurants;
- social activity;
- events;
- nightlife;
- busy streets;
- a more energetic environment.

The problem is therefore not simply:

> "Which neighborhood is objectively best?"

It is:

> **"Which neighborhood best matches the way I live?"**

MoveFit exists to answer that question.

---

# 3. Target User

MoveFit is designed primarily for people who are unfamiliar with the neighborhoods of a city they are considering living in.

### Primary users

- students moving to a new city;
- young professionals relocating for work;
- people moving to a city for university;
- expats and new arrivals;
- remote workers considering a new city;
- people who know a city but do not understand its neighborhood differences.

### Typical user situation

The user knows:

- the city they are moving to;
- approximately how they like to spend their time;
- some things they strongly prefer;
- some things they want to avoid;
- some practical constraints.

But they do not know which neighborhoods best fit that combination.

---

# 4. Core User Job

The user's job is:

> **"Help me understand where I would fit best in this city, based on how I actually want to live."**

MoveFit should reduce uncertainty rather than pretend to produce an objectively perfect answer.

The product therefore needs to communicate:

1. the strongest match;
2. why it matches;
3. what compromises it requires;
4. what other options exist;
5. how the recommendation changes when priorities change.

---

# 5. Product Promise

MoveFit promises to:

> **Turn personal lifestyle preferences and practical priorities into an understandable comparison of neighborhoods.**

MoveFit does **not** promise:

- an objectively perfect neighborhood;
- guaranteed satisfaction;
- perfect knowledge of every neighborhood;
- exact real-world measurements when reliable data is unavailable;
- property availability;
- real-estate recommendations.

The product should prefer honest uncertainty over false precision.

---

# 6. Core Product Flow

The intended primary flow is:

```text
Landing
   ↓
Start
   ↓
City
   ↓
Lifestyle
   ↓
Practical constraints
   ↓
Preference interpretation
   ↓
Qloo intelligence
   ↓
Candidate generation
   ↓
Constraint filtering
   ↓
MoveFit ranking
   ↓
Results
   ↓
Compare
   ↓
What If?
````

The flow should remain compact.

The user should not be forced through unnecessary forms or configuration screens.

---

# 7. Core User Inputs

The exact input structure will be finalized after the Qloo API spike.

The conceptual input model is:

### 7.1 City

The city the user is considering.

Example:

```text
Paris
```

### 7.2 Lifestyle

A natural-language description of what the user enjoys.

Example:

```text
I like quiet streets, independent cafés, bookstores,
architecture and being able to walk around most places.
I don't need nightlife.
```

Natural language is intentional.

The user should not need to understand a predefined taxonomy of interests.

### 7.3 Avoidances

Things the user explicitly does not want.

Example:

```text
Very noisy areas, heavy nightlife and tourist-heavy streets.
```

### 7.4 Practical constraints

Potential constraints include:

* commute preference;
* budget level;
* desired walkability;
* transportation preference;
* other practical requirements supported by reliable data.

The exact constraint set must not be finalized until the available data and Qloo capabilities are validated.

### 7.5 Priorities

The user may care more about some dimensions than others.

Examples:

```text
Lifestyle: high
Commute: medium
Budget: high
```

The product should eventually allow the user to change these priorities in the What If? experience.

---

# 8. Hard Constraints vs Soft Preferences

This distinction is fundamental to MoveFit.

## Hard constraints

A hard constraint represents something the user considers unacceptable or mandatory.

Example:

```text
Commute must be under approximately 45 minutes.
```

If a candidate violates a genuine hard constraint and reliable data confirms the violation, it should not compete normally with candidates that satisfy it.

Hard constraints should be evaluated before soft preference ranking.

## Soft preferences

A soft preference represents something the user would like but can compromise on.

Examples:

* prefers cafés;
* likes bookstores;
* values walkability;
* prefers quieter environments;
* enjoys cultural activity.

Soft preferences influence ranking rather than automatically eliminating a candidate.

---

# 9. What MoveFit Does

MoveFit should:

1. understand the user's stated preferences;
2. distinguish explicit preferences from inferred preferences;
3. resolve the user's city;
4. use Qloo to retrieve relevant cultural/local intelligence;
5. generate plausible neighborhood candidates;
6. apply validated hard constraints;
7. evaluate candidates against the user's soft preferences;
8. rank candidates using transparent MoveFit logic;
9. explain the recommendation using evidence;
10. show meaningful alternatives;
11. communicate trade-offs;
12. allow users to change priorities and observe how recommendations change.

---

# 10. What MoveFit Does Not Do

MoveFit is deliberately **not**:

* a real-estate marketplace;
* a rental listing platform;
* a property search engine;
* a housing price database;
* a social network;
* a travel booking platform;
* a generic city guide;
* a generic AI chatbot;
* a map-first exploration product;
* a lifestyle social feed;
* a property recommendation engine.

The product should never become dependent on property listings or real-estate inventory.

---

# 11. Core Differentiator

The central differentiator is the combination of:

```text
Personal lifestyle
        +
Practical constraints
        +
Cultural/local intelligence
        +
Explicit trade-offs
        ↓
Neighborhood fit
```

The important shift is from:

> "Tell me what exists in this city."

to:

> **"Tell me where I would fit best, and explain the compromises."**

---

# 12. Qloo's Role

Qloo is a core intelligence layer of MoveFit.

Qloo should provide relevant cultural, taste, entity, locality, or recommendation intelligence that MoveFit cannot reasonably derive itself.

Conceptually:

```text
User preferences
        ↓
Preference concepts
        ↓
Qloo intelligence
        ↓
Relevant entities / signals / relationships
        ↓
MoveFit candidate evidence
```

Qloo must be materially important to the recommendation.

A version of MoveFit that produces essentially the same results without Qloo would fail the central product requirement.

The exact Qloo endpoints, entities, locality capabilities, response fields, and evidence model must be validated before implementation.

---

# 13. Gemini's Role

Gemini is responsible for language understanding and interpretation.

Potential responsibilities include:

* extracting structured preferences from natural language;
* identifying explicit interests;
* identifying explicit avoidances;
* resolving ambiguity;
* normalizing natural-language expressions;
* helping orchestrate multi-step reasoning;
* generating concise explanations from validated evidence.

Gemini must **not** independently invent neighborhood facts.

Gemini must **not** decide the final winning neighborhood.

Gemini should operate on validated information whenever factual claims are involved.

---

# 14. MoveFit's Role

MoveFit owns the decision layer.

MoveFit is responsible for:

* hard constraint evaluation;
* evidence normalization;
* candidate comparison;
* scoring;
* ranking;
* trade-off calculation;
* priority changes;
* confidence;
* explanation structure;
* what-if simulations.

This separation is deliberate:

```text
Qloo
= intelligence and relationships

Gemini
= language understanding and interpretation

MoveFit
= decision logic
```

No external model should silently replace the MoveFit decision engine.

---

# 15. Core Differentiator: Trade-off Simulator

The most important interaction beyond the initial recommendation is the **What If?** experience.

A recommendation is not useful enough if the user cannot understand why it changes.

Example:

```text
Current priorities

Lifestyle      70%
Commute        30%
```

MoveFit might recommend Neighborhood A.

The user changes:

```text
Lifestyle      40%
Commute        60%
```

MoveFit recalculates the candidates.

Neighborhood B may now become the strongest match.

The product should explain:

```text
Why the recommendation changed

Neighborhood B gained because commute became
more important than lifestyle fit.

Neighborhood A remains stronger on cultural/lifestyle
fit but loses overall position because the commute
trade-off became more important.
```

This turns MoveFit from a simple recommender into a decision-support tool.

---

# 16. MVP Scope

The MVP must contain the complete decision loop.

## Required

### Input

* city;
* lifestyle description;
* avoidances;
* practical constraints;
* priorities where supported.

### Intelligence

* preference interpretation;
* Qloo integration;
* candidate generation;
* evidence retrieval;
* candidate normalization.

### Decision

* hard constraint filtering;
* soft preference evaluation;
* ranking;
* confidence;
* trade-off identification.

### Output

* best-fit neighborhood;
* alternative neighborhoods;
* concise reasons;
* evidence;
* trade-offs;
* comparison;
* What If? priority adjustment.

### Reliability

* validation;
* empty-result handling;
* Qloo failure handling;
* Gemini failure handling;
* insufficient-data handling;
* no fabricated factual fallback.

---

# 17. MVP User Experience

The primary experience should feel like one continuous decision process rather than a collection of unrelated pages.

Conceptually:

```text
1. Where are you moving?
2. How do you want to live?
3. What matters practically?
4. Analyze
5. Here are your strongest fits
6. Why?
7. What would change the result?
```

The interface should progressively reveal complexity.

Do not expose the scoring model before the user needs it.

---

# 18. Results Page Requirements

The results page should answer five questions immediately:

### 1. What is the strongest match?

One clearly identified recommendation.

### 2. Why?

A small number of strong, evidence-backed reasons.

### 3. What is the trade-off?

The user should know what they give up.

### 4. What are the alternatives?

At least meaningful alternatives when sufficient candidates exist.

### 5. What changes the recommendation?

This leads naturally to the What If? interaction.

---

# 19. Evidence Requirements

Every factual recommendation should have a traceable source in the underlying data.

MoveFit must distinguish:

### User-provided information

Example:

```text
The user said they enjoy bookstores.
```

### Qloo-derived evidence

Example:

```text
Qloo returned relationships between the relevant
taste concepts and entities in the candidate locality.
```

### MoveFit-derived interpretation

Example:

```text
MoveFit considers this candidate stronger because
multiple user priorities are supported by available evidence.
```

These should not be presented as if they were the same type of information.

---

# 20. Confidence

Confidence must reflect evidence quality.

Confidence should decrease when:

* candidate evidence is incomplete;
* Qloo returns weak or sparse signals;
* locality resolution is uncertain;
* practical constraints cannot be verified;
* candidate mapping is indirect;
* important preferences have insufficient supporting data.

MoveFit must never create confidence simply because a model generated a fluent explanation.

---

# 21. No False Precision

MoveFit must avoid arbitrary numbers presented as objective truth.

Bad:

```text
Neighborhood A: 87.43% perfect match
```

Better:

```text
Strong fit
```

with supporting dimensions such as:

```text
Lifestyle      Strong
Commute        Moderate
Budget         Strong
Overall        Strong
```

If a numerical Fit Score is eventually used, it must be:

* clearly branded as a MoveFit score;
* based on a documented formula;
* reproducible;
* sensitive to the user's priorities;
* accompanied by understandable evidence;
* never presented as an objective neighborhood quality score.

---

# 22. What If? Requirements

The What If? system must:

1. use the same underlying candidate set where possible;
2. modify only the selected priorities;
3. recalculate deterministically;
4. preserve hard constraints;
5. show which candidates moved;
6. explain why rankings changed;
7. avoid generating a completely different recommendation through a second opaque model call.

The same input should produce the same decision under the same data and configuration.

---

# 23. Non-Goals for the MVP

The following are explicitly excluded:

* user authentication;
* user accounts;
* payments;
* property listings;
* real-estate scraping;
* property availability;
* landlord information;
* rental transactions;
* social profiles;
* messaging;
* community feeds;
* native mobile application;
* 3D maps;
* complex map visualization;
* massive city coverage;
* AI chat history;
* arbitrary city statistics;
* fake demographic data;
* speculative safety scores;
* fabricated commute times;
* unnecessary gamification.

---

# 24. Success Criteria

The MVP is successful if a new user can:

1. describe how they want to live;
2. provide practical constraints;
3. receive several plausible neighborhood options;
4. understand why one is recommended;
5. understand the main trade-off;
6. compare alternatives;
7. change a priority;
8. observe a meaningful change in the recommendation;
9. understand why the ranking changed.

The product should feel like a useful decision instrument rather than a chatbot demo.

---

# 25. Product Principles

## Principle 1 — Fit over popularity

A neighborhood does not win because it is generally popular.

It wins because it fits the user's profile.

## Principle 2 — Evidence over fluency

A beautiful explanation is worthless without reliable supporting information.

## Principle 3 — Constraints before preferences

A candidate that violates an actual hard constraint should not be rescued by an attractive lifestyle match.

## Principle 4 — Explain the compromise

Every strong recommendation should communicate what the user gains and what they give up.

## Principle 5 — Uncertainty is acceptable

It is better to say:

> "We don't have enough evidence to evaluate this."

than to invent an answer.

## Principle 6 — Qloo must matter

Qloo is not a decorative API integration.

Its intelligence must materially influence candidate generation, evidence, or recommendation quality.

## Principle 7 — The model does not own the decision

Gemini can interpret.

Qloo can provide intelligence.

MoveFit decides.

## Principle 8 — Build less, make it deeper

Every feature must contribute directly to the neighborhood-fit decision.

---

# 26. Open Questions Before Implementation

The following cannot be finalized until the Qloo API spike is complete:

* exact locality granularity;
* neighborhood entity availability;
* city-to-neighborhood relationships;
* available recommendation endpoints;
* tag/taste resolution behavior;
* evidence fields;
* explainability capabilities;
* rate limits;
* latency;
* empty-result behavior;
* geographic filtering;
* candidate aggregation strategy.

These questions are implementation dependencies, not optional research.

---

# 27. Definition of Product MVP Complete

MoveFit's MVP is complete when:

* a user can provide a real profile;
* the profile is interpreted into structured preferences;
* Qloo contributes real intelligence;
* candidates are generated from real data;
* hard constraints are respected;
* candidates are ranked by deterministic MoveFit logic;
* recommendations have evidence;
* alternatives are meaningful;
* trade-offs are visible;
* What If? changes priorities and recalculates the decision;
* failure states are handled honestly;
* no core result depends on fabricated data.

```
---

# Final product statement

> **MoveFit helps you choose a neighborhood that fits the way you live — not simply the one that looks best on paper.**
```
