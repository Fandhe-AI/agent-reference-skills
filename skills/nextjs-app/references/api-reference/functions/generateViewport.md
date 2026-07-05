# generateViewport

Customizes the initial viewport of a page via the static `viewport` object or the dynamic `generateViewport` function.

## Signature / Usage

```tsx
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: 'black',
}

export default function Page() {}
```

## Options / Props

| Field | Type | Description |
| --- | --- | --- |
| `themeColor` | `string \| { media: string; color: string }[]` | Sets `<meta name="theme-color">`, optionally per media query. |
| `width`, `initialScale`, `maximumScale`, `userScalable` | various | Viewport meta tag values (rarely need manual configuration). |
| `colorScheme` | `string` | Sets `<meta name="color-scheme">` (e.g. `'dark'`). |
| `interactiveWidget` | `string` | Less common viewport option (e.g. `'resizes-visual'`). |

## Notes

- Only supported in Server Components; cannot export both `viewport` object and `generateViewport` function from the same segment.
- If viewport doesn't depend on request info, prefer the static `viewport` object over `generateViewport`.
- With Cache Components enabled, unlike metadata, viewport cannot be streamed (it affects initial page load UI) — if it needs runtime data (`cookies()`, `headers()`, `params`, `searchParams`), wrap the document `<body>` in `<Suspense>` to make the whole route dynamic, or use `use cache` if the data is external but not runtime-specific.
- Use multiple root layouts to isolate fully dynamic viewport to specific routes while other routes stay static.
- `themeColor`, `colorScheme`, and `viewport` were previously part of `metadata` but are deprecated there as of v14 in favor of this export.
- A `metadata-to-viewport-export` codemod is available for migration.
- Introduced in `v14.0.0`.

## Related

- [generateMetadata](./generateMetadata.md)
- [Metadata Files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
