---
source: https://docs.expo.dev/router/basics/common-navigation-patterns/
---

# Common navigation patterns in Expo Router

Real-life navigation patterns: stacks inside tabs, platform-specific tabs, shared routes, protected routes, and non-route UI.

## Signature / Usage

Stacks inside tabs (`(tabs)/_layout.tsx` returns `Tabs`; `(tabs)/feed/_layout.tsx` returns a `Stack` with an anchor):

```tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="feed" options={{ title: 'Feed' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
```

```tsx
import { Stack } from 'expo-router';

export const unstable_settings = {
  anchor: 'index',
};

export default function FeedLayout() {
  return <Stack />;
}
```

```tsx
<Link href="/feed/123" withAnchor>
  Go to post
</Link>
```

Going back to the tab you came from: keep the detail route outside the tabs and push it from an outer stack (`src/app/feed/[postId].tsx` next to `(tabs)`):

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="feed/[postId]" options={{ title: 'Post' }} />
    </Stack>
  );
}
```

Sharing a route between two tabs with a shared route group `(feed,search)`:

```tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(feed)" options={{ title: 'Feed' }} />
      <Tabs.Screen name="(search)" options={{ title: 'Search' }} />
    </Tabs>
  );
}
```

```tsx
import { Stack } from 'expo-router';

export default function SharedLayout() {
  return <Stack />;
}
```

Protected routes with `Stack.Protected`:

```tsx
import { Stack } from 'expo-router';
import { useAuthState } from '@/utils/authState';

export default function RootLayout() {
  const { isLoggedIn } = useAuthState();

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="create-account" />
      </Stack.Protected>
    </Stack>
  );
}
```

Conditionally showing a tab:

```tsx
<Tabs>
  <Tabs.Screen name="index" />

  <Tabs.Protected guard={isVip}>
    <Tabs.Screen name="vip" />
  </Tabs.Protected>

  <Tabs.Screen name="settings" />
</Tabs>
```

A login modal over the app instead of a route:

```tsx
import { Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

export default function Layout() {
  const isAuthenticated: boolean = false; // replace with a check for a valid auth token / session

  return (
    <SafeAreaView>
      <Stack />
      <Modal visible={!isAuthenticated}>{/* login UX */}</Modal>
    </SafeAreaView>
  );
}
```

## Notes

- Stacks inside tabs: a `Link` to a URL belonging to another tab switches tabs; back then pops the stack inside that tab. With native tabs, every tab loads on mount, so a tab containing a stack already sits at its first screen (it ends up underneath the linked screen whether or not `withAnchor` is passed).
- Shared routes: when focused on a tab, navigating to the shared page stays in that tab's group. A deep link from outside picks the first group alphabetically (here the Feed tab).
- Protected routes: when `guard={false}` the screen is inaccessible and the next available screen opens. Guards are also checked on deep links. When the guard value changes the layout re-renders and the app navigates to the root of the accessible group.
- You can also nest tabs inside an outer stack navigator, often more useful for modals over the tabs.
- The official login-modal example leaves isAuthenticated as a comment-only placeholder; here it is a boolean literal so the snippet is valid TSX. Wire it to your app's own auth state.
- Expo Router is file-based and built on React Navigation; its `Stack` / `Tabs` / `Link` differ from same-named APIs in react-router and tanstack-router.

## Related

- [Nesting navigators](./nesting-navigators.md)
- [Shared routes](./shared-routes.md)
- [Protected routes](./protected-routes.md)
- [Authentication](./authentication.md)
- [Modals](./modals.md)
- [Native tabs](./native-tabs.md)
