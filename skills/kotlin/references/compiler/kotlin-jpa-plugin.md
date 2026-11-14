---
source: https://kotlinlang.org/docs/kotlin-jpa-plugin.html
---

# Kotlin-jpa compiler plugin

Preconfigured wrapper that applies the `no-arg` and `all-open` plugins to JPA-annotated classes, so entities get a zero-argument constructor and become `open` (needed for hydration through reflection and lazy-loading proxies).

## Signature / Usage

Gradle (`build.gradle.kts`):

```kotlin
plugins {
    kotlin("jvm") version "2.4.21"  // The version of Kotlin to use
    kotlin("plugin.jpa") version "2.4.21" // The Kotlin JPA plugin
}
```

Maven (`pom.xml`; support is provided by `kotlin-maven-noarg`):

```xml
<properties>
    <kotlin.version>2.4.21</kotlin.version>
</properties>

<plugin>
    <groupId>org.jetbrains.kotlin</groupId>
    <artifactId>kotlin-maven-plugin</artifactId>
    <version>${kotlin.version}</version>
    <configuration>
        <compilerPlugins>
            <plugin>jpa</plugin>
        </compilerPlugins>
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
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

@Entity
class Message(
    var text: String,
) {
    // The kotlin-jpa plugin makes this class open and generates a
    // zero-argument constructor that JPA uses to instantiate it
    @Id
    @GeneratedValue
    var id: Long? = null
}
```

Cover classes without JPA annotations: declare your own annotation and register it with the underlying `no-arg` and `all-open` plugins.

```kotlin
package com.example

annotation class OpenNoArgAnnotation
```

```kotlin
plugins {
    kotlin("jvm") version "2.4.21"
    kotlin("plugin.jpa") version "2.4.21"
}

noArg {
    annotation("com.example.OpenNoArgAnnotation")
}

allOpen {
    annotation("com.example.OpenNoArgAnnotation")
}
```

Maven:

```xml
<properties>
    <kotlin.version>2.4.21</kotlin.version>
</properties>

<plugin>
    <groupId>org.jetbrains.kotlin</groupId>
    <artifactId>kotlin-maven-plugin</artifactId>
    <version>${kotlin.version}</version>
    <configuration>
        <compilerPlugins>
            <plugin>jpa</plugin>
        </compilerPlugins>

        <pluginOptions>
            <!-- Add multiple lines for multiple annotations -->
            <option>no-arg:annotation=com.example.OpenNoArgAnnotation</option>
            <option>all-open:annotation=com.example.OpenNoArgAnnotation</option>
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

```kotlin
package com.example

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

// Automatically covered by the kotlin-jpa plugin
@Entity
class Message(
    var text: String,
) {
    @Id
    @GeneratedValue
    var id: Long? = null
}

// The custom annotation makes the class open
// and generates a zero-argument constructor
@OpenNoArgAnnotation
class MessageMetadata(
    var author: String,
)
```

## Options / Props

Annotations recognized automatically (both `javax.persistence` and `jakarta.persistence`; no configuration needed for either namespace):

| Annotation | Namespaces |
| --- | --- |
| `Entity` | `javax.persistence`, `jakarta.persistence` |
| `Embeddable` | `javax.persistence`, `jakarta.persistence` |
| `MappedSuperclass` | `javax.persistence`, `jakarta.persistence` |

## Notes

- Why it is needed: JPA instantiates entities through reflection (hydration), which requires a zero-argument constructor; JPA providers create proxy subclasses for lazy loading (for example `@ManyToOne` and `@OneToOne`), which requires non-final classes.
- The generated constructor is annotated with `@Deprecated` at the `HIDDEN` level: callable from Java (and through reflection) but not from Kotlin.
- Since Kotlin 2.3.20, `kotlin-maven-noarg` implicitly includes `kotlin-maven-allopen`, so you no longer need to add the `all-open` dependency explicitly.
- Projects generated with start.spring.io (language=kotlin) with the JPA dependency enable the plugin by default.
- Use the annotations from the namespace that matches your framework version (`jakarta.persistence` since Jakarta EE 9, used by Spring Boot 3.x and later).
- Best practices for JPA entities: use a regular class, not a `data class` (data classes derive `equals()`, `hashCode()`, `toString()` from all properties, which breaks proxies and can trigger extra queries on lazy associations); declare mapped properties as `var`; make generated identifiers nullable and mutable (`var id: Long? = null`, since `lateinit` can't be used on primitive types); base `equals()` and `hashCode()` only on the identifier and type. Details: https://blog.jetbrains.com/idea/2026/01/how-to-avoid-common-pitfalls-with-jpa-and-kotlin/
- The Gradle Groovy DSL variants are shown in the official page alongside the Kotlin DSL ones.
- Source: https://kotlinlang.org/docs/kotlin-jpa-plugin.html (kotlin-web-site 2f28ab9, fetched 2026-11-14)

## Related

- [no-arg-plugin](./no-arg-plugin.md)
- [all-open-plugin](./all-open-plugin.md)
- [kotlin-spring-plugin](./kotlin-spring-plugin.md)
- [compiler-plugins-overview](./compiler-plugins-overview.md)
