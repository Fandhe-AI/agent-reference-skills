---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-add-dependencies.html
---

# Adding dependencies on multiplatform libraries

A Kotlin Multiplatform project can depend on multiplatform libraries, platform-specific (native) libraries, and other multiplatform projects. Unlike a regular Android project, a dependency is added to a specific source set rather than to the module as a whole.

## Signature / Usage

```kotlin
kotlin {
    //...
    sourceSets {
        commonMain.dependencies {
            implementation(libs.ktor.clientCore)
        }
        androidMain.dependencies {
            // The dependency on a platform-specific part of ktor-client
            // is resolved at build time
        }
    }
}
```

Version catalog used by the page's examples (versions from the pinned docs variables):

```toml
[versions]
ktor = "3.5.2"
kotlinx-coroutines = "1.11.0"
sqlDelight = "2.3.2"

[libraries]
ktor-clientCore = { module = "io.ktor:ktor-client-core", version.ref = "ktor" }
kotlinx-coroutinesCore = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "kotlinx-coroutines" }
sqldelight-nativeDriver = { module = "app.cash.sqldelight:native-driver", version.ref = "sqlDelight" }
```

Dependency on another multiplatform project:

```kotlin
kotlin {
    //...
    sourceSets {
        commonMain.dependencies {
            implementation(project(":some-other-multiplatform-module"))
        }
        androidMain.dependencies {
            // Platform-specific declarations of :some-other-multiplatform-module
            // will be resolved automatically
        }
    }
}
```

Multiplatform tests (`kotlin.test` available in all test source sets):

```kotlin
kotlin {
    //...
    sourceSets {
        commonTest.dependencies {
            implementation(kotlin("test"))
        }
    }
}
```

## Notes

- Two dependency types: multiplatform dependencies (usable in the common source set; for example Koin, Coil, SQLDelight) and native dependencies (platform-specific libraries specified in native source sets such as `androidMain` and `iosMain`).
- Gradle version catalogs are the recommended way to manage dependencies. The catalog name prefix `libs` comes from the catalog file name, and dashes become dots (`libs.my.library`).
- Every source set automatically depends on `kotlin-stdlib`, in the same version as the applied Kotlin Multiplatform Gradle plugin. For JVM targets the plugin selects the JVM stdlib according to the `compilerOptions.jvmTarget` option.
- The common source set cannot depend on platform-specific artifacts: common code must compile for every declared target.
- Use the common library name in platform source sets (for example `native-driver`, not `native-driver-iosx64`); the plugin resolves it.
- `kotlinx` libraries (kotlinx.serialization, kotlinx.coroutines) are added like any multiplatform library; some need extra setup, for example for web targets.
- A common library can also be configured in a top-level `dependencies {}` block (Multiplatform Gradle DSL: "Configure dependencies at the top level").
- Multiplatform libraries can be found on klibs.io, a catalog of published Kotlin Multiplatform libraries maintained by JetBrains.
- The source catalog uses the version value in `version.ref` and the SQLDelight 1.x group `com.squareup.sqldelight`; corrected here to the `[versions]` key names and `app.cash.sqldelight` (the 2.x group, as used in the ktor-sqldelight sample of this skill).
- The page's Groovy tab variants are omitted; the Kotlin DSL variant is shown.
- Distance line: general Gradle dependency configuration for Android apps belongs to android-build-gradle.

## Related

- [android-dependencies.md](./android-dependencies.md)
- [ios-dependencies.md](./ios-dependencies.md)
- [advanced-project-structure.md](./advanced-project-structure.md)
