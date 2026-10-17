---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-dsl-reference.html#targets
---

# Multiplatform Gradle DSL reference — Targets

A target is a part of the build responsible for compiling, testing, and packaging a piece of software aimed at one of the supported platforms. Targets are declared in blocks inside `kotlin {}`, for example `jvm`, `android`, `iosArm64`. Each target can have one or more compilations.

## Signature / Usage

```kotlin
kotlin {
    jvm()
    iosArm64()
    macosArm64()
    js().browser()
}
```

## Options / Props

Available targets:

| Target platform | Target | Comments |
|-----------------|--------|----------|
| Kotlin/JVM | `jvm` | |
| Kotlin/Wasm | `wasmJs` | Use it if you plan to run your projects in the JavaScript runtime. |
| Kotlin/Wasm | `wasmWasi` | Use it if you need support for the WASI system interface. |
| Kotlin/JS | `js` | Select the execution environment: `browser {}` for applications running in the browser, `nodejs {}` for applications running on Node.js. |
| Kotlin/Native | (see Kotlin/Native target support) | Currently supported targets for the macOS, Linux, and Windows hosts are listed in Kotlin/Native target support. |
| Android applications and libraries | `android` | Manually apply an Android Gradle plugin: `com.android.application` or `com.android.kotlin.multiplatform.library`. You can only create one Android target per Gradle subproject. |

Common target configuration (available in any target block):

| Name | Description |
|------|-------------|
| `platformType` | The Kotlin platform for this target. Available values: `jvm`, `androidJvm`, `js`, `wasm`, `native`, `common`. |
| `artifactsTaskName` | The name of the task that builds the resulting artifacts of this target. |
| `components` | Components used to set up Gradle publications. |
| `compilerOptions` | Compiler options used for the target. Overrides any `compilerOptions {}` configured at top level. |

Web targets (`js {}` and `wasmJs {}`) contain one of:

| Name | Description |
|------|-------------|
| `browser` | Configuration of the browser target. |
| `nodejs` | Configuration of the Node.js target. |

`browser {}` blocks:

| Name | Description |
|------|-------------|
| `testRuns` | Configuration of test execution. |
| `runTask` | Configuration of project running. |
| `webpackTask` | Configuration of project bundling with Webpack. |
| `distribution` | Path to output files. |

`nodejs {}` blocks: `testRuns` (configuration of test execution) and `runTask` (configuration of project running).

```kotlin
kotlin {
    js().browser {
        webpackTask { /* ... */ }
        testRuns { /* ... */ }
        distribution {
            directory = File("$projectDir/customdir/")
        }
    }
}
```

`wasmWasi {}` supports the `nodejs` and `wasmtime` execution environments. All web targets (`js`, `wasmJs`, `wasmWasi`) support `binaries.executable()`, which explicitly instructs the Kotlin compiler to emit executable files.

```kotlin
kotlin {
    wasmWasi {
        nodejs()
        wasmtime()
        binaries.executable()
    }
}
```

Native targets have these specific blocks:

| Name | Description |
|------|-------------|
| `binaries` | Configuration of binaries to produce. |
| `cinterops` | Configuration of interop with C libraries. |

Binary kinds:

| Name | Description |
|------|-------------|
| `executable` | Product executable. |
| `test` | Test executable. |
| `sharedLib` | Shared library. |
| `staticLib` | Static library. |
| `framework` | Objective-C framework. |

```kotlin
kotlin {
    linuxX64 { // Use your target instead.
        binaries {
            executable {
                // Binary configuration.
            }
        }
    }
}
```

Binary configuration parameters:

| Name | Description |
|------|-------------|
| `compilation` | The compilation from which the binary is built. By default, `test` binaries are based on the `test` compilation while other binaries on the `main` compilation. |
| `linkerOpts` | Options passed to a system linker during binary building. |
| `baseName` | Custom base name for the output file. The final file name is formed by adding a system-dependent prefix and postfix. |
| `entryPoint` | The entry point function for executable binaries. By default, it's `main()` in the root package. |
| `outputFile` | Access to the output file. |
| `linkTask` | Access to the link task. |
| `runTask` | Access to the run task for executable binaries. For targets other than `linuxX64`, `macosArm64`, or `mingwX64` the value is `null`. |
| `isStatic` | For Objective-C frameworks. Includes a static library instead of a dynamic one. |
| `disableNativeCache` | Disables compilation cache. Use only in exceptional cases as it increases compilation time. Must include the Kotlin `version` for which cache is disabled, and `reason`. Optionally, a URL to the `issue` in your bug tracker. |

