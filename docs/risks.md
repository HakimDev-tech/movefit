````md
# MoveFit — Risk Register

**Status:** Active  
**Version:** 0.1  
**Last updated:** 2026-10-08

---

# 1. Purpose

This document identifies the major risks that could prevent MoveFit from becoming:

- technically credible;
- useful;
- trustworthy;
- competitive in the hackathon;
- genuinely dependent on Qloo.

Risks are prioritized by potential impact rather than implementation difficulty.

---

# 2. Risk Scale

## Severity

### Critical

Could invalidate the core product or hackathon strategy.

### High

Could significantly reduce product quality or judging performance.

### Medium

Could create meaningful technical or UX problems but is recoverable.

### Low

Limited impact and can be addressed later.

---

# 3. Risk Register

| ID | Risk | Severity | Probability | Mitigation |
|---|---|---:|---:|---|
| RISK-001 | Qloo does not provide sufficient neighborhood-level intelligence | Critical | Medium | Validate locality capability before building the engine |
| RISK-002 | Qloo results cannot be mapped defensibly to neighborhoods | Critical | Medium | Test direct locality support and aggregation strategies |
| RISK-003 | MoveFit becomes a generic Gemini recommendation app | Critical | Medium | Keep Qloo materially involved in candidate/evidence generation |
| RISK-004 | Gemini invents preferences or neighborhood facts | Critical | Medium | Structured output, evidence boundaries, validation |
| RISK-005 | Fake precision makes recommendations look scientifically unsupported | High | High | Use evidence-based qualitative fit and transparent scoring |
| RISK-006 | Product becomes a generic travel/city guide | High | Medium | Keep "where should I live?" as the central job |
| RISK-007 | Too much UI, insufficient intelligence | High | Medium | Build data flow and decision engine before visual polish |
| RISK-008 | Scoring formula becomes arbitrary | High | High | Delay final formula until real evidence is tested |
| RISK-009 | Missing data is treated as negative evidence | High | Medium | Explicit evidence states |
| RISK-010 | External API latency makes the experience frustrating | High | Medium | Minimize calls, measure latency, cache stable data where appropriate |
| RISK-011 | Qloo API rate limits restrict the intended workflow | High | Medium | Measure limits early and minimize sequential requests |
| RISK-012 | API response structure changes during development | Medium | Medium | Isolate provider adapter and normalize responses |
| RISK-013 | Too many cities create insufficient data quality | High | High | Start with a limited, validated city scope |
| RISK-014 | Practical constraints cannot be evaluated reliably | High | High | Only expose constraints backed by usable data |
| RISK-015 | Recommendation explanations overstate evidence | High | Medium | Generate explanations from structured decision data |
| RISK-016 | What If? becomes a second opaque AI recommendation | High | Medium | Reuse existing evidence and deterministic engine |
| RISK-017 | Architecture becomes over-engineered | Medium | Medium | Keep a small modular monolith |
| RISK-018 | Hackathon features are added without user value | Medium | High | Require every feature to justify its existence |
| RISK-019 | UI resembles a generic AI SaaS template | Medium | High | Design around the decision workflow, not dashboard conventions |
| RISK-020 | Demo focuses on technical APIs instead of user value | High | Medium | Demonstrate the decision and trade-off experience |
| RISK-021 | Empty results produce misleading recommendations | High | Medium | Explicit empty/insufficient-evidence states |
| RISK-022 | External data is presented as universally true | High | Medium | Communicate evidence scope and uncertainty |
| RISK-023 | Candidate rankings are unstable | High | Medium | Deterministic scoring and ranking-stability tests |
| RISK-024 | User inputs are too vague for reliable interpretation | Medium | Medium | Guided natural-language examples and ambiguity handling |
| RISK-025 | MVP scope becomes too large before deadline | High | High | Strict MVP/non-goal boundary |

---

# 4. Critical Risks

## RISK-001 — Insufficient Neighborhood-Level Data

### Description

Qloo may provide strong taste and local intelligence without exposing the neighborhood-level structure required by MoveFit.

### Why it matters

The core product promises neighborhood fit.

If neighborhood-level evidence cannot be obtained or defensibly derived, the product concept may require modification.

### Mitigation

Perform the Qloo spike before implementing the recommendation engine.

### Trigger

If direct neighborhood support is unavailable, investigate:

1. locality entities;
2. geographic context;
3. aggregation of local entities;
4. complementary verified geographic data.

Never fabricate neighborhood characteristics.

---

# 5. RISK-002 — Weak Neighborhood Mapping

### Description

Qloo may return many relevant venues but provide insufficient information to determine which neighborhood they belong to.

### Mitigation

Test:

