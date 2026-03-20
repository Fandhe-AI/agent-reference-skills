# Resource Routes

Routes that serve non-UI resources (PDFs, images, JSON APIs, webhooks) by exporting a `loader` or `action` without a default component.

**Available in:** Framework mode and Data mode.

## 実装方法

1. Create a route file that exports `loader` (GET) and/or `action` (POST/PUT/PATCH/DELETE) but no default component
2. Return a `Response` object for external consumers; return `data()` for internal fetchers/forms
3. Link to resource routes with `<Link reloadDocument>` or a plain `<a>` tag to force a full document request

## コード例

```ts
// routes/reports.pdf.$id.ts
import type { Route } from "./+types/reports.pdf.$id";

export async function loader({ params }: Route.LoaderArgs) {
  const report = await getReport(params.id);
  const pdf = await generateReportPDF(report);
  return new Response(pdf, {
    status: 200,
    headers: { "Content-Type": "application/pdf" },
  });
}
```

```tsx
// Linking to a resource route
<Link reloadDocument to="/reports/pdf/123">View as PDF</Link>
// or
<a href="/reports/pdf/123">View as PDF</a>
```

## 注意点

- Throwing `new Error(...)` triggers `handleError` and returns a 500; throwing/returning `new Response(...)` with 4xx/5xx is considered successful execution and does NOT trigger `handleError`
- `ErrorBoundary` only applies when the resource route is accessed via `useFetcher` or `<Form>` from UI
- Use `Response` (not `data()`) for external API consumers who expect explicit encoding control

## 関連

- [./file-uploads.md](./file-uploads.md)
- [./headers.md](./headers.md)
- [./error-boundary.md](./error-boundary.md)
