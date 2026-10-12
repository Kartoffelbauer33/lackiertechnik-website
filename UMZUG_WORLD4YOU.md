# Umzug weg von world4you – Plan (Stand 12.10.2026)

Ziel: beide Domains zu INWX, Website neu hosten, danach bei world4you alles kündigen und das Konto schließen.

## Bestandsaufnahme (geprüft am 12.10.2026)

| | lackiertechnikschedler.at | berkmannlackieranlagen.at |
|---|---|---|
| Paket bei world4you | Webhosting Go, Paket 31835324 (Domain-Vertrag 70780341) | DomainOnly, Paket 31855457 |
| Status | Kündigung eingeleitet (Hosting bis 27.11.2026, Domain bis 03.05.2027) | aktiv |
| Nameserver | ns1/ns2.world4you.at | ns1/ns2.world4you.at |
| Website | live, statisches HTML auf 81.19.159.84 | Parkseite 81.19.154.98 |
| MX | mail.lackiertechnikschedler.at (world4you) | mail.berkmannlackieranlagen.at (world4you) |
| DNSSEC | aus | – |
| Zweck | Firmen-Website | nur besetzen, damit sie niemand anderer nimmt |

Website-Quellcode: dieser Ordner (index.html, style.css, script.js, pictures/), Kopie auf GitHub `Kartoffelbauer33/lackiertechnik-website`.
Kein PHP, keine Datenbank. Das Kontaktformular öffnet nur das Mailprogramm an ms@schema.at – hängt also nicht an world4you.

**Offen:** Gibt es bei world4you Postfächer @lackiertechnikschedler.at oder @berkmannlackieranlagen.at, die genutzt werden? (world4you → E-Mail & Exchange prüfen)

## Reihenfolge

1. **Mail klären.** Postfächer bei world4you ansehen. Werden sie genutzt → Mails sichern und neuen Mailanbieter festlegen. Werden sie nicht genutzt → nichts zu tun.
2. **Neues Hosting für die Website** einrichten, bevor die Domain umzieht (Vorschlag: GitHub Pages oder Cloudflare Pages, kostenlos, statisch). Testen unter der vorläufigen Adresse.
3. **berkmannlackieranlagen.at umziehen** (einfach, keine Website, keine Mail): Auth-Code bei world4you abrufen → INWX → Domaintransfer → `berkmannlackieranlagen.at:AUTHCODE`.
4. **lackiertechnikschedler.at umziehen:** Auth-Code bei world4you abrufen → INWX-Transfer. Dabei DNS-Einträge bei INWX gleich auf das neue Hosting setzen (A/CNAME, ggf. MX).
5. **Kontrolle:** Website über https erreichbar, whois zeigt INWX als Registrar.
6. **world4you kündigen:** Webhosting Go (schon gekündigt), Basic-Wildcard-SSL (verlängert sich sonst am 26.12.2026), DomainOnly-Paket (erlischt mit dem Transfer, sonst kündigen), danach Kundenkonto 50359781 schließen lassen.

Frist: Schritte 1–5 vor dem 27.11.2026 erledigen, solange das Hosting noch läuft.
