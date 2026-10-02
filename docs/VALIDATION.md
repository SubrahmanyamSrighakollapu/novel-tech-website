# Validation record

## Passed

- Dependency installation from the included npm lockfile.
- Next.js static production export with all 13 requested content pages, 404, sitemap and robots files.
- TypeScript checking during the production build.
- Static HTML checks: exactly one H1 on each content page, unique titles/descriptions, expected canonical URLs, valid JSON-LD, internal links and same-page anchors.
- Every referenced image exists locally and every image element has an alt attribute.
- Sitemap includes all 13 routes. Default placeholder-domain robots and metadata prevent indexing.
- Static preview HTTP: 13 routes, 15 images, sitemap, robots, favicon and an unknown-route 404.
- Archive integrity and required-file checks performed before delivery.

See STATIC-CHECKS.txt for the static check output.

## Remaining acceptance checks

A browser executable was unavailable and the attempted browser download failed. Interactive browser execution, screenshot comparison and real device tests were therefore not completed. Responsive styles are implemented but should be reviewed at 320, 375, 425, 768, 1024 and 1440 px, and at 200% text zoom.

Before launch:

1. Confirm branding, contact details, content and which roles are actively available.
2. Set the real site URL and rebuild. Check canonical URLs, sitemap and indexing rules.
3. Review desktop/mobile navigation and the service dropdown with pointer, keyboard and touch.
4. Test career search, both filters, reset, no-results state, role dialog, Escape and focus return.
5. Validate contact fields, email draft preparation, copy fallback and service-query prefilling on real mail clients.
6. Open every service’s offering details and the contact FAQs.
7. Check contrast, focus visibility, touch targets, zoom, image crops and horizontal overflow.
8. Replace generated artwork with client-approved originals if an exact visual match is required.

No backend, email delivery service, résumé storage, analytics, cookie tracking or third-party integrations are connected. The ZIP is a static website codebase, not a live deployment.
