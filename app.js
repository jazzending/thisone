const letters = ["A", "B", "C", "D"];
const appRoot = document.getElementById("thisone-inline-app") || document;
const maxOptions = 4;
const maxPhotoBytes = 15 * 1024 * 1024;

const methodsByCategory = {
  meat: [
    ["stirFry", "Quick stir-fry"],
    ["braise", "Braise or stew"],
    ["sear", "Pan-sear"],
    ["grill", "Grill or roast"],
    ["hotpot", "Hot pot"],
    ["other", "Other"]
  ],
  fruit: [
    ["eatFresh", "Eat fresh"],
    ["salad", "Fruit salad"],
    ["bake", "Bake"],
    ["smoothie", "Smoothie or dessert"],
    ["other", "Other"]
  ],
  veg: [
    ["salad", "Salad"],
    ["stirFry", "Quick stir-fry"],
    ["roast", "Roast"],
    ["soup", "Soup or simmer"],
    ["other", "Other"]
  ],
  seafood: [
    ["steam", "Steam"],
    ["sear", "Pan-sear"],
    ["soup", "Soup or stew"],
    ["grill", "Grill"],
    ["bake", "Bake"],
    ["other", "Other"]
  ]
};

const cueOptions = {
  itemType: {
    meat: [
      ["Rib finger / intercostal", "Rib finger"],
      ["Short rib plate cut", "Short rib"],
      ["Ribeye cap trim", "Ribeye cap"],
      ["Chuck rib-adjacent", "Chuck rib"]
    ],
    fruit: [
      ["Fuji apple", "Fuji apple"],
      ["Pink Lady apple", "Pink Lady"],
      ["Granny Smith apple", "Granny Smith"],
      ["Ripe berry pack", "Berry pack"]
    ],
    veg: [
      ["Baby spinach", "Baby spinach"],
      ["Firm root veg", "Root veg"],
      ["Tender stem veg", "Stem veg"],
      ["Mushroom pack", "Mushrooms"]
    ],
    seafood: [
      ["Salmon belly", "Salmon belly"],
      ["Cod loin", "Cod loin"],
      ["Seafood mix", "Seafood mix"],
      ["Whole fish", "Whole fish"]
    ]
  },
  cut: [
    ["thin", "Thin / small"],
    ["medium", "Medium"],
    ["thick", "Thick / large"]
  ],
  freshness: [
    ["high", "Looks bright"],
    ["medium", "Looks okay"],
    ["low", "Needs caution"]
  ],
  moisture: [
    ["dry", "Low liquid"],
    ["normal", "Normal"],
    ["wet", "Watery"]
  ],
  price: [
    ["low", "$"],
    ["medium", "$$"],
    ["high", "$$$"]
  ]
};

const sampleSets = {
  meat: [
    {
      name: "Beef rib pack A",
      labelText: "Beef Rib",
      itemType: "Rib finger / intercostal",
      animalArea: "Between rib bones",
      fatProfile: "Lean strips, visible grain",
      bodyGoalFit: "Best lean pick",
      cookMatch: "Quick stir-fry, skewers, hot pot",
      avoidFor: "Long stew if sliced thin",
      freshnessCue: "Bright red, low purge",
      cut: "thin",
      freshness: "high",
      moisture: "normal",
      price: "medium",
      tone: "#e87968"
    },
    {
      name: "Beef rib pack B",
      labelText: "Beef Rib",
      itemType: "Ribeye cap trim",
      animalArea: "Outer ribeye edge",
      fatProfile: "More marbling, tender-looking",
      bodyGoalFit: "Higher fat, richer taste",
      cookMatch: "Pan-sear, grill, Korean BBQ",
      avoidFor: "Very lean stir-fry",
      freshnessCue: "Even color, dry surface",
      cut: "medium",
      freshness: "high",
      moisture: "dry",
      price: "high",
      tone: "#bc5b55"
    },
    {
      name: "Beef rib pack C",
      labelText: "Beef Rib",
      itemType: "Short rib plate cut",
      animalArea: "Lower rib / plate area",
      fatProfile: "Thicker, more connective tissue",
      bodyGoalFit: "Heavier slow-cook option",
      cookMatch: "Braise, stew, slow curry",
      avoidFor: "Fast pan-sear",
      freshnessCue: "Some liquid pooling",
      cut: "thick",
      freshness: "medium",
      moisture: "wet",
      price: "low",
      tone: "#9a6557"
    }
  ],
  fruit: [
    {
      name: "Apple pack A",
      itemType: "Fuji apple",
      produceKind: "Apple",
      variety: "Fuji",
      ripeness: "Crisp and ready",
      sweetness: "High sweetness",
      labelCue: "Label reads Fuji",
      bestUse: "Eat fresh, lunchbox, sweet snack",
      avoidFor: "Tart baking flavor",
      cut: "medium",
      freshness: "high",
      moisture: "dry",
      price: "medium",
      tone: "#e65f55"
    },
    {
      name: "Apple pack B",
      itemType: "Pink Lady apple",
      produceKind: "Apple",
      variety: "Pink Lady",
      ripeness: "Crisp and ready",
      sweetness: "Sweet-tart",
      labelCue: "Label reads Pink Lady",
      bestUse: "Eat fresh, salad, cheese board",
      avoidFor: "Very soft dessert texture",
      cut: "medium",
      freshness: "high",
      moisture: "normal",
      price: "high",
      tone: "#f18aa0"
    },
    {
      name: "Apple pack C",
      itemType: "Granny Smith apple",
      produceKind: "Apple",
      variety: "Granny Smith",
      ripeness: "Firm and tart",
      sweetness: "Low sweetness",
      labelCue: "Label reads Granny Smith",
      bestUse: "Baking, slaw, tart salad",
      avoidFor: "Sweet snack for kids",
      cut: "medium",
      freshness: "low",
      moisture: "dry",
      price: "low",
      tone: "#8bcf68"
    }
  ],
  veg: [
    {
      name: "Baby spinach pack A",
      labelText: "Baby Spinach",
      itemType: "Baby spinach",
      vegPart: "Leaves",
      textureProfile: "Perky leaves, crisp stems",
      freshnessCue: "Deep green, dry surface, little bruising",
      cookMatch: "Salad, smoothies, quick stir-fry",
      avoidFor: "Long simmer",
      cut: "thin",
      freshness: "high",
      moisture: "dry",
      price: "high",
      tone: "#61b96f"
    },
    {
      name: "Baby spinach pack B",
      labelText: "Baby Spinach",
      itemType: "Baby spinach",
      vegPart: "Leaves",
      textureProfile: "Tender leaves, slightly compressed",
      freshnessCue: "Good color, some moisture in corners",
      cookMatch: "Quick stir-fry, omelet, pasta",
      avoidFor: "Keeping several days",
      cut: "thin",
      freshness: "medium",
      moisture: "normal",
      price: "medium",
      tone: "#78c878"
    },
    {
      name: "Baby spinach pack C",
      labelText: "Baby Spinach",
      itemType: "Baby spinach",
      vegPart: "Leaves",
      textureProfile: "Soft leaves, visible wilting",
      freshnessCue: "Darker wet spots and more crushed leaves",
      cookMatch: "Soup, saute, sauce",
      avoidFor: "Raw salad or storing",
      cut: "thin",
      freshness: "low",
      moisture: "wet",
      price: "low",
      tone: "#7aa76b"
    }
  ],
  seafood: [
    {
      name: "Salmon pack A",
      itemType: "Salmon belly",
      fishPart: "Belly / lower fillet",
      textureProfile: "Fatty, tender, rich",
      freshnessCue: "Glossy surface, bright orange, no heavy pooling",
      cookMatch: "Pan-sear, grill, rice bowl",
      avoidFor: "Light clear soup",
      cut: "medium",
      freshness: "high",
      moisture: "normal",
      price: "high",
      tone: "#ef826b"
    },
    {
      name: "White fish pack B",
      itemType: "Cod loin",
      fishPart: "Thick back loin",
      textureProfile: "Lean, flaky, thick cut",
      freshnessCue: "Pale even color, low liquid",
      cookMatch: "Steam, bake, fish soup",
      avoidFor: "Hard sear without drying",
      cut: "thin",
      freshness: "medium",
      moisture: "dry",
      price: "medium",
      tone: "#8cc1dc"
    },
    {
      name: "Mixed seafood pack",
      itemType: "Seafood mix",
      fishPart: "Mixed pieces",
      textureProfile: "Mixed thickness and textures",
      freshnessCue: "Some dull color and visible liquid",
      cookMatch: "Soup, stew, fried rice",
      avoidFor: "Raw prep or delicate steaming",
      cut: "medium",
      freshness: "low",
      moisture: "wet",
      price: "low",
      tone: "#6f8fa8"
    }
  ]
};

