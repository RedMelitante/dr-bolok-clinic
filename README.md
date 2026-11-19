# Dr. Vira Bolok, MD — Clinic Website

Website for **Dr. Viraliza June Abejuela Bolok, MD** (Pediatrics & Neonatology, Cagayan de Oro),
built with [Astro](https://astro.build) from the Claude Design handoff in [`design/`](design/).
It builds to a fully static site in `dist/` and can be hosted anywhere that serves static files.

## Quick start

Requires Node.js 22.23.4 or newer.

```bash
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
npm run check     # type-check .astro / .ts files
```

## Pages

| Route | Design source |
| --- | --- |
| `/` | `Main.dc.html` |
| `/about/` | `About.dc.html` |
| `/services/` | `Services.dc.html` |
| `/services/newborn-neonatal-care/` | `Service.dc.html` (service = newborn) |
| `/services/well-baby-growth-monitoring/` | `ServiceWellBaby.dc.html` |
| `/services/child-vaccinations/` | `ServiceVaccines.dc.html` |
| `/services/common-childhood-illnesses/` | `ServiceIllnesses.dc.html` |
| `/services/high-risk-infant-follow-up/` | `ServiceHighRisk.dc.html` |
| `/book/` | `Book.dc.html` |
| `/faq/` | `FAQ.dc.html` |
| `/blog/` | `Blog.dc.html` |
| `/blog/baby-vaccination-schedule/` | `Article.dc.html` |
| `/blog/when-fever-needs-a-doctor/` | `ArticleFever.dc.html` |
| `/blog/developmental-milestones-first-year/` | `ArticleMilestones.dc.html` |
| `/contact/` | `Contact.dc.html` |
| `404` | `NotFound.dc.html` |

The `Mobile*.dc.html` files are 390px previews of the same pages; the layout is responsive
(breakpoint at 860px, as in the design).

## Project structure

```
public/
  images/            photos + logos from the design bundle (webp)
  favicon-32.png     cropped from the logo mark
  apple-touch-icon.png
src/
  data/site.ts       all shared copy: routes, clinics, phones, FAQs, services, blog posts
  layouts/BaseLayout.astro   <head>/SEO, header, footer
  components/        Header, Footer, PageTitle, FaqList, StatCards
  pages/             one file per route (+ [slug] templates for services and posts)
  scripts/           booking.ts (online appointment booking widget)
  styles/global.css  global rules from the design's <helmet> + hover/toggle states
design/              original Claude Design source files (reference only, not built)
```

Styling deliberately mirrors the design: component styles are kept **inline exactly as in the
design files**, and `src/styles/global.css` holds the design's shared base rules plus the
hover/open states that the design drove with component state. Brand colour tokens are listed
at the top of `global.css` for reference.

To change clinic hours, phone numbers, FAQs, service copy or articles, edit `src/data/site.ts`.

## Configuration

Copy `.env.example` to `.env` (or set it in your host's build settings):

- `SITE_URL` — the site's absolute URL (e.g. `https://www.example.com`). Enables canonical
  and absolute Open Graph URLs.

## Online booking

The Book page's "Book an Appointment" card (`src/scripts/booking.ts`) is a port of the booking
form from the previous WordPress site (drbolok.com/book-now/, plugin "dental-booking"). It uses
the **same Google Apps Script backend** (`bookingBackendUrl` in `src/data/site.ts`) with the same
requests and payload, so appointment requests keep landing in the clinic's existing calendar
setup. Only the look changed to match this design.

Flow: choose a clinic → pick a date → pick an available time → enter name, phone and an optional
note → request. Clinic list, schedules and time slots come live from the backend.

The Google Apps Script deployment must stay live (and keep its current URL) for booking to
work; the old WordPress site itself can be retired without affecting it. If the script is ever
redeployed under a new URL, update `bookingBackendUrl`.

## Still to confirm with the client

Carried over from the design hand-off notes:

- Dr. Vira's role at Madonna and Child Medical Center (About page credentials list currently
  says "Hospital affiliation"; the design had a placeholder).
- The "231+ Safe Observation" stat.
- Licence/source for the 3 photos taken from the old site.
