---
source: https://kotlinlang.org/docs/gradle-compiler-options.html
---

# Compiler options in the Kotlin Gradle plugin

Configure Kotlin compiler options with the Gradle `compilerOptions {}` DSL at the extension, target, and compilation-unit (task) levels.

## Signature / Usage

```kotlin
kotlin {
    compilerOptions {
        optIn.add("kotlin.RequiresOptIn")
    }
}
```

Levels (higher levels are the default for lower levels; lower levels override higher ones):

- Extension level: `kotlin { compilerOptions { } }`, for all targets and shared source sets (`commonMain`, `nativeMain`, `commonTest`).
- Target level: `kotlin { target { compilerOptions { } } }` for JVM/Android; in Multiplatform, e.g. `jvm { compilerOptions {} }`.
- Compilation unit level: a specific task, e.g. `compileKotlinJvm`, `compileTestKotlinJvm`.

```kotlin
tasks.named<KotlinJvmCompile>("compileKotlin"){
    compilerOptions {
        optIn.add("kotlin.RequiresOptIn")
    }
}
```

Via `KotlinCompilation`:

```kotlin
kotlin {
    target {
        val main by compilations.getting {
            compileTaskProvider.configure {
                compilerOptions {
                    optIn.add("kotlin.RequiresOptIn")
                }
            }
        }
    }
}
```

For plugins of targets other than JVM/Android and Kotlin Multiplatform, use the `compilerOptions {}` property of the compilation task:

```kotlin
tasks.named("compileKotlin", org.jetbrains.kotlin.gradle.tasks.KotlinCompilationTask::class.java) {
    compilerOptions {
        apiVersion.set(org.jetbrains.kotlin.gradle.dsl.KotlinVersion.KOTLIN_2_0)
    }
}
```

To find which level is applied, use Gradle `DEBUG` log level: search `"Kotlin compiler args:"` for JVM and JS/WASM tasks, `"Arguments ="` for Native tasks. Third-party plugin authors should apply configuration at the project level to avoid overriding issues.

### Migrate from kotlinOptions {} to compilerOptions {}

`kotlinOptions {}` is deprecated from Kotlin 2.0.0 (source: "Before Kotlin 2.2.0, you could configure compiler options using the `kotlinOptions {}` block").

- Configure at extension level where possible; override per task at compilation unit level. Raw strings are not allowed in `compilerOptions {}`; use typed values.

```kotlin
import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.dsl.KotlinVersion

plugins {
    kotlin("jvm") version "2.4.21"
}

kotlin {
    // Extension level
    compilerOptions {
        jvmTarget = JvmTarget.fromTarget("17")
        languageVersion = KotlinVersion.fromVersion("2.4")
        apiVersion = KotlinVersion.fromVersion("2.4")
    }
}

// Example of overriding at compilation unit level
tasks.named<KotlinJvmCompile>("compileKotlin"){
    compilerOptions {
        apiVersion = KotlinVersion.fromVersion("2.4")
    }
}
```

- `android.kotlinOptions` becomes `kotlin.compilerOptions` (extension or target level):

```kotlin
kotlin {
    compilerOptions {
        jvmTarget = JvmTarget.fromTarget("17")
    }
}
```

- Multiplatform with an Android target: `kotlinOptions.jvmTarget` in `compilations.all` becomes:

```kotlin
kotlin {
    androidTarget {
        compilerOptions {
            jvmTarget = JvmTarget.fromTarget("17")
        }
    }
}
```

- `freeCompilerArgs`: replace `+=` with `add()` / `addAll()`; use a dedicated DSL for `-opt-in` when available; `-progressive` becomes `progressiveMode.set(true)`; `-Xjvm-default` becomes `jvmDefault.set(...)`.

| Before | After |
| --- | --- |
| `-Xjvm-default=all-compatibility` | `jvmDefault.set(JvmDefaultMode.ENABLE)` |
| `-Xjvm-default=all` | `jvmDefault.set(JvmDefaultMode.NO_COMPATIBILITY)` |
| `-Xjvm-default=disable` | `jvmDefault.set(JvmDefaultMode.DISABLE)` |

