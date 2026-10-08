# MoveFit

> **Find where you fit.**

MoveFit helps people choose a neighborhood that fits the way they live — not just where they can afford to live.

Moving to a new city is not only a question of rent, distance, or convenience. Neighborhoods have different cultural identities, places, activities, and atmospheres. MoveFit combines a person's lifestyle and practical priorities with Qloo's cultural and local intelligence to help them compare where they may fit best.

## The Problem

Choosing where to live in an unfamiliar city is difficult.

Traditional approaches focus mainly on:

* price
* distance
* commute
* property availability

But these factors do not answer a more personal question:

> **"Would I actually enjoy living here?"**

MoveFit approaches neighborhood discovery from the perspective of the person, rather than the property.

## How It Works

A user describes:

* where they are moving
* what they enjoy
* what they want to avoid
* their practical constraints
* what matters most to them

MoveFit then:

1. Interprets the user's preferences.
2. Uses **Qloo** to retrieve relevant cultural and local intelligence.
3. Generates potential neighborhood candidates.
4. Applies hard constraints.
5. Ranks the remaining candidates according to the user's preferences.
6. Explains the strengths and trade-offs of each option.
7. Lets the user explore how changing their priorities changes the recommendation.

The result is not simply a list of popular neighborhoods.

It is a **personalized decision**.

## What Makes MoveFit Different

Most location recommendation experiences start with a place and ask:

> "What is good around here?"

MoveFit starts with the person:

> **"What kind of place fits me?"**

The system separates:

* **hard constraints** — requirements that should filter candidates
* **soft preferences** — factors that influence ranking
* **evidence** — information supporting a recommendation
* **trade-offs** — what the user gains and gives up with each option

This makes the recommendation explainable rather than opaque.

## The Trade-off Simulator

A core MoveFit feature is the ability to explore **"What if?"** scenarios.

For example:

```text
Lifestyle     70%
Commute       30%
        ↓
Neighborhood A
```

Changing the priorities:

```text
Lifestyle     40%
Commute       60%
        ↓
Neighborhood B
```

allows users to understand **why** the recommendation changes.

MoveFit is therefore designed as a decision-support tool, not just a recommendation list.

## Technology

### Qloo

Qloo provides the cultural and local intelligence used to understand relationships between tastes, places, and locations.

Qloo is a core part of MoveFit's recommendation pipeline.

### Gemini

Gemini is used for natural-language understanding and preference interpretation.

It can help transform a user's description into structured preference signals and handle ambiguity in natural language.

Gemini does **not** determine which neighborhood is best.

### MoveFit Decision Engine

MoveFit owns the final decision logic:

* constraint filtering
* preference weighting
* candidate ranking
* evidence handling
* confidence
* trade-offs
* what-if scenarios

This separation keeps the recommendation logic transparent and reproducible.

## Architecture

```text
                    User
                     │
                     ▼
                MoveFit UI
                     │
                     ▼
              MoveFit API
                     │
              ┌──────┴──────┐
              ▼             ▼
           Gemini          Qloo
              │             │
              │       Cultural /
              │       Local Intelligence
              │             │
              └──────┬──────┘
                     ▼
             MoveFit Engine
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
      Constraints  Ranking   Evidence
                     │
                     ▼
                Recommendations
                     │
                     ▼
                What-if Analysis
```

## Design Principles

MoveFit is intentionally designed around a few principles:

* **Useful over impressive**
* **Evidence over invented facts**
* **Explainability over black-box scoring**
* **Decision support over endless recommendations**
* **Simple interfaces over unnecessary UI**
* **Real data over fabricated local information**
* **Small, focused scope over feature accumulation**

The product should feel like a carefully designed decision tool rather than a generic AI application.

## MVP

The MVP focuses on the complete recommendation loop:

* city selection
* lifestyle description
* avoidances
* practical constraints
* preference interpretation
* Qloo integration
* candidate generation
* hard-constraint filtering
* ranking
* explanations
* alternatives
* trade-offs
* what-if priority adjustment
* meaningful error states

Features such as accounts, property listings, payments, social features, and complex maps are intentionally outside the MVP.

## Current Status

MoveFit is being built for the **Qloo Agentic Hackathon**.

Current development stage:

**J1 — Foundation completed**

* Product specification defined
* MVP scope defined
* Architecture established
* Qloo API investigation prepared
* Recommendation principles established
* Risk register established
* Next.js foundation implemented
* Request validation implemented
* Initial domain types established

The next major milestone is validating the actual Qloo API capabilities before implementing the production recommendation pipeline.

## Project Structure

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
│   │   └── api/
│   │       └── movefit/
│   │           └── route.ts
│   │
│   ├── components/
│   │
│   ├── lib/
│   │   ├── agent/
│   │   ├── qloo/
│   │   ├── recommendation/
│   │   ├── utils/
│   │   └── validation/
│   │
│   └── types/
│
├── .env.example
├── package.json
└── README.md
```

## Development Philosophy

MoveFit is being built with a strict principle:

> **Build less, but make every part intentional.**

No feature should exist merely because it looks impressive in a demo.

Every part of the product should contribute to answering one question:

> **Which neighborhood fits this person, and why?**

## License

This project is open source and released under the [MIT License](LICENSE).
