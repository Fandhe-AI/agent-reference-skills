# Resource Shrinking

Removes resources (drawables, layouts, strings, etc.) that are unreferenced by the app's compiled code and manifest, reducing APK/AAB size. Requires code shrinking to be enabled first.

## Signature / Usage

```kotlin
android {
    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true // enable resource shrinking

            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}
```

```properties
# gradle.properties — optimized resource shrinking (AGP 8.12-8.13 manual opt-in)
android.r8.optimizedResourceShrinking=true
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isShrinkResources` | `Boolean` | `false` | Enables resource shrinking for the build type; requires `isMinifyEnabled = true` in the same build type. |
| `android.r8.optimizedResourceShrinking` | Gradle property | `false` (AGP 8.12-8.13) | Merges resource and code shrinking into a single R8 reference graph. |
| `optimization.enable` | `Boolean` | `false` | AGP 9.3+ single switch; optimized resource shrinking is always enabled when set. |

## Notes

- Optimized resource shrinking treats resources as part of the code reference graph (instead of a separate AAPT2-generated keep-rule pass), removing unreferenced code/resource clusters together — reported to cut 50%+ of size in apps sharing resources across form factors.
- AGP 9.0+: optimized resource shrinking is enabled automatically whenever `isShrinkResources = true` is set; the `android.r8.optimizedResourceShrinking` property is only needed for the AGP 8.12-8.13 manual opt-in window.
- AGP 8.12.0 introduced the initial (manual) support for optimized resource shrinking.

## Related

- [shrink-code.md](./shrink-code.md)
