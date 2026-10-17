---
source: https://docs.expo.dev/router/advanced/router-settings/
---

# Router settings

Configure layouts with static properties by exporting `unstable_settings` from a layout.

## Signature / Usage

```tsx
import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  anchor: 'index',
};

export default function Layout() {
  return <Stack />;
}
```

With array syntax `(foo,bar)`, name a group in `unstable_settings` to target a particular segment:

```tsx
export const unstable_settings = {
  // Used for `(foo)`
  anchor: 'first',
  // Used for `(bar)`
  bar: {
    anchor: 'second',
  },
};
```

Load the anchor route below the target during navigation with `withAnchor`:

```js
// If this navigates to a new _layout, load the anchor route below the target route
<Link href="/route" withAnchor />;

router.push('/route', { withAnchor: true });
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `anchor` | string | Sets the default screen of the stack; must match a valid filename (without the extension). Keeps the back arrow when deep linking to `/other` or reloading |
| `initialRouteName` | string | Deprecated. Use `anchor` instead |

## Notes

- `unstable_settings` currently do not work with async routes (development-only); this is why the feature is designated unstable.
- `anchor` is only used when deep-linking to a route. During app navigation, the route being navigated to is the anchor route; use `withAnchor` (on `<Link />` or imperative APIs) to also load the anchor below the target.
- Expo Router is file-based and built on React Navigation; `Link` here is not the react-router or tanstack-router `Link`.
- Page modification date: September 14, 2026. Source fetched 2026-10-17.

## Related

- [Shared routes](./shared-routes.md)
- [Stack](./stack.md)
