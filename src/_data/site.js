// Společná nastavení webu: jazyky, adresy stránek, modely.
const BASE = "https://elbilnorden.no/";
const langs = ["no", "en", "sv", "da", "fi", "cs"];
const noSlug = { home: "/", camper: "camper.html", dealer: "forhandler.html", privacy: "personvern.html" };

function url(lang, slug) {
  if (lang === "no") return noSlug[slug] ?? `${slug}.html`;
  return slug === "home" ? `${lang}.html` : `${lang}-${slug}.html`;
}
function abs(lang, slug) {
  const u = url(lang, slug);
  return u === "/" ? BASE : BASE + u;
}

export default {
  base: BASE,
  langs,
  url,
  abs,
  homeHref: (lang) => (lang === "no" ? "/" : `${lang}.html`),
  ogLocale: { no: "nb_NO", en: "en_GB", sv: "sv_SE", da: "da_DK", fi: "fi_FI", cs: "cs_CZ" },
  models: [
    { slug: "evoxx", name: "eVOXX" },
    { slug: "ebear", name: "eBEAR" },
    { slug: "ebold", name: "eBOLD" },
    { slug: "ehaustus", name: "eHAUSTUS" },
  ],
  vans: ["Mercedes Sprinter", "VW Crafter", "Ford Transit", "Fiat Ducato", "Citroën Jumper", "Peugeot Boxer",
         "Iveco Daily", "Renault Master", "Hyundai H350", "MAN TGE"],
  video: { home: "v1uC8H5v17A", camper: "f0vvUnzMfxI" },
  // Ceny Nordic Camper (zobrazují se jen v norské verzi, ostatní jazyky mají „cena na vyžádání“)
  camperPrices: { basic: "189 000 kr", pro: "239 000 kr" },
};
