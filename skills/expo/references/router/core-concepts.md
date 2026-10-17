---
source: https://docs.expo.dev/router/basics/core-concepts/
---

# Core concepts of file-based routing in Expo Router

The ground rules of Expo Router and how it relates to the rest of the code.

## Signature / Usage

Example project structure:

```text
src
  app
    index.tsx
    home.tsx
    _layout.tsx
    profile
      friends.tsx
  components
    app-tabs.native.tsx
    app-tabs.tsx
    text-field.tsx
    toolbar.tsx
```

- `src/app/index.tsx` is the initial route.
- `src/app/home.tsx` is route `/home` (`yourapp.com/home` on web, `yourapp://home` in a native app).
- `src/app/_layout.tsx` is the root layout; initialization code previously in **App.jsx** goes here.
- `src/app/profile/friends.tsx` is route `/profile/friends`.
- `src/components/*` are not in `src/app`, so they are not pages and have no URL.

## Notes

- Rules: (1) all screens/pages are files inside `src/app`; every file there has a default export: page files define a distinct page, while the special `_layout` files default-export a layout (navigator/providers) rather than a page. (2) All pages have a URL matching their file location (universal deep-linking). (3) The first `index.tsx` matching `/` is the initial route; use a route group such as `src/app/(tabs)` to start deeper in the tree. (4) Root `_layout.tsx` replaces App.jsx/tsx (fonts, theme providers, splash screen). (5) The default template uses platform-specific tabs: native tabs on Android and iOS (`app-tabs.native.tsx`), custom tabs from `expo-router/ui` on web (`app-tabs.tsx`). (6) Non-navigation components live outside `src/app`; anything inside is treated as a route. (7) Stack and tab navigators accept many options (headers, animations, gestures).
- Rule (1) is reworded from the source: the `_layout` exception in the source applies to defining a distinct page, not to the default export; layouts must also be default-exported.
- Expo Router is file-based and built on React Navigation; its `Link`, `useRouter` and `Stack` differ from react-router and tanstack-router APIs of the same name.
- Page modification date: July 28, 2026.

## Related

- [Notation](./notation.md)
- [Navigation layouts](./navigation-layouts.md)
- [Platform-specific modules](./platform-specific-modules.md)
- [Stack](./stack.md)
- [Tabs](./tabs.md)
