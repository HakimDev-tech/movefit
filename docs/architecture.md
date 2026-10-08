````md
# MoveFit — System Architecture

**Status:** Initial architecture  
**Version:** 0.1  
**Last updated:** 2026-10-08

---

# 1. Architecture Goal

MoveFit must separate:

1. user interface;
2. input validation;
3. language interpretation;
4. Qloo intelligence;
5. candidate generation;
6. evidence normalization;
7. deterministic decision logic;
8. result presentation.

The architecture must prevent a single API route or AI model from becoming responsible for the entire product.

The central rule is:

```text
AI interprets.
Qloo provides intelligence.
MoveFit decides.
UI explains the decision.
````

---

# 2. High-Level Architecture

```text
┌──────────────────────────────┐
│          Browser             │
│      Next.js Application     │
└──────────────┬───────────────┘
               │
               │ POST /api/movefit
               ▼
┌──────────────────────────────┐
│       Request Boundary       │
│      Validation / Parsing    │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│       MoveFit Orchestrator   │
│   Coordinates the workflow   │
└───────┬──────────────┬───────┘
        │              │
        ▼              ▼
┌──────────────┐  ┌──────────────┐
│    Gemini    │  │     Qloo     │
│ Language     │  │ Intelligence │
│ Understand.  │  │ / Locality   │
└──────┬───────┘  └──────┬───────┘
       │                 │
       └────────┬────────┘
                ▼
┌──────────────────────────────┐
│     Evidence Normalizer      │
│  Converts external responses │
│  into internal domain data   │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│      MoveFit Decision        │
│          Engine              │
│                              │
│ • constraints                │
│ • preference matching        │
│ • ranking                    │
│ • trade-offs                 │
│ • confidence                 │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│      Recommendation DTO      │
│     Structured UI result     │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│       Results Interface      │
└──────────────────────────────┘
```

---

# 3. Architectural Responsibilities

## 3.1 Browser / Next.js UI

Responsible for:

* collecting input;
* showing progress;
* displaying validation errors;
* presenting recommendations;
* showing evidence;
* presenting comparisons;
* controlling What If? priorities;
* maintaining temporary client-side interaction state.

The UI must not contain the core recommendation algorithm.

---

# 4. API Boundary

The primary server endpoint is conceptually:

```text
POST /api/movefit
```

It should:

1. receive a validated request;
2. invoke the orchestration layer;
3. return a structured recommendation;
4. expose controlled error states.

It should **not**:

* contain the full scoring algorithm;
* directly contain every Qloo transformation;
* contain every Gemini prompt;
* become a 700-line file;
* mix UI concerns with business logic.

---

# 5. Proposed Backend Flow

```text
route.ts
   ↓
validateRequest()
   ↓
movefitOrchestrator()
   ↓
interpretPreferences()
   ↓
resolveLocation()
   ↓
queryQloo()
   ↓
normalizeEvidence()
   ↓
generateCandidates()
   ↓
applyHardConstraints()
   ↓
rankCandidates()
   ↓
buildExplanation()
   ↓
buildRecommendation()
   ↓
