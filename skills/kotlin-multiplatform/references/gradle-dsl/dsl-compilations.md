---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-dsl-reference.html#compilations
---

# Multiplatform Gradle DSL reference — Compilations

A target can have one or more compilations, for example for production or testing. Predefined compilations are added automatically upon target creation; custom compilations can be created additionally. Use the `compilations` object collection to refer to all or some compilations of a target by name.

## Signature / Usage

```kotlin
kotlin {
    jvm {
        val main by compilations.getting {
            output // get the main compilation output
        }

        compilations["test"].runtimeDependencyFiles // get the test runtime classpath
    }
}
```

Custom compilation: set up an `associateWith` relation between the new and the `main` compilation; mark custom compilations `by creating` in the Kotlin Gradle DSL.

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

            // Create a test task to run the tests produced by this compilation
            testRuns.create("integration") {
                // Configure the test task
                setExecutionSourceFrom(integrationTest)
            }
        }
    }
}
```

Configuring a compilation:

```kotlin
kotlin {
    jvm {
        val main by compilations.getting {
            compileTaskProvider.configure {
                compilerOptions {
                    // Set up the Kotlin compiler options for the 'main' compilation:
                    jvmTarget.set(JvmTarget.JVM_1_8)
                }
            }

            compileKotlinTask // get the Kotlin task 'compileKotlinJvm'
            output // get the main compilation output
        }

        compilations["test"].runtimeDependencyFiles // get the test runtime classpath
    }

    // Configure all compilations of all targets:
    compilerOptions {
        allWarningsAsErrors.set(true)
    }
}
```

## Options / Props

Predefined compilations (created for each target except Android targets):

| Name | Description |
|------|-------------|
| `main` | Compilation for production sources. |
| `test` | Compilation for tests. |

Compilation parameters:

| Name | Description |
|------|-------------|
| `defaultSourceSet` | The compilation's default source set. |
| `kotlinSourceSets` | Source sets participating in the compilation. |
| `allKotlinSourceSets` | Source sets participating in the compilation and their connections via `dependsOn()`. |
| `compilerOptions` | Compiler options applied to the compilation. |
| `compileKotlinTask` | Gradle task for compiling Kotlin sources. |
| `compileKotlinTaskName` | Name of `compileKotlinTask`. |
| `compileAllTaskName` | Name of the Gradle task for compiling all sources of a compilation. |
| `output` | The compilation output. |
| `compileDependencyFiles` | Compile-time dependency files (classpath) of the compilation. For all Kotlin/Native compilations, this automatically includes standard library and platform dependencies. |
| `runtimeDependencyFiles` | Runtime dependency files (classpath) of the compilation. |

## Notes

- By associating compilations, you add the main compilation output as a dependency and establish `internal` visibility between compilations.
- The DSL reference page nests `testRuns.create` inside the `integrationTest` initializer; it is moved after the declaration here, as in the Configure compilations page.
- Groovy forms exist in the original page (for example `compilations.main.output`, `compilations.create('integrationTest') { ... }`).
- The list of available compiler options is on the Kotlin Gradle compiler options page (kotlin skill).

## Related

- [Targets](./dsl-targets.md)
- [Compiler options](./dsl-compiler-options.md)
- [Configure compilations](../build-test-publish/configure-compilations.md)