```kotlin
kotlin {
    compilerOptions {
        optIn.add("kotlin.RequiresOptIn")
        freeCompilerArgs.addAll(listOf("-Xcontext-receivers", "-Xinline-classes"))
        progressiveMode.set(true)
        jvmDefault.set(JvmDefaultMode.NO_COMPATIBILITY)
    }
}
```

### Task names

- JVM: `compileKotlin` (production), `compileTestKotlin` (tests), `compile<Name>Kotlin` for custom source sets. List Android tasks with `gradlew tasks --all` and look for `compile*Kotlin` in `Other tasks`.
- `kotlin.compilerOptions` configures every Kotlin compilation task in the project; override with `tasks.named<KotlinJvmCompile>("compileKotlin") { }` or `tasks.withType<KotlinJvmCompile>().configureEach { }`.
- JavaScript: `compileKotlinJs`, `compileTestKotlinJs`, `compile<Name>KotlinJs`. Use `Kotlin2JsCompile` and `KotlinCompileCommon` types for JS and common targets. With the Kotlin DSL get the task from `tasks` first:

```kotlin
import org.jetbrains.kotlin.gradle.tasks.KotlinCompilationTask
// ...

val compileKotlin: KotlinCompilationTask<*> by tasks

compileKotlin.compilerOptions.suppressWarnings.set(true)
```

- All compilation tasks:

```kotlin
tasks.named<KotlinCompilationTask<*>>("compileKotlin").configure {
    compilerOptions { /*...*/ }
}
```

## Options / Props

Common attributes:

| Name | Description | Possible values | Default |
| --- | --- | --- | --- |
| `optIn` | List of opt-in compiler arguments | `listOf( /* opt-ins */ )` | `emptyList()` |
| `progressiveMode` | Enables progressive compiler mode | `true`, `false` | `false` |
| `extraWarnings` | Enables additional declaration, expression, and type compiler checks that emit warnings | `true`, `false` | `false` |

Specific to JVM:

| Name | Description | Possible values | Default |
| --- | --- | --- | --- |
| `javaParameters` | Generate metadata for Java 1.8 reflection on method parameters | | false |
| `jvmTarget` | Target version of the generated JVM bytecode | "1.8", "9", "10", ..., "25", 26" (as printed in the source) | "1.8" |
| `noJdk` | Don't automatically include the Java runtime into the classpath | | false |
| `jvmTargetValidationMode` | Validation of JVM target compatibility between Kotlin and Java; property for tasks of `KotlinCompile` type | `WARNING`, `ERROR`, `IGNORE` | `ERROR` |
| `jvmDefault` | How functions declared in interfaces compile to default methods on the JVM | `ENABLE`, `NO_COMPATIBILITY`, `DISABLE` | `ENABLE` |
| `-Xadd-modules` | (Experimental) Resolve the specified root modules in addition to the initial modules; `ALL-MODULE-PATH` resolves all modules on the module path. Passed through `freeCompilerArgs` | Comma-separated module names or `ALL-MODULE-PATH` | |

Common to JVM and JavaScript:

| Name | Description | Possible values | Default |
| --- | --- | --- | --- |
| `allWarningsAsErrors` | Report an error if there are any warnings | | false |
| `suppressWarnings` | Don't generate warnings | | false |
| `verbose` | Verbose logging; works only when Gradle debug log level is enabled | | false |
| `freeCompilerArgs` | Additional compiler arguments, including experimental `-X` ones | | [] |
| `apiVersion` | Which Kotlin APIs your code can use (`-api-version`) | "2.0", "2.1", "2.2", "2.3", "2.4", "2.5" (EXPERIMENTAL) | |
| `languageVersion` | Which language features and syntax are available (`-language-version`) | "2.0", "2.1", "2.2", "2.3", "2.4", "2.5" (EXPERIMENTAL) | |

Specific to JavaScript:

