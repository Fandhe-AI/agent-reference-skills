# Android Settings Plugin (com.android.settings)

The settings plugin centralizes common build properties (`compileSdk`, `minSdk`, `targetSdk`) that apply to all modules in `settings.gradle`, so they need not be copied across module-level build files.

## Signature / Usage

```kotlin
// settings.gradle.kts
pluginManagement {
    // Add the following.
    plugins {
       id("com.android.settings") version "9.4.0" apply false
    }
}

plugins {
    id("com.android.settings")
}

android {
    compileSdk {
        version = release(36) {
            minorApiLevel = 1
        }
    }
    minSdk {
        version = release(23)
    }
    targetSdk {
        version = release(36)
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `android.compileSdk { version = release(N) { minorApiLevel = M } }` | block | Compile SDK for all modules; optional minor API level. |
| `android.minSdk { version = release(N) }` | block | Minimum SDK for all modules. |
| `android.targetSdk { version = release(N) }` | block | Target SDK for all modules. |

## Notes

- Apply the plugin in `settings.gradle`. The plugin version must be the same as the AGP version declared in `libs.versions.toml` (the source example uses `9.4.0`).
- Unlike module-level `build.gradle` files, `minSdk` and `targetSdk` are applied in the top-level `android` block of `settings.gradle`.
- Remove these properties from module-level `build.gradle` files if you want the settings-level versions to apply. Keeping them in a module's `build.gradle` overrides the `settings.gradle` values for that module.
- Source: https://developer.android.com/build/android-settings-plugin (local copy fetched 2026-10).

## Related

- [settings.gradle.kts](./settings-gradle.md)
- [android block](./android-block.md)
- [Module build.gradle.kts](./module-build-gradle.md)
