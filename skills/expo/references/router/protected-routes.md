---
source: https://docs.expo.dev/router/advanced/protected/
---

# Protected routes

Prevent users from accessing certain routes with client-side navigation using `Stack.Protected` (and `Tabs.Protected`, Drawer equivalents).

## Signature / Usage

```tsx
import { Stack } from 'expo-router';

const isLoggedIn = false;

export function AppLayout() {
  return (
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="private" />
      </Stack.Protected>
      {/* Expo Router includes all routes by default. Adding Stack.Protected creates exceptions for these screens. */}
    </Stack>
  );
}
```

Nesting (`/private` requires logged in and admin; `/about` any logged-in user):

```tsx
<Stack>
  <Stack.Protected guard={isLoggedIn}>
    <Stack.Protected guard={isAdmin}>
      <Stack.Screen name="private" />
    </Stack.Protected>

    <Stack.Screen name="about" />
  </Stack.Protected>
</Stack>
```

Redirect to a specific route (SDK 58 and later):

```tsx
<Stack>
  <Stack.Protected guard={isLoggedIn} redirectTo="/login">
    <Stack.Screen name="private" />
  </Stack.Protected>

  <Stack.Screen name="login" />
</Stack>
```

Tabs:

```tsx
import { Tabs } from 'expo-router/js-tabs';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ tabBarLabel: 'Home' }} />
      <Tabs.Protected guard={isLoggedIn}>
        <Tabs.Screen name="private" options={{ tabBarLabel: 'Private' }} />
        <Tabs.Screen name="profile" options={{ tabBarLabel: 'Profile' }} />
      </Tabs.Protected>

      <Tabs.Protected guard={!isLoggedIn}>
        <Tabs.Screen name="login" options={{ tabBarLabel: 'Login' }} />
      </Tabs.Protected>
    </Tabs>
  );
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `guard` | boolean | When false the contained screens are inaccessible |
| `redirectTo` | string or object href | SDK 58 and later. Redirect target when access is denied; accepts the same href as `Link` |

## Notes

- Denied access redirects to the anchor route (usually index) or the first available screen in the stack. If the user is on `/private/page` and `guard` becomes false, they are redirected automatically.
- When a screen's guard changes from true to false, all of its history entries are removed from navigation history.
- A screen can only exist in one active route group at a time. Declare a screen once; use a conditional group instead of duplicating (duplicate `Stack.Screen name="profile"` is not allowed).
- Protected routes are also available for Tabs and Drawer navigators.
- Navigators created with `createStandardRouterNavigator` or `integrateWithRouter` include a `.Protected` child (stable custom navigator APIs are SDK 58 and later).
- Protected screens are evaluated on the client only. During static site generation no HTML files are created for protected routes, but a user who knows the URLs can still request the HTML or JavaScript files directly. Not a replacement for server-side authentication or access control.
- Source fetched 2026-10-17.

## Related

- [Authentication](./authentication.md)
- [Common navigation patterns](./common-navigation-patterns.md)
- [Tabs](./tabs.md)
- [Drawer](./drawer.md)