```text
venue → locality
city → locality
local entity aggregation
````

If mapping cannot be defended, do not pretend that the aggregation is exact.

---

# 6. RISK-003 — Qloo Becomes Decorative

### Description

The application could accidentally use Gemini to generate the recommendation and call Qloo only for a minor API integration.

### Why it matters

This would undermine the core hackathon requirement.

### Mitigation

The architecture requires:

```text
Qloo
→ meaningful candidate/evidence intelligence

MoveFit
→ decision

Gemini
→ interpretation/explanation
```

A final implementation review must be able to answer:

> "What important part of the recommendation would be materially different without Qloo?"

If the answer is "nothing," the architecture is wrong.

---

# 7. RISK-004 — Gemini Hallucination

### Description

Gemini could:

* invent interests;
* invent neighborhood characteristics;
* exaggerate evidence;
* create unsupported statistics;
* silently alter user priorities.

### Mitigation

Use:

* structured output;
* explicit system instructions;
* evidence-bound explanations;
* server-side validation;
* clear distinction between explicit and inferred preferences.

Gemini should never be the source of factual neighborhood data.

---

# 8. RISK-005 — False Precision

### Description

The product may display numerical scores that look scientifically meaningful but are based on arbitrary weights or incomplete data.

Example of bad design:

```text
Neighborhood A
87.43% match
```

### Mitigation

Use:

* transparent dimensions;
* qualitative fit levels;
* evidence coverage;
* explicit MoveFit scoring;
* meaningful trade-offs.

Numbers should only be used when they improve understanding.

---

# 9. RISK-006 — Generic Travel App Drift

### Description

MoveFit could gradually become:

* a city guide;
* restaurant recommender;
* travel planner;
* tourist discovery app.

### Mitigation

The core question must remain:

> **Which neighborhood fits me?**

Every major feature must contribute to that question.

---

# 10. RISK-007 — UI Over Development

### Description

A polished landing page can consume development time while the recommendation logic remains weak.

### Mitigation

Build in this order:

```text
Qloo spike
↓
data model
↓
candidate flow
↓
decision engine
↓
API
↓
results UX
↓
input UX
↓
visual polish
```

Do not spend the majority of development time on the landing page.

---

# 11. RISK-008 — Arbitrary Scoring

### Description

A scoring formula may be selected because it looks mathematically sophisticated rather than because it represents a useful decision model.

### Mitigation

Use real profiles and real candidate data.

Test whether:

* priorities affect outcomes logically;
* rankings are stable;
* trade-offs make sense;
* edge cases behave correctly.

---

# 12. RISK-009 — Missing Evidence Misinterpreted

### Description

The system may treat:

```text
No evidence
```

as:

```text
Bad fit
```

### Mitigation

Use explicit evidence states:

```text
supported
unsupported
unknown
```

Never convert uncertainty into a negative recommendation without justification.

---

# 13. RISK-010 — API Latency

### Description

Multiple sequential external API requests could make the analysis feel slow.

### Mitigation

Measure first.

Then:

* reduce unnecessary calls;
* parallelize independent requests;
* cache stable lookups;
* reuse candidate evidence;
* avoid repeated model calls.

Do not optimize before measuring.

---

# 14. RISK-011 — Rate Limits

### Description

The Qloo API may impose limits that make an expensive per-candidate query strategy impractical.

### Mitigation

Prefer:

```text
small number of high-value queries
```

over:

```text
one request per neighborhood
```

Validate rate limits during the spike.

---

# 15. RISK-012 — Provider Coupling

### Description

If Qloo response structures spread throughout the application, future API changes become expensive.

### Mitigation

Use a dedicated Qloo adapter.

```text
Qloo API
   ↓
Qloo adapter
   ↓
MoveFit internal evidence
```

The decision engine should not know Qloo's raw response format.

---

# 16. RISK-013 — Too Many Cities

### Description

Supporting dozens or hundreds of cities may create inconsistent data quality.

### Mitigation

Start with a small set of cities where the complete workflow has been validated.

Quality of supported coverage is more important than the number of cities displayed on the landing page.

---

# 17. RISK-014 — Unsupported Practical Data

### Description

The product may promise:

* exact commute times;
* exact rent;
* exact safety;
* exact walkability;

without having reliable data for these dimensions.

### Mitigation

Only expose a constraint when the system can evaluate it responsibly.

If a dimension cannot be supported, remove it from the MVP rather than fabricate a proxy.

---

# 18. RISK-015 — Explanation Overreach

### Description

A model-generated explanation may contain claims that were not present in the underlying evidence.

### Mitigation

The explanation layer receives structured facts rather than raw user requests.

Conceptually:

```text
Decision
+
Evidence
+
Trade-offs
↓
Explanation
```

not:

```text
User request
↓
Gemini
↓
Everything
```

---

# 19. RISK-016 — What If? Becomes Opaque

### Description

What If? could simply call Gemini again and generate a different answer.

### Mitigation

Use:

```text
same candidate evidence
+
new priorities
+
same deterministic engine
```

The user should be able to understand why the ranking changed.

---

# 20. RISK-017 — Overengineering

### Description

The project may accumulate:

* unnecessary abstractions;
* complex state management;
* microservices;
* databases;
* queues;
* authentication;
* infrastructure.

### Mitigation

Use a modular monolith.

Introduce infrastructure only when a concrete requirement appears.

---

# 21. RISK-018 — Feature Creep

### Description

Hackathons encourage adding features because they look impressive.

### Mitigation

Every feature must answer:

> "Does this materially improve the neighborhood-fit decision?"

If not, it does not belong in the MVP.

---

# 22. RISK-019 — Generic AI SaaS UI

### Description

The product may visually resemble:

```text
AI Dashboard
Cards
Gradients
Huge heading
Generic buttons
Random icons
```

This weakens product identity.

### Mitigation

Design the interface around:

```text
question
→ input
→ analysis
→ recommendation
→ evidence
→ trade-off
→ decision
```

The UI should feel like a decision instrument rather than an AI dashboard.

---

# 23. RISK-020 — Weak Hackathon Demo

### Description

A technically strong backend may be presented as a collection of API calls rather than as a compelling product.

### Mitigation

The demo should tell one clear story:

```text
Person moving to a city
        ↓
