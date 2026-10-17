---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-dsl-reference.html#compiler-options
---

# Multiplatform Gradle DSL reference — Compiler options

Compiler options can be configured at three levels: extension level (in the `kotlin {}` block), target level (in a target block), and compilation unit level (usually in a specific compilation task).

## Signature / Usage

Extension level, applies to all compilations of all targets:

```kotlin
kotlin {
    // Configures all compilations of all targets
    compilerOptions {
        allWarningsAsErrors.set(true)
    }
}
```

Target level:

```kotlin
kotlin {
    jvm {
        // Configures all compilations of the JVM target
        compilerOptions {
            allWarningsAsErrors.set(true)
        }
    }
}
```

Compilation unit level (a specific task):

```kotlin
tasks.named<KotlinJvmCompile>("compileKotlinJvm") {
    compilerOptions {
        allWarningsAsErrors.set(true)
    }
}
```

A specific compilation, via its task provider:

```kotlin
kotlin {
    jvm {
        compilations.named(KotlinCompilation.MAIN_COMPILATION_NAME) {
            compileTaskProvider.configure {
                // Configures the 'main' compilation:
                compilerOptions {
                    allWarningsAsErrors.set(true)
                }
            }
        }
    }
}
```

## Options / Props

| Level | Where | Defaults / overrides |
|-------|-------|----------------------|
| Extension | top-level `compilerOptions {}` in `kotlin {}` | Default for target-level options, including shared source sets like `commonMain`, `nativeMain`, and `commonTest` |
| Target | `compilerOptions {}` inside a target block | Default for compilation unit (task) level, like `compileKotlinJvm` and `compileTestKotlinJvm`; overrides extension level |
| Compilation unit | `compilerOptions {}` inside the task | Overrides target and extension level |

## Notes

- The source writes `task.named<...>`; the Gradle API is `tasks.named<...>`.
- Settings at a higher level work as defaults for the level below; configurations made at a lower level override similar settings at higher levels.
- For the list of possible compiler options, see All compiler options on the Kotlin Gradle compiler options page (kotlin skill).
- Migration (Kotlin 2.1 -> 2.2): the `kotlinOptions {}` block is deprecated in Kotlin 2.2.0; use `compilerOptions {}` in build scripts instead. See Migrate from `kotlinOptions{}` to `compilerOptions{}` in the Kotlin docs.
- Groovy forms use property assignment, for example `allWarningsAsErrors = true`.
- The compiler options reference itself belongs to the kotlin skill; this page covers only the multiplatform DSL levels.

## Related

- [Compilations](./dsl-compilations.md)
- [Language settings](./dsl-language-settings.md)
- [Targets](./dsl-targets.md)
