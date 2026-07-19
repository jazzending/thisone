# ThisOne

**Which pack should you actually buy?**

ThisOne is a fresh grocery comparison assistant for the moment when a shopper is standing in front of the shelf and cannot tell which pack is actually the better choice.

Instead of only identifying an ingredient, ThisOne compares the visible differences between fresh options and helps the user choose based on what they want to eat, when they plan to eat it, and any personal food preferences.

## Track

Apps for Your Life

## The Problem

Fresh grocery labels are often too broad. Several packs may all say "beef rib," "salmon," "baby spinach," or "apple," but the actual food inside can look different:

- one cut may be leaner;
- one pack may be fattier or more tender;
- one fruit may be sweeter or crisper;
- one vegetable may be fresher or better for cooking tonight;
- one fish pack may be better for searing, steaming, or soup.

For home cooks, the real question is not just "What is this?" It is:

> Which one should I actually buy for what I want to eat?

## What It Does

ThisOne helps shoppers compare up to four fresh grocery options.

Current MVP categories:

- Fruit
- Veg
- Seafood
- Meat

Core flow:

1. Choose a fresh food category.
2. Upload one shelf photo or one photo per package.
3. ThisOne turns the visible options into A, B, C, and D.
4. The app summarizes visible cues in simple indicator cards.
5. The user can stop at the comparison or ask ThisOne to choose.
6. If the user wants help choosing, the app asks:
   - when they plan to eat it;
   - how they want to prepare it;
   - whether there are dietary needs or preferences.
7. ThisOne recommends one option with plain-English reasons.

## What The MVP Demonstrates

This project has two modes:

- **Demo mode** uses structured sample data and local scoring logic so judges can reliably test the product flow without an API key.
- **Live analysis mode** sends uploaded photos to a server-side GPT-5.6 vision request. GPT-5.6 extracts cautious, photo-supported cues, then the existing recommendation flow uses those cues alongside the shopper's timing, cooking plan, and preferences.

Live analysis requires an `OPENAI_API_KEY` environment variable in the server runtime. The API key is never sent to the browser and is ignored by Git.

The interface labels the active mode so that the app does not overclaim.

## Key Features

- Responsive single-page web app
- Fresh category selection
- Upload flow for one shelf photo or multiple package photos
- Maximum of 4 comparison options
- 15MB per-photo upload guardrail
- Indicator cards for quick reading
- Fruit-specific cues: variety, ripeness, sweetness, best use
- Veg-specific cues: part, freshness, texture, best use
- Seafood-specific cues: part, fat, tenderness, freshness, best use
- Meat-specific cues: part, fat, tenderness, freshness, best use
- Optional recommendation flow
- User context support for needs such as low sugar, weight control, low fat, high protein, or muscle gain
- Local saved picks
- Basic input escaping and local-storage recovery
- Lightweight QA check script

## Demo Path

1. Open `thisone-standalone.html` or `index.html`.
2. Click **Load demo scan**.
3. Switch between Fruit, Veg, Seafood, and Meat.
4. Review the A/B/C visible-cue comparison.
5. In Step 3, choose **Help me choose**.
6. Select timing and cooking/eating style.
7. Add a preference such as:
   - `low sugar`
   - `weight control`
   - `high protein`
   - `kid-friendly`
8. Click **Pick this one**.
9. Review the recommendation and reasons.

## How To Run

ThisOne can run as a static demo, or as a Vercel app with live GPT-5.6 analysis.

Option 1: open the standalone file directly:

```text
outputs/thisone/thisone-standalone.html
```

Option 2: serve the folder locally:

```bash
cd outputs/thisone
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

### Live GPT-5.6 Analysis

The `api/analyze.mjs` server function calls GPT-5.6 and keeps the API key on the server.

1. Deploy this folder to Vercel.
2. In the Vercel project settings, add an environment variable named `OPENAI_API_KEY` and paste your key there.
3. Redeploy, then upload 1-4 photos in ThisOne.

Never put the key in `app.js`, `index.html`, a GitHub commit, or a public form. `.env` is excluded by `.gitignore`; `.env.example` is only a safe template.

## Files

- `index.html` - app markup
- `styles.css` - responsive UI and visual design
- `app.js` - prototype data, scoring, upload handling, and UI logic
- `thisone-standalone.html` - single-file version for easy demo sharing
- `qa-check.js` - lightweight QA assertions
- `api/analyze.mjs` - secure server-side GPT-5.6 vision request
- `.env.example` - safe environment-variable template (no real key)
- `vercel.json` - server function configuration

## QA

Run:

```bash
node qa-check.js
```

Current checks confirm:

- HTML escaping helper exists
- 4-option limit exists
- 15MB upload limit exists
- upload validation exists
- saved-state recovery exists
- prototype disclosure exists
- upload size guidance exists

## Safety And Product Boundaries

ThisOne reads visible cues only.

It does not replace:

- expiration dates;
- smell checks;
- proper storage guidance;
- food safety rules;
- medical advice;
- user judgment.

Dietary suggestions are preference-aware, not medical recommendations.

## How Codex Helped

This project was built during OpenAI Build Week with Codex as the primary build partner.

Codex helped with:

- narrowing the original broad idea into a clear hackathon MVP;
- identifying the core product insight: same labels can hide meaningful food differences;
- turning a non-technical product concept into a working static web app;
- shaping the user flow around the real grocery moment: compare first, choose only if needed;
- writing natural English UI copy;
- iterating on layout, color, responsive behavior, and accessibility;
- implementing category-specific comparison logic for fruit, veg, seafood, and meat;
- adding upload limits, input escaping, prototype disclosure, and a small QA check;
- preparing submission materials.

Key product decisions made with Codex:

- keep the comparison to 2-4 options;
- avoid fake precision such as numeric freshness scores;
- use "visible-cue estimate" language to avoid overclaiming;
- separate comparison from recommendation;
- show the original option image in the recommendation;
- treat dietary needs carefully and avoid medical claims;
- be transparent that the current version is a prototype.

## GPT-5.6 Usage

ThisOne includes a secure GPT-5.6 vision integration in `api/analyze.mjs`.

When Live Analysis is configured and used, GPT-5.6 receives up to four compressed grocery photos and returns structured, cautious visible-cue estimates: label text, likely part or variety, appearance, fat or texture, visible freshness cues, ripeness, sweetness, price visibility, cooking fit, and confidence. The browser turns these structured results into the comparison cards; ThisOne's local recommendation logic combines the results with timing, cooking plans, and preferences.

The prompt deliberately instructs GPT-5.6 to say "Not clear from photo" rather than guessing, to avoid food-safety guarantees, and to avoid medical advice.

Before submission, run and record one real live-analysis test. Then add the test date and a short description of the photo used here and in the Devpost form.

## Built For

OpenAI Build Week on Devpost

## Submission Notes

Recommended Devpost track: **Apps for Your Life**

Recommended short tagline:

> A fresh grocery assistant that helps shoppers choose the best pack for what they want to eat.
