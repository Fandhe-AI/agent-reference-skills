---
source: https://kotlinlang.org/docs/no-arg-plugin.html
---

# No-arg compiler plugin

Generates a zero-argument constructor for classes marked with an annotation you register in the plugin options. The generated constructor is annotated with `@Deprecated` at the `HIDDEN` level, so you can call it from Java but not from Kotlin; frameworks can call it through reflection (for example, JPA instantiating classes that declare no zero-argument constructor).

## Signature / Usage

Declare an annotation to mark the classes (the plugin only processes classes marked with a registered annotation):

```kotlin
package com.example

annotation class NoArgAnnotation
```

Gradle (`build.gradle.kts`):

```kotlin
plugins {
    kotlin("jvm") version "2.4.21"  // The version of Kotlin to use
    kotlin("plugin.noarg") version "2.4.21" // The Kotlin no-arg plugin
}
```

```groovy
noArg {
    annotation("com.example.NoArgAnnotation")
}
```

Run the class initialization logic from the generated constructor (disabled by default):

```groovy
noArg {
    invokeInitializers = true
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
            <plugin>no-arg</plugin>
        </compilerPlugins>

        <pluginOptions>
            <option>no-arg:annotation=com.example.NoArgAnnotation</option>
            <!-- Call instance initializers in the generated constructor -->
            <!-- <option>no-arg:invokeInitializers=true</option> -->
        </pluginOptions>
    </configuration>

    <dependencies>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-maven-noarg</artifactId>
            <version>${kotlin.version}</version>
        </dependency>
    </dependencies>
</plugin>
```

Usage:

```kotlin
package com.example

// The no-arg plugin generates a zero-argument constructor for this class
@NoArgAnnotation
class MyEntity(val id: Int)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `annotation` | String | No-arg annotation that triggers generation of the zero-argument constructor |
| `invokeInitializers` | Boolean (default `false`) | Run the initialization logic from the generated constructor |

## Notes

- JPA: use the `kotlin-jpa` plugin, which configures `no-arg` and `all-open` with JPA annotations such as `@Entity`, `@Embeddable`, `@MappedSuperclass` (see `kotlin-jpa-plugin`).
- The previous official page described the generated constructor as synthetic (not callable directly from Java or Kotlin) and documented a command-line compiler section with `preset=jpa`. The current page describes a `@Deprecated(HIDDEN)` constructor callable from Java but not Kotlin, and the command-line section is commented out in the page source.
- Source: https://kotlinlang.org/docs/no-arg-plugin.html (kotlin-web-site 2f28ab9, fetched 2026-11-14)

## Related

- [kotlin-jpa-plugin](./kotlin-jpa-plugin.md)
- [all-open-plugin](./all-open-plugin.md)
- [compiler-plugins-overview](./compiler-plugins-overview.md)
