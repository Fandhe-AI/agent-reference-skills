---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-cocoapods-spm-migration.html
---

# Switch Kotlin Multiplatform project from CocoaPods to SwiftPM dependencies

Steps to move a KMP module with CocoaPods dependencies to Swift packages using SwiftPM import.

## Signature / Usage

Keep the CocoaPods plugin while adding the SwiftPM dependency (`projectDir/sharedLogic/build.gradle.kts`):

```kotlin
kotlin {
    swiftPMDependencies {
       swiftPackage(
           url = url("https://github.com/firebase/firebase-ios-sdk.git"),
           version = from("12.5.0"),
           products = listOf(product("FirebaseAnalytics")),
       )
    }

    cocoapods {
        // ...

        pod("FirebaseAnalytics") {
        version = "12.5.0"
        // ...
        }
    }
}
```

Move `cocoapods.framework {}` configuration to `binaries.framework {}`:

```kotlin
kotlin {
    listOf(
        iosArm64(),
        iosSimulatorArm64(),
    ).forEach { iosTarget ->
        iosTarget.binaries.framework {
            baseName = "Shared"
            isStatic = true
        }
    }
}
```

Generated command to reconfigure the Xcode project (found in the failing Xcode build's error output):

```text
XCODEPROJ_PATH='/path/to/project/iosApp/iosApp.xcodeproj' GRADLE_PROJECT_PATH=':kotlin-library' '/path/to/project/gradlew' -p '/path/to/project' ':kotlin-library:integrateEmbedAndSign' ':kotlin-library:integrateLinkagePackage'
```

Deintegrate the pod once all CocoaPods dependencies are replaced:

```shell
pod deintegrate
```

## Notes

- Alpha: this migration relies on the Alpha SwiftPM import feature and the Kotlin Gradle plugin version 2.5.0-Beta1 (the docs' `kotlinEapVersion`; the latest stable in the pinned docs is 2.4.21).
- Three steps: update the build script (add `swiftPMDependencies {}` without removing CocoaPods yet), reconfigure the Xcode project to direct integration via SwiftPM import tooling, then remove the CocoaPods KMP integration.
- If the pod and Swift package offer the same APIs, only update Kotlin imports, from `cocoapods.FirebaseAnalytics.FIRAnalytics` to `swiftPMImport.org.example.package.FIRAnalytics`.
- Reconfiguring Xcode: open the project in Xcode, build (it should fail; the error contains the command; View | Navigators | Report, filter Errors Only), then run the command in `/path/to/project/iosApp`. In IntelliJ IDEA, then use Tools | Swift Package Manager | Resolve Dependencies.
- To keep CocoaPods for non-overlapping dependencies, remove only the `pod 'sharedLogic', :path => '../sharedLogic'` line from the Podfile and run `pod install`. Otherwise remove the `cocoapods {}` block and the CocoaPods plugin references from the root and shared-module `plugins {}` blocks.
- The source also points to an AI-agent-assisted migration page (a prepared skill for AI agents); it is not reproduced in this skill, and the source notes AI results are not entirely predictable.
- Sample projects use CocoaPods on the main branch and SwiftPM on `spm-import`: Kotlin/kmp-with-cocoapods-firebase-sample and Kotlin/kmp-with-cocoapods-compose-sample.
- Distinct from apple-swift: this is a Gradle-plugin migration, not Swift Package Manager usage in Swift projects.

## Related

- [Adding Swift packages as dependencies to KMP modules](./spm-import.md)
- [Direct integration](./direct-integration.md)
- [CocoaPods overview and setup](./cocoapods-overview.md)
