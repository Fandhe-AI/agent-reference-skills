---
source: https://kotlinlang.org/docs/multiplatform/compose-compiler.html
---

# Updating Compose compiler

The Compose compiler is supplemented by a Gradle plugin (`org.jetbrains.kotlin.plugin.compose`), which simplifies setup and offers easier access to compiler options. The Compose compiler has been merged into the Kotlin repository since Kotlin 2.0.0, so it ships simultaneously with Kotlin and is always compatible with Kotlin of the same version.

## Signature / Usage

Starting with Compose Multiplatform 1.6.10, apply the `org.jetbrains.kotlin.plugin.compose` Gradle plugin to each module that uses the `org.jetbrains.compose` plugin.

1. Add the plugins to the Gradle version catalog:

```toml
[versions]
# ...
kotlin = "2.4.21"
compose-plugin = "1.12.2"

[plugins]
# ...
jetbrainsCompose = { id = "org.jetbrains.compose", version.ref = "compose-plugin" }
kotlinMultiplatform = { id = "org.jetbrains.kotlin.multiplatform", version.ref = "kotlin" }
compose-compiler = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
```

2. Add the plugins to the root `build.gradle.kts`:

```kotlin
plugins {
 // ...
 alias(libs.plugins.jetbrainsCompose) apply false
 alias(libs.plugins.compose.compiler) apply false
}
```

3. Apply them to every module that uses Compose Multiplatform:

```kotlin
plugins {
    // ...
    alias(libs.plugins.jetbrainsCompose)
    alias(libs.plugins.compose.compiler)
}
```

4. If you use compiler options for the Jetpack Compose compiler, set them in the `composeCompiler {}` block (see Compose compiler options DSL).

## Notes

- Compose compiler 2.0.0 sometimes incorrectly infers the stability of types in multiplatform projects with non-JVM targets, which can lead to unnecessary (or even endless) recompositions. Update apps created with Kotlin 2.0.0 to 2.0.10 or later. Dependencies built with Compose compiler 2.0.0 may still cause recomposition issues; update them to versions built with the same Compose compiler as your app.
- When the Compose compiler plugin is applied with the Android Gradle plugin (AGP), it overrides the Compose compiler coordinates supplied automatically by AGP.
- Possible issue "Missing resource with path": switching from Kotlin 1.9.0 to 2.0.0, or back, may raise `org.jetbrains.compose.resources.MissingResourceException: Missing resource with path: ...`. Delete all `build` directories at the project root and in each module.
- For a Jetpack Compose project, see the Compose compiler migration guide in the Kotlin docs; the common Jetpack Compose compiler topics belong to android-compose-ui.

## Related

- [Overview](./dsl-overview.md)
- [Compiler options](./dsl-compiler-options.md)
