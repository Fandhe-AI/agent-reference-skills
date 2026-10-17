# ios-integration

| Name | Description | Path |
|------|-------------|------|
| CocoaPods Gradle plugin DSL reference | The Kotlin CocoaPods Gradle plugin creates Podspec files so a Kotlin project integrates with CocoaPods; main blocks, functions, and properties. | [cocoapods-dsl-reference.md](./cocoapods-dsl-reference.md) |
| Add dependencies on a Pod library | Add Pod library dependencies from several locations by calling `pod()` in the shared module's build script, one call per dependency. | [cocoapods-libraries.md](./cocoapods-libraries.md) |
| CocoaPods overview and setup | Kotlin/Native integrates with the CocoaPods dependency manager, for adding Pod dependencies or using a Kotlin project as a Pod. | [cocoapods-overview.md](./cocoapods-overview.md) |
| Switch Kotlin Multiplatform project from CocoaPods to SwiftPM dependencies | Steps to move a KMP module with CocoaPods dependencies to Swift packages using SwiftPM import. | [cocoapods-to-spm-migration.md](./cocoapods-to-spm-migration.md) |
| Use a Kotlin project as a CocoaPods dependency | Include an entire Kotlin project as a Pod dependency in an Xcode project's Podfile; it is built and rebuilt along with the project. | [cocoapods-xcode.md](./cocoapods-xcode.md) |
| Direct integration | Local integration method: an Xcode run script phase calls the `embedAndSignAppleFrameworkForXcode` Gradle task before the iOS app build. | [direct-integration.md](./direct-integration.md) |
| iOS integration methods | A Kotlin Multiplatform shared module is integrated into an iOS app by generating a framework that is consumed as a local or remote dependency. | [integration-overview.md](./integration-overview.md) |
| Privacy manifest for iOS apps | Resolve App Store Connect warnings about a missing privacy manifest when the app or a dependency, including Kotlin Multiplatform, uses required reason APIs. | [privacy-manifest.md](./privacy-manifest.md) |
| Swift package export setup | Remote integration method: build an XCFramework with the Kotlin Gradle plugin and distribute it as a SwiftPM binary package. | [spm-export.md](./spm-export.md) |
| Adding Swift packages as dependencies to KMP modules | SwiftPM import lets the Kotlin Gradle plugin import Objective-C APIs from SwiftPM dependencies declared for Apple targets. | [spm-import.md](./spm-import.md) |
| Using Kotlin from local Swift packages | Local integration method: a scheme pre-action runs `embedAndSignAppleFrameworkForXcode` so the Kotlin framework can be imported from local SwiftPM modules. | [spm-local-integration.md](./spm-local-integration.md) |
