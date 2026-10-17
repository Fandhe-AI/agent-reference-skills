---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-spm-import.html
---

# Adding Swift packages as dependencies to KMP modules

SwiftPM import lets the Kotlin Gradle plugin import Objective-C APIs from SwiftPM dependencies declared for Apple targets (the SwiftPM counterpart to the CocoaPods plugin).

## Signature / Usage

`gradle/libs.versions.toml`:

```toml
[versions]
kotlin = "2.5.0-Beta1"

[plugins]
kotlin-multiplatform = { id = "org.jetbrains.kotlin.multiplatform", version.ref = "kotlin" }
```

`build.gradle.kts`:

```kotlin
kotlin {
    iosArm64()
    iosSimulatorArm64()

    swiftPMDependencies {
        // Import FirebaseAnalytics into your Kotlin code
        swiftPackage(
            url = url("https://github.com/firebase/firebase-ios-sdk.git"),
            version = from("12.5.0"),
            products = listOf(product("FirebaseAnalytics")),
        )
        // swift-protobuf is a transitive Firebase dependency,
        // so you only need to include it
        // if you want to use a specific version
        swiftPackage(
            url = url("https://github.com/apple/swift-protobuf.git"),
            version = exact("1.32.0"),
            products = listOf(),
        )
    }
}
```

Link the Xcode project with the generated intermediary package (first dependency only):

```shell
XCODEPROJ_PATH='/path/to/project/iosApp/iosApp.xcodeproj' ./gradlew :kotlin-library:integrateLinkagePackage
```

Use imported APIs in `iosMain`:

```kotlin
// subproject/src/iosMain/kotlin/useFirebaseAnalytics.kt
import swiftPMImport.groupName.subproject.FIRAnalytics
import swiftPMImport.groupName.subproject.FIRApp
```

## Options / Props

| Name | Where | Description |
|------|-------|-------------|
| `swiftPackage(url, version, products, importedClangModules)` | `swiftPMDependencies {}` | Declares a remote Swift package |
| `url("...")` / `id("...")` | `url` / `repository` parameter | Location by Git URL or SwiftPM registry ID (mutually exclusive) |
| `from("1.0")` | `version` | Like the Gradle `require` constraint, starting with the version |
| `exact("2.0")` | `version` | Like the Gradle `strict` constraint |
| `branch("master")` / `revision("...")` | `version` | Git-specific specification |
| `product("Name", platforms = setOf(iOS()))` | `products` | Product; `platforms` restricts which compilations see it (required per dependency once another target such as macOS is added) |
| `discoverClangModulesImplicitly` | `swiftPMDependencies {}` | Default automatic Clang module discovery; set `false` to use product names as Clang module names |
| `importedClangModules` | `swiftPackage(...)` | Clang modules whose names differ from product names (ignored when discovery is on) |
| `localSwiftPackage(directory, products)` | `swiftPMDependencies {}` | Imports a Swift package from the local file system |
| `iosMinimumDeploymentTarget.set("16.0")` | `swiftPMDependencies {}` | Raises the deployment version when dependencies need it (`*MinimumDeploymentTarget` pattern) |
| `packageResolvedSynchronization` | `swiftDependencies {}` | `identifier("custom")` groups subprojects' lock files; `noSynchronization()` gives a subproject its own `Package.resolved` |

Local package and lock-file customization:

```kotlin
kotlin {
    swiftPMDependencies {
        localSwiftPackage(
            directory = project.layout.projectDirectory.dir("/path/to/ExamplePackage/"),
            products = listOf("ExamplePackage")
        )
    }
}
```

```kotlin
kotlin {
    swiftDependencies { 
        // The Package.resolved file for this subproject
        // won't be merged with any other
        packageResolvedSynchronization = noSynchronization()
    }
}
```

## Notes

- Alpha: this feature is in Alpha; feedback goes to the Kotlin Slack channel #kmp-swift-package-manager.
- Requires the Kotlin Multiplatform Gradle plugin version 2.5.0-Beta1 (the docs' `kotlinEapVersion`, a pre-release; the latest stable in the pinned docs is 2.4.21).
- Transitive consumers get the machine code from SwiftPM dependencies automatically (for example for Kotlin/Native tests or framework linking).
- Export of KMP modules using SwiftPM import as a Swift package is not yet supported (YouTrack KT-84420); see spm-export.md.
- Imported Objective-C APIs live in namespaces starting with `swiftPMImport` followed by the Gradle group and project names.
- After the first `integrateLinkagePackage`, commit the generated package and updated Xcode project; the synthetic package then updates automatically when SwiftPM dependencies change.
- Lock files: `Package.resolved` files are merged by default into `.swiftpm-locks/default/swiftImport`; commit the lock file (or the whole `.swiftpm-locks` directory). To force an update, delete each subproject's `build` directory and the relevant `.swiftpm-locks/<group>/` directory (or the subproject's own `Package.resolved` for `noSynchronization()`), then run `./gradlew :yourModuleName:fetchSyntheticImportProjectPackages`.
- Known limitation with dynamic Kotlin/Native frameworks: build errors such as `Undefined symbols for architecture ...`, `dyld: Symbol not found: ...`, or duplicate-class warnings. A general fix is `isStatic = true` in `binaries.framework {}`; if those issues occur, keep `isStatic=false` or report in the Slack channel, per the source text.
- Working samples: the `spm_import` branches of the Kotlin/kmp-with-cocoapods-firebase-sample and Kotlin/kmp-with-cocoapods-compose-sample repositories.
- Distinct from apple-swift (Swift Package Manager and `Package.swift` authoring): this page is the Kotlin Gradle plugin's `swiftPMDependencies {}` DSL.

## Related

- [Switch from CocoaPods to SwiftPM dependencies](./cocoapods-to-spm-migration.md)
- [Swift package export setup](./spm-export.md)
- [iOS integration methods](./integration-overview.md)
