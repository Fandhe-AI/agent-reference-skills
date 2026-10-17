---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-ios-integration-overview.html
---

# iOS integration methods

A Kotlin Multiplatform shared module is integrated into an iOS app by generating an iOS framework from the shared module and adding it as a dependency to the iOS project. The framework can be consumed as a local or remote dependency.

## Options / Props

| Method | Scope | Fits when | Details |
|--------|-------|-----------|---------|
| Direct integration | Local | No CocoaPods dependencies in the KMP project; a script in the Xcode build phase makes the Kotlin build part of the iOS build. Applied by default by the Kotlin Multiplatform IDE plugin | [direct-integration.md](./direct-integration.md) |
| SwiftPM integration with a local package | Local | Mono repository with an iOS project that uses Swift packages; no irreplaceable CocoaPods dependencies | [spm-local-integration.md](./spm-local-integration.md), [spm-import.md](./spm-import.md) |
| CocoaPods integration with a local podspec | Local | Mono repository with an iOS project that uses CocoaPods; the KMP project imports CocoaPods dependencies | [cocoapods-overview.md](./cocoapods-overview.md) |
| SwiftPM with XCFrameworks | Remote | Export the XCFramework as a Swift package and/or import remote Swift packages into the KMP project | [spm-export.md](./spm-export.md), [spm-import.md](./spm-import.md) |
| CocoaPods integration with XCFrameworks | Remote | Build XCFrameworks with the Kotlin CocoaPods Gradle plugin and distribute shared parts separately via CocoaPods | See "Build final native binaries" (XCFrameworks) in ../build-test-publish/native-binaries.md |

## Notes

- Choose local integration for full control over the entire codebase and instant updates to final applications when common code changes.
- Choose remote integration to explicitly separate the code base of the final application from the common code base; the shared code is then integrated like a regular third-party dependency.
- This overview page has no code in the source.
- Distinct from apple-swift (Swift Package Manager itself) and apple-distribution (App Store delivery): this page covers only how a Kotlin framework is wired into an Xcode project.

## Related

- [Direct integration](./direct-integration.md)
- [Swift package export setup](./spm-export.md)
- [Adding Swift packages as dependencies to KMP modules](./spm-import.md)
- [Using Kotlin from local Swift packages](./spm-local-integration.md)
- [CocoaPods overview and setup](./cocoapods-overview.md)