```kotlin
binaries {
    executable("my_executable", listOf(RELEASE)) {
        // Build a binary on the basis of the test compilation.
        compilation = compilations["test"]

        // Custom command line options for the linker.
        linkerOpts = mutableListOf("-L/lib/search/path", "-L/another/search/path", "-lmylib")

        // Base name for the output file.
        baseName = "foo"

        // Custom entry point function.
        entryPoint = "org.example.main"

        // Accessing the output file.
        println("Executable path: ${outputFile.absolutePath}")

        // Accessing the link task.
        linkTask.dependsOn(additionalPreprocessingTask)

        // Accessing the run task.
        // Note that the runTask is null for non-host platforms.
        runTask?.dependsOn(prepareForRun)
    }

    framework("my_framework" listOf(RELEASE)) {
        // Include a static library instead of a dynamic one into the framework.
        isStatic = true

        // Disable compilation cache for this binary
        disableNativeCache(
            version = DisableCacheInKotlinVersion.2_3_0,
            reason = "Cache bug",
            issue = URI("https://youtrack.com/YY-1111")
        )
    }
}
```

`cinterops` parameters:

| Name | Description |
|------|-------------|
| `definitionFile` | The `.def` file describing the native API. |
| `packageName` | Package prefix for the generated Kotlin API. |
| `compilerOpts` | Options to pass to the compiler by the cinterop tool. |
| `includeDirs` | Directories to look for headers. |
| `header` | Header to be included in the bindings. |
| `headers` | The list of headers to be included in the bindings. |

```kotlin
kotlin {
    linuxX64 { // Replace with a target you need.
        compilations.getByName("main") {
            val myInterop by cinterops.creating {
                // Definition file describing the native API.
                // The default path is src/nativeInterop/cinterop/<interop-name>.def
                definitionFile.set(project.file("def-file.def"))

                // Package to place the Kotlin API generated.
                packageName("org.sample")

                // Options to be passed to compiler by cinterop tool.
                compilerOpts("-Ipath/to/headers")

                // Directories for header search (an analogue of the -I<path> compiler option).
                includeDirs.allHeaders("path1", "path2")

                // A shortcut for includeDirs.allHeaders.
                includeDirs("include/directory", "another/directory")

                // Header files to be included in the bindings.
                header("path/to/header.h")
                headers("path/to/header1.h", "path/to/header2.h")
            }

            val anotherInterop by cinterops.creating { /* ... */ }
        }
    }
}
```

Android target: `publishLibraryVariants()` specifies build variants to publish.

```kotlin
kotlin {
    android {
        publishLibraryVariants("release")
    }
}
```

## Notes

- A target that is not supported by the current host is ignored during building and, therefore, not published.
- The `android` configuration inside the `kotlin {}` block doesn't replace the build configuration of any Android project; Android Gradle Plugin build scripts belong to android-build-gradle.
- Kotlin/Native target details, `wasmWasi`, and Kotlin/JS execution environments are documented on the Kotlin site and belong to the kotlin skill.
- Groovy variants of the binaries and cinterops examples exist in the original page (`compilations.test`, `compilations.main { cinterops { myInterop { ... } } }`); the Kotlin DSL form is shown here. The `framework(...)` example is reproduced verbatim from the source, including its missing comma after the name.
- Migration (Kotlin 1.9 -> 2.2): the target presets API (`presets`, `KotlinTargetPreset`, `fromPreset`) was deprecated from 1.9.20 and removed in 2.2.0; the Apple target shortcuts `ios()`, `watchos()` and `tvos()` were warned about in 1.9.20, errored in 2.1.0 and removed in 2.2.0. Declare the individual targets (for example `iosArm64()`) instead. See the compatibility category for details.

## Related

- [Overview](./dsl-overview.md)
- [Compilations](./dsl-compilations.md)
- [Source sets](./dsl-source-sets.md)
