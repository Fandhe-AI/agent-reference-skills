---
source: https://kotlinlang.org/docs/kotlin-daemon.html
---

# Kotlin daemon

The Kotlin daemon is a background process that keeps the compiler and its environment ready, avoiding a new JVM start and compiler reinitialization per compilation. It also isolates the build system process from the compiler. It has no direct user-facing interface; use it through build systems or the build tools API.

## Signature / Usage

Memory (by default the daemon tries to inherit the launching JVM's `-Xmx`):

```properties
kotlin.daemon.jvmargs=-Xmx1500m
```

Maven:

```xml
<kotlin.compiler.daemon.jvmArgs>-Xmx1500m</kotlin.compiler.daemon.jvmArgs>
```

## Options / Props

Lifetime options:

| Option | Description | Default |
| --- | --- | --- |
| `autoshutdownIdleSeconds` | How long the daemon stays alive after the last compilation while a client is still connected | 2 hours |
| `autoshutdownUnusedSeconds` | How long a newly started daemon waits for a first client before shutting down | 1 minute |
| `shutdownDelayMilliseconds` | How long the daemon waits to shut down after all clients disconnect | 1 second |

- Attached daemon (long-running client): shut down shortly after the client or when unused. Set `autoshutdownIdleSeconds` high and `shutdownDelayMilliseconds` low.
- Detached daemon (short-lived client): stay alive longer for follow-up requests. Set `shutdownDelayMilliseconds` high.

Gradle (`gradle.properties`):

```properties
org.gradle.jvmargs=-Dkotlin.daemon.jvm.options=autoshutdownIdleSeconds=7200,shutdownDelayMilliseconds=1000
```

Detached, Gradle:

```properties
org.gradle.jvmargs=-Dkotlin.daemon.jvm.options=shutdownDelayMilliseconds=7200
```

Maven attached:

```bash
mvn package -Dkotlin.daemon.options=autoshutdownIdleSeconds=7200,shutdownDelayMilliseconds=1000
```

Maven detached (`pom.xml`):

```xml
<kotlin.compiler.daemon.shutdownDelayMs>7200</kotlin.compiler.daemon.shutdownDelayMs>
```

## Notes

- Gradle and Maven have their own daemons (Gradle daemon, Maven daemon); the Kotlin daemon reduces startup costs and fully isolates the build system process from the compiler, useful where system settings may change at runtime.
- Gradle JVM-argument behavior details: see [gradle-compilation-and-caches.md](./gradle-compilation-and-caches.md).

## Related

- [Compilation and caches](./gradle-compilation-and-caches.md)
- [Build tools API](./build-tools-api.md)
- [Configure Kotlin compiler for Maven](./maven-kotlin-compiler.md)
