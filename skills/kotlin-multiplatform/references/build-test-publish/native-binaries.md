---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-build-native-binaries.html
---

# Build final native binaries

By default a Kotlin/Native target is compiled to a `*.klib` artifact. To produce executables, shared or static libraries, or Objective-C frameworks, declare them in the `binaries` property of a native target.

## Signature / Usage

```kotlin
kotlin {
    linuxX64 { // Define your target instead.
        binaries {
            executable {
                // Binary configuration.
            }
        }
    }
}
```

Specify build types and custom names:

```kotlin
binaries {
    executable("foo", listOf(DEBUG)) {
        // Binary configuration.
    }

    // It's possible to drop the list of build types
    // (in this case, all the available build types will be used).
    executable("bar") {
        // Binary configuration.
    }
}
```

Access binaries:

```kotlin
// Fails if there is no such binary.
binaries["fooDebugExecutable"]
binaries.getByName("fooDebugExecutable")

// Returns null if there is no such binary.
binaries.findByName("fooDebugExecutable")

// Typed getters
binaries.getExecutable("foo", DEBUG)
binaries.getExecutable(DEBUG)          // Skip the first argument if the name prefix isn't set.
binaries.getExecutable("bar", "DEBUG") // You also can use a string for build type.
binaries.findExecutable("foo", DEBUG)
```

Export dependencies to a framework or library:

```kotlin
kotlin {
    //...
    sourceSets {
        macosMain.dependencies {
            // Will be exported.
            api(project(":dependency"))
            api("org.example:exported-library:1.0")
            // Will not be exported.
            api("org.example:not-exported-library:1.0")
        }
    }
    macosArm64("macos").binaries {
        framework {
            export(project(":dependency"))
            export("org.example:exported-library:1.0")
        }
        sharedLib {
            // It's possible to export different sets of dependencies to different binaries.
            export(project(':dependency'))
        }
    }
}
```

XCFramework:

```kotlin
import org.jetbrains.kotlin.gradle.plugin.mpp.apple.XCFramework

plugins {
    kotlin("multiplatform") version "2.4.21"
}

kotlin {
    val xcf = XCFramework()
    val iosTargets = listOf(iosArm64(), iosSimulatorArm64())

    iosTargets.forEach {
        it.binaries.framework {
            baseName = "shared"
            xcf.add(this)
        }
    }
}
```

Customize `Info.plist`:

```kotlin
binaries {
    framework {
        binaryOption("bundleId", "com.example.app")
        binaryOption("bundleVersion", "2")
    }
}
```

## Options / Props

Factory methods:

| Factory method | Binary kind | Available for |
| --- | --- | --- |
| `executable` | Product executable | All native targets |
| `test` | Test executable | All native targets |
| `sharedLib` | Shared native library | All native targets |
| `staticLib` | Static native library | All native targets |
| `framework` | Objective-C framework | macOS, iOS, watchOS, and tvOS targets only |

Build types: `DEBUG` (non-optimized, extra metadata for debugger tools) and `RELEASE` (optimized, no debug information).

`Info.plist` binary options:

| Property | Binary option |
| --- | --- |
| `CFBundleIdentifier` | `bundleId` |
| `CFBundleShortVersionString` | `bundleShortVersionString` |
| `CFBundleVersion` | `bundleVersion` |

## Notes

- The `kotlin-multiplatform` plugin creates no production binaries by default; the only default binary is a debug test executable for running unit tests from the `test` compilation.
- Distributing a Kotlin/Native-compiled final binary requires including the necessary license files in the distribution.
- Binary names follow `<optional-name-prefix><build-type><binary-kind>`, for example `releaseFramework`, `testDebugExecutable`. Static and shared libraries use the suffixes `Static` and `Shared` (`fooDebugStatic`, `barReleaseShared`). The first argument of a factory method is the name prefix (for Windows, `foo.exe` and `bar.exe` in the example).
- Export: only `api` dependencies of the corresponding source set can be exported. An exported dependency adds all its API to the framework and disables dead code elimination for it. Export is non-transitive by default; `transitiveExport = true` exports transitive dependencies too, but is not recommended (longer compilation, larger binary). Use `export` explicitly for what Swift / Objective-C code needs.
- Universal (fat) frameworks: merge per-platform frameworks with `FatFrameworkTask` (uses the `lipo` tool). The fat framework must have the same base name as the initial frameworks, otherwise an error occurs. Example registration: `tasks.register<FatFrameworkTask>("debugFatFramework") { baseName = "MyFramework"; destinationDirProperty.set(layout.buildDirectory.dir("fat-framework/debug")); from(...) }`.
- XCFramework: registers the Gradle tasks `assembleXCFramework`, `assemble<Framework name>DebugXCFramework`, and `assemble<Framework name>ReleaseXCFramework`. With CocoaPods integration, the Kotlin CocoaPods Gradle plugin adds `podPublishReleaseXCFramework`, `podPublishDebugXCFramework`, and `podPublishXCFramework`, which generate XCFrameworks with a podspec file. Publishing Kotlin frameworks to public repositories is not recommended if they are built for different Kotlin versions (possible conflicts in end-user projects).
- Migration (Kotlin 1.9 -> 2.0 and later): bitcode embedding was removed in Xcode 15. The `embedBitcode` framework parameter and `-Xembed-bitcode` / `-Xembed-bitcode-marker` arguments are deprecated; Kotlin 2.0.20 drops compiler support, 2.1.0 deprecates the `embedBitcode` DSL with a warning, 2.2.0 raises it to an error, and 2.3.0 removes it. Disable bitcode embedding in Xcode projects if you still use older Xcode.
- Distinct from the `kotlin` skill, which covers the Kotlin/Native language and compiler topics; this page covers the Multiplatform Gradle DSL for `binaries`.

## Related

- [Native targets DSL](../gradle-dsl/dsl-targets.md)
- [Configure compilations](./configure-compilations.md)
- [Publish your application](./publish-apps.md)
