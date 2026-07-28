# Migrate to Kotlin DSL

AGP 4.0+ supports Kotlin DSL (`build.gradle.kts`) instead of Groovy (`build.gradle`) for build configuration, with better IDE support (syntax highlighting, completion, navigation). New projects use Kotlin DSL by default since Android Studio Giraffe.

## Signature / Usage

```kotlin
// build.gradle.kts
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    buildTypes {
        getByName("release") {
            isMinifyEnabled = true
            isShrinkResources = true
        }
        register("benchmark") { }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `kotlin` / `kotlin-android` / `kotlin-kapt` / `kotlin-parcelize` | plugin shorthand id | — | Map to namespaced ids: `org.jetbrains.kotlin.jvm`, `org.jetbrains.kotlin.android`, `org.jetbrains.kotlin.kapt`, `org.jetbrains.kotlin.plugin.parcelize`. |

## Notes

- Method calls require parentheses (`compileSdkVersion(30)`), assignments require `=`, strings use double quotes with `${...}` interpolation, and `def` becomes `val`/`var`.
- Boolean `android {}` properties are prefixed with `is` (e.g. `isMinifyEnabled`, `isDebuggable`).
- Only `debug` and `release` build types are implicit in Kotlin DSL; custom build types must be created with `register("name") { }`.
- Migrate `buildscript { classpath(...) }` + `apply plugin:` to a top-level `plugins { id(...) version "..." apply false }` block plus a module-level `plugins { id(...) }` block; declare repositories in `settings.gradle.kts` `pluginManagement`.
- Migration strategy: start with the smallest files (`settings.gradle`), rename to `.kts` as content is converted, mix Groovy and Kotlin during transition, verify compilation after each file, finish with the largest module `build.gradle` files last.
- Known caveat: Kotlin DSL builds tend to be slower than Groovy builds (see Gradle issue #15886).
- Source: `developer.android.com/build/migrate-to-kotlin-dsl`.

## Related

- [Migrate to KSP](./migrate-to-ksp.md)
- [AGP Upgrade Assistant](./agp-upgrade-assistant.md)
