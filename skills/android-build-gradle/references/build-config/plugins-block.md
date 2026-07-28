# plugins {} block and AGP plugin IDs

Declares which Gradle plugins apply to a build file. In the module `build.gradle.kts`, this determines whether the module is built as an application or a library, and whether Kotlin/KSP processing is applied.

## Signature / Usage

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.devtools.ksp")
}
```

Root-level declaration with version, not applied to the root project itself:

```kotlin
plugins {
    id("com.android.application") version "9.3.0" apply false
    id("com.android.library") version "9.3.0" apply false
    id("org.jetbrains.kotlin.android") version "2.3.21" apply false
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `com.android.application` | plugin id | — | Marks the module as a buildable Android application (produces an APK/AAB). |
| `com.android.library` | plugin id | — | Marks the module as a reusable Android library (produces an AAR). |
| `org.jetbrains.kotlin.android` | plugin id | — | Enables Kotlin compilation for an Android module. |
| `com.google.devtools.ksp` | plugin id | — | Applies Kotlin Symbol Processing, used by annotation-processor-style code generators. |

## Notes

- Only one of `com.android.application` / `com.android.library` may be applied per module.
- Version numbers are typically resolved from the root `build.gradle.kts` (via `apply false`) or a version catalog (`gradle/libs.versions.toml`), not hardcoded per module.

## Related

- [Root build.gradle.kts](./root-build-gradle.md)
- [Module build.gradle.kts](./module-build-gradle.md)
