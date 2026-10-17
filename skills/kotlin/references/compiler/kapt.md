---
source: https://kotlinlang.org/docs/kapt.html
---

# kapt compiler plugin

kapt lets you use existing Java annotation processors in Kotlin (Maven and Gradle). It generates stub files from Kotlin source code and then runs the Java annotation processors on those stubs (e.g. MapStruct, Data Binding).

## Signature / Usage

Gradle:

```kotlin
plugins {
    kotlin("kapt") version "2.4.21"
}

dependencies {
    kapt("groupId:artifactId:version")
}
```

Maven (automatic configuration with `<extensions>`):

```xml
<plugin>
    <groupId>org.jetbrains.kotlin</groupId>
    <artifactId>kotlin-maven-plugin</artifactId>
    <version>${kotlin.version}</version>
    <extensions>true</extensions>
    <configuration>
        <annotationProcessorPaths>
            <!-- Specify your annotation processors here -->
            <annotationProcessorPath>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct-processor</artifactId>
                <version>1.6.3</version>
            </annotationProcessorPath>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

CLI:

```bash
kapt -Kapt-mode=stubsAndApt \
  -Kapt-sources=build/kapt/sources \
  -Kapt-classes=build/kapt/classes \
  -Kapt-stubs=build/kapt/stubs \
  -Kapt-classpath=lib/ap.jar \
  -Kapt-classpath=lib/anotherAp.jar \
  src/main/kotlin
```

Gradle `kapt {}` options and `gradle.properties` used in practice:

```kotlin
kapt {
    keepJavacAnnotationProcessors = true
    useBuildCache = false
    showProcessorStats = true
}
```

```
kapt.include.compile.classpath=false
kapt.classloaders.cache.size=5
kapt.incremental.apt=false
kapt.verbose=true
```

## Options / Props

Annotation processor configuration:

| Option | Description | Gradle | Maven | CLI |
| --- | --- | --- | --- | --- |
| `aptMode` | `stubsAndApt` (default), `stubs`, `apt` | not directly available (separate tasks) | `<aptMode>stubsAndApt</aptMode>` | `-Kapt-mode=stubsAndApt` |
| `classpath` | Classpath entries where processors are discovered | `kapt("com.example:processor:1.0")` | `<annotationProcessorPaths>` | `-Kapt-classpath=lib/my-processor.jar` |
| `processors` | Fully qualified processor class names, bypassing discovery | `kapt { annotationProcessor("com.example.MyProcessor") }` | `<annotationProcessors>` | `-Kapt-processors=com.example.MyProcessor` |
| `apOption` | Key-value options passed to processors | `kapt { arguments { arg("room.schemaLocation", "$projectDir/schemas") } }` | `<annotationProcessorArgs>` | `-Kapt-options:room.schemaLocation=/schemas` |
| `javacOption` | Key-value options passed to the Java compiler | `kapt { javacOptions { option("-source", "11") } }` | `<javacOptions>` | `-Kapt-javac-option:-source=11` |
| `processIncrementally` | Incremental annotation processing | `kapt.incremental.apt=true` | not supported | not supported |

Output directories:

| Option | Description | Gradle / Maven / CLI |
| --- | --- | --- |
| `sources` | Generated `.java` sources | Gradle `build/generated/source/kapt/main`; Maven `target/generated-sources/kapt/`; CLI `-Kapt-sources=build/kapt/sources` |
| `classes` | `.class` files compiled from generated sources | automatic; CLI `-Kapt-classes=build/kapt/classes` |
| `stubs` | Java stubs generated from Kotlin sources | automatic; CLI `-Kapt-stubs=build/kapt/stubs` |
| `incrementalData` | State for incremental builds | Gradle automatic; Maven / CLI not supported |

Behavioral options (all default `false` unless noted):

| Option | Description | Gradle | CLI |
| --- | --- | --- | --- |
| `correctErrorTypes` | Replace unresolved error types (default `NonExistentClass`) with types from generated sources | `correctErrorTypes = true` | `-Kapt-correct-error-types=true` |
| `dumpDefaultParameterValues` | Default parameter initializers as field values in stubs | `dumpDefaultParameterValues = true` | `-Kapt-dump-default-parameter-values=true` |
| `mapDiagnosticLocations` | Map stub error locations back to Kotlin sources | `mapDiagnosticLocations = true` | `-Kapt-map-diagnostic-locations=true` |
| `strict` | Stub generation incompatibilities become errors | `strictMode = true` | `-Kapt-strict=true` |
| `stripMetadata` | Remove `@kotlin.Metadata` from stubs | `stripMetadata = true` | `-Kapt-strip-metadata=true` |
| `verbose` | Verbose kapt logging | `kapt.verbose=true` | not supported |
| `infoAsWarnings` | Promote info messages to warnings | not directly available | not supported |
| `includeCompileClasspath` | Scan the compile classpath for processors (default `true`) | `includeCompileClasspath = false` | not supported |

Diagnostics and statistics:

| Option | Description | Gradle / CLI |
| --- | --- | --- |
| `showProcessorStats` | Per-processor execution time to stdout | `showProcessorStats = true` / `-Kapt-show-processor-stats=true` |
| `dumpProcessorStats` | Write processor timing stats to a file | CLI `-Kapt-dump-processor-stats=build/kapt-stats.txt` |
| `dumpFileReadHistory` | Write files read by processors to a file | CLI `-Kapt-dump-file-read-history=build/kapt-reads.txt` |
| `detectMemoryLeaks` | `none`, `default`, `paranoid` | `detectMemoryLeaks = "paranoid"` |

## Notes

- Use kapt for Maven projects, or Gradle projects whose Java annotation processor doesn't support KSP yet; use KSP when the processor supports KSP or you create your own processors. In Kotlin docs terms: see `ksp-overview`.
- kapt is not supported in the IntelliJ build system; to re-run annotation processing in IntelliJ IDEA, launch the build from the Maven tool window.
- Replace `annotationProcessor` configuration usages with `kapt`. Test processors use `kaptTest` / `kaptAndroidTest` (both extend `kapt`).
- By default kapt runs all annotation processors and disables javac annotation processing; use `keepJavacAnnotationProcessors = true` for processors such as Lombok.
- Maven: if `includeCompileClasspath` isn't set and a processor is found on the compile classpath, kapt warns `Annotation processors discovery from compile classpath is deprecated`; set `kapt.include.compile.classpath=false`.
- Share processors across subprojects with a superconfiguration: `configurations.named("kapt") { extendsFrom(commonAnnotationProcessors) }`.
- kapt tasks run via the Gradle Worker API (in parallel); with a custom JDK in the Kotlin Gradle plugin, only `processIsolation()` is used. Extra JVM args: `kaptProcessJvmArgs.add("-Xmx512m")` on `KaptWithoutKotlincTask`.
- Incremental annotation processing (Gradle default) requires incremental compilation enabled and all processors incremental; not supported in Maven or CLI.
- To generate Kotlin sources, write them to `processingEnv.options["kapt.kotlin.generated"]`; multiple rounds for generated Kotlin files are not supported.
- This page covers Kotlin-side kapt configuration only. Android-specific KSP / Room / Hilt setup is in android-build-gradle, android-data and android-architecture.

## Related

- [ksp-overview](./ksp-overview.md)
- [ksp-kapt-migration](./ksp-kapt-migration.md)
- [lombok](./lombok.md)
