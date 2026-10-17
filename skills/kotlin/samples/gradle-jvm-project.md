---
source: https://kotlinlang.org/docs/get-started-with-jvm-gradle-project.html
---

# Gradle JVM Project Build Script

Minimal `build.gradle.kts` for a Kotlin/JVM console application with `kotlin.test`.

```kotlin
plugins {
    kotlin("jvm") version "2.4.21" // Kotlin version to use
}

group = "org.example" // A company name, for example, `org.jetbrains.kotlin`
version = "1.0-SNAPSHOT" // Version to assign to the build artifact

repositories { // Sources of dependencies.
    mavenCentral() // Maven Central Repository.
}

dependencies { // All the libraries you want to use.
    // Copy dependencies' names after you find them in a repository
    testImplementation(kotlin("test")) // The Kotlin test library
}

kotlin { // Generated JVM toolchain configuration.
    jvmToolchain(25) // The JDK for compiling the project.
}

tasks.test { // Test task configuration.
    useJUnitPlatform() // JUnitPlatform for tests.
}
```

Application entry point with the `application` plugin (from the console app tutorial):

```kotlin
plugins {
    kotlin("jvm") version "2.4.21"
    application
}

application {
    mainClass.set("MainKt")
}
```

```kotlin
fun main() {
    println("What's your name?")
    val name = readln()
    println("Hello, $name!")
}
```

## Notes

- `kotlin("jvm")` sets the Kotlin version for the project; `jvmToolchain(...)` should match the JDK you use.
- The entry point file is `src/main/kotlin/Main.kt`. The `application` plugin requires `mainClass` to be set explicitly (`MainKt` for `Main.kt`); the official tutorial relies on the IDE run configuration and omits it.
- AGP `android {}` blocks, `kotlinOptions`, and Android version catalogs belong to android-build-gradle; this sample is the plain Kotlin/JVM plugin.
