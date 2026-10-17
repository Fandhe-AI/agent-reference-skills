---
source: https://docs.expo.dev/router/basics/navigation-layouts/
---

# Navigation layouts in Expo Router

Each directory within **src/app** (including **src/app** itself) can define a layout in a **_layout.tsx** file. The layout exports a default component rendered before any page in that directory; it is where a stack, tab, drawer or other navigator is defined.

## Signature / Usage

Root layout (entry point for navigation; initialization code that was in **App.jsx** goes here):

```tsx
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Stack />;
}
```

Stack with screen options (`name` must match the route name):

```tsx
import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen name="[productId]" options={{ headerShown: false }} />
    </Stack>
  );
}
```

JavaScript tabs (all routes directly inside the directory are tabs; `index` is the default tab):

```tsx
import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen name="feed" options={{ title: 'Feed' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
```

Native tabs (Android and iOS):

```tsx
import { NativeTabs } from 'expo-router/native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/home.png')} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

Platform-specific tabs: **src/components/app-tabs.native.tsx** (native tabs, Android and iOS) and **src/components/app-tabs.tsx** (custom tabs from `expo-router/ui`, web). The root layout imports `AppTabs`:

```tsx
import AppTabs from '@/components/app-tabs';

export default function RootLayout() {
  return <AppTabs />;
}
```

```tsx
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot />
      <TabList>
        <TabTrigger name="index" href="/">
          Home
        </TabTrigger>
        <TabTrigger name="explore" href="/explore">
          Explore
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
```

`Slot` renders a layout without a navigator (header / footer around the current route; navigating replaces the page instead of pushing):

```tsx
import { Slot } from 'expo-router';

// Header and Footer are your own components
export default function Layout() {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
}
```

## Notes

- With `Stack`, `/products` opens `products/index.tsx`; `/products/123` is pushed onto the stack; a back button is rendered by default. A page that is not visible but still pushed onto the stack is still being rendered.
- Files inside the directory automatically become eligible routes, so every screen need not be declared in the navigator.
- Nest navigators only when truly needed: an extra **_layout.tsx** with a `Stack` in a subdirectory defines another stack inside the first one. Directories that only affect the URL are fine.
- With `Tabs`, define the tabs in the navigator to control order, title and icon.
- Other layouts: Drawer navigator, native tabs, fully customized tabs, modals, and any React Navigation-compatible navigator (via `withLayoutContext`).
- Expo Router is file-based and built on React Navigation; its `Stack` / `Tabs` / `Slot` differ from same-named APIs in react-router and tanstack-router.
- In the `Slot` example, `Header` and `Footer` are placeholders for user-defined components (not imported in the official snippet).
- Page source: Guides > Expo Router > Router 101.

## Related

- [Stack](./stack.md)
- [Tabs](./tabs.md)
- [Native tabs](./native-tabs.md)
- [Drawer](./drawer.md)
- [Modals](./modals.md)
- [Platform-specific modules](./platform-specific-modules.md)
- [Nesting navigators](./nesting-navigators.md)
