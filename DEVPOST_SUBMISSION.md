# Devpost Submission Draft

Use this as a copy-and-edit draft for the OpenAI Build Week Devpost form.

## Project Name

ThisOne

## Tagline

A fresh grocery assistant that helps shoppers choose the best pack for what they want to eat.

## Track

Apps for Your Life

## Elevator Pitch

ThisOne helps shoppers make better fresh-food choices at the grocery shelf. Instead of only identifying an ingredient, it compares visible differences between options and helps users decide which pack to buy based on freshness cues, texture, fat, tenderness, ripeness, sweetness, timing, cooking plans, and dietary preferences.

## Inspiration

The idea came from a real grocery problem: fresh-food labels often do not tell the whole story. Several packages may have the same label, but the actual food inside can be very different. One beef rib pack may be leaner and better for stir-fry, while another may be fattier and better for searing or braising. Apples with similar labels may differ in sweetness, crunch, and ripeness. Spinach packs can vary in moisture and freshness.

For home cooks, the useful question is not just "What is this ingredient?" It is "Which one should I actually buy for what I want to eat?"

## What It Does

ThisOne lets users compare up to four fresh grocery options.

Users can:

- choose a category: Fruit, Veg, Seafood, or Meat;
- upload one shelf photo or one photo per package;
- review A/B/C/D comparison cards;
- see simple visible-cue indicators such as fat, tenderness, freshness, sweetness, ripeness, texture, and best use;
- decide whether the comparison is enough or ask ThisOne to pick one;
- answer a few quick questions about timing, cooking/eating style, and dietary needs;
- receive a plain-English recommendation with reasons.

The current MVP includes demo data for fruit, veg, seafood, and meat so judges can test the flow reliably.

## How We Built It

ThisOne is a static responsive web app built with HTML, CSS, and JavaScript.

The app includes:

- a mobile-friendly comparison interface;
- category-specific demo datasets;
- local scoring logic;
- upload handling for up to four photos;
- 15MB per-photo file validation;
- local saved picks;
- input escaping for safer rendering;
- prototype disclosure so the app does not overclaim AI accuracy;
- a small QA script for regression checks.

The MVP uses local scoring and structured sample data so the demo is stable and easy to judge. The interface is designed for a GPT-5.6 vision-enabled version where uploaded photos would be analyzed for label text, visible cut/part, color, marbling, liquid, ripeness, sweetness, texture, and likely cooking fit.

## How We Used Codex

Codex was the primary build partner for the project. It helped transform a non-technical product idea into a working prototype.

Codex helped with:

- narrowing the concept into a clear Build Week MVP;
- identifying the core product insight: same labels can hide meaningful food differences;
- designing the compare-first, choose-if-needed user flow;
- writing natural English UI copy;
- iterating on the visual design and responsive layout;
- implementing category-specific logic for fruit, veg, seafood, and meat;
- adding upload limits, input escaping, local-state recovery, and prototype disclosure;
- preparing README, Devpost copy, and demo script.

Important product decisions made with Codex:

- compare 2-4 options rather than overwhelming users;
- use simple levels instead of fake precision scores;
- say "visible-cue estimate" instead of making food-safety guarantees;
- separate the comparison step from the recommendation step;
- keep dietary suggestions preference-aware and not medical.

## How We Used GPT-5.6

TODO before final submission: replace this with your actual GPT-5.6 usage.

Suggested wording only if true:

GPT-5.6 was used to support product reasoning, natural-language UX copy, and the planned vision reasoning flow. The project is structured so GPT-5.6 can analyze uploaded food photos, extract visible cues, and generate concise recommendation explanations while respecting safety boundaries.

If GPT-5.6 is integrated into the final version, describe:

- where it is called;
- what inputs it receives;
- what outputs it generates;
- how judges can verify the integration.

## Challenges We Ran Into

The hardest part was not just building a UI, but defining the right product boundary. Food freshness and food safety are sensitive topics, so the app needed to be helpful without pretending to provide lab-level certainty.

We also had to make the interface readable. Early versions had too much text, so we moved toward icon-like indicator cards with simple levels such as Fat, Tenderness, Freshness, Sweetness, and Best.

Another challenge was making the app work for different categories. Fruit needs sweetness and ripeness; meat needs fat and tenderness; seafood needs fat, tenderness, and freshness; veg needs freshness and texture.

## Accomplishments

- Built a polished, responsive MVP from a non-technical product idea.
- Created a clear fresh-food comparison flow.
- Supported fruit, veg, seafood, and meat.
- Added category-specific visible-cue summaries.
- Improved the language and design through many small iterations.
- Added safety and prototype disclosures.
- Added upload and input guardrails.
- Prepared the app for a future GPT-5.6 vision analysis layer.

## What We Learned

We learned that the most useful AI grocery assistant is not necessarily one that identifies ingredients. The more practical value is helping people choose between options that look similar at first but may behave differently in the kitchen.

We also learned that product language matters. Saying "visible-cue estimate" is more honest than pretending the app can guarantee freshness from a photo.

## What's Next

Next steps:

- integrate GPT-5.6 vision reasoning for real uploaded-photo analysis;
- detect multiple packages from one shelf photo;
- improve label reading and variety/cut recognition;
- add confidence levels;
- support more fresh-food categories;
- add user preference profiles;
- publish a mobile-friendly web demo;
- test with real grocery photos from different stores.

## Demo Instructions For Judges

1. Open the demo.
2. Click **Load demo scan**.
3. Try Fruit, Veg, Seafood, and Meat.
4. Review the Step 2 visible-cue comparison cards.
5. In Step 3, keep **Help me choose** selected.
6. Choose when you will eat it and how you want to prepare it.
7. Add a dietary or preference note, such as `low sugar`, `weight control`, or `high protein`.
8. Click **Pick this one**.
9. Review the recommendation and reasons.

## Links To Fill In

- Demo URL: TODO
- Code repository: TODO
- YouTube demo video: TODO
- Codex /feedback Session ID: TODO

