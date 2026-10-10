# HolDirMehr — 1:1 Replika (Kostenlos-Version)

Nachbau der Website **HolDirMehr.at** („Finde deine Förderungen in Österreich") aus den PDFs in `~/Desktop/öförderugnen/` — **auf Saschas Wunsch ohne jede Zahlung: der komplette Bericht ist frei zugänglich** (Paywall, Checkout und alle €39,99-Bezüge entfernt; Stand 10.10.2026). Statische Web-App, kein Build-Step, kein Backend.

## Starten

- Läuft lokal: **http://localhost:61599/** (Deploy-Server dieser Session)
- Oder direkt: `index.html` im Browser öffnen, oder `python3 -m http.server` im Ordner

## Seiten

| Datei | Original (PDF im Ordner) | Funktion |
|---|---|---|
| `index.html` | „Finde deine Förderungen…" (Landing) | Hero + Freitext-Eingabe, Schnell-Check-CTA, Beispiel-Report-Karten (mit Zoom-Lightbox), Benefits, 3 Schritte, Preisvergleich (€0 statt €39,99), Förderkarten, Stats, FAQ-Accordion, CTA, Footer + Cookie-Banner |
| `check.html` | „Schnell-Check starten (6 Fragen)" | Quiz: Bundesland → Haushalt → Wohnen → Vorhaben (Mehrfach) → Start → Anträge; leitet Antworten an `bericht.html` weiter |
| `foerderungen.html` | `/foerderungen` (live) | **Echter Katalog: 1.148 Förderungen** aus `data/katalog.json` (gecrawlt von holdirmehr.at, Stand 10.10.2026) — Volltextsuche + Bundesland-/Bereichsfilter, „Mehr anzeigen" |
| `foerderung.html?id=slug` | `/foerderung/<slug>` (live) | Detailseite je Förderung: Betrag, Beschreibung, Bereich, Antragsteller, Prüfdatum, **Link zum offiziellen Antrag** (1.138×), ähnliche Förderungen |
| `bericht.html` | „HolDirMehr — … 2.pdf" (Bericht) | Quiz-Antworten matchen gegen den **echten Katalog** (Keywords + Bundesland-Gewichtung) — echte Programme, echte Beträge, aufklappbar, kostenlos |
| `entwickler.html` | „Entwickler & API-Nutzung" | 1:1-Struktur, Zahlungs-/Purchase-Stellen auf Lead-Modell umgeschrieben |

Logik in `assets/app.js` (Förder-Katalog `CATALOG` mit vollständigen Plänen), Design in `assets/style.css`. Fonts: Fraunces + Inter via Google Fonts. Berichts-Beträge sind deterministisch aus den Quiz-Antworten gerechnet (Demo-Daten, kein echter Förderkatalog).

## ⚠️ Wichtig

- **NUR PRIVAT NUTZEN, NICHT ÖFFENTLICH DEPLOYEN:** Der Katalog (1.148 Einträge, `data/katalog.json`) ist die Datenbank von holdirmehr.at (© dessen Betreiber) — exakt 1:1 kopiert auf Saschas Wunsch für private, lokale Nutzung. Kein Public-Hosting, kein Weiterverkauf.
- **Katalog aktualisieren:** `cat <slugs-von-sitemap> | python3 crawl-artig` — der Crawler liegt in `/tmp/holdirmehr_crawl.py` (stdin=URLs, stdout=JSON); Slugs: Sitemap `https://holdirmehr.at/sitemap.xml` → alle `/foerderung/*`.
- **Branding/Testimonials/Rechtstexte** sind weiterhin vom Original übernommen (siehe oben) — vor jedem Livegang ersetzen.
- **Demo-Beträge im Bericht-Kopf** (€-Spanne) sind geschätzt; die Förderkarten zeigen echte Beträge aus dem Katalog.

1. **Branding:** „HolDirMehr", Logo, `holdirmehr.at` sind Marken/Identität des Original-Betreibers — eigener Name + Logo.
2. **Testimonials** (Rene, Nicole, Sarah, Noreia, „Fabian Eder, Gründer") = echte Personen des Originals → eigene, echte Kundenzitate.
3. **Rechtstexte:** Impressum, Datenschutz, AGB sind Platzhalter (`href="#"`) — echte Österreich-Rechtstexte (TKG/DSGVO) nötig; Entwickler-E-Mail `hallo@holdirmehr.at` ersetzen.
4. **Förderkatalog:** Die Demo-Beträge/Pläne in `app.js` sind plausible Beispiele — vor echten Nutzer-Angaben durch einen geprüften Katalog ersetzen (Transparenzportal + 9 Landesförderstellen) + Disclaimer prüfen.
5. **Falls doch mal Zahlung** (Original-Modell €39,99): Stripe nur server-seitig (Next.js-Route), Keys niemals client-seitig — Dossier-Empfehlung Feb 2026.
