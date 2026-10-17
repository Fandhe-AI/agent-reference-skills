---
source: https://docs.expo.dev/router/advanced/shared-routes/
---

# Shared routes

Match the same URL with different layouts using groups with overlapping child routes (e.g. a profile viewable from every tab but with one URL).

## Signature / Usage

File structure: `src/app/_layout.tsx` (tab bar), `(home)/[user].tsx`, `(search)/[user].tsx`, `(profile)/[user].tsx`, each group with its own `_layout.tsx`.

Group segments are not part of the URL, so every shared route matches the same URL. Navigate directly to a group with `/(search)/baconbrix` (matches `/baconbrix` in the "search" layout).

Array syntax duplicates the children of a group (`src/app/(home,search)/[user].tsx` creates `(home)/[user].tsx` and `(search)/[user].tsx` in memory). Distinguish with the layout's `segment` prop:

```tsx
import { Stack } from 'expo-router';
// SearchStack is your own layout component for the "search" group.

export default function DynamicLayout({ segment }) {
  if (segment === '(search)') {
    return <SearchStack />;
  }

  return <Stack />;
}
```

Enable array syntax by specifying an `anchor` per group:

```tsx
export const unstable_settings = {
  anchor: 'home',
  search: {
    anchor: 'search',
  },
};

export default function DynamicLayout({ segment }) {
  // ...same body as the previous example
}
```

## Notes

- The layout snippets add the `Stack` import and a comment for `SearchStack` / the elided body; the original shows them without imports.
- In-app navigation keeps the current group. A page reload, bookmark, shared URL and deep link are cold links with no current group, so Expo Router renders the first alphabetical match; the same URL can render different screens after in-app navigation versus a reload.
- Do not use shared routes to give different user roles a different version of a screen: the URL does not carry the role and protected routes do not change that. Declare the screen once and control access with `Stack.Protected`.
- Array syntax is unique to native app development and is an advanced concept.
- Key points: groups can only be provided for the current navigator; with `(one)/(two)` only the last group's segment is used for matching; with at least two group anchors and no default `anchor`, the first group's anchor is used.
- Source fetched 2026-10-17.

## Related

- [Notation](./notation.md)
- [Router settings](./router-settings.md)
- [Protected routes](./protected-routes.md)
- [Common navigation patterns](./common-navigation-patterns.md)
