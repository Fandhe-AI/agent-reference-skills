---
source: https://kotlinlang.org/docs/multiplatform/supported-platforms.html
---

# Stability of supported platforms

Platforms have varying stability levels depending on support by core Kotlin Multiplatform (code sharing) and by the Compose Multiplatform UI framework.

## Signature / Usage

```kotlin
kotlin {
    jvm()
    iosArm64()
    macosArm64()
    js().browser()
}
```

## Options / Props

### Core Kotlin Multiplatform platform stability

| Platform | Stability level |
|----------|-----------------|
| Android | Stable |
| iOS | Stable |
| Desktop (JVM) | Stable |
| Server-side (JVM) | Stable |
| Web based on Kotlin/Wasm | Beta |
| Web based on Kotlin/JS | Stable |
| watchOS | Beta |
| tvOS | Beta |

### Compose Multiplatform platform stability

| Platform | Stability level |
|----------|-----------------|
| Android | Stable |
| iOS | Stable |
| Desktop (JVM) | Stable |
| Web based on Kotlin/Wasm | Beta |

### Stability level meanings

Kotlin (core):

| Level | Meaning |
|-------|---------|
| Experimental | "try it only in toy projects"; may be dropped at any time |
| Alpha | "use at your own risk, expect migration issues" |
| Beta | "you can use it, we'll do our best to minimize migration issues"; changes are possible |
| Stable | "use it even in most conservative scenarios"; evolved under strict backward compatibility rules |

Compose Multiplatform UI framework:

| Level | Meaning |
|-------|---------|
| Experimental | "it's under development"; features may be missing, breaking changes may occur frequently |
| Alpha | "use at your own risk, expect migration issues" |
| Beta | "you can use it, and we'll do our best to minimize migration issues" |
| Stable | comprehensive API surface; API-breaking changes can only be made 2 versions after an official deprecation announcement |

Experimental, Alpha and Beta are collectively called pre-stable levels.

## Notes

- KMP supports more native platforms than the core table lists; see Kotlin/Native target support (kotlinlang.org/docs/native-target-support.html) for each.
- The source recommends the Recommended IDEs page to pick an IDE for a given platform combination.
- Snippet quoted from the Gradle DSL reference targets section (target declarations); the source page itself has no code, and the tables above are the verbatim data.
- Distance line: Kotlin component stability and Kotlin/Native target tiers on kotlinlang.org/docs (outside /docs/multiplatform) belong to the kotlin skill.

## Related

- [What is Kotlin Multiplatform](./kmp-overview.md)
- [Default UI behavior on different platforms](./platform-differences.md)
