/* elbilnorden.no — Google Analytics 4 with cookie consent.
   Set GA_ID to your Measurement ID from Google Analytics (Admin → Data streams → Web). */
var GA_ID = "G-R9P38S62WD";

(function () {
  var KEY = "ebold-consent";
  var T = {
    no: { text: "Vi bruker informasjonskapsler til anonym besøksstatistikk (Google Analytics). Du velger selv.", more: "Personvern", yes: "Godta", no: "Avslå", href: "personvern.html" },
    en: { text: "We use cookies for anonymous visitor statistics (Google Analytics). It's your choice.", more: "Privacy", yes: "Accept", no: "Decline", href: "en-privacy.html" },
    sv: { text: "Vi använder cookies för anonym besöksstatistik (Google Analytics). Du väljer själv.", more: "Integritet", yes: "Godkänn", no: "Avböj", href: "sv-privacy.html" },
    da: { text: "Vi bruger cookies til anonym besøgsstatistik (Google Analytics). Du bestemmer selv.", more: "Privatliv", yes: "Accepter", no: "Afvis", href: "da-privacy.html" },
    fi: { text: "Käytämme evästeitä anonyymiin kävijätilastointiin (Google Analytics). Sinä päätät.", more: "Tietosuoja", yes: "Hyväksy", no: "Hylkää", href: "fi-privacy.html" },
    cs: { text: "Používáme cookies pro anonymní statistiku návštěvnosti (Google Analytics). Je to na vás.", more: "Ochrana údajů", yes: "Přijmout", no: "Odmítnout", href: "cs-privacy.html" }
  };
  var lang = (document.documentElement.lang || "no").slice(0, 2);
  if (lang === "nb" || lang === "nn") lang = "no";
  var t = T[lang] || T.no;

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });

  function loadGA() {
    if (!/^G-[A-Z0-9]+$/.test(GA_ID) || GA_ID === "G-XXXXXXXXXX") return;
    gtag("consent", "update", { analytics_storage: "granted" });
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}
  if (choice === "yes") { loadGA(); return; }
  if (choice === "no") return;

  function showBanner() {
    var d = document.createElement("div");
    d.id = "cookie-banner";
    d.setAttribute("role", "dialog");
    d.style.cssText = "position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;padding:16px 18px;background:#14161A;color:#F2F0EB;border-radius:6px;box-shadow:0 8px 30px rgba(0,0,0,.25);font:14px/1.5 'IBM Plex Sans',system-ui,sans-serif";
    d.innerHTML = "<div style='margin-bottom:12px'>" + t.text + " <a href='" + t.href + "' style='color:#F2F0EB;text-decoration:underline'>" + t.more + "</a></div>" +
      "<div style='display:flex;gap:10px;flex-wrap:wrap'>" +
      "<button type='button' data-c='yes' style='background:#D8552A;color:#fff;border:0;border-radius:4px;padding:9px 18px;font:600 14px \"IBM Plex Sans\",system-ui,sans-serif;cursor:pointer'>" + t.yes + "</button>" +
      "<button type='button' data-c='no' style='background:transparent;color:#F2F0EB;border:1px solid rgba(242,240,235,.5);border-radius:4px;padding:9px 18px;font:600 14px \"IBM Plex Sans\",system-ui,sans-serif;cursor:pointer'>" + t.no + "</button></div>";
    d.addEventListener("click", function (e) {
      var c = e.target && e.target.getAttribute("data-c");
      if (!c) return;
      try { localStorage.setItem(KEY, c); } catch (err) {}
      if (c === "yes") loadGA();
      d.remove();
    });
    document.body.appendChild(d);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showBanner); else showBanner();
})();
