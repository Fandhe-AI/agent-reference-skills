---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-spm-local-integration.html
---

# Using Kotlin from local Swift packages

A local integration method: a scheme pre-action runs `embedAndSignAppleFrameworkForXcode` so a Kotlin framework can be imported from local SwiftPM modules.

## Signature / Usage

Xcode: Product | Scheme | Edit scheme | Build | Pre-actions | + | New Run Script Action, then "Provide build settings from" your app target:

```bash
cd "<Path to the root of the multiplatform project>"
./gradlew :<Shared module name>:embedAndSignAppleFrameworkForXcode 
```

In the local Swift package:

```swift
import Shared

public func greetingsFromSpmLocalPackage() -> String {
    return Greeting.greet()
}
```

## Options / Props

| Item | Description |
|------|-------------|
| `cd` path | Path to the root of the KMP project, for example `$SRCROOT/..` |
| Gradle path | Shared module name, for example `:shared` or `:sharedLogic` |
| `KOTLIN_FRAMEWORK_BUILD_TYPE` | For a custom build configuration other than `Debug` / `Release`, add under Build Settings, User-Defined, and set to `Debug` or `Release` |

## Notes

- Available starting with Kotlin 2.0.0.
- Fits when the iOS app has local SwiftPM modules, the KMP project already targets iOS locally, and the existing iOS project uses static linking.
- Assumes the direct integration approach. If a Kotlin framework is connected through the CocoaPods plugin or a Swift package with `binaryTarget`, migrate first: clean the build folder and, for `binaryTarget`, remove the dependencies on the Kotlin-framework package in every `Package.swift`; for CocoaPods run `pod deintegrate`, remove the `cocoapods {}` block, and delete the `.podspec` and Podfile.
- With dependencies on other Pods in `cocoapods {}` you must keep the CocoaPods approach: a multimodal SwiftPM project cannot currently have both Pod dependencies and the Kotlin framework.
- Integration into `swift build` is not supported.
- Compared with regular direct integration, which needs both the KMP and iOS project rebuilt, only the Kotlin Multiplatform project needs a rebuild to see common-code changes.
- If a script sandboxing error occurs, disable **User Script Sandboxing** under Build Options on the Build Settings tab.
- Distinct from apple-swift (local package authoring) and apple-distribution: this page covers only the Kotlin framework pre-action wiring.

## Related

- [Direct integration](./direct-integration.md)
- [Swift package export setup](./spm-export.md)
- [iOS integration methods](./integration-overview.md)
