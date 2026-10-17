---
source: https://kotlinlang.org/docs/jvm-test-using-junit.html
---

# Test Java Code with Kotlin and JUnit (Gradle)

Configure Gradle for JUnit and `kotlin.test`, then write a Kotlin JUnit 5 test class.

```kotlin
// build.gradle.kts
plugins {
    application
    kotlin("jvm") version "2.4.21"
}

kotlin {
    jvmToolchain(17)
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
    testImplementation(libs.org.junit.jupiter.junit.jupiter.api)
    testImplementation(libs.org.junit.jupiter.junit.jupiter.params)
    testRuntimeOnly(libs.org.junit.jupiter.junit.jupiter.engine)
    testRuntimeOnly(libs.org.junit.platform.junit.platform.launcher)
}

tasks.test {
    useJUnitPlatform()
}
```

```toml
# gradle/libs.versions.toml
[versions]
kotlin = "2.4.21"
junit = "6.0.3"

[libraries]
org-junit-jupiter-junit-jupiter-api = { module = "org.junit.jupiter:junit-jupiter-api", version.ref = "junit" }
org-junit-jupiter-junit-jupiter-params = { module = "org.junit.jupiter:junit-jupiter-params", version.ref = "junit" }
org-junit-jupiter-junit-jupiter-engine = { module = "org.junit.jupiter:junit-jupiter-engine", version.ref = "junit" }
org-junit-platform-junit-platform-launcher = { module = "org.junit.platform:junit-platform-launcher" }

[plugins]
kotlinJvm = { id = "org.jetbrains.kotlin.jvm", version.ref = "kotlin" }
```

```kotlin
package org.jetbrains.kotlin.junit

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.DisplayName

internal class TodoRepositoryTest {
    lateinit var repository: TodoRepository
    lateinit var testItem1: TodoItem
    lateinit var testItem2: TodoItem

    @BeforeEach
    fun setUp() {
        repository = TodoRepository()
        testItem1 = TodoItem("Task 1", "Description 1")
        testItem2 = TodoItem("Task 2", "Description 2")
    }

    @Test
    @DisplayName("Should return defensive copy of items")
    fun shouldReturnDefensiveCopy() {
        repository.add(testItem1)

        val items1 = repository.all
        val items2 = repository.all

        Assertions.assertNotSame(items1, items2)
        Assertions.assertThrows(
            UnsupportedOperationException::class.java
        ) { items1.clear() }
        Assertions.assertEquals(1, repository.size())
    }
}
```

```bash
./gradlew test
```

## Notes

- `TodoRepository` and `TodoItem` are the Java classes of the official `kotlin-junit-sample` project, not defined here.
- `lateinit` avoids nullable test fields; Java getters such as `getAll()` are accessed as properties (`repository.all`); use `::class.java` to get a Java class object.
- Jupiter `Assertions` is imported as a class and used as a qualifier, unlike Java static imports.
- The source states Kotlin/JVM supports the latest stable JUnit version, JUnit 6.
