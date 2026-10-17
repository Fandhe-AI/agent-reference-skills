---
source: https://kotlinlang.org/docs/multiplatform/compose-compatibility-and-versioning.html
---

# Compatibility and versions

Compose Multiplatform releases ship separately from Kotlin and Jetpack Compose releases. This page covers Compose Multiplatform releases, release cycles and component compatibility.

## Signature / Usage

Repository for development versions of the Compose Multiplatform compiler plugin (not available in Maven Central):

```kotlin
maven("https://redirector.kotlinlang.org/maven/compose-dev")
```

## Options / Props

Supported platforms for Compose Multiplatform 1.12.2 (64-bit platforms only):

| Platform | Minimum version |
|----------|-----------------|
| Android | Android 5.0 (API level 21) |
| iOS | iOS 14 |
| macOS | macOS 13 arm64 |
| Windows | Windows 10 (x86-64, arm64) |
| Linux | Ubuntu 20.04 (x86-64, arm64) |
| Web | Browsers with WasmGC support |

Jetpack Compose artifact versions used by each Compose Multiplatform version (latest rows; the source lists back to 1.0.0):

| Compose Multiplatform version | Jetpack Compose version |
|-------------------------------|-------------------------|
| 1.12.2 | 1.12.1 |
| 1.11.1 | 1.11.2 |
| 1.10.3 | 1.10.5 |
| 1.9.3 | 1.9.4 |
| 1.8.2 | 1.8.2 |
| 1.7.3 | 1.7.6 |
| 1.7.1 | 1.7.5 |
| 1.7.0 | 1.7.1 |
| 1.6.11 | 1.6.7 |
| 1.6.10 | 1.6.7 |
| 1.6.2 | 1.6.4 |
| 1.6.1 | 1.6.3 |
| 1.6.0 | 1.6.1 |
| 1.5.12 | 1.5.4 |
| 1.5.11 | 1.5.4 |
| 1.5.10 | 1.5.4 |
| 1.5.1 | 1.5.0 |
| 1.5.0 | 1.5.0 |
| 1.4.3 | 1.4.3 |
| 1.4.1 | 1.4.3 |
| 1.4.0 | 1.4.0 |
| 1.3.1 | 1.3.3 |
| 1.3.0 | 1.3.3 |
| 1.2.1 | 1.2.1 |
| 1.2.0 | 1.2.1 |
| 1.1.1 | 1.1.0 |
| 1.1.0 | 1.1.0 |
| 1.0.1 | 1.1.0-beta02 |
| 1.0.0 | 1.1.0-beta02 |

## Notes

- The latest Compose Multiplatform is always compatible with the latest Kotlin; no manual alignment needed. EAP versions of either product are still potentially unstable.
- Compose Multiplatform requires the Compose Compiler Gradle plugin applied with the same version as the Kotlin Multiplatform plugin (see compose-compiler under gradle-dsl).
- Starting with Compose Multiplatform 1.8.0 the UI framework fully transitioned to the K2 compiler: use at least Kotlin 2.1.0, depend on Compose-Multiplatform-based libraries only if compiled against at least Kotlin 2.1.0, and upgrade to Kotlin **2.2.20** for projects targeting platforms with rapidly evolving support, such as iOS and web.
- Backward-compatibility workaround until dependencies are updated: turn off the Gradle cache with the `disableNativeCache` DSL (see the binaries section of the Gradle DSL reference); this ensures compatibility with older libraries but increases compilation time.
- Desktop limitations: only JDK 11 or later is supported (memory management scheme used in Skia bindings); only JDK 17 or later for packaging native distributions (`jpackage` limitations); known issue with OpenJDK 11.0.12 when switching keyboard layouts on macOS (not reproducible in OpenJDK 11.0.15).
- Release cycle: Compose Multiplatform shares code with Jetpack Compose and aligns its release cycle. After a Jetpack Compose release, JetBrains uses the release commit as a base for the next Compose Multiplatform version, adds support for new platform features, stabilizes all platforms and releases. The gap is usually 1–3 months.
- Development versions of the compiler plugin (for example `1.8.2+dev2544`) are built without a set schedule.
- When building for Android, Compose Multiplatform uses artifacts published by Google.
- Product versions per the docs pin: Kotlin 2.4.21 and Compose Multiplatform 1.12.2 (stable); material3 1.12.0-alpha03 and navigation 2.10.0-rc01 are pre-release artifacts pinned by the docs (see whats-new-compose-1-12); do not treat those as stable.
- Distance line: the common androidx.compose API and Jetpack release notes belong to android-compose-ui / android-compose-components; this page covers org.jetbrains.compose artifact versions and platform support.
- Kotlin Multiplatform Gradle plugin, Gradle, AGP and Xcode compatibility is on version-compatibility.

## Related

- [Compatibility guide for Kotlin Multiplatform — Version compatibility](./version-compatibility.md)
- [What's new in Compose Multiplatform 1.12.2](./whats-new-compose-1-12.md)
- Updating Compose compiler
- How multiplatform Jetpack libraries are packaged