Describes how they live
        ↓
MoveFit interprets preferences
        ↓
Qloo supplies intelligence
        ↓
MoveFit finds strongest fits
        ↓
User sees the trade-off
        ↓
User changes priorities
        ↓
Recommendation changes
        ↓
MoveFit explains why
```

This demonstrates product value and technical depth simultaneously.

---

# 24. RISK-021 — Empty Results

### Description

A poor query may return no useful candidates.

### Mitigation

The application must distinguish:

```text
No candidates
```

from:

```text
Candidates exist but evidence is weak
```

The UI should provide an actionable next step where possible.

---

# 25. RISK-022 — Data Presented as Universal Truth

### Description

A neighborhood can have diverse characteristics.

Qloo evidence does not mean:

```text
Everyone experiences this neighborhood the same way.
```

### Mitigation

Use careful language:

```text
The available evidence suggests...
```

when appropriate.

Do not imply objective universality.

---

# 26. RISK-023 — Ranking Instability

### Description

Tiny priority changes may produce irrationally large ranking changes.

### Mitigation

Test:

* small weight changes;
* equal candidates;
* close candidates;
* missing evidence;
* contradictory preferences.

Ranking changes should be explainable.

---

# 27. RISK-024 — Ambiguous User Input

### Description

Users may provide vague descriptions.

Example:

```text
"I want a nice neighborhood."
```

### Mitigation

The system should:

* extract only defensible preferences;
* avoid pretending "nice" has a precise meaning;
* optionally ask for clarification;
* explain what information would improve the result.

---

# 28. RISK-025 — Deadline Scope Risk

### Description

The project could expand beyond what can be reliably completed before the hackathon deadline.

### Mitigation

Maintain three categories:

## Must ship

* Qloo integration;
* preference interpretation;
* candidate generation;
* decision engine;
* results;
* evidence;
* trade-offs;
* What If?;
* robust failure states.

## Nice to have

* lightweight map;
* sharing;
* richer comparisons;
* caching;
* saved session.

## Do not build unless everything else is finished

* accounts;
* social features;
* complex maps;
* mobile app;
* property listings;
* large city database;
* payments;
* elaborate analytics.

---

# 29. Risk Review Process

At the end of each major development stage, review:

```text
Qloo dependency
Data reliability
Scoring validity
UX clarity
Performance
Scope
```

Do not wait until the final day to discover that the core data model is invalid.

---

# 30. Pre-Demo Risk Checklist

Before submission:

```text
[ ] Qloo is visibly essential
[ ] Qloo integration is real
[ ] No fabricated data
[ ] No unsupported statistics
[ ] No arbitrary "objective" scores
[ ] Gemini does not choose the winner
[ ] MoveFit owns ranking
[ ] What If? is deterministic
[ ] Evidence is traceable
[ ] Failure states work
[ ] Empty results work
[ ] API keys are protected
[ ] Main flow works from start to finish
[ ] UI is coherent
[ ] Demo tells one clear story
[ ] Repository is understandable
[ ] No unnecessary features distract from the core product
```

---

# 31. Highest-Priority Risks

The current top six risks are:

```text
1. Qloo neighborhood/locality capability
2. Defensible mapping to neighborhood candidates
3. Keeping Qloo genuinely central
4. Avoiding Gemini hallucination
5. Avoiding false scoring precision
6. Preventing scope/UI creep
```

These should drive development order.

---

# 32. Core Risk Principle

> **The biggest risk is not that MoveFit looks unfinished. The biggest risk is that it confidently recommends something the underlying data cannot justify.**

```
```
