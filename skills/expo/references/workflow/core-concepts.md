---
source: https://docs.expo.dev/core-concepts/
---

# Core concepts

Overview of Expo tools, features and services. Expo is an open-source framework for apps that run natively on Android, iOS, and the web; the `expo` npm package can be installed in nearly any React Native project.

## Signature / Usage

```sh
npx expo install expo
```

## Notes

- Tools and features: Expo SDK (React Native modules for Android, iOS, web), development workflow, Expo Modules API (Swift and Kotlin), Prebuild, Expo CLI, Expo Go.
- All features are free, optional, and can be used independently; unused features add no bloat.
- With `expo` (vs existing React Native without it): develop complex apps entirely in JavaScript; write JSI native modules with Swift and Kotlin; develop without Xcode or Android Studio; share examples in the browser with Snack; major upgrades without native changes; first-class TypeScript; install natively compatible libraries from the command line; websites from the same codebase; tunnel your dev server to any device.
- Expo Application Services (EAS): cloud services for building, submitting, and updating apps; usable with any React Native app, with or without `expo`.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react skill and a future react-native skill for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: September 17, 2026).

## Related

- [Develop an app with Expo](./workflow-overview.md)
- [Expo CLI](./expo-cli.md)
- [Continuous Native Generation (CNG)](./continuous-native-generation.md)
