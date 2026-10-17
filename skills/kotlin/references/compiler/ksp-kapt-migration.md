---
source: https://kotlinlang.org/docs/ksp-kapt-migration.html
---

# Migrate from kapt to KSP

Migrate annotation processors from kapt to KSP. kapt translates Kotlin to Java stubs and runs processors on them (expensive, slows builds, loses Kotlin-specific features); KSP analyzes Kotlin source directly.

## Signature / Usage

Project-level `build.gradle.kts`:

```kotlin
plugins {
    id("com.google.devtools.ksp") version "2.3.10" apply false
}
```

Module that uses the processor:

```kotlin
plugins {
    id("com.google.devtools.ksp")
}

dependencies {
    implementation("com.google.dagger:dagger:2.48")
    // kapt("com.google.dagger:dagger-compiler:2.48")

    // KSP processor dependency:
    ksp("com.google.dagger:dagger-compiler:2.48")
}
```

After migrating all processors, remove the kapt plugin:

```kotlin
plugins {
   // Delete this line:
    id("org.jetbrains.kotlin.kapt")
}
```

## Notes

- Check first whether your processors support KSP (see the supported libraries list in `ksp-overview`, or the library docs).
- KSP and kapt can run alongside each other, so you can migrate in stages, one library or module at a time.
- For most libraries replacing `kapt` with `ksp` is enough; check each library's documentation for additional changes.
- Delete leftover kapt configurations after removing the plugin.
- Android-specific KSP / Room / Hilt settings are in android-build-gradle, android-data and android-architecture.

## Related

- [kapt](./kapt.md)
- [ksp-overview](./ksp-overview.md)
- [ksp-quickstart](./ksp-quickstart.md)
