---
source: https://docs.expo.dev/modules/get-started/
---

# Expo Modules API: Get started

Two recommended flows: add a local module to an existing Expo app, or create a standalone module with a generated example project.

## Signature / Usage

Local module in an existing app (run in the directory containing package.json):

```sh
npx create-expo-module@latest --local
```

Standalone module with example project:

```sh
npx create-expo-module@latest my-module
```

## Flow 1: add a module to an existing application

1. Run the command above. A **modules** directory is created: `modules/my-module/{android, ios, src, expo-module.config.json, index.ts}`.
2. If the project has no native projects (**android** / **ios**), run `npx expo prebuild --clean`. If an **ios** directory created by `npx expo prebuild` already exists, reinstall pods with `npx pod-install`.
3. Import the module and start the dev server with `npx expo start`:

```tsx
import MyModule from '@/modules/my-module';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>{MyModule.hello()}</Text>
    </View>
  );
}
```

4. Edit native code and rebuild:
   - Android: open the generated **android** directory in Android Studio, edit **modules/my-module/android/src/main/java/expo/modules/mymodule/MyModule.kt**, click Run 'app'.
   - iOS: open **ios** in Xcode (`xed ios`), edit **MyModule.swift** under Pods > Development Pods > MyModule, run (Cmd + R).

## Flow 2: standalone module with an example project

1. Run `npx create-expo-module@latest my-module` (generates the module and an example app for Android and iOS).
2. `cd my-module`, then `npm run open:android` / `npm run open:ios`.
3. In **example**, start the dev server with `npx expo start`.
4. Edit **my-module/android/src/main/java/expo/modules/mymodule/MyModule.kt** or **MyModule.swift**, then rebuild.

## Notes

- Repeat the native build every time native code changes.
- Use `npx pod-install` after adding new native files to the module or modifying **expo-module.config.json**.
- On Windows the example Android project can be opened in Android Studio but the iOS project files cannot be opened.
- Yarn, pnpm and bun equivalents exist for each command (for example `yarn create expo-module --local`, `bun create expo-module my-module`).
- Full CLI options: see create-expo-module.md. Adding the API to an existing library: see existing-library.md.
- Distinct from the apple-swift and android-architecture skills (this page covers the Expo module scaffolding only).
- Source modificationDate: July 27, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [create-expo-module](./create-expo-module.md)
- [Integrate in an existing library](./existing-library.md)
- [Module API Reference](./module-api.md)
- [Overview](./overview.md)
