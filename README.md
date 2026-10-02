# Noveltech — static Next.js website

A complete, responsive website inspired by the six supplied Noveltech screens: navy backgrounds, electric blue/cyan actions, glass-office scenes and the ribbon “N” identity. Includes all 13 requested pages and the full source code.

**Stack:** Next.js App Router, React, TypeScript, Tailwind CSS 4 and custom responsive CSS. No backend or database required. `output: 'export'` generates plain static HTML, CSS and JavaScript.

## Start locally

Install Node.js 22 or newer, then extract this folder and open a terminal inside it:

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Configure your website

Copy `.env.example` to `.env.local`:

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

macOS/Linux:

```bash
cp .env.example .env.local
```

Set `NEXT_PUBLIC_SITE_URL` to your final HTTPS domain, with no trailing path. Set the email addresses if needed. Restart the development server or rebuild after environment changes.

**Before launch:** confirm the phone, location, business hours and email addresses in `src/data/site.ts`. The reference screenshots contain both India and Australia contact details and different email domains; this implementation uses the Australia details from the majority of screens. They are reference content, not independently verified business records. There is no invented street address or office-map pin.

## Production / static hosting

```bash
npm run typecheck
npm run build
npm run preview
```

The complete static website is generated in `out/`. Preview it at http://localhost:3000. To choose a different preview port in PowerShell: `$env:PORT=3100; npm run preview`.

Upload the **contents of `out/`** to a static host, such as your hosting account’s `public_html` directory. Keep `_next/`, images, HTML and route subfolders together. The host should serve each route folder’s `index.html`, and use `404.html` for missing pages. Do not configure an SPA fallback that serves the homepage for every unknown URL. A Node server is not needed in production.

`npm start` is an alias for the included lightweight local static preview server; it does not run `next start`, which is not used for static exports. The preview server is a development convenience, not a managed production server.

A prebuilt `out/` is included for quick inspection. It uses the default example.com domain and is intentionally **noindex**. Set the real domain and rebuild before publishing. The source folder, references and high-resolution artwork are not needed on the web server.

## Pages

| Page | URL |
|---|---|
| Home | `/` |
| About | `/about/` |
| Services | `/services/` |
| Web Development | `/services/web-development/` |
| Mobile Application Development | `/services/mobile-application-development/` |
| Web & Graphic Design | `/services/web-graphic-design/` |
| E-Commerce | `/services/e-commerce/` |
| SEO | `/services/seo/` |
| Email Marketing | `/services/email-marketing/` |
| Data Backup & Recovery | `/services/data-backup-recovery/` |
| Consulting Services | `/services/consulting-services/` |
| Career | `/career/` |
| Contact | `/contact/` |

## What works

- Desktop service dropdown and mobile navigation, with keyboard focus and Escape handling.
- Eight fully populated service pages built from a shared design, each with its own content, imagery, offerings, process and tools.
- Expandable service information and contact FAQs.
- Career search, department/experience filters, reset, empty state and accessible native role dialog.
- Service links prefill the contact form.
- Required field and email validation, email draft preparation and copyable enquiry text.
- Telephone and email links, in-page links and back-to-top navigation.

### Contact and career behaviour

This is a static site. **No form data is stored or sent to a server.** The contact form opens the visitor’s email application with a draft; the visitor must send it. A copyable message is provided if no mail application opens. Career enquiries work the same way; applicants attach their résumé in their email application. Browser form validation runs before a draft is prepared.

The career page lists the roles shown in the reference as representative opportunities. It explicitly asks visitors to confirm current availability, rather than inventing live job vacancies. Update `src/data/jobs.ts` with approved role details before recruiting. No JobPosting structured data is emitted for these unverified roles.

No video files or social profile URLs were supplied. Story links open real page sections; no fake video controls or dead social links are included. Unverified numerical claims and testimonial identities from design mockups are replaced with company principles and a commitment section. You can add approved facts and testimonials later.

## Edit content and styles

```text
novel-tech-website/
  src/app/                  Page routes, SEO files and global styling
  src/components/           Shared layout, forms, career interactions and UI
  src/data/site.ts           Company/contact configuration and FAQs
  src/data/services.json     Content for all eight service detail pages
  src/data/jobs.ts           Representative career roles
  src/lib/seo.ts             Metadata and structured-data helpers
  public/images/            Optimized local WebP images and transparent logo
  design-assets/            Original generated high-resolution PNG artwork
  docs/references/          All six supplied reference screens
  docs/image-prompts.json    Exact image-generation prompt set
  scripts/serve.mjs          Local static export preview
  out/                      Prebuilt static output (rebuild for your domain)
```

Shared design tokens, layouts and breakpoints are in `src/app/globals.css`. Breakpoints cover large desktop, laptop, tablet and narrow phone layouts; reduced-motion preferences are respected. System Arial/Helvetica fonts avoid runtime font downloads. Lucide provides interface icons. Next Image uses local static assets with `unoptimized: true`, suitable for static hosting; the files themselves are already compressed as WebP.

## SEO included

- Unique page titles, descriptions, canonical URLs and social metadata.
- OpenGraph and Twitter image previews using local artwork.
- Organization structured data and individual Service/BreadcrumbList structured data.
- FAQPage structured data matching visible contact-page answers.
- Generated `sitemap.xml`, `robots.txt`, one H1 per page and semantic page structure.
- Descriptive image alternatives where images convey content; decorative backgrounds use empty alternatives.
- Static rendered content available without client-side API calls.
- Preview protection: when the domain is unset or still a placeholder, pages are noindex and robots disallows crawling. A real configured domain enables indexing on rebuild.

SEO implementation helps crawlers understand the site; it does not guarantee ranking or search-result enhancements.

## Image fidelity and validation

The artwork is **reference-inspired generated recreation, not pixel-identical extraction of the original scene assets**. Fourteen landscape images and one transparent ribbon logo are included. Read `docs/ASSETS.md` for provenance and `docs/VALIDATION.md` for checks and limitations.
