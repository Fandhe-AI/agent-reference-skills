---
source: https://kotlinlang.org/docs/gradle-compilation-and-caches.html
---

# Compilation and caches in the Kotlin Gradle plugin

Incremental compilation, Gradle build and configuration cache support, Kotlin daemon JVM arguments, rolling back the compiler, trying the next language version, and build reports.

## Signature / Usage

Enable build reports in `gradle.properties`:

```properties
kotlin.build.report.output=file
```

### Incremental compilation

- Enabled by default for Kotlin/JVM and Kotlin/JS. Tracks classpath changes between builds so only affected files are compiled; works with the Gradle build cache and compilation avoidance.
- Kotlin/JVM uses classpath snapshots: fine-grained snapshots (class member details; coarse-grained snapshots are created for `.jar` files in the Gradle cache) and coarse-grained snapshots (class ABI hash only; all dependent classes recompile when ABI changes).
- Kotlin/JS uses a different approach based on history files.
- Disable: `kotlin.incremental=false` (JVM), `kotlin.incremental.js=false` (JS), or `-Pkotlin.incremental=false` / `-Pkotlin.incremental.js=false` on every build. After disabling, incremental caches become invalid and the first build is never incremental.

### Build and configuration cache

- Build cache: disable for all Kotlin tasks with `-Dkotlin.caching.enabled=false`.
- Configuration cache: the Kotlin plugin uses it automatically once you enable it in Gradle.

### Kotlin daemon with Gradle

- Runs with the Gradle daemon; runs separately from it when compiling through the IntelliJ IDEA built-in build system. Starts at Gradle's execution stage when a Kotlin compile task starts, stops with the Gradle daemon or after two idle hours. Uses the same JDK as the Gradle daemon.
- Ways to set JVM arguments (each overrides the ones before it): Gradle daemon arguments inheritance; `kotlin.daemon.jvm.options` system property; `kotlin.daemon.jvmargs` property; `kotlin` extension; specific task definition.

```properties
org.gradle.jvmargs=-Xmx1500m -Xms500m -XX:MaxMetaspaceSize=1g
```

becomes the Kotlin daemon arguments:

```text
-Xmx1500m -XX:ReservedCodeCacheSize=320m -XX:MaxMetaspaceSize=1g -XX:+UseParallelGC -ea -XX:+UseCodeCacheFlushing -XX:+HeapDumpOnOutOfMemoryError -Djava.awt.headless=true -Djava.rmi.server.hostname=127.0.0.1 --add-exports=java.base/sun.nio.ch=ALL-UNNAMED
```

`kotlin.daemon.jvm.options` rules: use `-` only before `Xmx`, `XX:MaxMetaspaceSize`, `XX:ReservedCodeCacheSize`; separate with commas, no spaces (arguments after a space go to the Gradle daemon). Gradle ignores it when JDK 9+ and Gradle 7.0–7.1.1 compile Kotlin DSL scripts with no Kotlin daemon running; upgrade to Gradle 7.2+ or use `kotlin.daemon.jvmargs`.

```properties
org.gradle.jvmargs=-Dkotlin.daemon.jvm.options=-Xmx1500m,Xms500m
kotlin.daemon.jvmargs=-Xmx1500m -Xms500m
```

If `ReservedCodeCacheSize` is not specified, KGP applies `320m`. In the `kotlin` extension:

```kotlin
kotlin {
    kotlinDaemonJvmArgs = listOf("-Xmx486m", "-Xms256m", "-XX:+UseParallelGC")
}
```

Per task:

```kotlin
tasks.withType<CompileUsingKotlinDaemon>().configureEach {
    kotlinDaemonJvmArguments.set(listOf("-Xmx486m", "-Xms256m", "-XX:+UseParallelGC"))
}
```

Behavior with JVM arguments:

