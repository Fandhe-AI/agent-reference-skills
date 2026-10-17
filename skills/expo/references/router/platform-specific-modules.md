---
source: https://docs.expo.dev/router/advanced/platform-specific-modules/
---

# Platform-specific extensions and module

Show platform-specific content in Expo Router with Metro platform extensions and the React Native `Platform` module.

## Signature / Usage

Platform extensions inside **src/app** (a non-platform version must also exist):

```text
src
  app
    _layout.tsx
    _layout.web.tsx
    index.tsx
    about.tsx
    about.web.tsx
```

- **_layout.web.tsx** is the layout on web; **_layout.tsx** is used on all other platforms.
- **index.tsx** is the home page for all platforms.
- **about.web.tsx** is the about page for web; **about.tsx** is used on all other platforms.

Platform extensions outside **src/app**, re-exported as a screen:

```tsx
export { default } from '@/components/about';
```

Using the `Platform` module:

```tsx
import { Platform } from 'react-native';
import { Link, Slot, Tabs } from 'expo-router';

export default function Layout() {
  if (Platform.OS === 'web') {
    // Use a basic custom layout on web.
    return (
      <div style={{ flex: 1 }}>
        <header>
          <Link href="/">Home</Link>
          <Link href="/settings">Settings</Link>
        </header>
        <Slot />
      </div>
    );
  }
  // Use a native bottom tabs layout on native platforms.
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
```

## Notes

- Extensions such as **.android.tsx**, **.ios.tsx**, **.native.tsx**, **.web.tsx** are supported in **src/app** only if a non-platform version exists, so routes stay universal across platforms for deep linking.
- Platform-specific extensions were added in Expo Router `3.5.x`; for older versions use the `Platform` module.
- Outside **src/app** (for example `src/components/about.tsx`, `about.ios.tsx`, `about.web.tsx`), Metro picks the correct component by current platform.
- Expo Router is file-based and built on React Navigation; its `Link` and `Tabs` differ from the same-named APIs in react-router and tanstack-router.
- Page modification date: February 26, 2026. Source fetched 2026-10-17.

## Related

- [Native tabs](./native-tabs.md)
- [Navigation layouts](./navigation-layouts.md)
