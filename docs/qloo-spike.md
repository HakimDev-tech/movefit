````md
# MoveFit — Qloo API Spike

**Status:** Pre-implementation investigation  
**Version:** 0.1  
**Last updated:** 2026-10-08

---

# 1. Purpose

This document defines the technical investigation required before implementing the MoveFit recommendation engine.

The purpose is not to learn every Qloo capability.

The purpose is to answer one critical question:

> **Can Qloo provide the intelligence required to make neighborhood-fit recommendations in a technically defensible way?**

MoveFit must not be architected around assumed Qloo endpoints or response fields.

Every API capability used in production must first be validated against the current official documentation and actual API responses.

---

# 2. Why the Spike Comes First

MoveFit depends on a specific relationship:

```text
User lifestyle
      ↓
Taste / cultural concepts
      ↓
Qloo intelligence
      ↓
Local entities / candidates
      ↓
Neighborhood-level decision
````

If Qloo cannot support the required locality resolution or candidate mapping, the recommendation architecture must change.

Therefore:

> **Qloo capability validation is a product dependency, not a late implementation detail.**

---

# 3. Official Documentation Requirement

Use the current official Qloo documentation as the source of truth.

Do not rely on:

* old tutorials;
* third-party blog posts;
* undocumented endpoints;
* guessed URL structures;
* outdated SDK examples;
* assumed response fields.

The hackathon-specific developer guide must also be checked for:

* authentication;
* API key provisioning;
* hackathon-specific restrictions;
* available endpoints;
* rate limits;
* allowed use;
* relevant examples.

---

# 4. Spike Objectives

The spike must answer these questions:

1. Can a city be reliably resolved?
2. Can user interests be represented as Qloo concepts/tags/entities?
3. Can Qloo connect taste concepts to relevant places/entities?
4. Can Qloo restrict intelligence to a specific city?
5. Can Qloo provide locality/neighborhood-level information?
6. Can relevant neighborhood candidates be generated?
7. Can evidence be extracted from Qloo responses?
8. Can results be explained without inventing facts?
9. What happens when no relevant result exists?
10. What are latency and rate-limit constraints?
11. What exact response structure is returned?
12. Which data is stable enough to use in a deterministic decision engine?

---

# 5. Test Environment

The spike should use a minimal isolated test script.

Do not begin by integrating Qloo into the entire Next.js application.

Conceptually:

```text
scripts/
└── qloo-spike.*
```

The script should:

1. load the API key from environment variables;
2. execute one controlled request at a time;
3. save or print the relevant response;
4. document the observed structure;
5. avoid leaking secrets.

---

# 6. Test A — City Resolution

## Goal

Determine how reliably Qloo identifies a city.

### Test cities

Use a small diverse set:

```text
Paris
London
Copenhagen
New York
```

### Questions

* Is the city represented as an entity?
* How is the entity identified?
* Is the identifier stable?
* Can the city be used as a geographic filter?
* Does the API distinguish cities with similar names?
* What happens for an unknown city?
* What happens for a typo?

### Required output documentation

Record:

```text
Input
Resolved entity
Entity identifier
Relevant metadata
Failure behavior
```

Do not copy entire responses into the repository if they contain unnecessary information.

---

# 7. Test B — Concept / Taste Resolution

## Goal

Determine how natural-language lifestyle preferences can be mapped to Qloo concepts.

### Test concepts

```text
quiet cafés
bookstores
architecture
walkability
independent restaurants
cultural events
nightlife
busy social areas
```

The exact vocabulary is intentionally varied.

### Questions

* Can each concept be represented?
* Are concepts tags, entities, categories, or another type?
* Can related concepts be discovered?
* Can the API represent positive preferences?
* Can it represent negative/avoidance preferences?
* Can concept identifiers be reused across requests?
* How specific are the results?

---

# 8. Test C — Taste → Place

## Goal

Determine whether Qloo can connect a set of preferences to relevant local places or entities.

### Profile A

```text
bookstores
quiet cafés
architecture
cultural places
```

### Profile B

```text
restaurants
social activity
events
nightlife
busy environments
```

The same city should be used where possible.

### Questions

* Does changing the taste profile change results?
* Are results sufficiently differentiated?
* Are results local?
* Is there a ranking?
* What signals are returned?
* Can the results be used as evidence?

---

# 9. Test D — City + Taste

## Goal

Determine whether Qloo can combine taste intelligence with a city constraint.

Conceptual query:

```text
City = Paris