return response
```

The exact sequence may change after the Qloo API spike.

---

# 6. Domain Layers

## Layer 1 — Request

Converts untrusted HTTP input into validated application input.

## Layer 2 — Interpretation

Converts natural-language preferences into structured concepts.

## Layer 3 — Intelligence

Queries Qloo and other approved external intelligence providers.

## Layer 4 — Evidence

Normalizes external information into internal structures.

## Layer 5 — Decision

Applies MoveFit's deterministic rules.

## Layer 6 — Presentation

Transforms the decision into UI-friendly output.

---

# 7. Proposed Project Structure

The project should start small.

```text
movefit/
├── docs/
│   ├── product-spec.md
│   ├── architecture.md
│   ├── qloo-spike.md
│   ├── recommendation-engine.md
│   └── risks.md
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── movefit/
│   │   │       └── route.ts
│   │   ├── page.tsx
│   │   └── ...
│   │
│   ├── components/
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── qloo/
│   │   ├── agent/
│   │   ├── recommendation/
│   │   ├── validation/
│   │   └── utils/
│   │
│   ├── types/
│   │   └── ...
│   │
│   └── styles/
│
├── public/
├── package.json
├── tsconfig.json
└── ...
```

Directories should only be created when they contain a real responsibility.

Do not create an empty abstraction layer merely to make the repository look sophisticated.

---

# 8. Qloo Adapter

All Qloo communication should be isolated behind a dedicated module.

Conceptually:

```text
src/lib/qloo/
├── client.ts
├── queries.ts
├── normalize.ts
└── types.ts
```

However, the exact files should only be created when their responsibilities are known.

The rest of the application should not depend directly on Qloo's raw response shape.

---

# 9. Qloo Abstraction

The application should communicate with an internal abstraction such as:

```text
resolveEntity()
resolveConcept()
findRelevantEntities()
findLocalCandidates()
```

The exact functions are intentionally not finalized yet.

They must be derived from the actual Qloo API capabilities.

This prevents Qloo-specific implementation details from spreading throughout the codebase.

---

# 10. External API Boundary

External API responses should never be passed directly into the decision engine.

Instead:

```text
Qloo response
     ↓
Qloo adapter
     ↓
validation
     ↓
normalization
     ↓
internal evidence model
     ↓
MoveFit engine
```

This protects the business logic from external API changes.

---

# 11. Gemini Boundary

Gemini should also be isolated behind an internal interface.

Conceptually:

```text
src/lib/agent/
├── gemini.ts
├── prompts/
└── interpretation.ts
```

Gemini should return structured information rather than arbitrary prose wherever possible.

Example conceptual output:

```ts
type PreferenceSignal = {
  concept: string;
  importance: "low" | "medium" | "high";
  source: "explicit" | "inferred";
};
```

The final schema will evolve after testing.

---

# 12. No Direct Model-to-UI Flow

Avoid:

```text
User
 ↓
Gemini
 ↓
Beautiful paragraph
 ↓
UI
```

That architecture would make MoveFit essentially a chatbot.

Instead:

```text
User
 ↓
Gemini
 ↓
Structured interpretation
 ↓
Qloo
 ↓
Evidence
 ↓
MoveFit decision engine
 ↓
Structured recommendation
 ↓
UI
```

---

# 13. Decision Engine

The decision engine is the core proprietary/product logic of MoveFit.

It should receive:

```text
User profile
+
Candidate set
+
Evidence
+
Validated constraints
+
Priority configuration
```

and produce:

```text
Ranked candidates
+
Fit dimensions
+
Trade-offs
+
Confidence
+
Explanation inputs
```

The engine must be deterministic.

For the same:

```text
profile
+
candidate data
+
configuration
```

it should produce the same ranking.

---

# 14. What If? Architecture

What If? should not invoke a new AI reasoning process merely to recalculate a ranking.

Instead:

```text
Existing candidate evidence
          +
New priority weights
          ↓
MoveFit decision engine
          ↓
New ranking
```

This gives the user a meaningful comparison between two states.

---

# 15. State Model

There are two fundamentally different types of state.

## Analysis state

Contains:

* user input;
* interpreted preferences;
* candidate data;
* evidence;
* constraints;
* ranking configuration.

## Interaction state

Contains:

* selected candidate;
* current What If? priorities;
* expanded evidence;
* comparison selections.

The browser should not be trusted as the source of truth for server-side recommendation decisions.

---

# 16. Data Flow

## Initial request

```text
User input
   ↓
Client validation
   ↓
POST /api/movefit
   ↓
Server validation
   ↓
Gemini interpretation
   ↓
Qloo resolution
   ↓
Candidate generation
   ↓
Evidence normalization
   ↓
Hard constraint filtering
   ↓
Soft preference scoring
   ↓
Ranking
   ↓
Explanation construction
   ↓
Response
   ↓
