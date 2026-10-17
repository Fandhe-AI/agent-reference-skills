---
source: https://kotlinlang.org/docs/releases.html
---

# Kotlin release process

Release types and cadence, upcoming releases, how to update the Kotlin version in Gradle or Maven, standard library security support window, and the release history table.

## Signature / Usage

```kotlin
plugins {
    // Replace `<...>` with the plugin name appropriate for your target environment
    kotlin("<...>") version "2.4.21"
    // For example, if your target environment is JVM:
    // kotlin("jvm") version "2.4.21"
    // If your target is Kotlin Multiplatform:
    // kotlin("multiplatform") version "2.4.21"
}
```

```groovy
plugins {
    id 'org.jetbrains.kotlin.<...>' version '2.4.21'
    // For example, if your target environment is JVM:
    // id 'org.jetbrains.kotlin.jvm' version '2.4.21'
}
```

```xml
<properties>
    <kotlin.version>2.4.21</kotlin.version>
</properties>
```

Alternatively, change the `kotlin-maven-plugin` `<version>` in `pom.xml`.

### Release types (since Kotlin 2.0.0)

| Type | Version | Contents | Cadence |
| --- | --- | --- | --- |
| Language release | 2.x.0 | Major language changes and tooling updates | Once in 6 months |
| Tooling release | 2.x.20 | Tooling updates, performance improvements, bug fixes | 3 months after the corresponding language release |
| Bug fix release | 2.x.yz | Bug fixes for tooling releases | No exact schedule |

Example from the page: language release 2.2.0 had one tooling release 2.2.20 and one bug fix release 2.2.21. Preview (EAP) versions are shipped for each language and tooling release.

### Upcoming releases

- 2.5.0: planned for December 2026
- 2.5.20: planned for March 2027

### Update to a new version

- Latest Kotlin version at fetch time: 2.4.21 (bug fix release; see What's new in Kotlin 2.4.20 for features).
- If a project uses `kotlinx` libraries, check whether to update their versions too (Gradle: "Set a dependency on a kotlinx library"; Maven: "Dependency on a kotlinx library").
- Kotlin has full out-of-the-box support in IntelliJ IDEA and Android Studio; for a new language release the Kotlin plugin migration tools help.

### Standard library security support

Starting with Kotlin 2.4.0, the Kotlin standard library for the JVM has an 18-month support window per release line (language release 2.x.0 and its tooling release 2.x.20 form one line, 2.x). On a vulnerability, a bug fix release is shipped for the latest release in the line, plus every line within its active support window.

| Release line | Release date | End of support | Latest release |
| --- | --- | --- | --- |
| 2.4 | June 3, 2026 | December 3, 2027 | 2.4.21 |

Example from the page: if the latest release is 2.4.20, a fix is released for 2.4.20 only, not for 2.4.0.

### Release history (selected)

| Version | Released | Type |
| --- | --- | --- |
| 2.4.21 | October 8, 2026 | Bug fix release |
| 2.4.20 | September 7, 2026 | Tooling release |
| 2.4.10 | July 14, 2026 | Bug fix release for 2.4.0 |
| 2.4.0 | June 3, 2026 | Language release |
| 2.3.21 | April 23, 2026 | Bug fix release for 2.3.20 |
| 2.3.20 | March 16, 2026 | Tooling release |
| 2.3.10 | February 5, 2026 | Bug fix release for 2.3.0 (includes a fix for a rare race condition with kotlinx.serialization, KT-83984) |
| 2.3.0 | December 16, 2025 | Language release |
| 2.2.21 | October 23, 2025 | Bug fix release (Xcode 26 support) |
| 2.2.20 | September 10, 2025 | Tooling release |
| 2.2.10 | August 14, 2025 | Bug fix release |
| 2.2.0 | June 23, 2025 | Language release |
| 2.1.0 | November 27, 2024 | Language release |
| 2.0.0 | May 21, 2024 | Language release with the Stable K2 compiler |

The full table on the official page goes back to 1.3.72 (April 15, 2020); each row links the GitHub release and the What's new / compatibility pages.

## Notes

- Dates: this page lists 2.4.0 as released June 3, 2026 and 2.4.10 as July 14, 2026, while the "What's new in Kotlin 2.4.0" page states "Released: July 14, 2026". This page's release history is treated as authoritative.
- Report security issues through the Kotlin issue tracker (Type Security Problem) or by email to security@jetbrains.org.
- EAP builds (such as the 2.5.0 preview) are documented on a separate page and are not covered by this skill.

## Related

- [What's new in Kotlin 2.4.20](./whatsnew2420.md)
- [What's new in Kotlin 2.4.0](./whatsnew24.md)
- [Kotlin evolution principles](./kotlin-evolution-principles.md)
- [Stability of Kotlin components](./components-stability.md)
