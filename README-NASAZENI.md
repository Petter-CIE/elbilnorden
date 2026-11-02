# elbilnorden.no — nasazení opravené verze

## Co nahrát
Celý obsah této složky nahraj do kořene webu (tam, kde je dnes index.html) a **přepiš** stávající soubory:

- 23× `*.html` (všechny jazykové verze) — předrenderovaný obsah, absolutní canonical/hreflang, og:image, JSON-LD, lazy-loading, kontaktní formulář přes send.php
- `support.js` — runtime upravený tak, aby načítal React/Babel z `vendor/` a po startu odstranil statickou kopii
- `vendor/` — react, react-dom, babel (self-hosted místo unpkg)
- `images/` — obrázky ve WebP + 3× og-*.jpg pro sdílení; staré .jpg můžeš na serveru smazat
- `sitemap.xml`, `robots.txt`, `.htaccess` (301 přesměrování, cache, komprese)
- `cs.html` — teď jen přesměrovává na cs-camper.html

## Co na serveru smazat
- `no.html`, `no-camper.html` (duplikáty; .htaccess je přesměrovává)
- `eBold web.dc.html` (pracovní kopie)

## Co musíš doplnit ty
1. **send.php** — kontaktní formulář teď posílá `form=ebold-contact` (dříve otevíral mailto:). Ověř, že send.php tuto hodnotu přijme a pošle e-mail (pokud má whitelist názvů, přidej `ebold-contact`).
2. **Plausible** — v `<head>` je skript pro plausible.io s doménou elbilnorden.no. Založ účet na plausible.io a přidej doménu; do té doby skript nic nesbírá (a nic nerozbije). Alternativa bez účtu: smaž ten řádek.
3. **images/logo.svg** — na živém webu je placeholder s nápisem „LOGO". Nahraď skutečným logem (stejný název souboru).
4. **images/hero.webp** — placeholder „hero.jpg". Nahraď skutečnou fotkou (ideálně 1600×1100, ulož jako WebP).
5. **YouTube video** v hero sekci má prázdné ID (černý obdélník bez JS). Buď doplň `youtubeId` v `data-props`, nebo sekci vypni.

## Po nahrání
- Otevři https://elbilnorden.no/ v anonymním okně: musí se načíst norsky, bez přesměrování; v angl. prohlížeči se nahoře objeví proužek „Read it in English".
- Otestuj oba formuláře (prøvekjøring + forhandler).
- Search Console → Sitemaps → odešli `https://elbilnorden.no/sitemap.xml` znovu; URL Inspection na homepage → „Request indexing".
- Ověř og:image na https://developers.facebook.com/tools/debug/ nebo v LinkedIn Post Inspector.
