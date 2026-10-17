---
source: https://kotlinlang.org/docs/gradle-best-practices.html
---

# Gradle best practices

Best practices for Gradle builds of Kotlin projects, split into organizing and optimizing.

## Signature / Usage

Version catalog in `libs.versions.toml`:

```toml
[versions]
kotlinxCoroutines = "1.11.0"

[libraries]
kotlinxCoroutines = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "kotlinxCoroutines" }
```

Used in `build.gradle.kts`:

```kotlin
dependencies {
    implementation(libs.kotlinxCoroutines)
}
```

### Organize

- **Use Kotlin DSL** instead of the Groovy DSL: no second language to learn, strict typing gives better IDE refactoring and auto-completion.
- **Use a version catalog** (`libs.versions.toml`) to centralize versions, libraries, and plugins.
- **Use convention plugins** to encapsulate and reuse common build logic across build files.

### Optimize

- **Local build cache**: reuse outputs produced by earlier builds.
- **Configuration cache**: caches the result of the configuration phase and skips it when nothing changed. Also enables parallel execution of independent tasks within a project, and implicitly enables `org.gradle.parallel`. It doesn't support all core Gradle plugins yet.
- **Multiple targets**: `build` and `assemble` can compile the same code once per target. When developing for one platform, run the corresponding `linkDebug*` task instead.
- **Migrate from kapt to KSP**: KSP processes source code directly without generating intermediary Java stubs, so it is faster than kapt.
- **Modularization**: one root project plus subprojects; Gradle rebuilds only the affected subproject. Benefits moderate to large projects only, not microservices-based ones.
- **CI/CD**: use incremental builds and dependency caching, with persistent storage or a remote build cache.
- **Remote build cache**: shares task outputs through a cache server across builds; a slow internet connection can make transfers slower than running tasks locally.

Modularized layout from the source:

```text
.
└── root-project/
    ├── settings.gradle.kts
    ├── app subproject/
    │   └── build.gradle.kts
    └── lib subproject/
        └── build.gradle.kts
```

## Notes

- Distinct from AGP-specific build configuration, which is covered by the android-build-gradle skill.

## Related

- [Gradle](./gradle.md)
- [Compilation and caches](./gradle-compilation-and-caches.md)
