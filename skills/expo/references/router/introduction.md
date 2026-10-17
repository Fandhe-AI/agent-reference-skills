---
source: https://docs.expo.dev/router/introduction/
---

# Introduction to Expo Router

Expo Router is an open-source file-based routing library for Universal React Native applications built with Expo. When a file is added to the **app** directory, the file automatically becomes a route in your navigation.

## Signature / Usage

Create a new project with Expo Router already installed and configured:

```sh
npx create-expo-app@latest --template default@sdk-58
npx expo start
```

## Notes

- During the SDK 58 transition period, `create-expo-app@latest` without the `--template` flag creates an SDK 57 project. If you plan to use Expo Go on a physical device, use an SDK 57 project. Otherwise, use `--template default@sdk-58`.
- Key features: native (built on React Native Screens), shareable (every screen is deep linkable), offline-first, optimized (lazy evaluation in production via async routes), universal Fast Refresh, universal (Android, iOS, web share one navigation structure), discoverable (build-time static rendering on web).
- Expo Router is only available in Expo CLI projects with Metro (Expo CLI can be used in any React Native project).
- Basic static rendering (SSG) is supported. Server-side rendering requires custom infrastructure (per this page).
- Other navigation libraries such as React Navigation can still be used. React Native Navigation by Wix is not available in Expo Go and is not yet compatible with `expo-dev-client`.
- Expo Router is file-based and built on React Navigation. Its `Link`, `useRouter` and `Stack` differ from the same-named APIs in react-router and tanstack-router.
- Page modification date: October 16, 2026.

## Related

- [Manual installation](./installation.md)
- [Core concepts](./core-concepts.md)
