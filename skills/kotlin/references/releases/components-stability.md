---
source: https://kotlinlang.org/docs/components-stability.html
---

# Stability of Kotlin components

Stability levels (Experimental, Alpha, Beta, Stable) of Kotlin compilers, plugins, libraries, and tools, with the version each status applies since.

## Signature / Usage

Stability levels, from least to most stable (the first three are the pre-stable levels):

```text
Experimental -> Alpha -> Beta -> Stable
```

### Stability levels

| Level | Meaning |
| --- | --- |
| Experimental | "Try it only in toy projects". Testing an idea; may change or disappear at any time; no stability or compatibility guarantees |
| Alpha | "We are testing whether this should become production-ready". Feature set incomplete; breaking changes expected; may be significantly changed or discontinued |
| Beta | "You can use it, we'll do our best to minimize migration issues". Almost done, still not 100% finished; watch for deprecation warnings |
| Stable | "Use it even in most conservative scenarios". Evolved under strict backward compatibility rules |

Experimental, Alpha, and Beta are collectively the pre-stable levels. Levels say how fast a component changes and how risky adoption is, not how soon it becomes Stable. By default all new components are Experimental. A stable component may contain experimental subcomponents (features, API classes or functions, command-line options), which are documented and require explicit opt-in.

GitHub projects in the Kotlin organization carry two badges: a stability badge (same levels) and a support-status badge (unified for JetBrains products).

### Kotlin compiler

| Component | Status | Since |
| --- | --- | --- |
| Kotlin/JVM | Stable | 1.0.0 |
| Kotlin/Native | Stable | 1.9.0 |
| Kotlin/JS | Stable | 1.3.0 |
| Kotlin/Wasm | Beta | 2.2.20 |
| Analysis API | Stable | |

### Core compiler plugins

| Component | Status | Since |
| --- | --- | --- |
| All-open | Stable | 1.3.0 |
| No-arg | Stable | 1.3.0 |
| SAM-with-receiver | Stable | 1.3.0 |
| kapt | Stable | 1.3.0 |
| Lombok | Alpha | 2.3.20 |
| Power-assert | Experimental | 2.0.0 |

### Kotlin libraries

| Component | Status | Since |
| --- | --- | --- |
| kotlin-stdlib (JVM) | Stable | 1.0.0 |
| kotlinx-coroutines | Stable | 1.3.0 |
| kotlinx-serialization | Stable | 1.0.0 |
| kotlin-metadata-jvm | Stable | 2.0.0 |
| kotlin-reflect (JVM) | Beta | 1.0.0 |
| kotlinx-datetime | Alpha | 0.2.0 |
| kotlinx-io | Alpha | 0.2.0 |
| kotlinx-collections-immutable | Alpha | 0.3.5 |

### Kotlin Multiplatform and Kotlin/Native

| Component | Status | Since |
| --- | --- | --- |
| Kotlin Multiplatform | Stable | 1.9.20 |
| Kotlin Multiplatform IDE plugin | Stable | 0.9 (versioned separately from the language) |
| Kotlin/Native Runtime | Stable | 1.9.20 |
| Kotlin/Native interop with C and Objective-C | Beta | 1.3.0 |
| klib binaries (not cinterop klibs) | Stable | 1.9.20 |
| cinterop klib binaries | Beta | 1.3.0 |
| CocoaPods integration | Stable | 1.9.20 |

### Build tools

| Component | Status | Since |
| --- | --- | --- |
| Kotlin Gradle plugin | Stable | 1.1.1 (the Kotlin Multiplatform Gradle plugin is stable from 1.9.20) |
| Kotlin Maven plugin | Stable | 1.0.0 |
| Build tools API (BTA) for JVM | Beta | 2.4.20 |
| BTA for JS | Alpha | 2.4.20 |
| BTA for Wasm | Alpha | 2.4.20 |

The Build tools API currently does not support Kotlin/Native.

### Language tools

| Component | Status | Since |
| --- | --- | --- |
| Scripting syntax and semantics | Alpha | 1.2.0 |
| Scripting embedding and extension API | Beta | 1.5.0 |
| Scripting IDE support | Beta | IntelliJ IDEA 2023.1 and later |
| CLI scripting | Alpha | 1.2.0 |

## Notes

- This is the authoritative status table for the kotlin skill; per-feature Experimental / Beta marks on other pages should be read against it.
- Language feature statuses (including Experimental ones such as collection literals) are on the language features and proposals page.

## Related

- [Kotlin evolution principles](./kotlin-evolution-principles.md)
- [Kotlin language features and proposals](./kotlin-language-features-and-proposals.md)
- [Kotlin release process](./releases.md)
