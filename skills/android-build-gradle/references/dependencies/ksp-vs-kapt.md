# KSP vs kapt

KSP (Kotlin Symbol Processing) is the Kotlin-first replacement for kapt, analyzing Kotlin code directly instead of generating Java stubs.

## Signature / Usage

```kotlin
// Top-level build.gradle.kts
plugins {
    id("com.google.devtools.ksp") version "2.3.4" apply false
}
```

```kotlin
// Module-level build.gradle.kts
plugins {
    id("com.google.devtools.ksp")
}

dependencies {
    // Old kapt approach:
    // kapt("androidx.room:room-compiler:2.6.1")

    // New KSP approach:
    ksp("androidx.room:room-compiler:2.6.1")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ksp` | configuration | — | Supplies a KSP processor; run directly by the Kotlin compiler against Kotlin symbols. Up to 2x faster than kapt. |
| `kapt` | configuration | — | Supplies a kapt processor; generates Java stubs from Kotlin sources first, then runs annotation processing on them. In maintenance mode. |

## Notes

- Migrate module by module: `kapt` and `ksp` can coexist during migration, but Java stub generation still occurs in a module if any kapt processor remains there.
- Data Binding has no planned KSP support, so modules using Data Binding cannot fully remove `kapt`.
- KSP produces more accurate Kotlin type information (e.g. nullability), which can surface source code issues that kapt silently tolerated.
- Confirm library support before migrating (Dagger, Glide, Room, Moshi all support KSP as of the current major versions).
- Processor option syntax differs between kapt and KSP; consult the KSP documentation and the specific library's docs when migrating `arg()`/`javacOptions` style kapt configuration.

## Related

- [dependency-configurations.md](./dependency-configurations.md)
