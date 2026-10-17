---
source: https://docs.expo.dev/modules/inline-modules-tutorial/
---

# Inline Module

Write a native module directly in the app's `app` directory (Kotlin and Swift) without a separate package.

```json app.json
{
  "expo": {
    "experiments": {
      "inlineModules": {
        "watchedDirectories": ["app"]
      }
    }
  }
}
```

```sh
npx expo prebuild
npx expo run:android
npx expo run:ios
```

```kotlin app/FirstInlineModule.kt
package app

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class FirstInlineModule : Module() {
  override fun definition() = ModuleDefinition {
    Constant("Hello") { ->
      "Hello Android inline modules!"
    }
  }
}
```

```swift app/FirstInlineModule.swift
internal import ExpoModulesCore

class FirstInlineModule: Module {
  public func definition() -> ModuleDefinition {
    Constant("Hello") {
      return "Hello iOS inline modules!"
    }
  }
}
```

```tsx app/index.tsx
import { requireNativeModule } from 'expo';
import { Text } from 'react-native';

const FirstInlineModule = requireNativeModule('FirstInlineModule');

export default function InlineModulesDemoComponent() {
  return <Text> {FirstInlineModule.Hello} </Text>;
}
```

## Notes

- Inline modules are experimental and available in Expo SDK 56 and later; the API is subject to breaking changes.
- Defining `expo.experiments.inlineModules` enables the feature; `watchedDirectories` lists where inline modules live (not every directory is allowed, see the inline modules reference).
- Run `npx expo prebuild` to generate the **android** and **ios** projects with inline module support, then rebuild natively.
- The same page also shows an inline native view (`View(ExpoWebView::class)` / `View(ExpoWebView.self)`) loaded with `requireNativeView`.
- This sample shows Expo Modules API usage, not the Kotlin or Swift language references (see the apple-swift and android-architecture skills).
- Source: https://docs.expo.dev/modules/inline-modules-tutorial/ (fetched 2026-10-17, modificationDate July 27, 2026).
