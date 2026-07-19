const MAX_OPTIONS = 4;
const MAX_IMAGE_CHARS = 1_500_000;
const LIVE_ANALYSIS_MODEL = "gpt-5.6-luna";
const LIVE_ANALYSIS_MAX_COMPLETION_TOKENS = 500;

const foodComparisonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "options"],
  properties: {
    summary: { type: "string" },
    options: {
      type: "array",
      minItems: 1,
      maxItems: MAX_OPTIONS,
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "label_text",
          "item_type",
          "part_or_variety",
          "appearance",
          "fat_or_texture",
          "visible_freshness",
          "ripeness",
          "sweetness",
          "best_for",
          "avoid_for",
          "price_text",
          "confidence"
        ],
        properties: {
          label_text: { type: "string" },
          item_type: { type: "string" },
          part_or_variety: { type: "string" },
          appearance: { type: "string" },
          fat_or_texture: { type: "string" },
          visible_freshness: { type: "string" },
          ripeness: { type: "string" },
          sweetness: { type: "string" },
          best_for: { type: "string" },
          avoid_for: { type: "string" },
          price_text: { type: "string" },
          confidence: { type: "string", enum: ["high", "medium", "low"] }
        }
      }
    }
  }
};

function error(response, status, message) {
  response.status(status).json({ error: message });
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return error(response, 405, "Use POST for photo analysis.");
  }

  if (!process.env.OPENAI_API_KEY) {
    return error(response, 503, "Live analysis has not been configured yet.");
  }

  if (process.env.THISONE_LIVE_ANALYSIS_ENABLED !== "true") {
    return error(response, 503, "Live analysis is temporarily off. You can still use the demo scan.");
  }

  const { category, images } = request.body || {};
  const allowedCategories = ["fruit", "veg", "seafood", "meat"];
  if (!allowedCategories.includes(category) || !Array.isArray(images) || !images.length || images.length > MAX_OPTIONS) {
    return error(response, 400, "Send 1 to 4 photos and a valid food category.");
  }

  if (images.some((image) => typeof image !== "string" || !image.startsWith("data:image/") || image.length > MAX_IMAGE_CHARS)) {
    return error(response, 413, "Each prepared photo must be a regular image under the live-analysis size limit.");
  }

  const prompt = `You are ThisOne, a careful fresh-grocery comparison assistant. Analyze ${images.length} grocery photo(s) in the ${category} category. A single shelf photo may contain several packages; separate-photo uploads usually show one package per photo. Return at most four options in visual order.

Only report details that are supported by a label or clearly visible food cues. If a detail cannot be reliably seen, say "Not clear from photo". Do not invent exact meat cuts, fish parts, fruit varieties, price, or freshness. "Visible freshness" must describe appearance only, never promise that food is safe, fresh, or safe to eat. Do not give medical advice. Keep cooking suggestions practical and short.

For meat and seafood, part_or_variety should be the likely cut or visible section. For fruit, it should be the variety if a label supports it. For veg, it should be the visible edible part. price_text should be "Not visible" unless a price is readable. The summary should be one short, plain-English sentence.`;

  try {
    const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: LIVE_ANALYSIS_MODEL,
        reasoning_effort: "none",
        messages: [{
          role: "user",
          content: [
            { type: "text", text: prompt },
            ...images.map((image) => ({ type: "image_url", image_url: { url: image } }))
          ]
        }],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "fresh_food_comparison",
            strict: true,
            schema: foodComparisonSchema
          }
        },
        max_completion_tokens: LIVE_ANALYSIS_MAX_COMPLETION_TOKENS
      })
    });

    const apiBody = await apiResponse.json();
    if (!apiResponse.ok) {
      console.error("OpenAI API error", apiBody);
      return error(response, 502, "GPT-5.6 could not analyze these photos right now.");
    }

    const content = apiBody.choices?.[0]?.message?.content;
    const analysis = JSON.parse(content);
    return response.status(200).json(analysis);
  } catch (caught) {
    console.error("Analysis error", caught);
    return error(response, 500, "ThisOne could not finish the photo analysis.");
  }
}
