---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-android-layout.html
---

# Android source set layout

The new Android source set layout was introduced in Kotlin 1.8.0 and became the default in 1.9.0. This guide describes the differences from the deprecated layout and how to migrate.

## Signature / Usage

Restore the previous `dependsOn` relationship between Android instrumented tests and common tests (not added by default in the new layout):

```kotlin
kotlin {
// ...
    sourceSets {
        val commonTest by getting
        val androidInstrumentedTest by getting {
            dependsOn(commonTest)
        }
    }
}
```

Access variant-specific source sets (flavors / build types) with `invokeWhenCreated()`:

```kotlin
kotlin {
// ...
    @OptIn(ExperimentalKotlinGradlePluginApi::class)
    sourceSets.invokeWhenCreated("androidFreeDebug") {
// ...
    }
}
```

## Options / Props

Source set renaming (pattern: `targetName` + `AndroidSourceSet.name` becomes `targetName` + `AndroidVariantType`):

| AndroidSourceSet | Previous layout | New layout |
|------------------|-----------------|------------|
| main | `androidMain` | `androidMain` |
| test | `androidTest` | `androidUnitTest` |
| androidTest | `androidAndroidTest` | `androidInstrumentedTest` |

Source directories (new pattern: `src/{KotlinSourceSet.name}/kotlin`):

| AndroidSourceSet | Previous layout | New layout |
|------------------|-----------------|------------|
| main | `src/androidMain/kotlin`, `src/main/kotlin`, `src/main/java` | `src/androidMain/kotlin`, `src/main/kotlin`, `src/main/java` |
| test | `src/androidTest/kotlin`, `src/test/kotlin`, `src/test/java` | `src/androidUnitTest/kotlin`, `src/test/kotlin`, `src/test/java` |
| androidTest | `src/androidAndroidTest/kotlin`, `src/androidTest/java` | `src/androidInstrumentedTest/kotlin`, `src/androidTest/java`, `src/androidTest/kotlin` |

`AndroidManifest.xml` location (new pattern: `src/{KotlinSourceSet.name}/AndroidManifest.xml`):

| AndroidSourceSet | Previous layout | New layout |
|------------------|-----------------|------------|
| main | `src/main/AndroidManifest.xml` | `src/androidMain/AndroidManifest.xml` |
| debug | `src/debug/AndroidManifest.xml` | `src/androidDebug/AndroidManifest.xml` |

## Notes

- Requires Android Gradle plugin 7.0 or later and Android Studio 2022.3 or later. You only need to apply the suggestions applicable to your project.
- Previously `androidAndroidTest` depended on `commonTest` by default: code in `commonTest` was available there, `expect` declarations in `commonTest` needed `actual` implementations in `androidAndroidTest`, and `commonTest` tests also ran as Android instrumented tests. The new layout does not add that relationship by default.
- Previously the Kotlin Gradle plugin eagerly created source sets for `debug` / `release` build types and flavors (for example `val androidDebug by getting { ... }`). The new layout uses Android's `onVariants`, so such expressions fail with `org.gradle.api.UnknownDomainObjectException: KotlinSourceSet with name 'androidDebug' not found`; use `invokeWhenCreated()`.
- Migration (Kotlin 1.9 → 2.0): the new layout is the default since 1.9.0; the legacy layout and the `kotlin.mpp.androidSourceSetLayoutVersion` property are removed in Kotlin 2.4.0 (see changes-kotlin-1-9). New projects using AGP 9 use `com.android.kotlin.multiplatform.library` instead (see agp-9-migration).
- Distance line: Android Gradle plugin, flavors and build variants themselves belong to android-build-gradle; this page covers only the Kotlin Multiplatform source set naming and directory layout.

## Related

- [Updating multiplatform projects with Android apps to use AGP 9](./agp-9-migration.md)
- [Compatibility guide for Kotlin Multiplatform — Kotlin 1.9.0−1.9.25](./changes-kotlin-1-9.md)
- [Adding Android dependencies](../project-structure/android-dependencies.md)
- [The basics of Kotlin Multiplatform project structure](../project-structure/targets-and-source-sets.md)
