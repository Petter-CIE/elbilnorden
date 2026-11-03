/* Elbilnorden – jemné animace: objevování obsahu při posouvání, nájezd úvodu, načítání čísel.
   Respektuje „omezit pohyb“ v systému; bez JavaScriptu je vše normálně vidět. */
(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector("header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 8); }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  if (reduce || !("IntersectionObserver" in window)) return;
  doc.classList.add("motion");

  // úvod: postupný nájezd prvků
  document.querySelectorAll(".hero>div:first-child>*, .c3-hero>*:not(.c3-heroimg)").forEach(function (el, i) {
    el.style.setProperty("--i", i);
  });

  var seen = new Set();
  function mark(el, delay) {
    if (!el || seen.has(el) || el.closest(".hero") || el.closest(".c3-hero")) return;
    seen.add(el); el.classList.add("rv");
    if (delay) el.style.setProperty("--d", delay + "ms");
  }
  // skupiny – položky se objevují postupně
  [".models", ".uses", ".grid3", ".c3-promises", ".c3-prices", ".c3-dims", ".dl-points", ".pv-list", ".mosaic", ".camper-prices", ".cp-pro-photos"]
    .forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (g) {
        Array.prototype.forEach.call(g.children, function (c, i) { mark(c, Math.min(i, 6) * 90); });
      });
    });
  // jednotlivé bloky
  document.querySelectorAll([
    ".wrap>.eyebrow", ".wrap>h2", ".wrap>.lead", ".contact>.two", ".two>*", ".calc>*", ".c3-zone>*",
    ".c3-center>h2", ".c3-center>p", ".c3-video", ".c3-more", ".c3-fit .c3>div>*", ".c3-list>h2", ".c3-list details",
    ".spec", ".callout", ".result", ".variants", ".seo-copy .faq", ".gallery", ".pv-head>*"
  ].join(",")).forEach(function (el) {
    if (el.closest(".contact") && !el.matches(".contact>.two")) return;
    if (el.closest(".rv")) return;
    var sib = el.parentElement && el.parentElement.matches(".two, .c3-zone, .calc") ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    mark(el, sib * 120);
  });

  // čísla, která se „načtou“
  var counters = document.querySelectorAll(".c3-dims b, .camper-prices b, .c3-price .pr, .hero .kpis b");
  function countUp(el) {
    var node = el.firstChild; if (!node || node.nodeType !== 3) return;
    var txt = node.nodeValue, m = txt.match(/\d[\d   ]*\d|\d/); if (!m) return;
    var target = parseInt(m[0].replace(/[^\d]/g, ""), 10); if (!(target > 9)) return;
    var sep = (m[0].match(/[   ]/) || [" "])[0], pre = txt.slice(0, m.index), post = txt.slice(m.index + m[0].length);
    var t0 = null, dur = 1100;
    function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, m[0].length > 3 && /[   ]/.test(m[0]) ? sep : ""); }
    function step(t) {
      if (!t0) t0 = t; var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      node.nodeValue = pre + fmt(Math.round(target * e)) + post;
      if (p < 1) requestAnimationFrame(step); else node.nodeValue = txt;
    }
    requestAnimationFrame(step);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target; io.unobserve(el);
      if (el.classList.contains("rv")) {
        el.classList.add("in");
        // po dokončení uklidit, aby fungovaly vlastní hover efekty (zvednutí karet apod.)
        var d = parseInt(el.style.getPropertyValue("--d"), 10) || 0;
        setTimeout(function () { el.classList.remove("rv", "in"); el.style.removeProperty("--d"); }, d + 900);
      }
      if (el.__count) countUp(el);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  seen.forEach(function (el) { io.observe(el); });
  counters.forEach(function (el) { el.__count = true; io.observe(el); });
})();
