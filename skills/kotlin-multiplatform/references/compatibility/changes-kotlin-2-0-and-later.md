---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-compatibility-guide.html#kotlin-2-0-0-and-later
---

# Compatibility guide for Kotlin Multiplatform — Kotlin 2.0.0 and later

Incompatible changes that end their deprecation cycle and come into effect in Kotlin 2.0.0−2.4.21.

## Signature / Usage

Migrate Android target to Google's plugin (`com.android.kotlin.multiplatform.library`), renaming `androidTarget` to `android`; the removed `withJava()` call:

```kotlin
kotlin {
    jvm {
        withJava()
    }
}
```

From Kotlin 2.1.20 remove `withJava()` from the build script (the Java source sets `src/jvmMain/java` and `src/jvmTest/java` are created by default).

Target presets replaced by target DSL functions:

```groovy
// Before
kotlin {
    targets {
        fromPreset(presets.iosArm64, 'ios')
    }
}
```

```kotlin
// Now
kotlin {
    iosArm64()
}
```

### Changes

#### Migrate to Google's plugin for Android targets

- Before Kotlin 2.3.0, Android was supported through `com.android.application` and `com.android.library`. The `android` block was replaced by `androidTarget` so the name `android` could be reserved for Google's new plugin.
- Now the `com.android.kotlin.multiplatform.library` plugin is available from the Android team and works with the original `android` blocks.
- Kotlin 2.3.0 introduces a deprecation warning when `androidTarget` is used. If you need more time, use Kotlin 2.3.10 with AGP 8.x, where the warning doesn't appear.
- Best practice: migrate to `com.android.kotlin.multiplatform.library` and rename all `androidTarget` occurrences to `android` (see Google's migration guide at developer.android.com/kotlin/multiplatform/plugin#migrate).
- Deprecation cycle: 1.9.0 warning when `android` name is used; 2.1.0 warning raised to error; 2.2.0 `android` target DSL removed; 2.3.0 new Android plugin available, warning when `androidTarget` is used; 2.3.10 that warning reverted.

#### Deprecated bitcode embedding

- Bitcode embedding was deprecated in Xcode 14 and removed in Xcode 15 for all Apple targets; the `embedBitcode` framework parameter and the `-Xembed-bitcode` / `-Xembed-bitcode-marker` arguments are deprecated in Kotlin.
- Best practice: if you use earlier Xcode versions but want Kotlin 2.0.20 or later, disable bitcode embedding in your Xcode projects.
- Cycle: 2.0.20 Kotlin/Native compiler no longer supports bitcode embedding; 2.1.0 `embedBitcode` DSL deprecated with warning; 2.2.0 warning raised to error; 2.3.0 `embedBitcode` DSL removed.

#### Java source sets created by default

- `withJava()` is being phased out to align with upcoming Gradle changes. From Kotlin 2.1.20 the Java source sets are created by default; you can remove `withJava()`.
- Gradle now runs Java compile tasks only if Java sources are present, triggering a JVM validation diagnostic that fails if you explicitly configure an incompatible JVM target for `KotlinJvmCompile` tasks or inside `compilerOptions`.
- If your project uses Gradle higher than 8.7 and doesn't rely on Gradle Java plugins (Java, Java Library, Application) or a third-party plugin depending on one, you can remove `withJava()`.
- If it uses the Application plugin, migrate to the new Experimental DSL (see Kotlin 2.1.20 what's new). Starting with Gradle 8.7 the Application plugin no longer works with the Kotlin Multiplatform Gradle plugin.
- The Java test fixtures plugin does not work with Kotlin 2.1.20 and Gradle higher than 8.7; upgrade to Kotlin 2.1.21.
- Cycle: Gradle >8.6 deprecation warning for any previous Kotlin version using `withJava()`; Gradle 9.0 raised to error; 2.1.20 warning when using `withJava()` with any Gradle version.

#### Declaring several similar targets

Declaring several similar targets in a single Gradle project is discouraged:

```kotlin
kotlin {
    jvm("jvmKtor")
    jvm("jvmOkHttp") // Not recommended and produces a deprecation warning
}
```

The setup needs Gradle attributes on `:shared` and each consumer, a manual `commonJvmMain` source set, and low-level Gradle/KGP APIs:

```kotlin
// shared/build.gradle.kts:
kotlin {
    jvm("jvmKtor") {
        attributes.attribute(/* ... */)
    }
    jvm("jvmOkHttp") {
        attributes.attribute(/* ... */)
    }

    sourceSets {
        val commonMain by getting
        val commonJvmMain by sourceSets.creating {
            dependsOn(commonMain)
            dependencies {
                // Shared dependencies
            }
        }
        val jvmKtorMain by getting {
            dependsOn(commonJvmMain)
            dependencies {
                // Ktor dependencies
            }
        }
        val jvmOkHttpMain by getting {
            dependsOn(commonJvmMain)
            dependencies {
                // OkHttp dependencies
            }
        }
    }
}
```

Best practice: extract the parts into separate Gradle projects.

1. Replace the two duplicated targets with one target and move shared sources/configuration into its default source set:

   ```kotlin
   // shared/build.gradle.kts:
   kotlin {
       jvm()

       sourceSets {
           jvmMain {
               // Copy the configuration of jvmCommonMain here
           }
       }
   }
   ```

2. Add two new Gradle projects, for example in `settings.gradle.kts`:

   ```kotlin
   include(":okhttp-impl")
   include(":ktor-impl")
   ```

3. Configure each new project: you most likely don't need `kotlin("multiplatform")` (apply `kotlin("jvm")`); move the target-specific sources (for example `jvmKtorMain` to `ktor-impl/src`); copy dependencies and compiler options; add a dependency on the original project:

   ```kotlin
   // ktor-impl/build.gradle.kts:
   plugins {
       kotlin("jvm")
   }

   dependencies {
       implementation(project(":shared")) // Add dependency on the original project
       // Copy dependencies of jvmKtorMain here
   }

   kotlin {
       compilerOptions {
           // Copy compiler options of jvmKtorMain here
       }
   }
   ```

- Cycle: 1.9.20 deprecation warning; 2.1.0 error, except for Kotlin/JS targets (see YouTrack KT-47038). For unsupported cases, describe your use case in YouTrack KT-59316.

#### Deprecated support of multiplatform libraries published in legacy mode

- Starting with Kotlin 1.9.0 the use of legacy-mode libraries is discouraged. Warning text: `The dependency group:artifact:1.0 was published in the legacy mode. Support for such dependencies will be removed in the future`
- Library users: most libraries already migrated to the hierarchical structure mode, so update the library version. Library authors: update the Kotlin Gradle plugin and fix the deprecated Gradle properties (next section).
- Cycle: 1.9.0 warning; 2.0.0 error; >2.0.0 support removed (builds can fail).

#### Deprecated Gradle properties for hierarchical structure support

Hierarchical project structure has been enabled by default since Kotlin 1.6.20. These opt-out properties are deprecated:

- `kotlin.internal.mpp.hierarchicalStructureByDefault`
- `kotlin.mpp.enableCompatibilityMetadataVariant`
- `kotlin.mpp.hierarchicalStructureSupport`
- `kotlin.mpp.enableGranularSourceSetsMetadata`
- `kotlin.native.enableDependencyPropagation`

Best practice: remove them from `gradle.properties` and `local.properties`, don't set them programmatically, and ask third-party plugin maintainers not to set them. Library authors should check that consumers can work with the library.

- Cycle: 1.8.20 warning; 1.9.20 error; 2.0.0 properties removed and ignored by the Kotlin Gradle plugin.

#### Deprecated target presets API

Deprecated in the public API of the Kotlin Gradle plugin: the `presets` property in `org.jetbrains.kotlin.gradle.dsl.KotlinMultiplatformExtension`, the `org.jetbrains.kotlin.gradle.plugin.KotlinTargetPreset` interface and all its inheritors, and the `fromPreset` overloads. Use the respective Kotlin targets (see the code at the top of this page).

- Cycle: 1.9.20 warning; 2.0.0 error; 2.2.0 removed from the public API (sources fail with "unresolved reference"; binaries such as Gradle plugins might fail with linkage errors unless recompiled against the latest Kotlin Gradle plugin).

#### Deprecated Apple target shortcuts

- `ios()`, `watchos()` and `tvos()` target shortcuts are deprecated. For example `ios()` created `iosArm64` and `iosX64` but not `iosSimulatorArm64`.
- The default hierarchy template (enabled by default since Kotlin 1.9.20) sets up intermediate source sets from the declared target list. For `iosArm64` + `iosSimulatorArm64` the plugin creates `iosMain` / `iosTest`; for `iosArm64` + `macosArm64` it creates `appleMain` / `appleTest`.
- Cycle: 1.9.20 warning (default hierarchy template enabled instead); 2.1.0 error; 2.2.0 shortcut DSL removed.

#### Incorrect version of iOS framework after Kotlin upgrade

- With direct integration (`embedAndSignAppleFrameworkForXcode`), after upgrading from Kotlin 1.9.2x to 2.0.0 (or downgrading), Xcode may use the previous iOS framework version.
- Workaround: in Xcode run **Product** | **Clean Build Folder**, then run `./gradlew clean` in the terminal and build again.
- The issue was planned to be fixed in Kotlin 2.0.10 (YouTrack KT-68257).

## Notes

- The official snippet writes a bare `project(":shared")`, which does not register a dependency in Kotlin DSL; `implementation(...)` is used here.
- The official page labels the target presets "Before" snippet as Kotlin but uses Groovy syntax.
- Migration (Kotlin 1.9 → 2.0): the removed APIs here are target presets, Apple target shortcuts (`ios()` / `watchos()` / `tvos()`), legacy hierarchical-structure Gradle properties, and `embedBitcode`; see also dsl-targets, android-source-set-layout and agp-9-migration.
- Android target DSL naming: for the `com.android.kotlin.multiplatform.library` plugin, the official Kotlin Multiplatform docs use two block names: the compatibility guide (Kotlin 2.3.0 deprecation of `androidTarget`) says to rename it to `android {}`, while the AGP 9 migration, library publishing and integrate-in-existing-app pages use `androidLibrary {}`. The JetBrains docs do not state which plugin/AGP version uses which name, so check Google's migration guide (https://developer.android.com/kotlin/multiplatform/plugin#migrate) for the AGP version in use before renaming.
- Android Gradle plugin, `com.android.kotlin.multiplatform.library` and Gradle Java plugin handling belong to android-build-gradle for the Android-side details; this page covers only the Kotlin Multiplatform plugin's behavior.

## Related

- [Compatibility guide for Kotlin Multiplatform — Version compatibility](./version-compatibility.md)
- [Compatibility guide for Kotlin Multiplatform — Kotlin 1.9.0−1.9.25](./changes-kotlin-1-9.md)
- [Updating multiplatform projects with Android apps to use AGP 9](./agp-9-migration.md)
- [Android source set layout](./android-source-set-layout.md)
- [Multiplatform Gradle DSL reference — Targets](../gradle-dsl/dsl-targets.md)
- [Source set hierarchy](../project-structure/hierarchy.md)
