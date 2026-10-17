---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-configure-compilations.html
---

# Configure compilations

Each Kotlin Multiplatform target has one or more compilations that produce artifacts. Default compilations are `main` and `test` for JVM, JS, and Native targets, and one compilation per Android build variant for Android targets. You can configure all compilations, the compilations of one target, or one specific compilation, and create custom compilations (for example, integration tests).

## Signature / Usage

Configure a compiler option for all compilations:

```kotlin
kotlin {
    compilerOptions {
        allWarningsAsErrors.set(true)
    }
}
```

Configure compilations for one target:

```kotlin
kotlin {
    jvm {
        compilerOptions {
            jvmTarget.set(JvmTarget.JVM_1_8)
        }
    }
}
```

Configure one compilation:

```kotlin
kotlin {
    jvm {
        val main by compilations.getting {
            compileTaskProvider.configure {
                compilerOptions {
                    jvmTarget.set(JvmTarget.JVM_1_8)
                }
            }
        }
    }
}
```

Create a custom compilation (JVM integration tests) with `associateWith`:

```kotlin
kotlin {
    jvm {
        compilations {
            val main by getting
            val integrationTest by creating {
                // Import main and its classpath as dependencies and establish internal visibility
                associateWith(main)
                defaultSourceSet {
                    dependencies {
                        implementation(kotlin("test-junit"))
                        /* ... */
                    }
                }
            }

            // Create a test task to run the tests produced by this compilation:
            testRuns.create("integration") {
                // Configure the test task
                setExecutionSourceFrom(integrationTest)
            }
        }
    }
}
```

Interop with native languages via `cinterops` (per compilation):

```kotlin
kotlin {
    linuxX64 { // Replace with a target you need.
        compilations.getByName("main") {
            val myInterop by cinterops.creating {
                // Def-file describing the native API.
                // The default path is src/nativeInterop/cinterop/<interop-name>.def
                definitionFile.set(project.file("def-file.def"))

                // Package to place the Kotlin API generated.
                packageName("org.sample")

                // Options to be passed to compiler by cinterop tool.
                compilerOpts("-Ipath/to/headers")

                // Directories to look for headers.
                includeDirs.apply {
                    // Directories for header search (an equivalent of the -I<path> compiler option).
                    allHeaders("path1", "path2")

                    // Additional directories to search headers listed in the 'headerFilter' def-file option.
                    // -headerFilterAdditionalSearchPrefix command line option equivalent.
                    headerFilterOnly("path1", "path2")
                }
                // A shortcut for includeDirs.allHeaders.
                includeDirs("include/directory", "another/directory")
            }

            val anotherInterop by cinterops.creating { /* ... */ }
        }
    }
}
```

Manually define the JVM JAR task:

```kotlin
// Shared module's `build.gradle.kts` file
plugins {
    kotlin("multiplatform") version "2.4.21"
}

kotlin {
    // Specify the JVM target
    jvm {
        // Add the task for JAR generation
        tasks.named<Jar>(artifactsTaskName).configure {
            // Configure the task
        }
    }

    sourceSets {
        jvmMain {
            dependencies {
                // Add JVM-specific dependencies
            }
        }
    }
}
```

## Options / Props

Native interop support:

| Native language | Supported platforms | Comments |
| --- | --- | --- |
| C | All platforms | |
| Objective-C | Apple platforms (macOS, iOS, watchOS, tvOS) | |
| Swift via Objective-C | Apple platforms (macOS, iOS, watchOS, tvOS) | Kotlin can use only Swift declarations marked with the `@objc` attribute. |

## Notes

- Custom compilations need all dependencies set up manually. The default source set of a custom compilation does not depend on `commonMain` / `commonTest`. `associateWith` adds the main compilation output as a dependency and establishes `internal` visibility between compilations.
- To create custom compilations for the Android target, set up build variants through the Android Gradle plugin.
- JVM: the plugin automatically creates Java source sets. Common source sets cannot include Java resources. The plugin replaces some Java plugin tasks: the `jar` task becomes a target-specific task (`jvmJar` for `jvm()`, `desktopJar` for `jvm("desktop")`), the `test` task becomes target-specific (for example `jvmTest`), and `*ProcessResources` tasks are replaced by the compilation tasks handling resources.
- Android: for each build variant a Kotlin compilation is created under the same name. For each Android source set a Kotlin source set is created named with the target name prepended (for example `androidDebug` for the Android source set `debug` with a target named `android`). `commonMain` is added to each production variant's compilation; `commonTest` to unit test and instrumented test variants.
- Android `kapt` is supported, but requires that the Android target is created before the `kapt` dependencies are configured, in a top-level `dependencies {}` block rather than inside Kotlin source set dependencies.
- Source set hierarchy: if `jvmMain` depends on `commonMain`, `commonMain` takes part in every `jvmMain` compilation, `jvmMain` sees internal declarations and `implementation` dependencies of `commonMain`, and `commonMain` resources are processed with `jvmMain` resources. Language settings must be consistent: `jvmMain` needs a `languageVersion` greater than or equal to that of `commonMain`, must enable all unstable language features `commonMain` enables, and must use all experimental annotations `commonMain` uses. `apiVersion`, bugfix language features, and `progressiveMode` can be set arbitrarily.
- Isolated Projects (Gradle): Experimental and pre-alpha; use only with Gradle 8.10 or higher and for evaluation purposes only. It may be dropped or changed at any time. Enabled by setting the Gradle system property.
- This page defers the full list of compilation parameters to the Multiplatform Gradle DSL reference (see `dsl-compilations.md`).

## Related

- Compilations DSL
- Source set hierarchy
- [Build final native binaries](./native-binaries.md)