let options = [];
let latestResult = null;
let sourceMode = "sample";
let analysisMode = "demo";
let shoppingState = {
  category: "fruit",
  wantsHelp: true,
  timing: "tonight",
  method: "eatFresh"
};

const categoryPicker = appRoot.querySelector("#categoryPicker");
const methodGroup = appRoot.querySelector("#methodGroup");
const timingGroup = appRoot.querySelector("#timingGroup");
const choiceToggle = appRoot.querySelector("#choiceToggle");
const pickQuestions = appRoot.querySelector("#pickQuestions");
const otherField = appRoot.querySelector("#otherField");
const otherMethodEl = appRoot.querySelector("#otherMethod");
const contextEl = appRoot.querySelector("#context");
const optionGrid = appRoot.querySelector("#optionGrid");
const itemCount = appRoot.querySelector("#itemCount");
const scanNote = appRoot.querySelector("#scanNote");
const resultEl = appRoot.querySelector("#result");
const savedList = appRoot.querySelector("#savedList");
const compareButton = appRoot.querySelector("#compareButton");
const saveButton = appRoot.querySelector("#saveButton");
const photoInput = appRoot.querySelector("#photoInput");
const loadSample = appRoot.querySelector("#loadSample");
const analysisStatus = appRoot.querySelector("#analysisStatus");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function loadSavedPicks() {
  try {
    const saved = JSON.parse(localStorage.getItem("thisone-picks") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    localStorage.removeItem("thisone-picks");
    return [];
  }
}

function safeClass(value) {
  return /^[a-z-]+$/.test(value) ? value : "use";
}

function safeColor(value) {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : "#69d6b1";
}

function setMethods() {
  if (!methodsByCategory[shoppingState.category].some(([value]) => value === shoppingState.method)) {
    shoppingState.method = methodsByCategory[shoppingState.category][0][0];
  }

  methodGroup.innerHTML = methodsByCategory[shoppingState.category]
    .map(
      ([value, label]) =>
        `<button type="button" class="pill ${shoppingState.method === value ? "is-selected" : ""}" data-value="${escapeHtml(value)}">${escapeHtml(label)}</button>`
    )
    .join("");
  updateOtherField();
}

function createOption(file, index = options.length, source = "single") {
  const id = crypto.randomUUID();
  const url = file ? URL.createObjectURL(file) : "";
  const sample = sampleSets[shoppingState.category][index % sampleSets[shoppingState.category].length];
  options.push({
    ...sample,
    id,
    name: file ? `${categoryName(shoppingState.category)} option ${letters[index]}` : sample.name,
    imageUrl: url,
    source
  });
}

function createDetectedOptionsFromShelf(file) {
  const url = URL.createObjectURL(file);
  const samples = sampleSets[shoppingState.category];
  options = samples.map((sample, index) => ({
    ...sample,
    id: crypto.randomUUID(),
    name: `${categoryName(shoppingState.category)} option ${letters[index]}`,
    imageUrl: url,
    source: "shelf",
    crop: index
  }));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("This photo could not be read."));
    reader.readAsDataURL(file);
  });
}

async function compressPhotoForAnalysis(file) {
  const original = await readFileAsDataUrl(file);
  const image = new Image();
  image.src = original;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = () => reject(new Error("This photo could not be prepared."));
  });

  const longestSide = Math.max(image.naturalWidth, image.naturalHeight);
  const scale = Math.min(1, 1100 / longestSide);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.72);
}

