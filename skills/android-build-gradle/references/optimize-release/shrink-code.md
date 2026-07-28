# R8 Code Shrinking

R8 is Android's app optimizer: it removes unused code (tree shaking), applies logical optimizations (method inlining, class merging), and obfuscates class/field/method names for release builds.

## Signature / Usage

```kotlin
// Legacy DSL (AGP < 9.3)
android {
    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true

            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}
```

```kotlin
// AGP 9.3+ simplified DSL
android {
    buildTypes {
        release {
            optimization {
                enable = true // enables code and resource optimizations
            }
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isMinifyEnabled` | `Boolean` | `false` | Enables R8 code shrinking, optimization, and obfuscation for the build type. |
| `isShrinkResources` | `Boolean` | `false` | Enables resource shrinking; requires `isMinifyEnabled = true`. |
| `optimization.enable` | `Boolean` | `false` | AGP 9.3+ single switch that enables both code and resource optimizations. |
| `proguardFiles` | `vararg FileCollection/String` | — | Legacy DSL: default + custom keep-rule files applied to this build type. |

## Notes

- R8 optimization phases: code shrinking (tree shaking from manifest entry points), logical optimizations (method inlining, class merging), obfuscation (e.g. `com.example.MyActivity` → `a.b.a`), and since AGP 8.12.0, resource optimization.
- Use `proguard-android-optimize.txt` (includes optimization rules); `proguard-android.txt` is deprecated (includes `-dontoptimize`, dropped in AGP 9.0).
- AGP 9.3+: keep rules move to `src/<variant>/keepRules/*.keep` (e.g. `src/main/keepRules/custom-rules.keep`) instead of `proguard-rules.pro`, and default Android keep rules are included automatically.
- Full mode (default since AGP 8.0) is controlled via `android.enableR8.fullMode=true` in `gradle.properties`; opt-in only for AGP 7.x.
- Always enable optimization for release builds; disable for test builds and libraries.

## Related

- [proguard-rules.md](./proguard-rules.md)
- [shrink-resources.md](./shrink-resources.md)
- [r8-troubleshooting.md](./r8-troubleshooting.md)
