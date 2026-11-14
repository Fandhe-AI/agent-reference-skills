---
source: https://kotlinlang.org/docs/kotlin-spring-plugin.html
---

# Kotlin-spring compiler plugin

Preconfigured wrapper around the `all-open` plugin that automatically makes Spring-annotated classes and their members `open` at compile time.

## Signature / Usage

Gradle (`build.gradle.kts`):

```kotlin
plugins {
    kotlin("jvm") version "2.3.21"  // The version of Kotlin to use
    kotlin("plugin.spring") version "2.3.21" // The Kotlin Spring plugin
}
```

Maven (`pom.xml`):

```xml
<properties>
    <kotlin.version>2.3.21</kotlin.version>
</properties>

<plugin>
    <groupId>org.jetbrains.kotlin</groupId>
    <artifactId>kotlin-maven-plugin</artifactId>
    <version>${kotlin.version}</version>
    <configuration>
        <args>
            <arg>-Xjsr305=strict</arg>
        </args>
        <compilerPlugins>
            <plugin>spring</plugin>
        </compilerPlugins>
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
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/")
class MessageController {
    // This class and all its members are open
    @GetMapping
    fun listMessages() = listOf(
        Message("1", "Hello!"),
        Message("2", "Bonjour!"),
        Message("3", "Privet!"),
    )
}
```

## Options / Props

Annotations the plugin makes `open`:

| Annotation | Notes |
| --- | --- |
| `@Component` | Direct |
| `@Async` | Direct |
| `@Transactional` | Direct |
| `@Cacheable` | Direct |
| `@SpringBootTest` | Direct |
| `@Configuration`, `@Controller`, `@RestController`, `@Service`, `@Repository` | Through meta-annotation: Spring meta-annotates these with `@Component` |

## Notes

- `kotlin-spring` behaves the same way as `all-open`; you can use both in the same project.
- Projects generated with start.spring.io (language=kotlin) enable the plugin by default.
- Maven: support is provided by the `kotlin-maven-allopen` plugin dependency.
- The Kotlin version in the official examples is the `springBootSupportedKotlinVersion` macro, rendered here as 2.3.21 (docs `v.list`), not the latest Kotlin version 2.4.21.
- The Gradle Groovy DSL variant (`id "org.jetbrains.kotlin.plugin.spring" version "..."`) is shown in the official page alongside the Kotlin DSL.
- Source: https://kotlinlang.org/docs/kotlin-spring-plugin.html (kotlin-web-site 2f28ab9, fetched 2026-11-14)

## Related

- [all-open-plugin](./all-open-plugin.md)
- [kotlin-jpa-plugin](./kotlin-jpa-plugin.md)
- [compiler-plugins-overview](./compiler-plugins-overview.md)
