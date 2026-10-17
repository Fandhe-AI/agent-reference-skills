---
source: https://docs.expo.dev/router/basics/notation/
---

# Expo Router notation

Special filenames and notation that define the navigation tree within the file structure of **src/app**.

## Signature / Usage

```text
src
  app
    (home)
      _layout.tsx
      index.tsx
      feed.tsx
      profile.tsx
    _layout.tsx
    users
      [userId].tsx
    +not-found.tsx
    about.tsx
```

| Notation | Meaning |
| --- | --- |
| Simple names | Static routes; URL matches the file tree (`feed/favorites.tsx` is `/feed/favorites`) |
| `[param]` | Dynamic route; read the parameter with `useLocalSearchParams` (`[userName].tsx` matches `/evanbacon`, `/expo`) |
| `(group)` | Route group; does not affect the URL (`(home)/settings.tsx` is `/settings`) |
| `index.tsx` | Default route for a directory (`profile/index.tsx` is `/profile`; `(home)/index.tsx` is `/`) |
| `_layout.tsx` | Not a page; defines how routes in a directory relate (stack, tabs); rendered before page routes |
| `+` prefix | Special routes: `+not-found`, `+html`, `+native-intent`, `+middleware` |

Applied to the tree above:

- `src/app/about.tsx` is static, `/about`.
- `src/app/users/[userId].tsx` is dynamic, matches `/users/123`.
- `src/app/(home)/feed.tsx` matches `/feed`.
- `src/app/(home)/index.tsx` matches `/`.
- `src/app/+not-found.tsx` is shown for non-existent routes.

## Notes

- `+not-found` catches unmatched requests; `+html` customizes the web HTML boilerplate (static rendering); `+native-intent` handles deep links not matching a specific route; `+middleware` runs code before a route is rendered.
- Some path names such as `/assets` are reserved by Metro and Expo Router; avoid them for routes.
- Expo Router is file-based and built on React Navigation; `+middleware.ts` here is not a Next.js middleware (server runtime is expo-server). See nextjs-app, react-router and tanstack-router for the differently shaped APIs.
- Page modification date: February 26, 2026.

## Related

- [Core concepts](./core-concepts.md)
- [Navigation layouts](./navigation-layouts.md)
- [Native intent](./native-intent.md)
