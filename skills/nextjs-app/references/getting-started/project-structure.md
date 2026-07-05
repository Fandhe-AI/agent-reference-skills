# Project structure and organization

Folder and file conventions in Next.js, and recommended ways to organize a project.

## Signature / Usage

```text
app/
  layout.tsx        # Root layout (required, wraps <html>/<body>)
  page.tsx           # Route "/"
  blog/
    layout.tsx       # Nested layout for /blog
    page.tsx         # Route "/blog"
    [slug]/
      page.tsx       # Route "/blog/:slug" (dynamic segment)
    _components/     # Private folder, not routable
  (marketing)/       # Route group, omitted from URL
    page.tsx
public/
  profile.png
```

## Options / Props

| Convention | Files | Purpose |
|------|------|-------------|
| `layout` | `.js` `.jsx` `.tsx` | Shared UI wrapping child segments |
| `page` | `.js` `.jsx` `.tsx` | Makes a route segment publicly accessible |
| `loading` | `.js` `.jsx` `.tsx` | Loading UI (wraps `page` in `<Suspense>`) |
| `error` | `.js` `.jsx` `.tsx` | Error boundary UI |
| `global-error` | `.js` `.jsx` `.tsx` | Root-level error UI |
| `not-found` | `.js` `.jsx` `.tsx` | Not found UI |
| `route` | `.js` `.ts` | API endpoint (cannot coexist with `page` at same segment) |
| `template` | `.js` `.jsx` `.tsx` | Re-rendered layout (no state preserved) |
| `default` | `.js` `.jsx` `.tsx` | Parallel route fallback |
| `[segment]` | folder | Dynamic segment |
| `[...segment]` | folder | Catch-all segment |
| `[[...segment]]` | folder | Optional catch-all segment |
| `(group)` | folder | Route group, organizational only, omitted from URL |
| `_folder` | folder | Private folder, opts out of routing |
| `@slot` | folder | Named parallel route slot |

## Notes

- A route is not publicly accessible until a `page` or `route` file exists in the segment; other files can be safely colocated without becoming routable
- Component hierarchy for a segment: `layout` → `template` → `error` (boundary) → `loading` (Suspense) → `not-found` (boundary) → `page` or nested `layout`
- Multiple root layouts require removing the top-level `layout.js` and adding one inside each route group; each must include `<html>`/`<body>`
- `src/` folder is optional and separates app code from root config files
- Top-level folders: `app`, `pages` (Pages Router, not covered here), `public`, `src`

## Related

- [layouts-and-pages](./layouts-and-pages.md)
- [installation](./installation.md)
