# elbilnorden.no

Statický web Elbilnorden (Hudson elektrické užitkové vozy + Nordic Camper) – EV Pickup AS.
Hostováno na one.com. Kořen repozitáře = kořen webu.

## Jak se dělají změny
1. Každá úprava jde přes samostatnou větev a pull request.
2. Po schválení a merge do `main` se změněné soubory automaticky nahrají na one.com
   přes SFTP (GitHub Actions → `.github/workflows/deploy.yml`). Na serveru se nic nemaže.
3. Celý web lze nahrát znovu ručně: Actions → „Nasazení na one.com“ → Run workflow → zaškrtnout „Nahrát celý web“.

### Nastavení (jednorázově)
Settings → Secrets and variables → Actions:
- Secrets: `ONECOM_SFTP_HOST`, `ONECOM_SFTP_USER`, `ONECOM_SFTP_PASSWORD` (údaje z one.com → SSH & SFTP)
- Variables (nepovinné): `ONECOM_SFTP_PORT` (výchozí 22), `ONECOM_WEBROOT` (složka s index.html, jinak se najde sama)

## Struktura
- `index.html`, `en.html`, `sv.html`, `da.html`, `fi.html`, `cs.html` – úvodní stránky
- `evoxx|ebear|ebold|ehaustus.html` (+ prefix `en-`, `sv-`, `da-`, `fi-`, `cs-`) – modelové stránky
- `camper`, `forhandler`/`dealer`, `personvern`/`privacy` – stránky na React runtime (`support.js`, `vendor/`)
  se statickou kopií obsahu v `#dc-prerender` pro vyhledávače
- `send.php` – odesílání formulářů na post@elbilnorden.no
- `.htaccess` – přesměrování (https, bez www, staré URL), cache, bezpečnostní hlavičky
