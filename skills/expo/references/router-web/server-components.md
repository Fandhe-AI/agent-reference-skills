---
source: https://docs.expo.dev/guides/server-components/
---

# Using React Server Components in Expo Router apps

Experimental and beta: React Server Components (RSC) and React Server Functions for Expo Router on all platforms. Subject to breaking changes; a very early technical preview.

## Signature / Usage

```sh
npx expo install react-server-dom-webpack
```

```json
{
  "expo": {
    "experiments": {
      "reactServerFunctions": true
    }
  }
}
```

```tsx
// actions/render-info.tsx (Server Function)
'use server';

import { Text } from 'react-native';

export default async function renderInfo({ name }) {
  // Securely fetch data from an API, and read environment variables...
  return <Text>Hello, {name}!</Text>;
}
```

```tsx
// app/index.tsx (Client Component)
import React from 'react';
import { ActivityIndicator } from 'react-native';
import renderInfo from '../actions/render-info';

export default function Index() {
  return (
    <React.Suspense fallback={<ActivityIndicator />}>
      {renderInfo({ name: 'World' })}
    </React.Suspense>
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `experiments.reactServerFunctions` | boolean | Enables RSC / Server Functions. |
| `experiments.reactServerComponentRoutes` | boolean | Full React Server Components mode: routes render as Server Components by default (experimental). |
| `unstable_settings.render` | `'static'` \| `'dynamic'` | Full RSC mode only. `static` renders at build time and embeds in the native binary; `dynamic` (default) renders per request. |
| `requestHeaders()` | `expo-server` function | Synchronously returns `ImmutableHeaders` of the current request. Needs an active request (not build-time `render: 'static'`); server-only. Replaces deprecated `unstable_headers()` from `expo-router/rsc/headers`. |
| `router.reload()` | `useRouter` method | Full RSC mode only: refetch the current route's Server Components. |

## Notes

- Not the Next.js App Router RSC implementation (see nextjs-app skill); Expo's runtime is `expo-server` with `react-server-dom-webpack`, with native support.
- Prerequisites: Expo Router project, React Native New Architecture (default from SDK 52), entry module `expo-router/entry`, and `"origin"` must not be a boolean in app config. `web.output` must be `single` during the developer preview.
- Server Components cannot use `useState` / `useEffect` / `useContext`, nor browser or native APIs; they can use async components, `process.env` secrets, and `import 'server-only'`. Mark Client Components with `'use client'`; only serializable props can cross. `"use server"` marks files / functions exporting Server Functions (async, serializable arguments and return values).
- Server Functions can render components and stream an RSC payload; Suspense streams partial UI.
- Library compatibility: wrap unoptimized libraries in a `'use client'` module with explicit re-exports (avoid `export * from`). `StyleSheet.create` and `Platform.OS` do not work on the server; use plain objects and `process.env.EXPO_OS`. Check the server with `typeof window === 'undefined'`.
- `<meta>` tags can be placed anywhere (web only) thanks to the React canary build used by Expo CLI.
- Deployment: `npx expo export -p web`, `npx expo serve`, or EAS Hosting; native follows the API Routes native deployment guide.
- Known limitations: Expo Snack unsupported; EAS Update unsupported; DOM components cannot use Server Functions in production; production not recommended; server-rendering RSC payloads to HTML unsupported (static / server output not fully working); `generateStaticParams` partial; HTML `form` integration unsupported; Server Functions invoking Server Functions unsupported on Hermes. Full RSC mode: no stack routing (`Stack`, `Tabs`, `Drawer` unsupported) and most `Link` props unsupported; CSS and CSS modules are supported.
- Pinned: documentation fetched 2026-10-17, Expo SDK 58.

## Related

- [DOM components](./dom-components.md)
- [Server (expo-server)](./server.md)
- [API Routes](./api-routes.md)
