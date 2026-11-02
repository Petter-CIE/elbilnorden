# elbilnorden.no

Statický web Elbilnorden (Hudson elektrické užitkové vozy + Nordic Camper) – EV Pickup AS.
Hostováno na one.com. Kořen repozitáře = kořen webu.

## Jak se dělají změny
1. Každá úprava jde přes samostatnou větev a pull request.
2. Po schválení a merge do `main` se změněné soubory nahrají na one.com
   (zatím ručně přes správce souborů one.com).

## Struktura
- `index.html`, `en.html`, `sv.html`, `da.html`, `fi.html`, `cs.html` – úvodní stránky
- `evoxx|ebear|ebold|ehaustus.html` (+ prefix `en-`, `sv-`, `da-`, `fi-`, `cs-`) – modelové stránky
- `camper`, `forhandler`/`dealer`, `personvern`/`privacy` – stránky na React runtime (`support.js`, `vendor/`)
  se statickou kopií obsahu v `#dc-prerender` pro vyhledávače
- `send.php` – odesílání formulářů na post@elbilnorden.no
- `.htaccess` – přesměrování (https, bez www, staré URL), cache, bezpečnostní hlavičky