Preferences =
    bookstores
    cafés
    architecture
```

Then compare with:

```text
City = Paris

Preferences =
    nightlife
    restaurants
    events
```

### Questions

* Does geographic restriction work?
* Does city context materially change results?
* Can the returned entities be mapped to local areas?
* Is the geographic scope explicit?
* Is locality information included in responses?

---

# 10. Test E — Locality / Neighborhood Capability

This is the **highest-priority test**.

## Goal

Determine whether Qloo supports the level of geographic granularity required by MoveFit.

Investigate whether the API can work with concepts such as:

```text
city
district
neighborhood
locality
area
point
venue
```

Do not assume these terms correspond to actual Qloo entity types.

### Questions

1. Are neighborhoods directly represented?
2. Can a city return neighborhood entities?
3. Can local entities be aggregated into neighborhood candidates?
4. Can Qloo relate places to geographic areas?
5. Can locality intelligence be queried directly?
6. What geographic identifiers are returned?
7. How reliable is locality information?
8. Can multiple places be associated with one candidate area?

---

# 11. Neighborhood Strategy Decision Tree

After Test E, choose the appropriate architecture.

## Scenario A — Direct neighborhood support

If Qloo directly exposes usable neighborhood/locality entities:

```text
User profile
   ↓
Qloo
   ↓
Neighborhood candidates
   ↓
MoveFit ranking
```

This is the preferred path.

---

## Scenario B — Local entities can be mapped to neighborhoods

If Qloo provides strong local entities but not direct neighborhood recommendations:

```text
User profile
   ↓
Qloo
   ↓
Relevant local entities
   ↓
Geographic aggregation
   ↓
Neighborhood candidates
   ↓
MoveFit ranking
```

This requires a defensible mapping strategy.

---

## Scenario C — City-level intelligence only

If Qloo cannot support reliable neighborhood-level mapping:

Do **not** invent neighborhood intelligence.

The product scope must be reconsidered before implementation.

Possible options include:

* reducing supported locality scope;
* using another verified geographic data source for locality structure;
* using Qloo for cultural evidence while another trusted source supplies geography;
* explicitly limiting the MVP.

The chosen solution must preserve Qloo's central role.

---

# 12. Test F — Evidence / Explainability

## Goal

Determine exactly what Qloo returns that can support an explanation.

The product needs evidence such as:

```text
Candidate
Relevant entities
Relevant concepts
Relationships
Geographic context
Ranking / affinity signals
Identifiers
Metadata
```

The spike must distinguish:

### Direct evidence

Information explicitly returned by Qloo.

### Derived evidence

Information calculated by MoveFit from Qloo data.

### Model-generated language

Explanation text generated by Gemini from validated evidence.

These must never be conflated.

---

# 13. Test G — Empty Results

Test:

* unknown city;
* obscure preference;
* contradictory preferences;
* unavailable locality;
* overly specific query.

Document:

```text
HTTP status
Response structure
Empty-result representation
Error representation
Retry behavior
```

MoveFit must have a deterministic response for empty results.

---

# 14. Test H — Error Behavior

Test common failures:

* invalid API key;
* missing authentication;
* malformed request;
* invalid entity;
* unsupported query;
* rate limiting;
* temporary provider failure.

Document:

```text
Status code
Response shape
Retryability
User-facing interpretation
```

Never expose raw provider errors directly to the user.

---

# 15. Test I — Latency

Measure several representative requests.

Record:

```text
Request type
Approximate latency
Number of external calls
Failure rate
```

The goal is not premature optimization.

The goal is to determine whether the initial analysis flow can reasonably execute synchronously.

---

# 16. Test J — Rate Limits

Determine:

* requests per minute;
* requests per day if applicable;
* burst limits;
* behavior after limit exhaustion;
* whether caching is necessary.

Do not design a workflow requiring a large number of sequential Qloo calls per user unless the limits support it.

---

# 17. Candidate Generation Principle

MoveFit should avoid a query architecture like:

```text
One Qloo request for every possible neighborhood
```

This creates:

* unnecessary latency;
* rate-limit pressure;
* brittle architecture;
* excessive complexity.

Prefer:

```text
User profile
   ↓
Small number of intelligent Qloo queries
   ↓
Candidate evidence
   ↓
