// Eleventy config for elbilnorden.no
// Šablony: src/  ·  texty pro jazyky: src/_data/i18n/<jazyk>.json  ·  výstup: _site/ (nahrává se na one.com)
import site from "./src/_data/site.js";

export default function (eleventyConfig) {
  // Soubory, které se kopírují na web beze změny
  for (const p of [
    "images", "site.css", "v3.css", "analytics.js", "motion.js", "send.php", ".htaccess", "robots.txt", "sitemap.xml",
    "favicon.ico", "favicon.svg", "favicon-192.png", "favicon-512.png", "apple-touch-icon.png", "site.webmanifest",
  ]) eleventyConfig.addPassthroughCopy(p);

  // {{ "ebold" | url(lang) }} -> "ebold.html" / "cs-ebold.html"
  eleventyConfig.addFilter("url", (slug, lang) => site.url(lang, slug));
  // absolutní adresa pro canonical / hreflang
  eleventyConfig.addFilter("abs", (slug, lang) => site.abs(lang, slug));
  // nezlomitelné mezery mezi číslem a jednotkou (12 V, 48 l, 189 000 kr …)
  eleventyConfig.addFilter("nb", (s) =>
    String(s ?? "").replace(/(\d) (V|W|l|cm|kg|kr|m²|×)(?=[\s.,)]|$)/g, "$1 $2"));
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    templateFormats: ["njk"],
  };
}
