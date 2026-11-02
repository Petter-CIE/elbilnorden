# elbilnorden.no v2 — nasazení

## Postup
1. Nahraj **celý obsah** této složky do kořene webu a přepiš stávající soubory (48× html, site.css, analytics.js, support.js, vendor/, images/, favicony, sitemap.xml, robots.txt, .htaccess).
2. Smaž na serveru: `no.html`, `no-camper.html`, `eBold web.dc.html` (pokud tam ještě jsou). `cs.html` je teď plnohodnotná česká homepage, ne přesměrování.
3. Otevři v anonymním okně: https://elbilnorden.no/ , /evoxx.html , /cs.html , /fi-ehaustus.html — zkontroluj hlavičku, karty modelů a kalkulačku.
4. Otestuj formulář na jedné modelové stránce (předvyplní model do pole „Modell"; e-mail přijde na post@ s předmětem „eBOLD – jméno").
5. Search Console → Sitemaps → znovu odešli sitemap.xml (48 URL).

## Struktura
- Homepage v 6 jazycích: index / en / sv / da / fi / cs .html
- Modelové stránky: evoxx, ebear, ebold, ehaustus .html (norsky) + en-, sv-, da-, fi-, cs- prefix
- Nordic Camper, forhandler/dealer, personvern/privacy: beze změny (starý runtime), jen navigace vede na nové stránky

## Ceny
Norsko a Česko podle tvého ceníku, SE/DK/FI/EN přepočet z NOK kurzem 13. 9. 2026. Ceny jsou v `i18n.py` (PRICE) — pošli změnu a přegeneruju.

## Zbývá
- Fotky eVOXX a eHAUSTUS jsou z ehudson.eu s vodoznakem — vyměnit za originály od Hudsonu (images/evoxx-side.webp, images/ehaustus-side.webp; ideálně 1600 px na šířku).
- Spotřeba v kalkulačce pro eVOXX (12 kWh/100 km) a eHAUSTUS (55 kWh/100 km) je odhad.
- Nordic Camper / forhandler / personvern stránky mají ještě starou hlavičku (bez odkazů na modely) — přepíšu do nového systému v dalším kroku.
