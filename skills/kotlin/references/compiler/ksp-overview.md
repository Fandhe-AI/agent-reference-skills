---
source: https://kotlinlang.org/docs/ksp-overview.html
---

# Kotlin Symbol Processing API

Kotlin Symbol Processing (KSP) is a source code generation framework for Kotlin. Processors (symbol processors) inspect static information about source code and generate new code, most commonly based on annotations.

## Signature / Usage

Entry point and processing interfaces:

```kotlin
interface SymbolProcessorProvider {
    fun create(environment: SymbolProcessorEnvironment): SymbolProcessor
}

interface SymbolProcessor {
    fun process(resolver: Resolver): List<KSAnnotated>
    fun finish() {}
    fun onError() {}
}
```

## Options / Props

Requirements of KSP 2.3.12:

| Dependency | Min and max versions |
| --- | --- |
| Kotlin Gradle plugin (KGP) | 2.3.20-2.4.x |
| Android Gradle Plugin (AGP) | 8.13.0 or later |
| Gradle | 8.13 or later. For AGP 9.0 or later, use Gradle 9.x. |
| JDK | 17 or later |

Supported libraries (status):

| Library | Status |
| --- | --- |
| Room, Moshi, RxHttp, Kotshi, Lyricist, Lich SavedState, gRPC Dekorator, EasyAdapter, Koin Annotations, Glide, Micronaut, Epoxy, Paris, Auto Dagger, SealedX, Ktorfit, Mockative, Kotest | Officially supported |
| DeeplinkDispatch | Supported via airbnb/DeepLinkDispatch#323 |
| Dagger, Hilt | Stable as of Dagger 2.60+ with KSP 2.3.9+ (dagger.dev/dev-guide/ksp) |
| Motif | Alpha |
| Auto Factory | Not yet supported |

## Notes

- Source: https://kotlinlang.org/docs/ksp-overview.html (kotlin-web-site 2f28ab9, fetched 2026-11-14): the official pages render kotlinVersion 2.4.21 with kspVersion 2.3.12, and the requirements table (KGP 2.3.20–2.4.x, AGP 8.13.0 or later) now matches that Kotlin version.
- Maven Central's latest `symbol-processing-api` is 2.3.14 (2026-11-13), but the official docs still render 2.3.12. Source: https://repo1.maven.org/maven2/com/google/devtools/ksp/symbol-processing-api/maven-metadata.xml (fetched 2026-11-14).
- KSP hides compiler changes behind a well-defined API, so processors need less maintenance; trade-off: KSP-based processors can't examine expressions or statements, and can't modify source code. KSP models declarations and type information, not function bodies.
- Compilation flow: processors analyze source code and resources, generate source files or other outputs, then the Kotlin compiler compiles the original source together with the generated code.
- The official page (kotlin-web-site 2f28ab9) lists Dagger as Alpha and Hilt as In progress; dagger.dev/dev-guide/ksp states Dagger's KSP support (including hilt-compiler) is stable as of Dagger 2.60+ and KSP 2.3.9+, so this page follows dagger.dev.
- Typical use cases: dependency injection (Dagger), serialization (Moshi), database management (Room).
- Distinction from kapt: use KSP for Gradle projects whose processors support KSP and for writing your own processors (see `kapt`).
- This page covers the KSP API in general. Android-specific KSP / Room / Hilt configuration is in android-build-gradle, android-data and android-architecture.

## Related

- [ksp-quickstart](./ksp-quickstart.md)
- [ksp-kotlin-model](./ksp-kotlin-model.md)
- [ksp-reference](./ksp-reference.md)
- [ksp-incremental](./ksp-incremental.md)
- [ksp-multi-round](./ksp-multi-round.md)
- [ksp-multiplatform](./ksp-multiplatform.md)
- [ksp-command-line](./ksp-command-line.md)
- [ksp-kapt-migration](./ksp-kapt-migration.md)
- [kapt](./kapt.md)
