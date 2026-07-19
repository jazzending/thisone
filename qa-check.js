const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const app = fs.readFileSync("app.js", "utf8");
const html = fs.readFileSync("index.html", "utf8");

new vm.Script(app);

assert(app.includes("function escapeHtml"), "Missing HTML escaping helper");
assert(app.includes("const maxOptions = 4"), "Missing max option limit");
assert(app.includes("15 * 1024 * 1024"), "Missing 15MB photo limit");
assert(app.includes("validPhotoFiles"), "Missing upload validation");
assert(app.includes("loadSavedPicks"), "Missing saved-state recovery");
assert(html.includes("Demo mode"), "Missing demo-mode disclosure");
assert(html.includes("15MB"), "Missing upload size guidance");
assert(app.includes('fetch("/api/analyze"'), "Missing live analysis request");
assert(fs.existsSync("api/analyze.mjs"), "Missing secure API handler");
assert(fs.readFileSync(".gitignore", "utf8").includes(".env"), "Missing API key protection");

console.log("ThisOne QA checks passed.");