function estimateFreshness(value) {
  const text = String(value || "").toLowerCase();
  if (/(bright|firm|dry|clear|good|strong|crisp|vibrant)/.test(text)) return "high";
  if (/(dull|wet|wilt|bruis|pool|soft|check|caution)/.test(text)) return "low";
  return "medium";
}

function estimateMoisture(value) {
  const text = String(value || "").toLowerCase();
  if (/(wet|pool|liquid|watery)/.test(text)) return "wet";
  if (/(dry|low liquid)/.test(text)) return "dry";
  return "normal";
}

function estimatePrice(value) {
  const text = String(value || "").toLowerCase();
  if (/(\$\$\$|high|premium|expensive)/.test(text)) return "high";
  if (/(\$|low|value|cheap)/.test(text)) return "low";
  return "medium";
}

function liveOptionFromAnalysis(item, index, imageUrls) {
  const colors = ["#e87968", "#f18aa0", "#8bcf68", "#8cc1dc"];
  const freshnessCue = item.visible_freshness || "Not clear from the photo";
  const common = {
    id: crypto.randomUUID(),
    name: `${categoryName(shoppingState.category)} option ${letters[index]}`,
    labelText: item.label_text || "Not clear",
    itemType: item.item_type || "Not clear from photo",
    freshnessCue,
    freshness: estimateFreshness(freshnessCue),
    moisture: estimateMoisture(`${freshnessCue} ${item.appearance || ""}`),
    price: estimatePrice(item.price_text),
    cut: "medium",
    tone: colors[index % colors.length],
    imageUrl: imageUrls[Math.min(index, imageUrls.length - 1)] || "",
    source: "live"
  };

  if (shoppingState.category === "meat") {
    return {
      ...common,
      animalArea: item.part_or_variety || "Not clear from photo",
      fatProfile: item.fat_or_texture || "Not clear from photo",
      bodyGoalFit: "Visible-cue estimate only",
      cookMatch: item.best_for || "General cooking",
      avoidFor: item.avoid_for || "No clear mismatch"
    };
  }

  if (shoppingState.category === "seafood") {
    return {
      ...common,
      fishPart: item.part_or_variety || "Not clear from photo",
      textureProfile: item.fat_or_texture || "Not clear from photo",
      cookMatch: item.best_for || "General cooking",
      avoidFor: item.avoid_for || "No clear mismatch"
    };
  }

  if (shoppingState.category === "fruit") {
    return {
      ...common,
      produceKind: item.item_type || "Fruit",
      variety: item.part_or_variety || "Not clear from photo",
      ripeness: item.ripeness || "Not clear from photo",
      sweetness: item.sweetness || "Not clear from photo",
      labelCue: item.label_text || "Not clear from photo",
      bestUse: item.best_for || "General use",
      avoidFor: item.avoid_for || "No clear mismatch"
    };
  }

  return {
    ...common,
    vegPart: item.part_or_variety || "Not clear from photo",
    textureProfile: item.fat_or_texture || item.appearance || "Not clear from photo",
    cookMatch: item.best_for || "General cooking",
    avoidFor: item.avoid_for || "No clear mismatch"
  };
}

async function analyzePhotosWithGPT(files) {
  const images = await Promise.all(files.map(compressPhotoForAnalysis));
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: shoppingState.category, images })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Live analysis is not available right now.");
  }
  if (!Array.isArray(payload.options) || !payload.options.length) {
    throw new Error("ThisOne could not identify clear options in those photos.");
  }
  return payload;
}

function validPhotoFiles(files) {
  return files.filter((file) => file.type.startsWith("image/") && file.size <= maxPhotoBytes);
}

function uploadMessage(originalFiles, acceptedFiles) {
  const rejectedCount = originalFiles.length - acceptedFiles.length;
  const cappedCount = Math.max(0, acceptedFiles.length - maxOptions);
  const messages = [];

  if (rejectedCount) {
    messages.push(`${rejectedCount} file${rejectedCount === 1 ? " was" : "s were"} skipped. Regular image photos under 15MB work best.`);
  }

  if (cappedCount) {
    messages.push(`ThisOne is showing the first ${maxOptions} photos for a clearer comparison.`);
  }

  if (messages.length) return messages.join(" ");
  return "ThisOne found your options. Is the comparison enough, or should it choose one?";
}

function labelForKey(key) {
  return {
    itemType: "Type",
    cut: "Shape",
    freshness: "Visible freshness",
    moisture: "Liquid",
    price: "Price"
  }[key];
}

function analysisFields(option) {
  if (shoppingState.category === "meat") {
    return [
      ["Likely cut", option.itemType],
      ["From", option.animalArea || "Estimated rib area"],
      ["Fat & texture", option.fatProfile || "Visible fat and grain"],
      ["Body goal fit", option.bodyGoalFit || "Depends on portion"],
      ["Freshness", option.freshnessCue || displayValue("freshness", option.freshness)],
      ["Best for", option.cookMatch || cookingTip("meat", inferredMethod())],
      ["Avoid for", option.avoidFor || "No major mismatch visible"]
    ];
  }

  if (shoppingState.category === "seafood") {
    return [
      ["Likely part", option.itemType],
      ["From", option.fishPart || "Estimated fish section"],
      ["Texture", option.textureProfile || "Visible grain and thickness"],
      ["Freshness", option.freshnessCue || displayValue("freshness", option.freshness)],
      ["Best for", option.cookMatch || cookingTip("seafood", inferredMethod())],
      ["Avoid for", option.avoidFor || "No major mismatch visible"]
    ];
  }

  if (shoppingState.category === "fruit") {
    return [
      ["Fruit", option.produceKind || option.itemType],
      ["Variety", option.variety || option.itemType],
      ["Label cue", option.labelCue || "Read from package label"],
      ["Ripeness", option.ripeness || displayValue("freshness", option.freshness)],
      ["Sweetness", option.sweetness || "Not estimated"],
      ["Best for", option.bestUse || "General cooking"],
      ["Avoid for", option.avoidFor || "No major mismatch visible"]
    ];
  }

  if (shoppingState.category === "veg") {
    return [
      ["Vegetable", option.itemType],
      ["Part", option.vegPart || "Visible edible part"],
      ["Texture", option.textureProfile || "Visible texture"],
      ["Freshness", option.freshnessCue || displayValue("freshness", option.freshness)],
      ["Best for", option.cookMatch || cookingTip("veg", inferredMethod())],
      ["Avoid for", option.avoidFor || "No major mismatch visible"]
    ];
  }

  return [
    ["Type", option.itemType],
    ["Freshness", displayValue("freshness", option.freshness)],
    ["Shape", displayValue("cut", option.cut)],
    ["Liquid", displayValue("moisture", option.moisture)],
    ["Price", displayValue("price", option.price)]
  ];
}

