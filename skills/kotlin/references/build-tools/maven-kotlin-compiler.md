---
source: https://kotlinlang.org/docs/maven-kotlin-compiler.html
---

# Configure Kotlin compiler for your Maven project

`kotlin-maven-plugin` lets you specify compiler options, choose an execution strategy, and enable incremental compilation.

## Signature / Usage

Options go in the plugin's `<configuration>`:

```xml
<plugin>
    <groupId>org.jetbrains.kotlin</groupId>
    <artifactId>kotlin-maven-plugin</artifactId>
    <version>${kotlin.version}</version>
    <extensions>true</extensions> <!-- If you want to enable automatic addition of executions to your build -->
    <executions>...</executions>
    <configuration>
        <nowarn>true</nowarn> <!-- Disable warnings -->
        <args>
            <arg>-Xjsr305=strict</arg> <!-- Enable strict mode for JSR-305 annotations -->
            ...
        </args>
    </configuration>
</plugin>
```

Many options can be set as properties:

```xml
<project>
    <properties>
        <kotlin.compiler.languageVersion>2.4</kotlin.compiler.languageVersion>
    </properties>
</project>
```

### Execution strategy

Maven uses the Kotlin daemon strategy by default. Switch to "in process":

```xml
<properties>
    <kotlin.compiler.daemon>false</kotlin.compiler.daemon>
</properties>
```

### Incremental compilation

```xml
<properties>
    <kotlin.compiler.incremental>true</kotlin.compiler.incremental>
</properties>
```

Or run the build with `-Dkotlin.compiler.incremental=true`.

### Explore goals and parameters

```bash
mvn help:describe \
  -Dplugin=org.jetbrains.kotlin:kotlin-maven-plugin \
  -Ddetail=true
```

Add `-Dgoal=compile` to describe a specific goal.

## Options / Props

Attributes specific to JVM:

| Name | Property name | Description | Possible values | Default |
| --- | --- | --- | --- | --- |
| `nowarn` | | Generate no warnings | true, false | false |
| `languageVersion` | `kotlin.compiler.languageVersion` | Source compatibility with the specified Kotlin version | "2.0", "2.1", "2.2", "2.3", "2.4", "2.5" (EXPERIMENTAL) | |
| `apiVersion` | `kotlin.compiler.apiVersion` | Use declarations only from the specified version of bundled libraries | "2.0", "2.1", "2.2", "2.3", "2.4", "2.5" (EXPERIMENTAL) | |
| `sourceDirs` | | Directories containing the source files to compile | | The project source roots |
| `compilerPlugins` | | Enabled compiler plugins | | [] |
| `pluginOptions` | | Options for compiler plugins | | [] |
| `args` | | Additional compiler arguments | | [] |
| `jvmTarget` | `kotlin.compiler.jvmTarget` | Target JVM version of the bytecode; controls only the bytecode version, doesn't restrict JDK APIs | "1.8", "9", "10", ..., "26" | "1.8" |
| `jdkRelease` | `kotlin.compiler.jdkRelease` | Target JVM version; controls bytecode version and limits the API to the specified JDK (equivalent to Java's `--release`) | "1.8", "9", "10", ..., "26" | |
| `jdkHome` | `kotlin.compiler.jdkHome` | Include a custom JDK from the specified location instead of default `JAVA_HOME` | | |
| `jdkToolchain` | `kotlin.compiler.jdkToolchain` | JDK version from the toolchain; only affects Kotlin compilation | | |
| `-Xadd-modules` | | (Experimental) Resolve the specified root modules in addition to the initial modules; `ALL-MODULE-PATH` resolves all modules on the module path. Passed via `<arg>` | Comma-separated module names or `ALL-MODULE-PATH` | |

## Related

- [Maven](./maven.md)
- [Configure a Maven project](./maven-configure-project.md)
- [Package your Maven application](./maven-compile-package.md)
- [Kotlin daemon](./kotlin-daemon.md)
