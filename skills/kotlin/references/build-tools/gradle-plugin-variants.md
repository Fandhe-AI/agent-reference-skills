---
source: https://kotlinlang.org/docs/gradle-plugin-variants.html
---

# Support for Gradle plugin variants

Gradle 7.0 introduced plugins with variants. The Kotlin team ships different Kotlin Gradle plugin (KGP) variants per Gradle version: the `main` variant supports base Kotlin compilation on the oldest supported Gradle, and each later variant implements features of its Gradle release.

## Signature / Usage

Check the variant in use by running with `--info` and finding a line starting with `Using Kotlin Gradle plugin`, for example `Using Kotlin Gradle plugin main variant`.

```kotlin
configurations.register("customConfiguration") {
    attributes {
        attribute(
            Usage.USAGE_ATTRIBUTE,
            project.objects.named(Usage::class.java, Usage.JAVA_RUNTIME)
        )
        attribute(
            Category.CATEGORY_ATTRIBUTE,
            project.objects.named(Category::class.java, Category.LIBRARY)
        )
        // If you want to depend on a specific KGP variant:
        attribute(
            GradlePluginApiVersion.GRADLE_PLUGIN_API_VERSION_ATTRIBUTE,
            project.objects.named("7.0")
        )
    }
}
```

## Variants

| Variant | Gradle versions |
| --- | --- |
| `main` | 7.6.0–7.6.3 |
| `gradle80` | 8.0–8.0.2 |
| `gradle81` | 8.1.1 |
| `gradle82` | 8.2.1–8.4 |
| `gradle85` | 8.5 |
| `gradle86` | 8.6-8.7 |
| `gradle88` | 8.8-8.10 |
| `gradle811` | 8.11-8.12 |
| `gradle813` | 8.13-8.14 |
| `gradle96` | 9.6-9.7 |

## Notes

- Gradle cannot select a KGP variant in a custom configuration (expected). When a custom configuration depends on `org.jetbrains.kotlin:kotlin-gradle-plugin:2.4.21`, add the attributes shown above, otherwise resolution fails with `Cannot choose between the following variants of org.jetbrains.kotlin:kotlin-gradle-plugin:...`.
- Known Gradle issues with variant selection: `ResolutionStrategy` in `pluginManagement` does not work for multivariant plugins (gradle/gradle#20545); plugin variants are ignored when a plugin is added as the `buildSrc` common dependency (gradle/gradle#20847).
- The official page's Kotlin tab uses the Groovy-style `Usage.class` / `Category.class`; corrected to `Usage::class.java` / `Category::class.java` for Kotlin DSL.
- More variants will be added in future Kotlin releases.

## Related

- [Configure a Gradle project](./gradle-configure-project.md)
- [Gradle](./gradle.md)
