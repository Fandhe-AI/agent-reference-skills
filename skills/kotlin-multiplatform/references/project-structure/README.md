# project-structure

| Name | Description | Path |
|------|-------------|------|
| Adding dependencies on multiplatform libraries | A KMP project can depend on multiplatform libraries, native libraries, and other projects, added per source set rather than per module. | [add-dependencies.md](./add-dependencies.md) |
| Advanced concepts of the multiplatform project structure | How the KMP project structure maps to Gradle: `dependsOn`, source set dependency resolution, version alignment, and compilations. | [advanced-project-structure.md](./advanced-project-structure.md) |
| Adding Android dependencies | Android-specific dependencies are declared as in pure Android projects, with the Android source set as the recommended place. | [android-dependencies.md](./android-dependencies.md) |
| Expected and actual declarations | The Kotlin mechanism for accessing platform-specific APIs from KMP modules while providing platform-agnostic APIs in common code. | [expect-actual.md](./expect-actual.md) |
| Source set hierarchy | Hierarchical source sets share code among some, but not all, targets; the default hierarchy template is recommended and `dependsOn` is the low-level alternative. | [hierarchy.md](./hierarchy.md) |
| Adding iOS dependencies | Apple SDK dependencies (such as Foundation or Core Bluetooth) need no extra setup; other iOS libraries use cinterop or CocoaPods. | [ios-dependencies.md](./ios-dependencies.md) |
| Use platform-specific APIs | Reach platform-specific APIs from common code: multiplatform libraries first, then expect/actual, common interfaces with injection, or a DI framework. | [platform-specific-apis.md](./platform-specific-apis.md) |
| Choosing a configuration for your Kotlin Multiplatform project | Structuring a KMP setup: how the iOS app consumes the generated framework, single vs several shared modules, and repository layout. | [project-configuration.md](./project-configuration.md) |
| Recommended Kotlin Multiplatform project structure | Recommended module layout with app entry points in separate modules, plus a migration guide from a single-module Compose Multiplatform project. | [recommended-structure.md](./recommended-structure.md) |
| Share code between platforms | Code-sharing mechanisms: the common source set, hierarchical source sets, shared libraries, and connecting platform-specific libraries. | [share-on-platforms.md](./share-on-platforms.md) |
| The basics of Kotlin Multiplatform project structure | Common code, targets, platform-specific and intermediate source sets, and test integration in a simplified model of the project structure. | [targets-and-source-sets.md](./targets-and-source-sets.md) |
