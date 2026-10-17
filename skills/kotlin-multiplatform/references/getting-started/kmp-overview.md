---
source: https://kotlinlang.org/docs/multiplatform/kmp-overview.html
---

# What is Kotlin Multiplatform

Kotlin Multiplatform (KMP) is an open-source technology from JetBrains that enables sharing code across Android, iOS, desktop, web, and server while retaining the advantages of native development. With Compose Multiplatform, you can also share UI code across multiple platforms.

## Signature / Usage

```kotlin
kotlin {
    jvm() // Declares a JVM target
    iosArm64() // Declares a target that corresponds to 64-bit iPhones
}
```

### Key points

- Code sharing is incremental: share isolated modules (networking, storage), share all business logic while keeping the UI native, or share logic and UI with Compose Multiplatform.
- iOS UI can be built entirely with SwiftUI or UIKit, uniformly with Compose Multiplatform, or by mixing native and shared UI code.
- Kotlin Multiplatform leverages Kotlin/Native to produce native binaries and access platform APIs directly where virtual machines are undesirable or impossible, for example on iOS.
- IntelliJ IDEA and Android Studio support KMP through the Kotlin Multiplatform IDE plugin, which includes common UI previews and Compose Hot Reload.
- Multiplatform libraries (networking, storage, dependency injection, testing, UI, serialization, and more) can be browsed on klibs.io, a search platform maintained by JetBrains.

### Where to start (as listed in the source)

| Goal | Page |
|------|------|
| See KMP in action | quickstart |
| Share both UI and business logic | shared logic and UI tutorial (compose-multiplatform-new-project) |
| Turn an Android app into a multiplatform app | migration tutorial (multiplatform-integrate-in-existing-app) |
| Share some code without sharing UI | shared logic tutorial (multiplatform-upgrade-app) |
| Project structure | targets-and-source-sets.md |
| Code sharing mechanisms | share-on-platforms.md |
| Dependencies | add-dependencies.md |
| iOS integration methods | [integration-overview.md](../ios-integration/integration-overview.md) |
| Compilations and native binaries | [configure-compilations.md](../build-test-publish/configure-compilations.md), [native-binaries.md](../build-test-publish/native-binaries.md) |
| Publishing | [publish-apps.md](../build-test-publish/publish-apps.md), [publish-lib-setup.md](../build-test-publish/publish-lib-setup.md) |

## Notes

- The page also contains survey figures, a company adoption list, and links to case studies and team-adoption articles; these are marketing content and are not reproduced here.
- Snippet quoted from the project-structure "Discover your project" page (target declaration in the `kotlin {}` block); the source page itself has no code.
- Distance line: this skill covers Kotlin Multiplatform and Compose Multiplatform from kotlinlang.org/docs/multiplatform; Kotlin language and stdlib pages belong to the kotlin skill, and native SwiftUI / UIKit APIs belong to apple-swiftui / apple-uikit.

## Related

- [Stability of supported platforms](./supported-platforms.md)
- [Relationship between Compose Multiplatform and Jetpack Compose](./compose-and-jetpack-compose.md)
