---
source: https://kotlinlang.org/docs/gradle.html
---

# Gradle

Gradle is a build system that downloads required dependencies, packages your code, and prepares it for compilation. This page is the entry point to the Kotlin Gradle plugin (KGP) chapter.

## Signature / Usage

```kotlin
plugins {
    // Replace `<...>` with the plugin name appropriate for your target environment
    kotlin("<...>") version "2.4.21"
    // For example, if your target environment is JVM:
    // kotlin("jvm") version "2.4.21"
}
```

## Notes

- KGP / Kotlin / AGP / Gradle version compatibility is in the table on [gradle-configure-project.md](./gradle-configure-project.md).
- Chapter contents: compiler options ([gradle-compiler-options.md](./gradle-compiler-options.md)); incremental compilation, caches, build reports, Kotlin daemon ([gradle-compilation-and-caches.md](./gradle-compilation-and-caches.md)); plugin variants ([gradle-plugin-variants.md](./gradle-plugin-variants.md)).
- Next steps named in the source: Gradle Kotlin DSL; annotation processing via the Kotlin Symbol Processing API (KSP); generating documentation with Dokka (supports mixed-language projects and multiple output formats, including standard Javadoc); OSGi.
- Distinct from the Android Gradle plugin (AGP) `android {}` block, `kotlinOptions`, and version catalogs, which are covered by the android-build-gradle skill.

## Related

- [Configure a Gradle project](./gradle-configure-project.md)
- [Compiler options in the Kotlin Gradle plugin](./gradle-compiler-options.md)
- [Compilation and caches](./gradle-compilation-and-caches.md)
- [Gradle plugin variants](./gradle-plugin-variants.md)
