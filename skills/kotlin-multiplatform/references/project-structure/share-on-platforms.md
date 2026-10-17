---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-share-on-platforms.html
---

# Share code between platforms

Overview of the code-sharing mechanisms: share across all platforms through the common source set, share among similar platforms through the hierarchical structure, share in libraries, and connect platform-specific libraries. The source page has no code blocks.

## Options / Props

### Mechanisms

| Mechanism | Description |
|-----------|-------------|
| All platforms | Put common business logic in the common source set |
| Some platforms | Use a hierarchical structure (default hierarchy template or manual configuration) |
| Libraries | Intermediate source set APIs are embedded into library artifacts with project structure information |
| Platform-specific APIs | Expected and actual declarations |
| Platform libraries | Foundation, UIKit, POSIX shipped with Kotlin/Native; available in shared source sets by default |

## Notes

- By default, platform-specific source sets (`jvmMain`, `macosArm64Main`, ...) depend on `commonMain` via `dependsOn`; a target's test compilation is associated with its main compilation (for example `androidUnitTest` can see `androidMain`), which is a compilation association, not a source set `dependsOn` edge.
- The source page describes the main/test link as a default `dependsOn` relation; it is actually a compilation association (see advanced-project-structure.md).
- Typical case: iOS device (ARM64) and x64 simulator targets have separate platform source sets but rarely need different code, so share iOS code through an intermediate source set.
- Libraries: for example the `kotlinx.coroutines` `concurrent` source set declares `runBlocking` and compiles for JVM and native targets, so a source set shared between JVM and native can call it when the library is published with the hierarchical structure.
- With the Kotlin CocoaPods Gradle plugin you can work with third-party native libraries consumed through the cinterop mechanism.
- Distance line: Kotlin/Native platform libraries and cinterop internals belong to the kotlin skill.

## Related

- [hierarchy.md](./hierarchy.md)
- [expect-actual.md](./expect-actual.md)
- [platform-specific-apis.md](./platform-specific-apis.md)
