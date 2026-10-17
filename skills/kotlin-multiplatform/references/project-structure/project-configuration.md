---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-project-configuration.html
---

# Choosing a configuration for your Kotlin Multiplatform project

Guidance on structuring a Kotlin Multiplatform setup: how the iOS app consumes the generated framework, single vs several shared modules, repository layout, and local vs remote code-sharing workflow. The source page has no code blocks.

## Decision axes

| Question | Options |
|----------|---------|
| How does the iOS app consume the framework? | Direct integration, CocoaPods, or Swift Package Manager (SwiftPM); local dependency (Kotlin build interacts with the iOS build) or remote dependency (framework produced then connected through a package manager) |
| Module configuration | Single shared module, or several shared modules plus an umbrella module and umbrella framework |
| Repository configuration | Monorepo; two repositories (Android + shared / iOS); three repositories (Android / iOS / shared); many repositories (Android / iOS / multiple libraries) |
| Code-sharing workflow | Local source distribution, or remote artifact distribution (SwiftPM or CocoaPod) |

## Notes

- Single shared module: simple, good starting point, but compilation time grows and apps cannot depend only on features they need.
- Several shared modules: separation of concerns and scalability, but more complex setup (umbrella module and framework) and dependency management. The iOS app cannot use only some feature modules of an umbrella framework (see KT-42247 and KT-42250). Only some modules may be exported to the umbrella framework, typically for remote consumption, to keep artifact size down.
- Umbrella framework rationale: multiple Kotlin frameworks in one iOS app make the Kotlin/Native compiler duplicate shared dependencies, inflating app size and breaking state shared through the same dependency; an umbrella framework avoids this. The source recommends against including several separate Kotlin frameworks.
- Monorepo: easy to set up with wizards and easy for iOS developers to reach Kotlin code, but iOS developers must configure unfamiliar tools and it often does not suit apps already in separate repositories; apps and shared module share a version.
- Two repositories: shared module is versioned along with the Android app. Three repositories: Kotlin Multiplatform modules must be versioned and published for Android or JVM; Android and iOS teams consuming the same versioned artifacts operate in version parity. Many repositories: each library versioned and published separately; an additional repository can hold an umbrella module per iOS app.
- Local (source) distribution: iOS build triggers framework generation; no publishing, quicker workflow, but everyone needs a full environment and iOS developers must learn IntelliJ IDEA / Android Studio and Gradle.
- Remote (artifact) distribution: framework published using SwiftPM or as a CocoaPod; iOS team need not touch Kotlin tooling, but the workflow is slower, debugging shared code on iOS is difficult, and iOS contribution to shared code drops. The source mentions KMMBridge (Touchlab) as tooling that simplifies this workflow.
- Recommended hybrid: remote distribution plus an additional local-development workflow with a local dependency on the framework. Use SwiftPM for remote and direct integration for local; with CocoaPods, switch via an environment variable.
- Distance line: SwiftPM / Xcode specifics belong to apple-swift and apple-distribution.

## Related

- [recommended-structure.md](./recommended-structure.md)
- [share-on-platforms.md](./share-on-platforms.md)
