# Third Party Libraries

`@next/third-parties` provides optimized components/utilities for loading popular third-party libraries (currently Google's) with good performance defaults.

## Signature / Usage

```tsx filename="app/layout.tsx"
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-XYZ" />
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />
    </html>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GoogleTagManager` `gtmId` | `string` (required*) | GTM container ID; `*` can be omitted if `gtmScriptUrl` is provided |
| `GoogleAnalytics` `gaId` | `string` (required) | GA4 measurement ID (`G-...`) |
| `sendGTMEvent(obj)` / `sendGAEvent(...)` | function | Sends events via the `dataLayer`; requires the corresponding component to be mounted in a parent scope |
| `GoogleMapsEmbed` | props: `apiKey`, `mode`, `height`, `width`, `q`, ... | Embeds a Google Maps iframe, lazy-loaded by default |
| `YouTubeEmbed` | props: `videoid`, `height`, `params`, ... | Faster YouTube embed via `lite-youtube-embed` |

## Notes

- `@next/third-parties` is experimental and under active development — install with `@latest` or `@canary`.
- If GTM is already included, prefer configuring Google Analytics through GTM rather than adding a separate `GoogleAnalytics` component.
- GA4 automatically tracks pageviews on browser history changes (client-side nav); disable default pageview measurement if sending pageviews manually to avoid duplicates.
- `GoogleMapsEmbed`/`YouTubeEmbed` default to lazy loading — override `loading` if the embed is above the fold.

## Related

- [Scripts](./scripts.md)
- [Analytics](./analytics.md)
