---
source: https://kotlinlang.org/docs/maven.html
---

# Maven

Maven manages Kotlin-only or mixed Kotlin-Java JVM projects: downloads dependencies, compiles, and packages your code. This page is the entry point to the Kotlin Maven chapter.

## Signature / Usage

Workflow for a Kotlin Maven project:

1. Configure your Java or Kotlin project ([maven-configure-project.md](./maven-configure-project.md)).
2. Declare repositories ([maven-set-dependencies.md](./maven-set-dependencies.md)).
3. Set project dependencies ([maven-set-dependencies.md](./maven-set-dependencies.md)).
4. Configure the Kotlin compiler ([maven-kotlin-compiler.md](./maven-kotlin-compiler.md)).
5. Package your application ([maven-compile-package.md](./maven-compile-package.md)).

```xml
<plugin>
    <groupId>org.jetbrains.kotlin</groupId>
    <artifactId>kotlin-maven-plugin</artifactId>
    <version>${kotlin.version}</version>
    <extensions>true</extensions>
</plugin>
```

## Notes

- A public sample project with both Maven and Gradle build files for a mixed Kotlin/Java project: kotlin-hands-on/kotlin-junit-sample (`complete` directory).
- Next steps named in the source: power-assert plugin for Maven; `kover-maven-plugin` for coverage; kapt plugin in Maven; Dokka Maven (supports mixed-language projects and Javadoc output); `kotlin-osgi-bundle` for OSGi; FAQ for Kotlin backend development.

## Related

- [Configure a Maven project](./maven-configure-project.md)
- [Set repositories and dependencies](./maven-set-dependencies.md)
- [Configure Kotlin compiler for Maven](./maven-kotlin-compiler.md)
- [Package your Maven application](./maven-compile-package.md)
