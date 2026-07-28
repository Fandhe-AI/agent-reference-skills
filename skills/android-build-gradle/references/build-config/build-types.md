# buildTypes

Nested block inside `android { }` that defines how a build is packaged and signed. Combined with product flavors, build types form build variants (e.g. `demoDebug`).

## Signature / Usage

```kotlin
android {
    buildTypes {
        getByName("release") {
            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro")
        }

        getByName("debug") {
            applicationIdSuffix = ".debug"
            isDebuggable = true
        }

        // Copy an existing build type and customize it
        create("staging") {
            initWith(getByName("debug"))
            manifestPlaceholders["hostName"] = "internal.example.com"
            applicationIdSuffix = ".debugStaging"
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isMinifyEnabled` | `Boolean` | — | Enables code shrinking with R8/ProGuard. |
| `isShrinkResources` | `Boolean` | — | Enables resource shrinking (works together with `isMinifyEnabled`). |
| `proguardFiles(...)` | function | — | Specifies ProGuard/R8 configuration files to apply. |
| `applicationIdSuffix` | `String` | — | Appended to the base `applicationId` for this build type. |
| `versionNameSuffix` | `String` | — | Appended to the base `versionName` for this build type. |
| `isDebuggable` | `Boolean` | — | Allows the app to be debugged on secure/production devices. |
| `manifestPlaceholders` | `Map<String, Any>` | — | Per-build-type manifest placeholder overrides. |
| `matchingFallbacks` | `List<String>` | — | Fallback build types used to resolve dependency variant mismatches for a custom build type. |
| `signingConfig` | `SigningConfig` | — | Assigns a `signingConfigs { }` entry used to sign this build type. |
| `initWith(other)` | function | — | Copies all settings from another build type as a starting point. |
| `isCrunchPngs` | `Boolean` | — | Controls whether PNG resources are crunched (compressed) for this build type. |

## Notes

- `debug` and `release` are the two default build types; `debug` is pre-configured with `isDebuggable = true` and a generic debug keystore, `release` must be configured explicitly.
- AGP 8.0.0 changed the default value of `android.nonTransitiveRClass` and `android.nonFinalResIds` (non-constant `R` fields) to `true`; both affect how generated `R` classes behave across build types and improve Java compilation incrementality.
- In Kotlin DSL, custom build types must be explicitly registered with `create("name") { }`; Groovy DSL allows implicit declaration by name.
- Boolean DSL properties in Kotlin use an `is`-prefixed name (e.g. `isMinifyEnabled`) with `=` assignment; Groovy uses the unprefixed name (`minifyEnabled true`) without `=`.
- R8/ProGuard rule authoring itself (keep rules, App Bundle, release signing procedures) is owned by the `optimize-release` category; only the DSL fields (`isMinifyEnabled`, `proguardFiles`, `signingConfig` assignment) are covered here.

## Related

- [defaultConfig](./default-config.md)
- [productFlavors and flavorDimensions](./product-flavors.md)
- [signingConfigs](./signing-configs.md)
