---
source: https://kotlinlang.org/docs/compiler-execution-strategy.html
---

# Compiler execution strategy

The execution strategy defines where the Kotlin compiler runs. Build tools such as Gradle or Maven configure it.

## Signature / Usage

`gradle.properties`:

```
kotlin.compiler.execution.strategy=in-process
```

Per task (takes priority over the Gradle property):

```kotlin
import org.jetbrains.kotlin.gradle.tasks.CompileUsingKotlinDaemon
import org.jetbrains.kotlin.gradle.tasks.KotlinCompilerExecutionStrategy

// ...

tasks.withType<CompileUsingKotlinDaemon>().configureEach {
    compilerExecutionStrategy.set(KotlinCompilerExecutionStrategy.IN_PROCESS)
}
```

Maven (`pom.xml`):

```xml
<properties>
    <kotlin.compiler.daemon>false</kotlin.compiler.daemon>
</properties>
```

## Options / Props

| Name | Values | Description |
| --- | --- | --- |
| `kotlin.compiler.execution.strategy` (Gradle property) | `daemon` (default), `in-process` | Compiler execution strategy |
| `compilerExecutionStrategy` (task property) | `DAEMON` (default), `IN_PROCESS` | Overrides the Gradle property |
| `kotlin.daemon.useFallbackStrategy` (Gradle property) | `true` (default), `false` | When `false`, builds fail on daemon startup / communication problems |
| `useDaemonFallbackStrategy` (compile task property) | Boolean | Takes priority over `kotlin.daemon.useFallbackStrategy` |
| `kotlin.compiler.daemon` (Maven) | `false` | Switches Maven to the in-process strategy |

## Notes

- Kotlin daemon: runs in its own process; the default and fastest strategy in Gradle and Maven; can be shared between build processes and parallel compilations.
- In process: runs inside the build tool's process; simplest for memory management but less isolated (shares state such as JVM system properties).
- If communication with the daemon fails, the compiler falls back to in-process and Gradle prints `Failed to compile with Kotlin daemon: ... Using fallback strategy: Compile without Kotlin daemon` (try `./gradlew --stop`). A silent fallback can consume many resources or make builds non-deterministic.
- Gradle (not Android Gradle Plugin) settings only; AGP settings are covered by android-build-gradle.

## Related

- [compiler-reference](./compiler-reference.md)
