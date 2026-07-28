# APK Splits (`splits { }`)

Configures Gradle to build multiple, per-ABI (or per-density) APKs directly, each containing only the resources for that configuration. Superseded by the Android App Bundle for Play Store distribution.

## Signature / Usage

```kotlin
android {
    splits {
        // Configures multiple APKs based on ABI
        abi {
            // Enables building multiple APKs per ABI
            isEnable = true

            // Resets the default ABI list to none
            reset()

            // Specifies which ABIs to build APKs for
            include("x86", "x86_64")

            // Also generate a universal APK containing all ABIs
            isUniversalApk = false
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `abi.isEnable` | `Boolean` | `false` | Enables building multiple APKs per ABI. |
| `abi.isUniversalApk` | `Boolean` | `false` | Additionally generates a universal APK containing all ABIs. |
| `reset()` | method | — | Clears the default ABI list so `include()` defines the exact set. |
| `include(vararg abis)` | method | — | ABIs to generate APKs for (used after `reset()`). |
| `exclude(vararg abis)` | method | — | ABIs to exclude from APK generation. |

## Notes

- Since August 2021, Google Play requires new apps to publish as Android App Bundles rather than multiple APKs — prefer [`bundle { }`](./bundle-config.md) / [app-bundle.md](./app-bundle.md) for Play Store distribution; `splits { }` remains relevant for direct APK distribution outside Play.
- Output naming: `modulename-ABI-buildvariant.apk` (e.g. `app-x86-release.apk`).
- When building multiple ABI-specific APKs, assign a unique `versionCode` per ABI (e.g. via a `baseAbiCode * 1000 + baseVersionCode` scheme in `androidComponents.onVariants`) so devices always receive the correct APK; the universal APK should carry a lower `versionCode` than the per-ABI APKs.
- Supported ABI identifiers include `armeabi-v7a`, `arm64-v8a`, `x86`, `x86_64`.

## Related

- [bundle-config.md](./bundle-config.md)
- [app-bundle.md](./app-bundle.md)
- [release-checklist.md](./release-checklist.md)
