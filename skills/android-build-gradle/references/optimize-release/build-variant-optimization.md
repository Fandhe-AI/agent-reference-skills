# Build Variant-Specific Optimization

R8 shrinking/obfuscation settings (`isMinifyEnabled`, `isShrinkResources`, `proguardFiles`) are declared per build type, so different variants (debug, release, staging, per-flavor) can carry different optimization levels.

## Signature / Usage

```kotlin
android {
    buildTypes {
        getByName("debug") {
            isDebuggable = true
        }
        getByName("release") {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    flavorDimensions += "version"
    productFlavors {
        create("demo") {
            dimension = "version"
            applicationIdSuffix = ".demo"
        }
        create("full") {
            dimension = "version"
        }
    }
}
```

## Notes

- Variants are the cross-product of `buildTypes` × `productFlavors` (e.g. `demoDebug`, `demoRelease`, `fullDebug`, `fullRelease`); `isMinifyEnabled` set on a build type applies to every flavor combination built with that build type.
- With multiple flavor dimensions, variant names order higher-priority dimensions first (declaration order in `flavorDimensions`), e.g. `minApi24DemoDebug`.
- Full DSL ownership of `buildTypes { }` / `productFlavors { }` / `flavorDimensions` blocks lives in this skill's `build-config` category — this page only covers the subset of properties that affect release optimization (`isMinifyEnabled`, `isShrinkResources`, `proguardFiles`, `signingConfig`).
- A custom build type can `initWith(getByName("debug"))` or `initWith(getByName("release"))` as a base, then override individual optimization flags (see [debuggable-obfuscation.md](./debuggable-obfuscation.md) for the debuggable + minified "staging" pattern).

## Related

- [shrink-code.md](./shrink-code.md)
- [debuggable-obfuscation.md](./debuggable-obfuscation.md)
