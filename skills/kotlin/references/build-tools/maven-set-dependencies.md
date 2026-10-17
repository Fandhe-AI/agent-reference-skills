---
source: https://kotlinlang.org/docs/maven-set-dependencies.html
---

# Set repositories and dependencies in a Maven project

Configure extra repositories beyond Maven Central and declare Kotlin standard library, test, and kotlinx dependencies, optionally managed by the Kotlin BOM.

## Signature / Usage

Declare a custom repository:

```xml
<repositories>
    <repository>
        <id>spring-repo</id>
        <url>https://repo.spring.io/release</url>
    </repository>
</repositories>
```

Add a dependency:

```xml
<dependencies>
    <dependency>
        <groupId>org.jetbrains.kotlinx</groupId>
        <artifactId>kotlinx-serialization-json</artifactId>
        <version>1.11.0</version>
    </dependency>
</dependencies>
```

### Standard library

Add it manually or let the `<extensions>` option add `kotlin-stdlib` automatically if missing (an already declared `kotlin-stdlib` is not overwritten).

```xml
<dependencies>
    <dependency>
        <groupId>org.jetbrains.kotlin</groupId>
        <artifactId>kotlin-stdlib</artifactId>
        <!-- Uses kotlin.version specified in <properties/>: -->
        <version>${kotlin.version}</version>
    </dependency>
</dependencies>
```

Opt out of the automatic addition (this also disables registration of source root paths; other `<extensions>` features are unaffected):

```xml
<project>
    <properties>
        <kotlin.smart.defaults.enabled>false</kotlin.smart.defaults.enabled>
    </properties>
</project>
```

Older targets: for JDK 7 or 8 with Kotlin older than 1.8 use `kotlin-stdlib-jdk7` / `kotlin-stdlib-jdk8`; older than 1.2 use `kotlin-stdlib-jre7` / `kotlin-stdlib-jre8`.

### Test libraries and reflection

```xml
<dependencies>
    <dependency>
        <groupId>org.jetbrains.kotlin</groupId>
        <artifactId>kotlin-reflect</artifactId>
        <version>${kotlin.version}</version>
    </dependency>
    <dependency>
        <groupId>org.jetbrains.kotlin</groupId>
        <artifactId>kotlin-test-junit5</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### kotlinx libraries

Use the base artifact name or the name with a `-jvm` suffix (check the library README on klibs.io):

```xml
<dependencies>
    <dependency>
        <groupId>org.jetbrains.kotlinx</groupId>
        <artifactId>kotlinx-coroutines-core</artifactId>
        <version>1.11.0</version>
    </dependency>
</dependencies>
```

```xml
<dependencies>
    <dependency>
        <groupId>org.jetbrains.kotlinx</groupId>
        <artifactId>kotlinx-datetime-jvm</artifactId>
        <version>0.8.0</version>
    </dependency>
</dependencies>
```

### Manage dependencies with a BOM

`kotlin-bom` specifies the versions of Kotlin libraries (`kotlin-stdlib`, `kotlin-reflect`, `kotlin-test`) for one Kotlin release, so transitive Kotlin artifacts resolve to the same version.

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-bom</artifactId>
            <version>2.4.21</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

- After importing, declare Kotlin dependencies without `<version>`.
- Importing a BOM adds no dependencies by itself; it only controls versions of declared and transitive dependencies.
- An explicit `<version>` overrides the BOM version.

## Notes

- `mavenLocal()` in a Gradle project can cause problems when switching between Gradle and Maven; see [gradle-configure-project.md](./gradle-configure-project.md) (Declare repositories).

## Related

- [Maven](./maven.md)
- [Configure a Maven project](./maven-configure-project.md)
- [Configure Kotlin compiler for Maven](./maven-kotlin-compiler.md)
