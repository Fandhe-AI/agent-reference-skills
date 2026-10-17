---
source: https://docs.expo.dev/modules/native-module-tutorial/
---

# Native Module with Events and Enums

Create an Expo module (`expo-settings`) that stores a theme preference in SharedPreferences / UserDefaults, emits change events, and restricts values with an enum.

```sh
npx create-expo-module expo-settings
```

```kotlin android/src/main/java/expo/modules/settings/ExpoSettingsModule.kt
package expo.modules.settings

import android.content.Context
import android.content.SharedPreferences
import androidx.core.os.bundleOf
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.types.Enumerable

class ExpoSettingsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoSettings")

    Events("onChangeTheme")

    Function("setTheme") { theme: Theme ->
      getPreferences().edit().putString("theme", theme.value).commit()
      this@ExpoSettingsModule.sendEvent("onChangeTheme", bundleOf("theme" to theme.value))
    }

    Function("getTheme") {
      return@Function getPreferences().getString("theme", Theme.SYSTEM.value)
    }
  }

  private val context
  get() = requireNotNull(appContext.reactContext)

  private fun getPreferences(): SharedPreferences {
    return context.getSharedPreferences(context.packageName + ".settings", Context.MODE_PRIVATE)
  }
}

enum class Theme(val value: String) : Enumerable {
  LIGHT("light"),
  DARK("dark"),
  SYSTEM("system")
}
```

```swift ios/ExpoSettingsModule.swift
import ExpoModulesCore

public class ExpoSettingsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSettings")

    Events("onChangeTheme")

    Function("setTheme") { (theme: Theme) -> Void in
      UserDefaults.standard.set(theme.rawValue, forKey:"theme")
      sendEvent("onChangeTheme", [
        "theme": theme.rawValue
      ])
    }

    Function("getTheme") { () -> String in
      UserDefaults.standard.string(forKey: "theme") ?? Theme.system.rawValue
    }
  }

  enum Theme: String, Enumerable {
    case light
    case dark
    case system
  }
}
```

```ts src/ExpoSettings.types.ts
export type Theme = 'light' | 'dark' | 'system';

export type ThemeChangeEvent = {
  theme: Theme;
};

export type ExpoSettingsModuleEvents = {
  onChangeTheme: (params: ThemeChangeEvent) => void;
};
```

```ts src/ExpoSettingsModule.ts
import { NativeModule, requireNativeModule } from 'expo';

import { ExpoSettingsModuleEvents, Theme } from './ExpoSettings.types';

declare class ExpoSettingsModule extends NativeModule<ExpoSettingsModuleEvents> {
  setTheme: (theme: Theme) => void;
  getTheme: () => Theme;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSettingsModule>('ExpoSettings');
```

```ts src/index.ts
import { EventSubscription } from 'expo-modules-core';

import ExpoSettingsModule from './ExpoSettingsModule';

import { Theme, ThemeChangeEvent } from './ExpoSettings.types';

export function addThemeListener(listener: (event: ThemeChangeEvent) => void): EventSubscription {
  return ExpoSettingsModule.addListener('onChangeTheme', listener);
}

export function getTheme(): Theme {
  return ExpoSettingsModule.getTheme();
}

export function setTheme(theme: Theme): void {
  return ExpoSettingsModule.setTheme(theme);
}
```

```tsx example/App.tsx
import * as Settings from 'expo-settings';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function App() {
  const [theme, setTheme] = useState<string>(Settings.getTheme());

  useEffect(() => {
    const subscription = Settings.addThemeListener(({ theme: newTheme }) => {
      setTheme(newTheme);
    });

    return () => subscription.remove();
  }, [setTheme]);

  // Toggle between dark and light theme
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Theme: {Settings.getTheme()}</Text>
      <Button title={`Set theme to ${nextTheme}`} onPress={() => Settings.setTheme(nextTheme)} />
    </View>
  );
}
```

```sh
# root of the module: start the TypeScript compiler
npm run build
# in a separate terminal
cd example
npx expo run:android
npx expo run:ios
```

## Notes

- The page builds the module step by step (getter, then setter, then events, then enum); the code above is the final state, with the tutorial's default prompts accepted for `create-expo-module`.
- Event payloads are `Bundle` instances on Android (`bundleOf`) and dictionaries on iOS; declare them with `Events(...)` and emit with `sendEvent`.
- `requireNativeModule` loads the native object over JSI; the tutorial first deletes the generated view module and web files to start from a minimal module.
- Passing an invalid value (for example `"not-a-real-theme"`) raises a runtime `EnumNoSuchValueException` listing the allowed enum values.
- This sample shows Expo Modules API usage, not the Kotlin or Swift language references (see the apple-swift and android-architecture skills for platform APIs).
- Source: https://docs.expo.dev/modules/native-module-tutorial/ (fetched 2026-10-17).
