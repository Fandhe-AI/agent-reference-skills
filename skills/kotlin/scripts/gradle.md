---
source: https://kotlinlang.org/docs/gradle-compilation-and-caches.html
---

# Gradle

Tasks and properties for the Kotlin Gradle plugin (KGP) used from the command line (Kotlin 2.4.21, retrieved 2026-10-16).

## Run a build

```sh
gradle build
```

The Kotlin compiler is invoked by `gradle build` (source: https://kotlinlang.org/docs/gradle-compiler-options.html). For Maven, use `mvn compile` / `mvn test-compile`.

## List compilation tasks

```sh
gradlew tasks --all
```

The command the official page suggests for finding Android / JavaScript compilation task names. Android-side Gradle configuration belongs to the android-build-gradle skill.

## Try the next language version

```sh
./gradlew assemble -Pkotlin.experimental.tryNext=true
```

KGP raises the language version by one above the default (you can also set `kotlin.experimental.tryNext` in `gradle.properties`).

## Disable incremental compilation

```sh
-Pkotlin.incremental=false
```

For Kotlin/JVM. For Kotlin/JS use `-Pkotlin.incremental.js=false`. The command-line parameter must be added to each subsequent build. Disabling invalidates incremental caches, and the first build is always non-incremental.

## Disable the Kotlin build cache

```sh
-Dkotlin.caching.enabled=false
```

Pass it as a system property when running Gradle; it disables caching for all Kotlin tasks.

## Kotlin daemon memory settings (gradle.properties)

```properties
kotlin.daemon.jvmargs=-Xmx1500m -Xms500m
```

If `ReservedCodeCacheSize` is not specified, KGP applies the default `320m`.

```properties
org.gradle.jvmargs=-Dkotlin.daemon.jvm.options=-Xmx1500m,Xms500m
```

When using `kotlin.daemon.jvm.options`, put the minus sign only before `Xmx`, `XX:MaxMetaspaceSize`, and `XX:ReservedCodeCacheSize`, and separate arguments with commas and no spaces.

## Enable build reports (gradle.properties)

```properties
kotlin.build.report.output=file
```

Output destinations: `file`, `single_file`, `build_scan`, `http`, `json`, and combinations of them.

> **Warning**: The `http` output user name and password (`kotlin.build.report.http.user` / `kotlin.build.report.http.password`) are plain-text properties. Do not commit real values to `gradle.properties`; use dummy values when experimenting.

```properties
kotlin.build.report.output=file,single_file,http,build_scan,json
kotlin.build.report.single_file=my/directory/path/some_filename
kotlin.build.report.file.output_dir=kotlin-reports
kotlin.build.report.label=some_label
kotlin.build.report.http.url=http://127.0.0.1:8080
kotlin.build.report.http.user=someUser
kotlin.build.report.http.password=somePassword
```

Full option example from the official page (`kotlin.build.report.single_file` is required when using `single_file` output).

## Control the standard library dependency (gradle.properties)

```properties
kotlin.stdlib.default.dependency=false
kotlin.stdlib.jdk.variants.version.alignment=false
kotlin.test.infer.jvm.variant=false
```

These values disable, respectively, the default dependency on the standard library, JDK variant version alignment, and kotlin-test JVM variant inference. Source: https://kotlinlang.org/docs/gradle-configure-project.html

## Validate binary compatibility

```sh
./gradlew checkKotlinAbi
```

Compares ABI dumps and reports differences as errors. In a project with binary compatibility validation enabled, running the `check` task also runs `checkKotlinAbi`. Source: https://kotlinlang.org/docs/gradle-binary-compatibility-validation.html

## Update the reference ABI dump

> **Warning**: This overwrites the reference ABI dump. Run it only after confirming that binary compatibility is preserved. To experiment, use a disposable branch or clone.

```sh
./gradlew updateKotlinAbi
```
