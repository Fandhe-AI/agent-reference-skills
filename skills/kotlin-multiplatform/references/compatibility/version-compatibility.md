---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-compatibility-guide.html#version-compatibility
---

# Compatibility guide for Kotlin Multiplatform — Version compatibility

Compatibility of a Kotlin Multiplatform Gradle plugin version (same as the Kotlin version in the project) with Gradle, Android Gradle plugin and Xcode versions.

## Signature / Usage

```text
Kotlin Multiplatform plugin version | Gradle         | Android Gradle plugin | Xcode
2.4.20–2.4.21                       | 7.6.3–9.7.0    | 8.5.2–9.3.1           | 26.4
2.4.0–2.4.10                        | 7.6.3–9.5.0    | 8.5.2–9.1.0           | 26.4
2.3.20–2.3.21                       | 7.6.3–9.3.0    | 8.2.2–9.0.0           | 26.0
2.3.10                              | 7.6.3–9.0.0    | 8.2.2–9.0.0           | 26.0
2.3.0                               | 7.6.3–9.0.0    | 8.2.2–8.13.0          | 26.0
2.2.21                              | 7.6.3–8.14     | 7.3.1–8.11.1          | 26.0
2.2.20                              | 7.6.3–8.14     | 7.3.1–8.11.1          | 16.4
2.2.0–2.2.10                        | 7.6.3–8.14     | 7.3.1–8.10.0          | 16.3
2.1.21                              | 7.6.3–8.12.1   | 7.3.1–8.7.2           | 16.3
2.1.20                              | 7.6.3–8.11     | 7.4.2–8.7.2           | 16.0
2.1.0–2.1.10                        | 7.6.3–8.10*    | 7.4.2–8.7.2           | 16.0
2.0.21                              | 7.5–8.8*       | 7.4.2–8.5             | 16.0
2.0.20                              | 7.5–8.8*       | 7.4.2–8.5             | 15.3
2.0.0                               | 7.5–8.5        | 7.4.2–8.3             | 15.3
1.9.20                              | 7.5–8.1.1      | 7.4.2–8.2             | 15.0
```

## Notes

- The current Stable Kotlin version in this guide is 2.4.21 (docs pinned at commit 3ad4b02, fetched 2026-10-16). Mind the deprecation cycle of a specific change in relation to the Kotlin version in your project.
- When upgrading across several versions, check incompatible changes of every range in between, for example 1.7.0 to 1.9.0 requires both the Kotlin 1.9.0–1.9.25 and Kotlin 1.7.0–1.8.22 sections; 1.9.0 to 2.0.0 requires both the Kotlin 2.0.0 and later and Kotlin 1.9.0–1.9.25 sections.
- `*` Kotlin 2.0.20–2.0.21 and Kotlin 2.1.0–2.1.10 are fully compatible with Gradle up to 8.6. Gradle versions 8.7–8.10 are also supported, with one exception: with the Kotlin Multiplatform Gradle plugin you may see deprecation warnings in projects calling `withJava()` in the JVM target (see changes-kotlin-2-0-and-later, "Java source sets created by default").
- For Compose Multiplatform, see the Kotlin and Jetpack compatibility page (compose-compatibility-and-versioning) and What's new in Compose Multiplatform.
- Gradle, AGP and Xcode version ranges here overlap with android-build-gradle (AGP / Gradle compatibility); this page covers the Kotlin Multiplatform plugin's supported ranges only.

## Related

- [Compatibility guide for Kotlin Multiplatform — Kotlin 2.0.0 and later](./changes-kotlin-2-0-and-later.md)
- [Compatibility guide for Kotlin Multiplatform — Kotlin 1.9.0−1.9.25](./changes-kotlin-1-9.md)
- [Compatibility guide for Kotlin Multiplatform — Kotlin 1.7.0−1.8.22](./changes-kotlin-1-7-1-8.md)
- [Compatibility and versions](./compose-compatibility-and-versioning.md)
- [Updating multiplatform projects with Android apps to use AGP 9](./agp-9-migration.md)
