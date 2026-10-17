---
source: https://kotlinlang.org/docs/no-arg-plugin.html
---

# No-arg compiler plugin

Generates an additional zero-argument constructor for classes with a specific annotation. The generated constructor is synthetic: it can't be called directly from Java or Kotlin, but can be called using reflection (lets JPA instantiate such classes).

## Signature / Usage

```kotlin
package com.my

annotation class Annotation
```

```kotlin
plugins {
    kotlin("plugin.noarg") version "2.4.21"
}

noArg {
    annotation("com.my.Annotation")
    // invokeInitializers = true
}
```

Maven:

```xml
<plugin>
    <artifactId>kotlin-maven-plugin</artifactId>
    <groupId>org.jetbrains.kotlin</groupId>
    <version>${kotlin.version}</version>

    <configuration>
        <compilerPlugins>
            <!-- Or "jpa" for JPA support -->
            <plugin>no-arg</plugin>
        </compilerPlugins>

        <pluginOptions>
            <option>no-arg:annotation=com.my.Annotation</option>
            <!-- Call instance initializers in the synthetic constructor -->
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

Command-line compiler:

```bash
-Xplugin="${KOTLIN_HOME}/lib/noarg-compiler-plugin.jar"
-P plugin:org.jetbrains.kotlin.noarg:annotation=com.my.Annotation
-P plugin:org.jetbrains.kotlin.noarg:preset=jpa
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `annotation` | String | No-arg annotation that triggers generation of the synthetic constructor |
| `invokeInitializers` | Boolean (default `false`) | Run the initialization logic from the synthetic constructor |
| `preset` | `jpa` | Command-line preset |

## Notes

- JPA: `kotlin-jpa` is wrapped on top of `no-arg` (as `kotlin-spring` is on `all-open`) and specifies `@Entity`, `@Embeddable`, `@MappedSuperclass` automatically. Gradle: `kotlin("plugin.jpa") version "2.4.21"`; Maven: `<plugin>jpa</plugin>`.

## Related

- [all-open-plugin](./all-open-plugin.md)
- [compiler-plugins-overview](./compiler-plugins-overview.md)
