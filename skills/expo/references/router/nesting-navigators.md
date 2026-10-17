---
source: https://docs.expo.dev/router/advanced/nesting-navigators/
---

# Nesting navigators

Render a navigator inside a screen of another navigator. In Expo Router, a layout route defines each navigator.

## Signature / Usage

File structure: `src/app/_layout.tsx`, `src/app/index.tsx`, `src/app/home/_layout.tsx`, `src/app/home/feed.tsx`, `src/app/home/messages.tsx`.

```tsx
// src/app/_layout.tsx
import { Stack } from 'expo-router';

export default Stack;
```

```tsx
// src/app/home/_layout.tsx
import { Tabs } from 'expo-router';

export default Tabs;
```

```tsx
// src/app/index.tsx
import { Link } from 'expo-router';

export default function Root() {
  return <Link href="/home/messages">Navigate to nested route</Link>;
}
```

Navigating to a nested screen: React Navigation passes screen names in params; Expo Router uses a URL.

```jsx
navigation.navigate('root', {
  screen: 'settings',
  params: {
    screen: 'media',
  },
});
```

```jsx
router.push('/root/settings/media');
```

## Notes

- Navigation UI elements (Link, Tabs, Stack) may move out of the Expo Router library in the future.
- With native tabs, nest a `<Stack />` layout inside each tab to support headers and pushing screens (see native tabs guide, "Use stacks inside tabs").
- Expo Router is built on React Navigation; its `Stack` / `Tabs` / `Link` differ from same-named APIs in react-router and tanstack-router.
- Source fetched 2026-10-17.

## Related

- [Navigation layouts](./navigation-layouts.md)
- [Native tabs](./native-tabs.md)
- [Common navigation patterns](./common-navigation-patterns.md)
