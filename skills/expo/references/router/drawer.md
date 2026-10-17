---
source: https://docs.expo.dev/router/advanced/drawer/
---

# Drawer

A navigation drawer lets users swipe open a menu from a side of the screen to expose navigation options; it is typically also toggleable from a header button.

## Signature / Usage

SDK 56 and later: the drawer navigator is bundled in `expo-router` and uses `react-native-drawer-layout` under the hood.

```sh
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler
```

```tsx
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return <Drawer />;
}
```

Customize labels, titles and screen options per screen:

```tsx
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
          title: 'overview',
        }}
      />
      <Drawer.Screen
        name="user/[id]" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'User',
          title: 'overview',
        }}
      />
    </Drawer>
  );
}
```

## Notes

- On Android and iOS the drawer requires `react-native-reanimated` and `react-native-worklets` for animations. On web, animation is handled by CSS.
- SDK 54 and 55: also install `@react-navigation/drawer` (`npx expo install @react-navigation/drawer react-native-reanimated react-native-worklets react-native-gesture-handler`).
- SDK 53 and earlier: `npx expo install @react-navigation/drawer react-native-reanimated react-native-gesture-handler`.
- Protected routes are also available for Drawer navigators.
- Source fetched 2026-10-17.

## Related

- [Navigation layouts](./navigation-layouts.md)
- [Protected routes](./protected-routes.md)