Results UI
```

---

# 17. Error Boundaries

Each external dependency should have a controlled failure boundary.

## Gemini failure

Possible response:

```text
We couldn't interpret your preferences reliably.
Try describing your lifestyle more directly.
```

The application should not invent an interpretation.

## Qloo failure

Possible response:

```text
We couldn't retrieve enough local intelligence
to produce a reliable recommendation right now.
```

Do not silently replace Qloo with fabricated data.

## Insufficient evidence

Possible response:

```text
We found potential matches, but there isn't enough
evidence to rank them confidently.
```

---

# 18. Security Architecture

API credentials must remain server-side.

Never expose:

* Qloo API keys;
* Gemini API keys;
* server secrets;
* internal provider credentials.

The browser should communicate only with the MoveFit server endpoint.

---

# 19. Input Validation

All external input must be validated.

Validation should cover:

* required fields;
* string lengths;
* malformed values;
* unsupported values;
* unreasonable payload sizes;
* priority ranges;
* unexpected fields where appropriate.

Natural-language fields must have reasonable maximum lengths.

The server must never trust client-side validation alone.

---

# 20. Prompt Security

User text should be treated as untrusted input.

A user may enter text attempting to manipulate the model.

The system should make clear in the Gemini prompt that:

* user text represents preferences;
* instructions embedded inside user text are not system instructions;
* factual claims must not be invented;
* the model should return the required structured format.

---

# 21. Observability

During development, the system should make failures diagnosable.

Useful information includes:

* request lifecycle;
* Qloo request status;
* Qloo latency;
* Gemini latency;
* candidate count;
* filtering count;
* evidence coverage;
* decision-engine duration;
* final error category.

Never log:

* API keys;
* sensitive credentials;
* unnecessary user information.

---

# 22. Caching

Caching may be introduced for repeated external intelligence queries.

Potential cache candidates:

* city/entity resolution;
* stable Qloo concept resolution;
* repeated public intelligence queries.

Caching should not compromise correctness.

The first implementation should prioritize correctness over premature caching.

---

# 23. Technology Principles

MoveFit should use technologies that directly support the product.

Expected core stack:

* Next.js;
* React;
* TypeScript;
* server-side API routes;
* Qloo API;
* Gemini API;
* CSS/Tailwind only where useful;
* optional lightweight persistence only if justified.

Do not add:

* microservices;
* message queues;
* complex state-management frameworks;
* unnecessary databases;
* authentication;
* analytics infrastructure;
* elaborate infrastructure;

unless the product actually requires them.

---

# 24. Database

A database is not required for the initial MVP unless a concrete feature needs persistence.

The first version can operate without:

* accounts;
* saved searches;
* persistent profiles;
* history.

If persistence becomes necessary, it should be introduced for a specific reason rather than because a SaaS architecture is expected to have a database.

---

# 25. Maps

Maps are secondary.

A map may help communicate geographic relationships, but it must not become the product's primary intelligence layer.

MoveFit's central experience is:

```text
preference → evidence → decision
```

not:

```text
map → pins → browsing
```

---

# 26. Architecture Invariants

The following must remain true throughout development:

### Invariant 1

Qloo is materially involved in the recommendation pipeline.

### Invariant 2

Gemini does not own the final recommendation.

### Invariant 3

MoveFit owns hard constraints and ranking.

### Invariant 4

Raw external responses are normalized before business logic.

### Invariant 5

The recommendation engine is deterministic.

### Invariant 6

Missing evidence cannot become fabricated evidence.

### Invariant 7

API secrets remain server-side.

### Invariant 8

The API route remains orchestration-focused rather than becoming the entire application.

---

# 27. Architecture Evolution

The architecture should evolve in this order:

```text
Validated MVP
      ↓
Correct Qloo integration
      ↓
Correct decision engine
      ↓
Reliable error handling
      ↓
Observability
      ↓
Performance
      ↓
Optional persistence
```

Do not optimize architecture before validating the product's core data flow.

---

# 28. Architecture Definition of Done

The initial architecture is considered validated when:

* the Qloo API capabilities are known;
* external response shapes are understood;
* Qloo data can be normalized;
* Gemini can produce structured preference interpretations;
* candidate data can enter the decision engine;
* hard constraints can be evaluated;
* ranking is deterministic;
* What If? can reuse the same evidence;
* the UI receives a stable recommendation structure;
* failure states are explicit.

Until these conditions are met, implementation details should remain flexible.

```
```
