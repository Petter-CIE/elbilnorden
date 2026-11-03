# elbilnorden.no

Web Elbilnorden (Hudson elektrické užitkové vozy + Nordic Camper) – EV Pickup AS.
Statický web generovaný nástrojem [Eleventy](https://www.11ty.dev/); výsledné HTML stránky běží na one.com.

## Kde co upravit

| Co chci změnit | Soubor |
|---|---|
| Texty v jednom jazyce (nadpisy, popisy, ceny modelů, FAQ, formuláře…) | `src/_data/i18n/<jazyk>.json` (`no`, `en`, `sv`, `da`, `fi`, `cs`) |
| Ceny Nordic Camper, seznam dodávek, ID videí, modely | `src/_data/site.js` |
| Hlavička / patička / `<head>` všech stránek | `src/_includes/header.njk`, `footer.njk`, `base.njk` |
| Poptávkový formulář (homepage + modely), karta modelu | `src/_includes/contact.njk`, `card.njk` |
| Rozvržení jednotlivých typů stránek | `src/pages/home.njk`, `model.njk`, `camper.njk`, `dealer.njk`, `privacy.njk` |
| Vzhled (barvy, mezery, responzivita) | `v3.css` (+ základ `site.css`) |
| Obrázky | `images/` |

Každá šablona v `src/pages/` vyrobí stránku pro všech 6 jazyků (modelová šablona 4 modely × 6 jazyků = 24 stránek),
takže změna rozvržení se projeví všude najednou.

### Struktura jazykového souboru (`src/_data/i18n/<jazyk>.json`)
- `nav`, `footer`, `contact` – společné prvky
- `home` – homepage (`head` = title/description/JSON-LD, `hero`, `cards` = karty modelů, `uses`, `camper`, `costs`, `service`, `about`)
- `models.<model>` – modelové stránky (hero, varianty a ceny, specifikace, SEO text a FAQ)
- `camper` – Nordic Camper, Bli forhandler a Personvern
- `head.camper|dealer|privacy` – title/description/JSON-LD těchto stránek

## Jak se dělají změny
1. Každá úprava jde přes samostatnou větev a pull request.
2. Po merge do `main` GitHub Actions web sestaví (`npx eleventy` → složka `_site/`) a nahraje na one.com přes SFTP
   jen soubory, které se od minulého nasazení změnily (podle otisků v `.deploy-manifest` na serveru). Na serveru se nic nemaže.
3. Celý web lze nahrát znovu ručně: Actions → „Nasazení na one.com“ → Run workflow → zaškrtnout „Nahrát celý web“.

### Lokální náhled
```
npm install
npm start        # http://localhost:8080 s automatickým obnovením
npm run build    # jen sestavit do _site/
```

### Nastavení nasazení (jednorázově)
Settings → Secrets and variables → Actions:
- Secrets: `ONECOM_SFTP_HOST`, `ONECOM_SFTP_USER`, `ONECOM_SFTP_PASSWORD` (údaje z one.com → SSH & SFTP)
- Variables (nepovinné): `ONECOM_SFTP_PORT` (výchozí 22), `ONECOM_WEBROOT` (složka s index.html, jinak se najde sama)

## Další soubory
- `send.php` – odesílání formulářů na post@elbilnorden.no
- `.htaccess` – přesměrování (https, bez www, staré URL), cache, bezpečnostní hlavičky
- `sitemap.xml`, `robots.txt`, favicony, `site.webmanifest`, `analytics.js` (Google Analytics s cookie lištou)
