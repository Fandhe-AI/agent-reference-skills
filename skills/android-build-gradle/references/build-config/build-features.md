# buildFeatures

Nested block inside `android { }` that turns on/off UI-related and code-generation features, individually enabling only the ones a module needs (to avoid unnecessary build-time cost).

## Signature / Usage

```kotlin
android {
    buildFeatures {
        compose = true
        viewBinding = true
        dataBinding = false
        buildConfig = true
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `compose` | `Boolean` | `false` | Enables Jetpack Compose compilation support for this module. |
| `viewBinding` | `Boolean` | — | Generates a type-safe binding class per XML layout, replacing `findViewById()`. |
| `dataBinding` | `Boolean` | — | Enables the (older, more powerful) Data Binding library. |
| `buildConfig` | `Boolean` | `false` (AGP 8.0+; was `true` before AGP 8.0) | Controls whether the `BuildConfig` class is generated. |

## Notes

- This page covers only the `buildFeatures.compose` DSL flag; the Jetpack Compose usage/API surface itself is owned by the `android-compose-*` skills.
- Enabling unused features (e.g. `dataBinding` when unneeded) increases build time; enable only what the module actually uses.
- AGP 8.0.0 changed the `buildConfig` default from `true` to `false` — projects relying on `BuildConfig` must now set `buildFeatures.buildConfig = true` explicitly.
- `composeOptions { kotlinCompilerExtensionVersion = ... }` is the classic way to pin the Compose Compiler version. Current guides instead describe the separate Compose Compiler Gradle Plugin's `composeCompiler { }` block (Kotlin 2.0+), e.g. `composeCompiler { reportsDestination = ...; stabilityConfigurationFile = ... }`. Verify which form applies for your Kotlin/AGP combination before using either.

## Related

- [android {} block](./android-block.md)
- [Module build.gradle.kts](./module-build-gradle.md)
