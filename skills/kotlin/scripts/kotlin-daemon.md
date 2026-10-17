---
source: https://kotlinlang.org/docs/kotlin-daemon.html
---

# Kotlin Daemon

Memory and lifetime settings for the Kotlin daemon (Gradle / Maven, Kotlin 2.4.21). The daemon has no direct user-facing interface; use it through a build system or the Build tools API.

## Set the memory limit (Gradle)

```properties
kotlin.daemon.jvmargs=-Xmx1500m
```

Write it in `gradle.properties`.

## Set the memory limit (Maven)

```xml
<kotlin.compiler.daemon.jvmArgs>-Xmx1500m</kotlin.compiler.daemon.jvmArgs>
```

Write it as a property in `pom.xml`.

## Attached daemon (Gradle)

```properties
org.gradle.jvmargs=-Dkotlin.daemon.jvm.options=autoshutdownIdleSeconds=7200,shutdownDelayMilliseconds=1000
```

Add it to `gradle.properties`. For long-running clients: increase `autoshutdownIdleSeconds` and decrease `shutdownDelayMilliseconds`.

## Attached daemon (Maven)

```sh
mvn package -Dkotlin.daemon.options=autoshutdownIdleSeconds=7200,shutdownDelayMilliseconds=1000
```

## Detached daemon (Gradle)

```properties
org.gradle.jvmargs=-Dkotlin.daemon.jvm.options=shutdownDelayMilliseconds=7200
```

Add it to `gradle.properties`. For short-lived clients: increase `shutdownDelayMilliseconds`.

## Detached daemon (Maven)

```xml
<kotlin.compiler.daemon.shutdownDelayMs>7200</kotlin.compiler.daemon.shutdownDelayMs>
```

Add it to `pom.xml`.

## Disable the Kotlin daemon in Maven

```xml
<properties>
    <kotlin.compiler.daemon>false</kotlin.compiler.daemon>
</properties>
```

For details on execution strategies, see https://kotlinlang.org/docs/compiler-execution-strategy.html (source: https://kotlinlang.org/docs/maven-kotlin-compiler.html).