function metricFields(option) {
  if (shoppingState.category === "fruit") {
    return [
      { icon: "variety", label: "Variety", value: option.variety || option.itemType },
      { icon: "ripe", label: "Ripeness", value: ripenessLevel(option) },
      { icon: "sweet", label: "Sweetness", value: sweetnessLevel(option) },
      { icon: "use", label: "Best", value: shortBestUse(option.bestUse) }
    ];
  }

  if (shoppingState.category === "veg") {
    return [
      { icon: "part", label: "Part", value: option.vegPart || "Visible part" },
      { icon: "fresh", label: "Freshness", value: freshnessLevel(option) },
      { icon: "texture", label: "Texture", value: textureLevel(option) },
      { icon: "use", label: "Best", value: shortBestUse(option.cookMatch) }
    ];
  }

  if (shoppingState.category === "seafood") {
    return [
      { icon: "part", label: "Part", value: option.fishPart || option.itemType },
      { icon: "fat", label: "Fat", value: fatLevel(option) },
      { icon: "texture", label: "Tenderness", value: tendernessLevel(option) },
      { icon: "fresh", label: "Freshness", value: freshnessLevel(option) },
      { icon: "use", label: "Best", value: shortBestUse(option.cookMatch) }
    ];
  }

  if (shoppingState.category === "meat") {
    return [
      { icon: "part", label: "Part", value: option.animalArea || option.itemType },
      { icon: "fat", label: "Fat", value: fatLevel(option) },
      { icon: "texture", label: "Tenderness", value: tendernessLevel(option) },
      { icon: "fresh", label: "Freshness", value: freshnessLevel(option) },
      { icon: "use", label: "Best", value: shortBestUse(option.cookMatch) }
    ];
  }

  return [
    { icon: "fresh", label: "Freshness", value: freshnessLevel(option) },
    { icon: "texture", label: "Texture", value: displayValue("cut", option.cut) },
    { icon: "price", label: "Price", value: displayValue("price", option.price) }
  ];
}

function freshnessLevel(option) {
  if (option.freshness === "high") return "Good";
  if (option.freshness === "medium") return "Okay";
  return "Check";
}

function sweetnessLevel(option) {
  const text = (option.sweetness || "").toLowerCase();
  if (text.includes("low")) return "Low";
  if (text.includes("tart")) return "Medium";
  if (text.includes("high")) return "High";
  return "Estimate";
}

function ripenessLevel(option) {
  const text = (option.ripeness || "").toLowerCase();
  if (text.includes("firm")) return "Firm";
  if (text.includes("ready") || text.includes("crisp")) return "Ready";
  if (text.includes("soft")) return "Soft";
  return "Estimate";
}

function fatLevel(option) {
  const text = `${option.fatProfile || ""} ${option.bodyGoalFit || ""} ${option.textureProfile || ""} ${option.itemType || ""}`.toLowerCase();
  if (text.includes("lean")) return "Low";
  if (text.includes("more marbling") || text.includes("higher fat") || text.includes("fatty") || text.includes("belly") || text.includes("rich")) return "High";
  if (text.includes("heavier")) return "Medium";
  return "Medium";
}

function tendernessLevel(option) {
  const text = `${option.itemType || ""} ${option.textureProfile || ""} ${option.fatProfile || ""}`.toLowerCase();
  if (text.includes("ribeye") || text.includes("tender") || text.includes("belly")) return "Tender";
  if (text.includes("connective") || text.includes("short rib")) return "Slow cook";
  if (text.includes("mixed")) return "Mixed";
  if (text.includes("firm") || text.includes("root")) return "Firm";
  if (text.includes("flaky")) return "Flaky";
  return "Medium";
}

function textureLevel(option) {
  const text = `${option.textureProfile || ""} ${option.fatProfile || ""}`.toLowerCase();
  if (text.includes("tender")) return "Tender";
  if (text.includes("firm") || text.includes("crisp")) return "Firm";
  if (text.includes("soft")) return "Soft";
  if (text.includes("flaky")) return "Flaky";
  if (text.includes("rich")) return "Rich";
  return "Medium";
}

function shortBestUse(value = "") {
  return value.split(",")[0] || "General";
}

