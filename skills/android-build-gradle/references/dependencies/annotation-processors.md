# Annotation Processors

How to add and configure annotation processors as project dependencies in an Android Gradle build.

## Signature / Usage

```kotlin
dependencies {
    // Dagger's runtime library is needed at runtime.
    implementation("com.google.dagger:dagger:version-number")
    // Adds the annotation processor dependency to the annotation processor classpath.
    annotationProcessor("com.google.dagger:dagger-compiler:version-number")
}
```

Pass primitive key-value arguments to a processor:

```kotlin
android {
    defaultConfig {
        javaCompileOptions {
            annotationProcessorOptions {
                arguments += mapOf("key1" to "value1",
                                   "key2" to "value2")
            }
        }
    }
}
```

Pass file or directory arguments (AGP 3.2.0+) with `CommandLineArgumentProvider`:

```kotlin
class MyArgsProvider(
    @get:InputFiles
    @get:PathSensitive(PathSensitivity.RELATIVE)
    val inputDir: FileCollection,

    @get:OutputDirectory
    val outputDir: File
) : CommandLineArgumentProvider {
    override fun asArguments(): Iterable<String> {
        // Use the form '-Akey[=value]' to pass your options to the Java compiler.
        return listOf("-AinputDir=${inputDir.singleFile.absolutePath}",
                      "-AoutputDir=${outputDir.absolutePath}")
    }
}

android {
    defaultConfig {
        javaCompileOptions {
            annotationProcessorOptions {
                compilerArgumentProvider(MyArgsProvider(files("input/path"),
                                                          file("output/path")))
            }
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `annotationProcessor` | configuration | Adds a processor to the annotation processor classpath. |
| `compileOnly` | configuration | Adds annotation-defining libraries to the compile classpath only. |
| `annotationProcessorOptions.arguments` / `argument` | map / method | Passes primitive key-value arguments to the processor. |
| `annotationProcessorOptions.compilerArgumentProvider` | `CommandLineArgumentProvider` | Passes file/directory arguments with incremental-build property type annotations (AGP 3.2.0+). |
| `includeCompileClasspath` | boolean (argument; `kapt { includeCompileClasspath }` for kapt) | Set to `false` to disable the processor-on-compile-classpath error check. |

## Notes

- Having annotation processors on the compile classpath produces `Error: Annotation processors must be explicitly declared now.`; fix by declaring them with `annotationProcessor`.
- Android Gradle plugin 3.0.0+ no longer supports the `android-apt` plugin.
- Processor authors typically supply the `CommandLineArgumentProvider` class (or instructions), since each argument needs the correct build property type annotation. It improves correctness and performance of incremental and cached clean builds.
- Disabling the error check (`includeCompileClasspath` = false) does not add compile-classpath processors to the processor classpath.
- Setting `includeCompileClasspath` to `true` is not recommended, and the option will be removed in a future update of the Android plugin.
- The official page's example uses `compileOnly("com.google.dagger:dagger:...")`, but Dagger's generated code references `dagger.internal.*` runtime classes, so `implementation` is used in practice. Reserve `compileOnly` for annotation-only libraries not needed at runtime (e.g. javax.annotation / JSR-305).
- The source page also provides Groovy equivalents of every snippet.
- Source: https://developer.android.com/build/annotation-processors (local copy fetched 2026-10).

## Related

- [ksp-vs-kapt.md](./ksp-vs-kapt.md)
- [dependency-configurations.md](./dependency-configurations.md)
