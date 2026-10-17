---
source: https://kotlinlang.org/docs/multiplatform/create-kotlin-multiplatform-library.html
---

# Create your Kotlin Multiplatform library

Extend the official multiplatform library template with a `wasmJs` target, publish it to the local Maven repository, and consume it from another project.

Common code `library/src/commonMain/kotlin/CustomFibi.kt`:

```kotlin
package io.github.kotlin.fibonacci

// Defines the function to generate the Fibonacci sequence
fun generateFibi() = sequence {
    var a = firstElement
    yield(a)
    
    var b = secondElement
    yield(b)
    
    while (true) {
        val c = a + b
        yield(c)
        a = b
        b = c
    }
}

// Declares the expected values for `firstElement` and `secondElement`
expect val firstElement: Int
expect val secondElement: Int
```

Android `actual` values (`androidMain/kotlin/fibiprops.android.kt`):

```kotlin
package io.github.kotlin.fibonacci

actual val firstElement: Int = 1
actual val secondElement: Int = 2
```

Add the Kotlin/Wasm target in `library/build.gradle.kts`:

```kotlin
kotlin {
    // ...
    @OptIn(org.jetbrains.kotlin.gradle.ExperimentalWasmDsl::class)
    wasmJs {
        browser()
        binaries.executable()
    }
    // ...
    sourceSets {
        //...
        wasmJsMain.dependencies {
            // Wasm-specific dependencies
        }
    }
}
```

`wasmJsMain/kotlin/fibiprops.wasm.kt`:

```kotlin
package io.github.kotlin.fibonacci

actual val firstElement: Int = 3
actual val secondElement: Int = 5
```

Build and publish locally:

```bash
./gradlew build
```

```kotlin
plugins {
    // ...
    // Add the following line:
    id("maven-publish")
}
```

```kotlin
mavenPublishing {
    // ...
    // Comment out the following call:
    // signAllPublications()
}
```

```bash
./gradlew publishToMavenLocal
```

Consume the library in another project (`settings.gradle.kts`, then a module's `build.gradle.kts`):

```kotlin
dependencyResolutionManagement {
    repositories {
        // ...
        mavenLocal()
    }
}
```

```kotlin
kotlin {
    //...
    sourceSets {
        // For all platforms
        commonMain.dependencies {
                implementation("io.github.kotlin:library:1.0.0")
        }
        // Or for a specific platforms
        wasmJsMain.dependencies {
            implementation("io.github.kotlin:library:1.0.0")
        }
    }
}
```

```kotlin
import io.github.kotlin.fibonacci.generateFibi

val seq = generateFibi()
println(seq.elementAt(3))
```

## Notes

- Template project: `https://github.com/Kotlin/multiplatform-library-template`. The `library` module has `commonMain`, `androidMain`, `iosMain`, `jvmMain`, `linuxX64Main` and matching test source sets; every target supplies `actual` values for the `expect` properties.
- `signAllPublications()` is commented out only because this publication is local; the published artifacts land under `~\.m2\repository\io\github\kotlin\library\1.0.0\`.
- The `implementation()` call takes the group, name, and version declared in the library's `build.gradle.kts`. For Maven Central publishing, see the publish-to-maven reference.