function renderOptions() {
  itemCount.textContent = `${options.length} found`;
  scanNote.textContent = analysisMode === "live"
    ? "GPT-5.6 analyzed visible packaging and food cues. Estimates are shown only when the photo supports them."
    : sourceMode === "shelf"
      ? "ThisOne split one shelf photo into A/B/C for comparison. Up to 4 options work best."
      : sourceMode === "photos"
        ? "ThisOne is treating each uploaded photo as one option, up to 4 total."
        : "ThisOne has loaded a demo shelf with three options. You can compare up to 4.";
  analysisStatus.textContent = analysisMode === "live"
    ? "Live analysis: GPT-5.6 read visible cues from the photos. Check labels, dates, and food safety yourself."
    : "Demo mode: load a sample shelf, or upload photos after live analysis is set up.";

  optionGrid.innerHTML = options
    .map((option, index) => {
      const letter = letters[index] || "?";
      const photo = option.imageUrl
        ? `<img class="${option.source === "shelf" ? `crop crop-${option.crop}` : ""}" src="${option.imageUrl}" alt="Option ${escapeHtml(letter)}" />`
        : `<div class="photo-fallback" style="background: linear-gradient(145deg, ${safeColor(option.tone)}, #fff0e7)">Option ${escapeHtml(letter)}</div>`;

      return `
        <article class="option-card">
          <div class="photo-box">
            ${photo}
            <span class="option-letter">${escapeHtml(letter)}</span>
          </div>
          <div class="option-body">
            <div class="option-title">
              <span>Option ${escapeHtml(letter)}</span>
              <button class="remove-button" type="button" data-remove="${escapeHtml(option.id)}" aria-label="Remove option ${escapeHtml(letter)}">X</button>
            </div>
            ${option.labelText ? `<div class="label-strip">Label: ${escapeHtml(option.labelText)}</div>` : ""}
            <p class="item-summary">${escapeHtml(summaryLine(option))}</p>
            <div class="metric-grid">
              ${metricFields(option).map(metricChip).join("")}
            </div>
            <p class="auto-note">${escapeHtml(autoNote(option))}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function metricChip(metric) {
  return `
    <div class="metric-chip">
      <span class="metric-icon ${safeClass(metric.icon)}" aria-hidden="true"></span>
      <span class="metric-copy">
        <span>${escapeHtml(metric.label)}</span>
        <strong>${escapeHtml(metric.value)}</strong>
      </span>
    </div>
  `;
}

function analysisChip(label, value) {
  return `
    <div class="analysis-chip">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `;
}

function autoNote(option) {
  if (shoppingState.category === "meat") {
    return `Visible-cue estimate: ${option.cookMatch}. ${option.avoidFor ? `Avoid for ${option.avoidFor.toLowerCase()}.` : ""}`;
  }
  if (shoppingState.category === "seafood") {
    return `Visible-cue estimate: ${option.cookMatch}. ${option.avoidFor ? `Avoid for ${option.avoidFor.toLowerCase()}.` : ""}`;
  }
  if (shoppingState.category === "fruit") {
    return `Visible-cue estimate: ${option.bestUse}. ${option.sweetness ? `${option.sweetness}.` : ""}`;
  }
  if (shoppingState.category === "veg") {
    return `Visible-cue estimate: ${option.cookMatch}. ${option.avoidFor ? `Avoid for ${option.avoidFor.toLowerCase()}.` : ""}`;
  }
  if (option.freshness === "high" && option.moisture !== "wet") {
    return "Looks like a strong candidate from the photo.";
  }
  if (option.moisture === "wet") {
    return "Visible liquid may make this less ideal for quick cooking.";
  }
  if (option.freshness === "low") {
    return "Visible cues suggest checking this one more carefully.";
  }
  return "Looks usable, with no obvious visual standout.";
}

function summaryLine(option) {
  if (shoppingState.category === "meat") {
    return `${option.itemType} · ${option.fatProfile || "visible texture"} · ${displayValue("price", option.price)}`;
  }
  if (shoppingState.category === "seafood") {
    return `${option.itemType} · ${option.textureProfile || "visible texture"} · ${displayValue("price", option.price)}`;
  }
  if (shoppingState.category === "fruit") {
    return `${option.produceKind || option.itemType} · ${option.ripeness || "ripeness estimated"} · ${option.sweetness || displayValue("price", option.price)}`;
  }
  if (shoppingState.category === "veg") {
    return `${option.itemType} · ${option.textureProfile || "visible texture"} · ${displayValue("price", option.price)}`;
  }
  return `${option.itemType} · ${displayValue("freshness", option.freshness)} · ${displayValue("price", option.price)}`;
}

function displayValue(key, value) {
  const group = key === "itemType" ? cueOptions.itemType[shoppingState.category] : cueOptions[key];
  return group.find(([itemValue]) => itemValue === value)?.[1] || value;
}

function scoreOption(option) {
  let score = 50;
  const goal = inferredMethod();
  const priority = priorityFromTiming();
  const dietaryText = contextEl.value.trim().toLowerCase();

  score += option.freshness === "high" ? 18 : option.freshness === "low" ? -18 : 4;
  score += option.moisture === "dry" ? 8 : option.moisture === "wet" ? -12 : 5;
  score += option.price === "low" ? 6 : option.price === "high" ? -3 : 3;

  if (["stirFry", "hotpot", "salad"].includes(goal)) {
    score += option.cut === "thin" ? 15 : option.cut === "thick" ? -10 : 5;
    if (/rib finger|intercostal/i.test(option.itemType)) score += 10;
    if (/short rib/i.test(option.itemType)) score -= 7;
  }

  if (["braise", "soup", "grill", "roast", "bake"].includes(goal)) {
    score += option.cut === "thick" ? 12 : option.cut === "thin" ? -4 : 6;
    if (goal === "braise" && /short rib/i.test(option.itemType)) score += 12;
    if (["grill", "sear"].includes(goal) && /ribeye cap/i.test(option.itemType)) score += 12;
    if (shoppingState.category === "seafood" && goal === "soup" && /cod loin|seafood mix/i.test(option.itemType)) score += 10;
    if (shoppingState.category === "seafood" && ["grill", "bake"].includes(goal) && /salmon belly|cod loin/i.test(option.itemType)) score += 10;
    if (shoppingState.category === "veg" && goal === "roast" && /firm|root/i.test(`${option.textureProfile || ""} ${option.itemType}`)) score += 8;
  }

  if (["sear", "steam"].includes(goal)) {
    score += option.freshness === "high" ? 9 : option.freshness === "low" ? -12 : 2;
    score += option.moisture === "normal" ? 7 : option.moisture === "wet" ? -8 : 2;
    if (goal === "sear" && /ribeye cap/i.test(option.itemType)) score += 14;
    if (shoppingState.category === "seafood" && goal === "sear" && /salmon belly/i.test(option.itemType)) score += 12;
    if (shoppingState.category === "seafood" && goal === "steam" && /cod loin|whole fish/i.test(option.itemType)) score += 12;
  }

  if (shoppingState.category === "fruit" && ["eatFresh", "salad", "smoothie"].includes(goal)) {
    score += /ready|very ripe/i.test(option.ripeness || "") ? 12 : -3;
    score += /richer|mild/i.test(option.sweetness || "") ? 6 : 0;
  }

  if (shoppingState.category === "fruit" && /(diabetes|diabetic|low sugar|less sugar|blood sugar|低糖|糖尿病)/i.test(dietaryText)) {
    score += /low sweetness|sweet-tart/i.test(option.sweetness || "") ? 14 : -12;
    score += /very ripe|high sweetness/i.test(`${option.ripeness || ""} ${option.sweetness || ""}`) ? -10 : 0;
  }

  if (shoppingState.category === "meat" && /(weight control|weight loss|cutting|lean|low fat|lower fat|high protein|muscle gain|gain muscle|gym|健身|减脂|增肌|低脂|高蛋白)/i.test(dietaryText)) {
    score += /lean/i.test(option.fatProfile || "") ? 18 : 0;
    score += /marbling|fatty|rich/i.test(option.fatProfile || "") ? -14 : 0;
    score += /connective|thicker/i.test(option.fatProfile || "") ? -4 : 0;
  }

  if (shoppingState.category === "veg" && ["salad", "stirFry"].includes(goal)) {
    score += /tender|crisp|leaf/i.test(`${option.textureProfile || ""} ${option.itemType}`) ? 8 : 0;
  }

  if (priority === "keepsLonger") {
    score += option.freshness === "high" ? 8 : option.freshness === "low" ? -10 : 2;
    score += option.moisture === "dry" ? 8 : option.moisture === "wet" ? -10 : 2;
    if (shoppingState.category === "fruit" && /firm|crisp/i.test(option.ripeness || "")) score += 12;
    if (shoppingState.category === "veg" && option.moisture !== "wet") score += 8;
  }

  if (goal === "other" && otherMethodEl.value.trim()) {
    score += scoreForOtherDish(option, otherMethodEl.value.trim().toLowerCase());
  }

  return Math.max(0, Math.min(100, score));
}

function scoreForOtherDish(option, text) {
  let score = 0;
  if (/(stir|炒|bulgogi|taco|fajita|quick)/i.test(text)) score += option.cut === "thin" ? 12 : -4;
  if (/(stew|braise|curry|soup|炖|咖喱)/i.test(text)) score += option.cut === "thick" ? 12 : 3;
  if (/(grill|roast|bbq|烤)/i.test(text)) score += option.moisture === "wet" ? -8 : 6;
  if (/(salad|raw|沙拉)/i.test(text)) score += option.freshness === "high" ? 12 : -8;
  return score;
}

function explainWinner(winner) {
  const reasons = [];

  if (shoppingState.category === "meat") {
    reasons.push(`This looks closest to ${winner.itemType}, likely from the ${winner.animalArea?.toLowerCase() || "rib area"}.`);
    reasons.push(`${winner.fatProfile} makes it better for ${winner.cookMatch?.toLowerCase() || getMethodLabel().toLowerCase()}.`);
    if (/(weight control|weight loss|cutting|lean|low fat|lower fat|high protein|muscle gain|gain muscle|gym|健身|减脂|增肌|低脂|高蛋白)/i.test(contextEl.value)) {
      reasons.push("Because you mentioned body goals, ThisOne favors the leaner, lower-fat-looking option.");
    }
    reasons.push(`Freshness cue: ${winner.freshnessCue || displayValue("freshness", winner.freshness)}.`);
    if (winner.avoidFor) reasons.push(`I would avoid it for ${winner.avoidFor.toLowerCase()}.`);
    return reasons.slice(0, 4);
  }

  if (shoppingState.category === "seafood") {
    reasons.push(`This looks closest to ${winner.itemType}, likely from the ${winner.fishPart?.toLowerCase() || "fish section shown"}.`);
    reasons.push(`${winner.textureProfile} makes it better for ${winner.cookMatch?.toLowerCase() || getMethodLabel().toLowerCase()}.`);
    reasons.push(`Freshness cue: ${winner.freshnessCue || displayValue("freshness", winner.freshness)}.`);
    if (winner.avoidFor) reasons.push(`I would avoid it for ${winner.avoidFor.toLowerCase()}.`);
    return reasons.slice(0, 4);
  }

  if (shoppingState.category === "fruit") {
    reasons.push(`This ${winner.produceKind?.toLowerCase() || "item"} looks ${winner.ripeness?.toLowerCase() || "usable"} from visible cues.`);
    if (winner.variety) reasons.push(`The label appears to identify it as ${winner.variety}.`);
    reasons.push(`Estimated sweetness: ${winner.sweetness?.toLowerCase() || "not clear from the photo"}.`);
    if (/(diabetes|diabetic|low sugar|less sugar|blood sugar|低糖|糖尿病)/i.test(contextEl.value)) {
      reasons.push("Because you mentioned sugar needs, ThisOne avoids the sweetest or very ripe-looking option.");
    }
    reasons.push(`Best use: ${winner.bestUse?.toLowerCase() || getMethodLabel().toLowerCase()}.`);
    if (winner.avoidFor) reasons.push(`I would avoid it for ${winner.avoidFor.toLowerCase()}.`);
    return reasons.slice(0, 4);
  }

  if (shoppingState.category === "veg") {
    reasons.push(`This looks like ${winner.itemType?.toLowerCase() || "the best vegetable option"}, focused on the ${winner.vegPart?.toLowerCase() || "visible edible part"}.`);
    reasons.push(`${winner.textureProfile} makes it better for ${winner.cookMatch?.toLowerCase() || getMethodLabel().toLowerCase()}.`);
    reasons.push(`Freshness cue: ${winner.freshnessCue || displayValue("freshness", winner.freshness)}.`);
    if (winner.avoidFor) reasons.push(`I would avoid it for ${winner.avoidFor.toLowerCase()}.`);
    return reasons.slice(0, 4);
  }

  if (winner.freshness === "high") {
    reasons.push("It has the strongest visible freshness cues.");
  } else if (winner.freshness === "medium") {
    reasons.push("It looks acceptable from the visible cues.");
  }

  if (winner.moisture !== "wet") {
    reasons.push("There is less visible liquid, which usually makes it easier to cook well.");
  }

  if (["stirFry", "hotpot", "salad"].includes(inferredMethod()) && winner.cut === "thin") {
    reasons.push("The smaller shape should cook quickly and evenly.");
  }

  if (["braise", "soup", "grill"].includes(inferredMethod()) && winner.cut === "thick") {
    reasons.push("The larger pieces fit slower cooking better.");
  }

  if (shoppingState.timing === "later") {
    reasons.push("For later this week, it avoids the wetter or more delicate-looking options.");
  }

  if (shoppingState.method === "other" && otherMethodEl.value.trim()) {
    reasons.push(`It is the best match for “${otherMethodEl.value.trim()}” from the options shown.`);
  }

  if (reasons.length < 3) {
    reasons.push("It gives the best balance of visible freshness, shape, and price.");
  }

  return reasons.slice(0, 4);
}

function cookingTip(category, goal) {
  const tips = {
    meat: {
      stirFry: "Pat dry, slice thin if needed, and cook fast in a hot pan.",
      braise: "Brown first, then cook low and slow.",
      sear: "Dry the surface well and avoid crowding the pan.",
      grill: "Season simply and let it rest after cooking.",
      hotpot: "Keep pieces thin and cook briefly.",
      other: "Use the shape and moisture cues to match the dish you typed."
    },
    fruit: {
      eatFresh: "Pick the variety and ripeness that match when you want to eat it.",
      salad: "Choose crisp fruit that will hold its shape.",
      bake: "Tart or firmer fruit usually holds up better in baking.",
      smoothie: "Use the ripest and sweetest-looking option.",
      other: "Match variety, ripeness, and sweetness to the dish you typed."
    },
    veg: {
      salad: "Wash, dry, and cut right before serving.",
      stirFry: "Cut evenly and cook quickly over higher heat.",
      roast: "Choose firmer pieces and roast until tender.",
      soup: "Simmer until soft, then season at the end.",
      other: "Match leaf, stem, root, or cap texture to the dish you typed."
    },
    seafood: {
      steam: "Steam gently and stop as soon as it turns opaque.",
      sear: "Pat dry and sear over medium-high heat.",
      soup: "Add near the end so it does not overcook.",
      grill: "Oil lightly and avoid moving it too early.",
      bake: "Bake gently and stop when it flakes easily.",
      other: "For seafood, pick the cleanest visible cues and cook soon."
    }
  };

  return tips[category][goal] || "Keep it simple and cook it soon.";
}

function compareOptions() {
  if (!shoppingState.wantsHelp) {
    showScanOnly();
    return;
  }

  if (options.length < 2) {
    resultEl.className = "empty-result";
    resultEl.textContent = "Add at least two options first.";
    saveButton.disabled = true;
    return;
  }

  const ranked = options
    .map((option, index) => ({
      ...option,
      letter: letters[index],
      score: scoreOption(option)
    }))
    .sort((a, b) => b.score - a.score);

  const winner = ranked[0];
  const reasons = explainWinner(winner);
  latestResult = {
    winner: winner.letter,
    name: winner.name,
    goal: getMethodLabel(),
    timing: getTimingLabel(),
    reasons,
    tip: cookingTip(shoppingState.category, inferredMethod()),
    ranked,
    context: contextEl.value.trim()
  };

  resultEl.className = "decision-board";
  resultEl.innerHTML = `
    <div class="winner-layout">
      <div class="winner-photo">
        ${imageMarkup(winner)}
        <span class="option-letter">${escapeHtml(winner.letter)}</span>
      </div>
      <div class="winner">
        <p>Buy this one</p>
        <strong>Option ${escapeHtml(winner.letter)}</strong>
        <span>${escapeHtml(getMethodLabel())} · ${escapeHtml(getTimingLabel())}</span>
      </div>
    </div>
    <ul class="reason-list">
      ${reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
    </ul>
    <div class="rank-table">
      ${ranked.map(rankRow).join("")}
    </div>
    <div class="tip-box">
      <strong>Cooking note</strong>
      <span>${escapeHtml(latestResult.tip)}</span>
    </div>
  `;
  saveButton.disabled = false;
}

function rankRow(item) {
  return `
    <div class="rank-row">
      <span>Option ${escapeHtml(item.letter)}</span>
      <span>${escapeHtml(rankDescription(item))}</span>
      <span class="score">${escapeHtml(item.score)}</span>
    </div>
  `;
}

function rankDescription(item) {
  if (shoppingState.category === "fruit") {
    return `${item.produceKind || item.itemType} · ${item.ripeness || "ripeness estimated"} · ${item.bestUse || "general use"}`;
  }
  if (shoppingState.category === "veg") {
    return `${item.itemType} · ${item.textureProfile || "visible texture"} · ${item.cookMatch || "general use"}`;
  }
  return `${item.itemType}${item.cookMatch ? ` · ${item.cookMatch}` : ""}`;
}

function imageMarkup(option) {
  return option.imageUrl
    ? `<img class="${option.source === "shelf" ? `crop crop-${option.crop}` : ""}" src="${option.imageUrl}" alt="Option ${escapeHtml(option.letter || "")}" />`
    : `<div class="photo-fallback" style="background: linear-gradient(145deg, ${safeColor(option.tone)}, #fff0e7)">Option ${escapeHtml(option.letter || "")}</div>`;
}

function showScanOnly() {
  latestResult = null;
  saveButton.disabled = true;
  resultEl.className = "decision-board";
  resultEl.innerHTML = `
    <div class="scan-only">
      <strong>Comparison summary</strong>
      <span>No pick made. Here is the side-by-side comparison.</span>
    </div>
    <div class="scan-summary-grid">
      ${options
        .map(
          (option, index) => `
          <div class="scan-summary-card">
            <span class="small-letter">${escapeHtml(letters[index])}</span>
            <strong>${escapeHtml(option.itemType)}</strong>
            <p>${escapeHtml(summaryLine(option))}</p>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

function loadSamples(showResult = false) {
  revokeImageUrls();
  sourceMode = "sample";
  analysisMode = "demo";
  options = sampleSets[shoppingState.category].map((sample) => ({
    ...sample,
    id: crypto.randomUUID(),
    imageUrl: "",
    source: "sample"
  }));
  latestResult = null;
  saveButton.disabled = true;
  renderOptions();
  if (showResult) {
    showScanOnly();
  } else {
    resultEl.className = "empty-result";
    resultEl.textContent = "Review the comparison, then decide if you want ThisOne to choose.";
  }
}

function savePick() {
  if (!latestResult) return;
  const saved = loadSavedPicks();
  saved.unshift({
    ...latestResult,
    createdAt: new Date().toLocaleString()
  });
  localStorage.setItem("thisone-picks", JSON.stringify(saved.slice(0, 8)));
  renderSaved();
}

function renderSaved() {
  const saved = loadSavedPicks();
  if (!saved.length) {
    savedList.innerHTML = `<p class="helper-text">Saved picks will appear here.</p>`;
    return;
  }

  savedList.innerHTML = saved
    .map(
      (item) => `
      <div class="saved-item">
        <div>
          <strong>Option ${escapeHtml(item.winner)}</strong>
          <p class="helper-text">${escapeHtml(item.goal)} · ${escapeHtml(item.timing)} · ${escapeHtml(item.createdAt)}</p>
        </div>
        <span class="score">Saved</span>
      </div>
    `
    )
    .join("");
}

function priorityFromTiming() {
  return shoppingState.timing === "later" ? "keepsLonger" : "bestTonight";
}

function inferredMethod() {
  return shoppingState.method;
}

function getMethodLabel() {
  if (shoppingState.method === "other") {
    return otherMethodEl.value.trim() || "Custom dish";
  }
  return methodsByCategory[shoppingState.category].find(([value]) => value === shoppingState.method)?.[1] || "Cooking plan";
}

function getTimingLabel() {
  return {
    tonight: "tonight",
    tomorrow: "tomorrow",
    later: "later this week",
    unsure: "not sure yet"
  }[shoppingState.timing];
}

function categoryName(category) {
  return {
    meat: "Meat",
    fruit: "Fruit",
    veg: "Veg",
    seafood: "Seafood"
  }[category];
}

function selectPill(group, value) {
  group.querySelectorAll(".pill").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.value === value);
  });
}

function updateOtherField() {
  otherField.classList.toggle("is-visible", shoppingState.method === "other");
}

function setHelpMode(wantsHelp) {
  shoppingState.wantsHelp = wantsHelp;
  choiceToggle.querySelectorAll(".toggle-button").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.help === (wantsHelp ? "yes" : "no"));
  });
  pickQuestions.classList.toggle("is-muted", !wantsHelp);
  compareButton.textContent = wantsHelp ? "Pick this one" : "Keep comparison only";
}

function revokeImageUrls() {
  const seen = new Set();
  options.forEach((option) => {
    if (option.imageUrl && !seen.has(option.imageUrl)) {
      URL.revokeObjectURL(option.imageUrl);
      seen.add(option.imageUrl);
    }
  });
}

categoryPicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  shoppingState.category = button.dataset.category;
  categoryPicker.querySelectorAll(".category-card").forEach((card) => {
    card.classList.toggle("is-selected", card === button);
  });
  setMethods();
  loadSamples();
});

choiceToggle.addEventListener("click", (event) => {
  const button = event.target.closest("[data-help]");
  if (!button) return;
  setHelpMode(button.dataset.help === "yes");
});

timingGroup.addEventListener("click", (event) => {
  const button = event.target.closest("[data-value]");
  if (!button) return;
  shoppingState.timing = button.dataset.value;
  selectPill(timingGroup, shoppingState.timing);
});

methodGroup.addEventListener("click", (event) => {
  const button = event.target.closest("[data-value]");
  if (!button) return;
  shoppingState.method = button.dataset.value;
  selectPill(methodGroup, shoppingState.method);
  updateOtherField();
});

photoInput.addEventListener("change", async (event) => {
  const files = Array.from(event.target.files);
  if (!files.length) return;
  const acceptedFiles = validPhotoFiles(files);
  revokeImageUrls();
  options = [];
  latestResult = null;
  saveButton.disabled = true;

  if (!acceptedFiles.length) {
    renderOptions();
    resultEl.className = "empty-result";
    resultEl.textContent = "No usable photos found. Please upload regular image photos under 15MB.";
    photoInput.value = "";
    return;
  }

  const filesToUse = acceptedFiles.slice(0, maxOptions);
  const imageUrls = filesToUse.map((file) => URL.createObjectURL(file));
  resultEl.className = "empty-result";
  resultEl.textContent = "GPT-5.6 is reading the visible labels and food cues...";
  photoInput.disabled = true;

  try {
    const analysis = await analyzePhotosWithGPT(filesToUse);
    analysisMode = "live";
    sourceMode = filesToUse.length === 1 ? "shelf" : "photos";
    options = analysis.options
      .slice(0, maxOptions)
      .map((item, index) => liveOptionFromAnalysis(item, index, imageUrls));
    renderOptions();
    resultEl.textContent = analysis.summary || "Your comparison is ready. Ask ThisOne to choose if you want a recommendation.";
  } catch (error) {
    imageUrls.forEach((url) => URL.revokeObjectURL(url));
    options = [];
    analysisMode = "demo";
    renderOptions();
    resultEl.textContent = `${error.message} You can still use Load demo scan.`;
  } finally {
    photoInput.disabled = false;
    photoInput.value = "";
  }
});

optionGrid.addEventListener("click", (event) => {
  const id = event.target.dataset.remove;
  if (!id) return;
  const option = options.find((item) => item.id === id);
  if (option?.imageUrl && !options.some((item) => item.id !== id && item.imageUrl === option.imageUrl)) {
    URL.revokeObjectURL(option.imageUrl);
  }
  options = options.filter((item) => item.id !== id);
  latestResult = null;
  saveButton.disabled = true;
  renderOptions();
});

loadSample.addEventListener("click", () => loadSamples(true));
compareButton.addEventListener("click", compareOptions);
saveButton.addEventListener("click", savePick);

setMethods();
setHelpMode(true);
loadSamples();
renderSaved();
