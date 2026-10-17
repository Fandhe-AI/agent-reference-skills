---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-spm-export.html
---

# Swift package export setup

A remote integration method: build an XCFramework with the Kotlin Gradle plugin and distribute it as a Swift Package Manager (SwiftPM) binary package.

## Signature / Usage

`shared/build.gradle.kts`:

```kotlin
import org.jetbrains.kotlin.gradle.plugin.mpp.apple.XCFramework

kotlin {
    // Other Kotlin Multiplatform targets
    // ...
    // Name of the module to be imported in the consumer project
    val xcframeworkName = "Shared"
    val xcf = XCFramework(xcframeworkName)

    listOf(
        iosArm64(),
        iosSimulatorArm64(),
    ).forEach { 
        it.binaries.framework {
            baseName = xcframeworkName
            
            // Specify CFBundleIdentifier to uniquely identify the framework
            binaryOption("bundleId", "org.example.${xcframeworkName}")
            xcf.add(this)
            isStatic = true
        }
    }
    //...
}
```

Assemble, checksum, validate:

```shell
./gradlew :shared:assembleSharedXCFramework
swift package compute-checksum Shared.xcframework.zip
swift package reset && swift package show-dependencies --format json
```

`Package.swift` template:

```swift
// swift-tools-version:5.3
import PackageDescription
 
let package = Package(
   name: "Shared",
   platforms: [
     .iOS(.v14),
   ],
   products: [
      .library(name: "Shared", targets: ["Shared"])
   ],
   targets: [
      .binaryTarget(
         name: "Shared",
         url: "<link to the uploaded XCFramework ZIP file>",
         checksum:"<checksum calculated for the ZIP file>")
   ]
)
```

Exporting multiple modules through an umbrella module (`together/build.gradle.kts`):

```kotlin
kotlin {
    val frameworkName = "together"
    val xcf = XCFramework(frameworkName)

    listOf(
        iosArm64(),
        iosSimulatorArm64()
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            export(projects.network)
            export(projects.database)

            baseName = frameworkName
            xcf.add(this)
        }
    }

    // Dependencies set as "api" (as opposed to "implementation") to export underlying modules
    sourceSets {
        commonMain.dependencies {
            api(projects.network)
            api(projects.database)
        }
    }
}
```

```shell
./gradlew :together:assembleTogetherReleaseXCFramework
```

## Notes

- Two files must be published: a ZIP archive with the XCFramework (any storage with direct access, e.g. a GitHub release, Amazon S3 or Maven) and `Package.swift`, pushed to a Git repository with a Git tag carrying the semantic version.
- The resulting framework is created at `shared/build/XCFrameworks/release/Shared.xcframework`.
- Recommended repository layout: keep `Package.swift` and the code to be packaged in separate Git repositories, so the manifest is versioned separately. Alternatives (manifest next to the KMP code, or in the consumer repo) have versioning (SwiftPM uses Git tags) and CI-automation drawbacks described on the source page.
- If the project consumes SwiftPM dependencies, starting with Kotlin 2.5.0-Beta1 (the docs' `kotlinEapVersion`; the latest stable in the pinned docs is 2.4.21) the assemble task also generates SwiftPM-related files, including a `Package.swift`, next to the XCFramework, so a manifest need not be written from scratch.
- Export of KMP modules that use SwiftPM import as a Swift package is not yet supported and might not work (YouTrack KT-84420); see spm-import.md.
- Umbrella module: create an empty Kotlin file such as `together/src/commonMain/kotlin/Together.kt`, as a workaround because the Gradle script cannot assemble a framework if the exported module has no source code. Each included module needs its iOS targets configured.
- Consumer side: Xcode **File | Add Package Dependencies**, enter the Git repository URL; for a Swift package use **Copy package** and paste the `.package` line into your own `Package.swift`. Verify with `import Shared` in a SwiftUI view (`Shared.Platform_iosKt.getPlatform().name`).
- Distinct from apple-swift (authoring Swift packages / SwiftPM semantics) and apple-distribution (App Store delivery): this page only covers producing a Kotlin XCFramework as a binary Swift package.

## Related

- [iOS integration methods](./integration-overview.md)
- [Adding Swift packages as dependencies to KMP modules](./spm-import.md)
- [Using Kotlin from local Swift packages](./spm-local-integration.md)