MoveFit aggregation/ranking
```

The exact number of calls must be determined experimentally.

---

# 18. Preference Resolution Principle

Natural-language input should not automatically become a Qloo query without interpretation.

Example:

```text
"I like quiet places where I can spend
an afternoon reading and walking around."
```

Possible interpretation:

```text
quiet environments
bookstores
cafés
walkability
low nightlife preference
```

But inferred preferences must remain distinguishable from explicit preferences.

The system should never claim:

```text
User prefers bookstores.
```

when the user never expressed anything that supports that inference.

---

# 19. Avoidance Handling

Avoidances require special treatment.

Example:

```text
"I don't want nightlife."
```

This should not necessarily mean:

```text
No nightlife exists in the neighborhood.
```

Instead, MoveFit should interpret it as a negative preference against environments strongly associated with nightlife, subject to available evidence.

The exact implementation must be based on what Qloo can actually measure.

---

# 20. Qloo Data Normalization

Raw Qloo data should be transformed into an internal representation.

Conceptual structure:

```ts
type Evidence = {
  candidateId: string;
  source: "qloo";
  concept?: string;
  entity?: string;
  relationship?: string;
  strength?: number;
  metadata?: Record<string, unknown>;
};
```

This is only a conceptual model.

The final schema must reflect the actual API response.

Do not invent fields merely because they would be convenient.

---

# 21. Qloo Does Not Produce the MoveFit Score

Even if Qloo provides ranking, affinity, or relevance signals, these must not automatically become the final MoveFit score.

The distinction is:

```text
Qloo signal
    ≠
MoveFit Fit Score
```

Qloo provides intelligence.

MoveFit combines that intelligence with:

* user priorities;
* hard constraints;
* evidence coverage;
* product-specific decision rules.

---

# 22. Gemini + Qloo Interaction

The preferred conceptual flow is:

```text
User language
     ↓
Gemini
     ↓
Structured preferences
     ↓
Qloo
     ↓
Validated evidence
     ↓
MoveFit engine
     ↓
Recommendation
     ↓
Gemini
     ↓
Human-readable explanation
```

Gemini may be used again for explanation, but it must receive validated decision data.

It should not independently recalculate the recommendation.

---

# 23. What Must Not Be Assumed

Until experimentally verified, do not assume:

* a specific Qloo endpoint;
* a specific URL path;
* a specific entity type;
* neighborhood IDs;
* geographic hierarchy;
* response fields;
* numerical affinity semantics;
* ranking semantics;
* explanation fields;
* locality support;
* rate limits;
* API latency.

This is the purpose of the spike.

---

# 24. Spike Deliverable

At the end of the investigation, this document must contain:

### Capability

```text
Supported / Partially supported / Unsupported
```

### Evidence

A concise description of the actual observed behavior.

### Implementation consequence

What MoveFit will do with that capability.

Example:

```text
Neighborhood entities:
PARTIALLY SUPPORTED

Observed:
Qloo provides local entities associated with geographic
context, but direct neighborhood recommendations are not
available through the tested flow.

Consequence:
MoveFit will investigate candidate aggregation from
local entities rather than inventing direct neighborhood
scores.
```

---

# 25. Go / No-Go Criteria

## GO

Proceed with the neighborhood recommendation architecture if:

* Qloo provides meaningful city/local intelligence;
* relevant lifestyle concepts can be represented;
* candidate evidence can be retrieved;
* locality can be resolved directly or defensibly derived;
* evidence can be normalized;
* API performance is acceptable.

## CONDITIONAL GO

Proceed with a modified architecture if:

* neighborhood-level support is indirect;
* local entities can be defensibly aggregated;
* another verified data source can supply missing geographic structure;
* Qloo remains central to cultural/local intelligence.

## NO-GO

Stop and redesign if:

* Qloo cannot materially contribute to neighborhood/local intelligence;
* the required data would have to be fabricated;
* the recommendation would be essentially generated by Gemini without Qloo;
* locality mapping is too unreliable to defend.

---

# 26. Final Spike Checklist

```text
[ ] Official documentation reviewed
[ ] Hackathon developer guide reviewed
[ ] Authentication validated
[ ] City resolution tested
[ ] Concept/taste resolution tested
[ ] Taste → place tested
[ ] City + taste tested
[ ] Locality capability tested
[ ] Neighborhood strategy decided
[ ] Evidence fields documented
[ ] Empty results tested
[ ] Error behavior tested
[ ] Latency measured
[ ] Rate limits documented
[ ] Response shapes documented
[ ] No unsupported assumptions remain
[ ] Architecture updated accordingly
```

---

# 27. Spike Principle

> **Do not build the recommendation engine around what Qloo should return. Build it around what Qloo demonstrably returns.**

````

