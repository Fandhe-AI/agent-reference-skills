---
source: https://kotlinlang.org/docs/compose-compiler-migration-guide.html
---

# Compose compiler migration guide

The Compose compiler is supplemented by a Gradle plugin that simplifies setup and gives easier access to compiler options. Since Kotlin 2.0.0 the Compose compiler is merged into the Kotlin repository and ships simultaneously with Kotlin, always compatible with Kotlin of the same version.

## Signature / Usage

Version catalog:

```toml
[versions]
# ...
kotlin = "2.4.21"

[plugins]
# ...
org-jetbrains-kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
compose-compiler = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
```

Root `build.gradle.kts`:

```kotlin
plugins {
    // ...
    alias(libs.plugins.compose.compiler) apply false
}
```

Every module that uses Jetpack Compose:

```kotlin
plugins {
    // ...
    alias(libs.plugins.compose.compiler)
}
```

## Notes

- Apply the plugin for each module that uses Compose. Set Compose compiler options in the `composeCompiler {}` block. Remove direct references to Compose compiler artifacts and let the Gradle plugins handle them.
- When applied with the Android Gradle plugin (AGP), the Compose compiler plugin overrides the Compose compiler coordinates supplied automatically by AGP.
- With AGP 9.0.0 or later the `org-jetbrains-kotlin-android` plugin is no longer needed because AGP has built-in Kotlin support.
- Without Gradle plugins, update direct Maven artifact references: `androidx.compose.compiler:compiler` becomes `org.jetbrains.kotlin:kotlin-compose-compiler-plugin-embeddable`; `androidx.compose.compiler:compiler-hosted` becomes `org.jetbrains.kotlin:kotlin-compose-compiler-plugin`.
- For Compose Multiplatform projects see the multiplatform migration guide on kotlinlang.org.
- This page covers the compiler plugin setup only. Compose UI APIs (Composable, Modifier, remember) are in android-compose-ui.

## Related

- [compose-compiler-options](./compose-compiler-options.md)