- Multiple Kotlin daemons can run at once when subprojects/tasks use different JVM arguments. A new daemon starts only if no existing daemon has the same arguments; an existing daemon with enough heap is reused even if other arguments differ.
- Not specified arguments inherited from the Gradle daemon: `-Xmx`, `-XX:MaxMetaspaceSize`, `-XX:ReservedCodeCacheSize` (default `320m`).
- Defaults: `-XX:+UseParallelGC` (only if no other GC specified), `-ea`, `-XX:+UseCodeCacheFlushing`, `-Djava.awt.headless=true`, `-D{java.servername.property}={localhostip}`, `--add-exports=java.base/sun.nio.ch=ALL-UNNAMED` (JDK 16+ only). The list may vary between versions; check a running process with VisualVM.

### Rolling back to the previous compiler

- K2 is the default from Kotlin 2.0.0. For Kotlin 2.0.0–2.3.21, roll back by setting the language version to `1.9` or using `-language-version 1.9`.
- From Kotlin 2.4.0 onward you can't roll back to the previous compiler.

### Trying the latest language version

From Kotlin 2.0.0, set `kotlin.experimental.tryNext` in `gradle.properties` to raise the language version one above the default (e.g. 2.0 becomes 2.1 in Kotlin 2.0.0):

```bash
./gradlew assemble -Pkotlin.experimental.tryNext=true
```

### Build reports

Build reports show durations of compilation phases and the reasons a compilation was not incremental; the language version used per task and the Kotlin version are shown too (the compiler used is visible in Gradle build scans since Kotlin 1.9.0).

| Option | Description |
| --- | --- |
| `file` | Human-readable local file; default `${project_folder}/build/reports/kotlin-build/${project_name}-timestamp.txt` |
| `single_file` | Object-format report in a specified local file |
| `build_scan` | Saved in the `custom values` section of the build scan; the Gradle Enterprise plugin limits the number and length of custom values |
| `http` | POSTs metrics as JSON over HTTP(S) |
| `json` | JSON local file; default `${project_folder}/build/reports/kotlin-build/${project_name}-build-<date-time>-<index>.json` |

```properties
# Required outputs. Any combination is allowed
kotlin.build.report.output=file,single_file,http,build_scan,json

# Mandatory if single_file output is used. Where to put reports
# Use instead of the deprecated `kotlin.internal.single.build.metrics.file` property
kotlin.build.report.single_file=my/directory/path/some_filename

# Optional. Output directory for file-based or JSON reports. Default: build/reports/kotlin-build/
kotlin.build.report.file.output_dir=kotlin-reports

# Optional. Label for marking your build report (for example, debug parameters)
kotlin.build.report.label=some_label
```

HTTP-only options:

```properties
# Mandatory. Where to post HTTP(S)-based reports
kotlin.build.report.http.url=http://127.0.0.1:8080

# Optional. User and password if the HTTP endpoint requires authentication
kotlin.build.report.http.user=someUser
kotlin.build.report.http.password=somePassword

# Optional. Add a Git branch name of a build to a build report
kotlin.build.report.http.include_git_branch.name=true|false

# Optional. Add compiler arguments to a build report
# If a project contains many modules, its compiler arguments in the report can be very heavy and not that helpful
kotlin.build.report.include_compiler_arguments=true|false
```

Custom values limit: when the log shows `Maximum number of custom values (1,000) exceeded`, reduce with:

```properties
kotlin.build.report.build_scan.custom_values_limit=500
```

HTTP build statistics can contain project and system properties (possibly sensitive, e.g. passwords or full project path). Turn off collection with the `kotlin.build.report.http.verbose_environment` property. JetBrains does not collect these statistics.

## Notes

- Compiler execution strategy and fallback strategy are described on the compiler execution strategy page (compiler category of this skill).
- Kotlin daemon details: see [kotlin-daemon.md](./kotlin-daemon.md).
- The official page (kotlin-web-site 0b10373) writes `-XX:UseParallelGC` without `+`; the JVM rejects a boolean -XX option without +/- ("Missing +/- setting for VM option"), so this page uses `-XX:+UseParallelGC` as in the page own kotlinDaemonJvmArgs examples.

## Related

- [Kotlin daemon](./kotlin-daemon.md)
- [Compiler options in the Kotlin Gradle plugin](./gradle-compiler-options.md)
- [Gradle plugin variants](./gradle-plugin-variants.md)
- [Gradle](./gradle.md)
