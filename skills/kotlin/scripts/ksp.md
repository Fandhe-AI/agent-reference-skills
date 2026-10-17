---
source: https://kotlinlang.org/docs/ksp-command-line.html
---

# KSP

Commands and related options for running Kotlin Symbol Processing (KSP 2.3.10) from the command line. KSP is normally used through the Gradle plugin; the CLI is for other build-system integrations, processor development, testing, and debugging.

## Basic invocation

```sh
java -cp <classpath> <mainclass> <options> <processor>
```

`<classpath>` is the KSP runtime JARs and dependencies, `<mainclass>` is the platform-specific entry point, and `<processor>` is the path to the processor JAR.

## Specify the entry point (JVM / Android)

```sh
java -cp <classpath> com.google.devtools.ksp.cmdline.KSPJvmMain <options> <processor>
```

Entry points: `KSPJvmMain` (Kotlin/JVM and Android), `KSPJsMain` (Kotlin/JS), `KSPNativeMain` (Kotlin/Native), `KSPCommonMain` (common compilation for Multiplatform). Specify the fully qualified name.

## JVM target example

```sh
java -cp \
symbol-processing-aa-2.3.10.jar:symbol-processing-common-deps-2.3.10.jar:symbol-processing-api-2.3.10.jar:kotlin-stdlib-2.3.20.jar:kotlinx-coroutines-core-jvm-1.10.2.jar \
com.google.devtools.ksp.cmdline.KSPJvmMain \
-language-version=2.0 \
-api-version=2.0 \
-jvm-target=11 \
-module-name=main \
-source-roots=project_dir/src/kotlin/main \
-project-base-dir=project_dir/ \
-output-base-dir=project_dir/build/ \
-caches-dir=project_dir/build/caches/ \
-class-output-dir=project_dir/build/out/main/classes \
-kotlin-output-dir=project_dir/build/out/main/kotlin/ \
-java-output-dir=project_dir/build/out/main/java/ \
-resource-output-dir=project_dir/build/out/main/res/ \
path/to/processor.jar
```

The example is verbatim from the official page. The dependency list on the same page names kotlin-stdlib-2.4.21.jar and kotlinx-coroutines-core-jvm-1.11.0.jar, but the example still uses the file names kotlin-stdlib-2.3.20.jar and kotlinx-coroutines-core-jvm-1.10.2.jar (an inconsistency within the official page). In practice, use the versions the page lists. Get `artifacts.zip` from https://github.com/google/ksp/releases/tag/2.3.10.

## Show available options

```sh
java -cp <classpath> <mainclass> -h
```

## Set the log level

```sh
java -Dksp.logging=debug -cp <classpath> <mainclass> <options> <processor>
```

`-Dksp.logging` is a JVM system property. Values: `error`, `warn` (`warning`), `info`, `debug`; the default is `warn`. Passing the system property on the `java` command line is a form assembled from the official page's wording ("`-Dksp.logging` JVM system property").

## Check KSP Gradle dependency configuration names (Multiplatform)

```sh
./gradlew :<your-module-name>:dependencies | grep ksp
```

KSP configuration names are derived from the Kotlin Multiplatform source sets. Source: https://kotlinlang.org/docs/ksp-multiplatform.html

## Graph output of the incremental processing log (CLI)

```sh
-incremental-log=true -incremental-log-graph-origin=<fully-qualified-name>
```

Option fragment to add when using KSP from the CLI. DOT files are generated in the `logs` directory. The official page writes `-incremental-log.graph.origin`, but the KSP 2.3.10 CLI parser (`incrementalLogGraphOrigin` to `camelToOptionName` in KSPConfig.kt) accepts only `-incremental-log-graph-origin`. An argument that matches nothing is treated as a processor classpath entry and does not cause an error. In Gradle, use `ksp.incremental.log=true` and `ksp.incremental.log.graph.origin=<fully-qualified-name>`. Source: https://kotlinlang.org/docs/ksp-incremental.html
