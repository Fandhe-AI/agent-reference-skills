---
source: https://docs.expo.dev/router/advanced/tabs/
---

# JavaScript tabs

Create a tab bar with the JavaScript `Tabs` layout (React Navigation bottom tabs) in Expo Router.

## Signature / Usage

```text
src
  app
    _layout.tsx
    (tabs)
      _layout.tsx
      index.tsx
      settings.tsx
```

```tsx
// src/app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

```tsx
// src/app/(tabs)/_layout.tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
```

Hide a tab (the route exists but is not shown in the tab bar):

```tsx
<Tabs.Screen name="index" options={{ href: null }} />
```

Dynamic route in a tab:

```tsx
<Tabs.Screen
  // Name of the dynamic route.
  name="[user]"
  options={{
    // Ensure the tab always links to the same href.
    href: '/evanbacon',
    // OR you can use the href object.
    href: {
      pathname: '/[user]',
      params: {
        user: 'evanbacon',
      },
    },
  }}
/>
```

## Options / Props

Set via `screenOptions` on `Tabs` (all tabs) or `options` on `Tabs.Screen` (one tab). In SDK 56 and later, JavaScript tabs are bundled with Expo Router.

| Option | Platform | Description |
| --- | --- | --- |
| `tabBarAccessibilityLabel` | Android, iOS | Accessibility label for the tab button; read by the screen reader on tap |
| `tabBarActiveBackgroundColor` | Android, iOS | Background color for the active tab |
| `tabBarActiveTintColor` | Android, iOS | Color for the icon and label in the active tab |
| `tabBarBackground` | Android, iOS | Function returning a React Element used as tab bar background (image, gradient, blur view). With `BlurView`, set `position: 'absolute'` in `tabBarStyle` and use `useBottomTabBarHeight` for bottom padding |
| `tabBarBadge` | Android, iOS | Text to show in a badge on the tab icon; `string` or `number` |
| `tabBarBadgeStyle` | Android, iOS | Style for the badge (background or text color) |
| `tabBarButton` | Android, iOS | Function returning a React element for the tab bar button (wraps icon and label); renders `PlatformPressable` by default |
| `tabBarButtonTestID` | Android, iOS | ID to locate this tab button in tests |
| `tabBarHideOnKeyboard` | Android, iOS | Whether the tab bar is hidden when the keyboard opens. Defaults to `false` |
| `tabBarIcon` | Android, iOS | Function that given `{ focused: boolean, color: string, size: number }` returns a React.Node |
| `tabBarIconStyle` | Android, iOS | Style object for the tab icon |
| `tabBarInactiveBackgroundColor` | Android, iOS | Background color for the inactive tabs |
| `tabBarInactiveTintColor` | Android, iOS | Color for the icon and label in the inactive tabs |
| `tabBarItemStyle` | Android, iOS | Style object for the tab item container |
| `tabBarLabel` | Android, iOS | Title string or a function given `{ focused: boolean, color: string }` returning a React.Node. When undefined, scene `title` is used |
| `tabBarLabelPosition` | Android, iOS | `below-icon` (phones) or `beside-icon` (tablets); chosen automatically by device width by default |
| `tabBarLabelStyle` | Android, iOS | Style object for the tab label |
| `tabBarPosition` | Android, iOS | `bottom` (default), `top`, `left`, `right`. `left` / `right` are styled as a sidebar |
| `tabBarShowLabel` | Android, iOS | Whether the tab label is visible. Defaults to `true` |
| `tabBarStyle` | Android, iOS | Style object for the tab bar. Set `position` to absolute to show the screen under the tab bar (add bottom margin yourself; see `useBottomTabBarHeight`) |
| `tabBarVariant` | Android, iOS | `uikit` (default) or `material`. `material` is currently only supported when `tabBarPosition` is `left` or `right` |

## Notes

- Expo Router offers three tab navigators: JavaScript tabs (React Navigation bottom tabs), Native tabs (platform tab bar), and Custom tabs (headless components from `expo-router/ui`).
- The `(tabs)` directory is a group directory; **index.tsx** is the default tab when the app loads.
- When adding a dynamic route in a tab layout, the dynamic route must be unique: two `[user]` tabs are not allowed. For multiple dynamic routes, create a custom navigator.
- Expo Router is file-based and built on React Navigation; its `Tabs` and `Link` differ from same-named APIs in react-router and tanstack-router.
- Page modification date: September 29, 2026. Source fetched 2026-10-17.

## Related

- [Native tabs](./native-tabs.md)
- [Stack](./stack.md)
- [Navigation layouts](./navigation-layouts.md)
