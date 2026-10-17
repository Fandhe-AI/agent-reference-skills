---
source: https://docs.expo.dev/modules/existing-library/
---

# Integrate in an existing library

Integrate the Expo Modules API into an existing React Native library, for example to rewrite incrementally or to use Android lifecycle listeners and iOS AppDelegate subscribers for automatic setup.

## Signature / Usage

1. Create **expo-module.config.json** at the project root containing `{}` (required for Expo Autolinking to recognize the library).
2. Add the native dependency:

```groovy
// build.gradle
dependencies {
  // ...
  implementation project(':expo-modules-core')
}
```

```ruby
# *.podspec
Pod::Spec.new do |s|
  # ...
  s.dependency 'ExpoModulesCore'
end
```

3. package.json dependencies:

```json
{
  "devDependencies": {
    "expo-modules-core": "^X.Y.Z"
  },
  "peerDependencies": {
    "expo": "*"
  },
  "peerDependenciesMeta": {
    "expo": {
      "optional": true
    }
  }
}
```

4. Create the module classes:

```kotlin
package my.module.package

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MyModule : Module() {
  override fun definition() = ModuleDefinition {
    // Definition components go here
  }
}
```

```swift
import ExpoModulesCore

public class MyModule: Module {
  public func definition() -> ModuleDefinition {
    // Definition components go here
  }
}
```

5. Register them in expo-module.config.json:

```json
{
  "platforms": ["apple", "android"],
  "apple": {
    "modules": ["MyModule"]
  },
  "android": {
    "modules": ["my.module.package.MyModule"]
  }
}
```

6. Access from JavaScript:

```ts
import { requireNativeModule } from 'expo-modules-core';

export default requireNativeModule('MyModule');
```

## Notes

- Use `*` as the `expo` peer-dependency range to avoid duplicated packages in the user's node_modules. `expo-modules-core` is only a dev dependency because the `expo` package provides a compatible core.
- Android: the module class is linked automatically as part of the Gradle build task. iOS: run `pod install` to link the new class.
- Putting `requireNativeModule` in a separate file that exports the module is recommended.
- The source page's step-5 example omits `platforms` and uses the legacy `ios` key; autolinking skips platforms not listed in `platforms`, so it is added here (see expo-module.config.json / Autolinking).
- Distinct from apple-swift and android-architecture.
- Source modificationDate: May 23, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [expo-module.config.json](./module-config.md)
- [Autolinking](./autolinking.md)
- [Module API Reference](./module-api.md)
- [Wrap third-party native libraries](./third-party-library.md)
