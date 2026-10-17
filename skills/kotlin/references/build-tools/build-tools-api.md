---
source: https://kotlinlang.org/docs/build-tools-api.html
---

# Build tools API

The Build tools API (BTA) is a single entry point that build systems implement to integrate with the Kotlin compiler (incremental compilation, compiler plugins, daemons, Multiplatform) without deep integration with compiler internals. It supports Kotlin/JVM, Kotlin/JS, and Kotlin/Wasm; Kotlin/Native is not supported.

## Signature / Usage

Use a different compiler version than the one KGP uses (requires opt-in):

```kotlin
import org.jetbrains.kotlin.buildtools.api.ExperimentalBuildToolsApi
import org.jetbrains.kotlin.gradle.ExperimentalKotlinGradlePluginApi

plugins {
    kotlin("jvm") version "2.4.20"
}

group = "org.jetbrains.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

kotlin {
    jvmToolchain(8)
    @OptIn(ExperimentalBuildToolsApi::class, ExperimentalKotlinGradlePluginApi::class)
    compilerVersion.set("2.3.21") // <-- different version than 2.4.20
}
```

## Options / Props

`gradle.properties` entries:

| Name | Description |
| --- | --- |
| `kotlin.js.runViaBuildToolsApi = true` | Run Kotlin/JS compilation through the BTA (opt-in since Kotlin 2.4.20) |
| `kotlin.wasm.runViaBuildToolsApi = true` | Run Kotlin/Wasm compilation through the BTA (opt-in since Kotlin 2.4.20) |
| `kotlin.metadata.runViaBuildToolsApi = true` | Run Kotlin metadata compilation through the BTA (opt-in since Kotlin 2.4.20) |
| `kotlin.compiler.execution.strategy=in-process` | With the BTA, the "in-process" strategy supports incremental compilation |

## Notes

- Stability: Beta for Kotlin/JVM, Alpha for Kotlin/JS and Kotlin/Wasm. Using the BTA requires `@OptIn(ExperimentalBuildToolsApi::class)`. Proposal: KEEP `build-tools-api`; implementation status in YouTrack KT-76255; KGP feedback in KT-56574.
- The Kotlin Gradle plugin uses the BTA by default for Kotlin/JVM compilation.
- Supported compiler versions: the three previous major Kotlin compiler versions plus one major version forward. Example from the source: KGP 2.2.0 supports compiler 1.9.25, 2.0.x, 2.1.x, 2.2.x, 2.3.x.
- Limitation: using different compiler versions together with compiler plugins may lead to Kotlin compiler exceptions; the Kotlin team plans to address this.
- Maven: the BTA enables `kotlin-maven-plugin` to support the Kotlin daemon (the default execution strategy); `kotlin-maven-plugin` uses the BTA by default, nothing to configure. Incremental compilation stabilization (KT-77086) is planned.

## Related

- [Kotlin daemon](./kotlin-daemon.md)
- [Compilation and caches](./gradle-compilation-and-caches.md)
- [Maven](./maven.md)
