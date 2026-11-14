---
source: https://tanstack.com/query/latest/docs/framework/react/devtools
---

# Devtools

Dedicated devtools to visualize queries and mutations, provided as a separate package `@tanstack/react-query-devtools`.

## Signature / Usage

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `initialIsOpen` | `boolean` | Set `true` to default the devtools panel to open |
| `buttonPosition` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right" \| "relative"` | Position of the toggle button (default `bottom-right`) |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | Position of the devtools panel (default `bottom`) |
| `client` | `QueryClient` | Custom `QueryClient` instance; otherwise nearest context is used |
| `errorTypes` | `{ name: string; initializer: (query: Query) => TError }[]` | Predefined errors that can be toggled on from the UI |
| `styleNonce` | `string` | CSP nonce for the injected style tag |
| `shadowDOMTarget` | `ShadowRoot` | Apply devtool styles within a shadow DOM instead of `<head>` |
| `hideDisabledQueries` | `boolean` | Set `true` to hide disabled queries from the devtools panel (default `false`) |
| `theme` | `"light" \| "dark" \| "system"` | Devtools panel theme. Defaults to the theme selected in the devtools Settings menu, or `system` if none is selected; setting it overrides the Settings menu |

`ReactQueryDevtoolsPanel` (Embedded Mode) additionally accepts `style` (default `{ height: '500px' }`) and `onClose`.

## Notes

- By default only included in bundles when `process.env.NODE_ENV === 'development'`; excluded automatically from production builds
- Next.js 13+ App Dir: install as a dev dependency for it to work
- For production, lazy-load via `@tanstack/react-query-devtools/production` (or `/build/modern/production.js` for non-package-exports bundlers)
- Since v5, devtools also support observing mutations
- Third-party browser extensions exist for Chrome/Firefox/Edge; a third-party native macOS app (`rn-better-dev-tools`) supports React Native
- Data Explorer: select a query or mutation and use **Search data** to search nested property names and primitive values (case-insensitive, special characters treated as plain text). Up to 1,000 matches are highlighted at a time; **Clear** or **Escape** restores manual expansion, and selecting another query or mutation clears the search
- Source: https://raw.githubusercontent.com/TanStack/query/release-2026-11-06-2304/docs/framework/react/devtools.md (tag `release-2026-11-06-2304`, fetched 2026-11-14)

## Related

- [Installation](./installation.md)
- [React Native](./react-native.md)
