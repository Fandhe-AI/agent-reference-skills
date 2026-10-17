---
source: https://kotlinlang.org/docs/compose-compiler-options.html
---

# Compose compiler options DSL

The Compose compiler Gradle plugin offers a DSL for compiler options, configured in the `composeCompiler {}` block of the module's `build.gradle.kts`.

## Signature / Usage

```kotlin
composeCompiler {
    includeSourceInformation = true

    featureFlags = setOf(
        ComposeFeatureFlag.StrongSkipping.disabled(),
        ComposeFeatureFlag.OptimizeNonSkippingGroups
    )
}
```

Enable a flag that is disabled by default by adding it to the set; disable a flag that is enabled by default with `disabled()`:

```kotlin
featureFlags = setOf(ComposeFeatureFlag.OptimizeNonSkippingGroups)
featureFlags = setOf(ComposeFeatureFlag.StrongSkipping.disabled())
```

Configuring the Compose compiler directly:

```
-P plugin:androidx.compose.compiler.plugins.kotlin:featureFlag=<flag name>
```

## Options / Props

| Kind | Description |
| --- | --- |
| General compiler settings | Can be enabled or disabled per project (e.g. `includeSourceInformation`). Listed in the Compose compiler Gradle plugin API reference (`ComposeCompilerGradlePluginExtension`). |
| Feature flags (`featureFlags`) | New and experimental features that should eventually become part of the baseline. Organized in a separate set to minimize top-level property changes. Supported flags are listed in the API reference (`ComposeFeatureFlag`). |

## Notes

- The Gradle plugin provides defaults for several options that were only specified manually before Kotlin 2.0. If you set any of them with `freeCompilerArgs`, Gradle reports a duplicate options error.
- This page covers compiler plugin configuration only. Compose UI APIs (Composable, Modifier, remember) are in android-compose-ui.

## Related

- [compose-compiler-migration-guide](./compose-compiler-migration-guide.md)
