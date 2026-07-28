# Migrate from kapt to KSP

Kapt is in maintenance mode. KSP (Kotlin Symbol Processing) is the recommended Kotlin-first replacement, analyzing Kotlin code directly instead of generating Java stubs, for up to 2x faster builds.

## Signature / Usage

```kotlin
// Top-level build.gradle.kts
plugins {
    id("com.google.devtools.ksp") version "2.3.4" apply false
}

// Module-level build.gradle.kts
plugins {
    id("com.google.devtools.ksp")
}

dependencies {
    ksp("androidx.room:room-compiler:2.5.0") // was: kapt(...)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `com.google.devtools.ksp` | Gradle plugin id | — | KSP Gradle plugin, applied per module in place of `org.jetbrains.kotlin.kapt`. |
| `ksp(...)` | dependency configuration | — | Declares a KSP annotation processor dependency, replacing `kapt(...)`. |

## Notes

- Check that libraries support KSP before migrating (Dagger, Glide, Room, Moshi are commonly supported); see the KSP supported libraries list.
- Data Binding uses annotation processors with no planned KSP support; isolate Data Binding to separate modules and keep kapt enabled there.
- If any kapt processor remains in a module, Java stubs are still generated for that module; most performance gains require removing kapt entirely from the module.
- KSP has more precise Kotlin type information (e.g. nullability) than kapt, which may require source adjustments beyond build file changes.
- Processor argument passing format may differ between kapt and KSP; consult the KSP docs and library docs.
- kapt and KSP can run alongside each other during migration, allowing a module-by-module or library-by-library transition.
- Source: `developer.android.com/build/migrate-to-ksp`.

## Related

- [Migrate to Kotlin DSL](./migrate-to-kotlin-dsl.md)