| Name | Description | Possible values | Default |
| --- | --- | --- | --- |
| `friendModulesDisabled` | Disable internal declaration export | | `false` |
| `main` | Whether `main` is called on execution | `JsMainFunctionExecutionMode.CALL`, `JsMainFunctionExecutionMode.NO_CALL` | `JsMainFunctionExecutionMode.CALL` |
| `moduleKind` | Kind of JS module generated | `JsModuleKind.MODULE_AMD`, `MODULE_PLAIN`, `MODULE_ES`, `MODULE_COMMONJS`, `MODULE_UMD` | `null` |
| `sourceMap` | Generate source map | | `false` |
| `sourceMapEmbedSources` | Embed source files into the source map | `JsSourceMapEmbedMode.SOURCE_MAP_SOURCE_CONTENT_INLINING`, `SOURCE_MAP_SOURCE_CONTENT_NEVER`, `SOURCE_MAP_SOURCE_CONTENT_ALWAYS` | `null` |
| `sourceMapNamesPolicy` | Add Kotlin variable and function names into the source map | `JsSourceMapNamesPolicy.SOURCE_MAP_NAMES_POLICY_FQ_NAMES`, `SOURCE_MAP_NAMES_POLICY_SIMPLE_NAMES`, `SOURCE_MAP_NAMES_POLICY_NO` | `null` |
| `sourceMapPrefix` | Add the specified prefix to paths in the source map | | `null` |
| `target` | Generate JS files for a specific ECMA version | `"es5"`, `"es2015"`, `"es2020"` | `"es5"` |
| `useEsClasses` | Let generated JS use ES2015 classes; enabled by default for ES2015 and ES2020 targets | | `null` |

Typed options:

| Option | Type | Example |
| --- | --- | --- |
| `jvmTarget` | `JvmTarget` | `compilerOptions.jvmTarget.set(JvmTarget.JVM_11)` |
| `apiVersion` and `languageVersion` | `KotlinVersion` | `compilerOptions.languageVersion.set(KotlinVersion.KOTLIN_2_4)` |
| `main` | `JsMainFunctionExecutionMode` | `compilerOptions.main.set(JsMainFunctionExecutionMode.NO_CALL)` |
| `moduleKind` | `JsModuleKind` | `compilerOptions.moduleKind.set(JsModuleKind.MODULE_ES)` |
| `sourceMapEmbedSources` | `JsSourceMapEmbedMode` | `compilerOptions.sourceMapEmbedSources.set(JsSourceMapEmbedMode.SOURCE_MAP_SOURCE_CONTENT_INLINING)` |
| `sourceMapNamesPolicy` | `JsSourceMapNamesPolicy` | `compilerOptions.sourceMapNamesPolicy.set(JsSourceMapNamesPolicy.SOURCE_MAP_NAMES_POLICY_FQ_NAMES)` |

### freeCompilerArgs example

```kotlin
kotlin {
    compilerOptions {
        // Specifies the version of the Kotlin API and the JVM target
        apiVersion.set(KotlinVersion.KOTLIN_2_4)
        jvmTarget.set(JvmTarget.JVM_1_8)

        // Single experimental argument
        freeCompilerArgs.add("-Xexport-kdoc")

        // Single additional argument
        freeCompilerArgs.add("-Xno-param-assertions")

        // Resolves an additional root module on the module path
        freeCompilerArgs.add("-Xadd-modules=jdk.incubator.vector")

        // List of arguments
        freeCompilerArgs.addAll(
            listOf(
                "-Xno-receiver-assertions",
                "-Xno-call-assertions"
            )
        )
    }
}
```

`freeCompilerArgs` is available at extension, target, and compilation unit levels. Set a language version:

```kotlin
kotlin {
    compilerOptions {
        languageVersion.set(org.jetbrains.kotlin.gradle.dsl.KotlinVersion.KOTLIN_2_4)
    }
}
```

## Notes

- Warning in the source: `freeCompilerArgs` is going to be deprecated in future releases; file a YouTrack issue if an option is missing in the Gradle DSL.
- `kotlinOptions {}` is deprecated (from Kotlin 2.0.0).
- Distinct from AGP's `android {}` / `kotlinOptions` block and version catalogs, which are covered by the android-build-gradle skill. This page documents the Kotlin Gradle plugin `compilerOptions` DSL only.

## Related

- [Configure a Gradle project](./gradle-configure-project.md)
- [Gradle](./gradle.md)
- [Compilation and caches](./gradle-compilation-and-caches.md)
