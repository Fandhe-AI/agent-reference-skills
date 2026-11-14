---
source: https://kotlinlang.org/docs/all-open-plugin.html
---

# All-open compiler plugin

Makes classes and their members `open` at compile time, without the `open` keyword, when they are marked with an annotation you register in the plugin options. Needed for frameworks and libraries that rely on subclassing and runtime proxies.

## Signature / Usage

Declare an annotation to mark the classes (the plugin only processes classes marked with a registered annotation):

```kotlin
package com.example

annotation class AllOpenMarker
```

Gradle (`build.gradle.kts`):

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.21"
    kotlin("plugin.allopen") version "2.4.21"
}
```

```kotlin
allOpen {
    annotation("com.example.AllOpenMarker")
    // You can specify multiple annotations:
    // annotations("com.example.AllOpenMarker", "com.anotherPackage.OtherAnnotation")
}
```

Maven (`pom.xml`):

```xml
<properties>
    <kotlin.version>2.4.21</kotlin.version>
</properties>

<plugin>
    <artifactId>kotlin-maven-plugin</artifactId>
    <groupId>org.jetbrains.kotlin</groupId>
    <version>${kotlin.version}</version>

    <configuration>
        <compilerPlugins>
            <plugin>all-open</plugin>
        </compilerPlugins>

        <pluginOptions>
            <!-- Add multiple lines for multiple annotations -->
            <option>all-open:annotation=com.example.AllOpenMarker</option>
            <option>all-open:annotation=com.anotherPackage.OtherAnnotation</option>
        </pluginOptions>
    </configuration>

    <dependencies>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-maven-allopen</artifactId>
            <version>${kotlin.version}</version>
        </dependency>
    </dependencies>
</plugin>
```

Usage:

```kotlin
package com.example

@AllOpenMarker
class TestClass {
    // This class and all its members are open
}
```

Meta-annotations work:

```kotlin
package com.example

// An annotation marked with a previously created annotation
@AllOpenMarker
annotation class AnotherAllOpenMarker

@AllOpenMarker
class NewClass {
    // This class and all its members are open
}

@AnotherAllOpenMarker
class AnotherClass {
    // This class and all its members are open as well
}
```

## Notes

- If a class or any of its superclasses is annotated with a registered annotation, the class and all its members become `open`.
- Spring: `kotlin-spring` is a preconfigured wrapper that makes classes with Spring annotations `open` (see `kotlin-spring-plugin`). JPA: `kotlin-jpa` makes entities `open` and generates zero-argument constructors (see `kotlin-jpa-plugin`).
- The Gradle Groovy DSL variants (`id "org.jetbrains.kotlin.plugin.allopen" version "..."`) are shown in the official page alongside the Kotlin DSL ones.
- The previous official page documented a "Command-line compiler" section (`-Xplugin=$KOTLIN_HOME/lib/allopen-compiler-plugin.jar`, `-P plugin:org.jetbrains.kotlin.allopen:annotation=...` / `preset=spring`, presets `spring` / `micronaut` / `quarkus`). In the current page source that section is commented out, and the Spring section was moved to the separate `kotlin-spring` page.
- Source: https://kotlinlang.org/docs/all-open-plugin.html (kotlin-web-site 2f28ab9, fetched 2026-11-14)

## Related

- [kotlin-spring-plugin](./kotlin-spring-plugin.md)
- [kotlin-jpa-plugin](./kotlin-jpa-plugin.md)
- [no-arg-plugin](./no-arg-plugin.md)
- [compiler-plugins-overview](./compiler-plugins-overview.md)
