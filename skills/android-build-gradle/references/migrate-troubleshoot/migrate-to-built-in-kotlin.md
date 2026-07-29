# Migrate to Built-in Kotlin

AGP 9.0+ integrates the Kotlin compiler directly into the Android Gradle plugin, enabled by default, so the separate `org.jetbrains.kotlin.android` plugin is no longer required to compile Kotlin sources.

## Signature / Usage

```kotlin
// Module-level build.gradle.kts — REMOVE this plugin, AGP compiles Kotlin natively
plugins {
    // id("org.jetbrains.kotlin.android") // no longer needed
}

// Migrate android.kotlinOptions{} to kotlin.compilerOptions{}
kotlin {
    compilerOptions {
        languageVersion = org.jetbrains.kotlin.gradle.dsl.KotlinVersion.KOTLIN_2_0
        // jvmTarget defaults to android.compileOptions.targetCompatibility; optional
    }
}

// Selectively disable built-in Kotlin for modules with no Kotlin sources
android {
    enableKotlin = false
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android.enableKotlin` | boolean (DSL) | `true` | Disables built-in Kotlin compilation for a module with no Kotlin sources, saving a small amount of build time and skipping the automatic Kotlin stdlib dependency. |
| `android.builtInKotlin` | boolean (`gradle.properties`) | `true` | Project-wide opt-out switch during migration; set to `false` to keep using `org.jetbrains.kotlin.android`. Cannot be set to `false` in AGP 10.0+. |
| `android.newDsl` | boolean (`gradle.properties`) | `true` | Companion opt-out for the new DSL surface (`kotlin.compilerOptions{}`) alongside `android.builtInKotlin`. |
| `kotlin.compilerOptions{}` | DSL block | — | Replaces `android.kotlinOptions{}`; configures `languageVersion`, `jvmTarget`, etc. |
| `com.android.legacy-kapt` | Gradle plugin id | — | Compatibility plugin for modules still using `kotlin-kapt`, which is incompatible with built-in Kotlin (migrate to KSP instead where possible). |

## Notes

- KMP (Kotlin Multiplatform) modules are unaffected by this migration: they still require `org.jetbrains.kotlin.multiplatform` plus `com.android.kotlin.multiplatform.library`, and combining `org.jetbrains.kotlin.multiplatform` with `com.android.library` / `com.android.application` is no longer allowed once built-in Kotlin is enabled.
- `kotlin.sourceSets{}` is not supported with built-in Kotlin; use `android.sourceSets{}` (`kotlin.directories += "path"`) for static source dirs, or the Variant API (`androidComponents.onVariants { variant.sources.kotlin!!.addStaticSourceDirectory(...) }`) for variant-specific/generated sources.
- For large multi-module projects, migrate incrementally: set `android.builtInKotlin=false` in `gradle.properties`, apply the `com.android.built-in-kotlin` plugin to individual modules, migrate each, then remove the opt-out once all modules are done.
- Applying `org.jetbrains.kotlin.android` after built-in Kotlin is active fails with `Cannot add extension with name 'kotlin', as there is an extension already registered with that name.` — remove the plugin rather than trying to coexist.
- Source: `developer.android.com/build/migrate-to-built-in-kotlin`.

## Related

- [Migrate from kapt to KSP](./migrate-to-ksp.md)
- [AGP / Gradle Version Compatibility](./agp-gradle-version-compatibility.md)
