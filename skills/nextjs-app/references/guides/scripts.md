# Scripts

The `next/script` component optimizes loading of third-party scripts at the layout or application level, with configurable loading strategies.

## Signature / Usage

```tsx filename="app/dashboard/layout.tsx"
import Script from 'next/script'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>{children}</section>
      <Script src="https://example.com/script.js" />
    </>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `strategy` | `'beforeInteractive' \| 'afterInteractive' (default) \| 'lazyOnload' \| 'worker'` | Controls when the script loads relative to hydration |
| `onLoad` / `onReady` / `onError` | event handler | Only work inside a `'use client'` component |
| `id` | `string` | Required for inline scripts so Next.js can track/optimize them |
| additional DOM attrs (`nonce`, `data-*`) | — | Forwarded automatically to the rendered `<script>` element |

## Notes

- A script placed in a layout loads once per that layout's routes; placed in the root layout, it loads once for the whole app — Next.js ensures it loads only once even across navigations.
- Recommendation: scope third-party scripts to specific pages/layouts rather than the root, to minimize performance impact.
- `strategy="worker"` (experimental, via Partytown) offloads execution to a web worker; requires `experimental.nextScriptWorkers: true` and is **not yet stable with the App Router**.
- Inline scripts require an `id` prop; write them via `{`...`}` children or `dangerouslySetInnerHTML`.

## Related

- [Third Party Libraries](./third-party-libraries.md)
- [Lazy Loading](./lazy-loading.md)
