---
source: https://kotlinlang.org/docs/gradle-configure-project.html
---

# Configure a Gradle project

Add the Kotlin Gradle plugin (KGP) to `build.gradle(.kts)`, then configure dependencies, repositories, JVM toolchains, and targets.

## Signature / Usage

```kotlin
plugins {
    // Replace `<...>` with the plugin name appropriate for your target environment
    kotlin("<...>") version "2.4.21"
    // For example, if your target environment is JVM:
    // kotlin("jvm") version "2.4.21"
}
```

Groovy:

```groovy
plugins {
    id 'org.jetbrains.kotlin.<...>' version '2.4.21'
}
```

The `version` must be a literal in this block; it cannot be applied from another build script. KGP and Kotlin share the same version numbering.

## Compatibility (fully supported ranges)

| KGP version | Gradle min and max | AGP min and max |
| --- | --- | --- |
| 2.4.20–2.4.21 | 7.6.3–9.7.0 | 8.5.2–9.3.1 |
| 2.4.0–2.4.10 | 7.6.3–9.5.0 | 8.5.2–9.1.0 |
| 2.3.20–2.3.21 | 7.6.3–9.3.0 | 8.2.2–9.0.0 |
| 2.3.10 | 7.6.3–9.0.0 | 8.2.2–9.0.0 |
| 2.3.0 | 7.6.3–9.0.0 | 8.2.2–8.13.0 |
| 2.2.20–2.2.21 | 7.6.3–8.14 | 7.3.1–8.11.1 |
| 2.2.0–2.2.10 | 7.6.3–8.14 | 7.3.1–8.10.0 |
| 2.1.20–2.1.21 | 7.6.3–8.12.1 | 7.3.1–8.7.2 |
| 2.1.0–2.1.10 | 7.6.3–8.10* | 7.3.1–8.7.2 |
| 2.0.20–2.0.21 | 6.8.3–8.8* | 7.1.3–8.5 |
| 2.0.0 | 6.8.3–8.5 | 7.1.3–8.3.1 |
| 1.9.20–1.9.25 | 6.8.3–8.1.1 | 4.2.2–8.1.0 |

Earlier KGP versions:

| KGP version | Gradle min and max | AGP min and max |
| --- | --- | --- |
| 1.9.0–1.9.10 | 6.8.3–7.6.0 | 4.2.2–7.4.0 |
| 1.8.20–1.8.22 | 6.8.3–7.6.0 | 4.1.3–7.4.0 |
| 1.8.0–1.8.11 | 6.8.3–7.3.3 | 4.1.3–7.2.1 |
| 1.7.20–1.7.22 | 6.7.1–7.1.1 | 3.6.4–7.0.4 |
| 1.7.0–1.7.10 | 6.7.1–7.0.2 | 3.4.3–7.0.2 |
| 1.6.20–1.6.21 | 6.1.1–7.0.2 | 3.4.3–7.0.2 |

## Options / Props

`gradle.properties` entries described on this page:

| Name | Description |
| --- | --- |
| `kotlin.project.persistent.dir` | Location of project-level data. Default: `<project-root-directory>/.kotlin` |
| `kotlin.project.persistent.dir.gradle.disableWrite` | Disables writing Kotlin data to the `.gradle` directory (backward compatibility with older IDEA versions). Default: false |
| `kotlin.jvm.target.validation.mode` | `error` (default on Gradle 8.0+), `warning` (default below Gradle 8.0), or `ignore` |
| `kotlin.build.archivesTaskOutputAsFriendModule` | Default `true`; set `false` to avoid a circular task dependency caused by an artifact used as compilation input |
| `kotlin.stdlib.default.dependency` | Set `false` to skip the automatic stdlib dependency |
| `kotlin.stdlib.jdk.variants.version.alignment` | Set `false` to disable alignment of transitive `kotlin-stdlib-jdk7` / `kotlin-stdlib-jdk8` |
| `kotlin.test.infer.jvm.variant` | Set `false` to disable automatic JVM variant resolution of `kotlin("test")` |

## Targeting the JVM

```kotlin
plugins {
    kotlin("jvm") version "2.4.21"
}
```

Default layout: `src/main/kotlin` and `src/main/java`. Do not store `.java` files in `src/*/kotlin` (they are not compiled). For a non-default layout:

```kotlin
sourceSets.main {
    java.srcDirs("src/main/myJava", "src/main/myKotlin")
}
```

### JVM target compatibility check

For related tasks (`compileKotlin` / `compileJava`, `compileTestKotlin` / `compileTestJava`; `main` and `test` are not related) KGP compares `jvmTarget` with the Java `targetCompatibility`. Task-level configuration:

```kotlin
tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinJvmCompile>().configureEach {
    jvmTargetValidationMode.set(org.jetbrains.kotlin.gradle.dsl.jvm.JvmTargetValidationMode.WARNING)
}
```

With no explicit `jvmTarget`, the default is `null` and the compiler translates it to `1.8`, while `targetCompatibility` equals the Gradle JDK version. With JDK 17 the published artifact then declares `org.gradle.jvm.version=17`, which is wrong; configure a toolchain to solve this.

### Gradle Java toolchains

```kotlin
kotlin {
    jvmToolchain {
        languageVersion.set(JavaLanguageVersion.of(<MAJOR_JDK_VERSION>))
    }
    // Or shorter:
    jvmToolchain(<MAJOR_JDK_VERSION>)
    // For example:
    jvmToolchain(17)
}
```

- A toolchain sets `-jdk-home`, sets `compilerOptions.jvmTarget` to the toolchain JDK version when not set explicitly, sets the toolchain for Java compile/test/javadoc tasks, and affects which JDK kapt workers run on.
- Setting it via the `kotlin` extension also updates Java compile tasks; setting it via the `java { toolchain { ... } }` extension also works.
- Only Kotlin/JVM tasks use toolchains; JS and Native do not. The Kotlin compiler always runs on the JDK of the Gradle daemon.
- With Gradle 8.0.2+ add a toolchain resolver plugin in `settings.gradle(.kts)`:

```kotlin
plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version("1.0.0")
}
```

- To see the toolchain in use, run with `--info` and find `[KOTLIN] Kotlin compilation 'jdkHome' argument:`.
- Android: toolchain support needs AGP 8.1.0-alpha09 or higher; with lower versions set `compileOptions { sourceCompatibility / targetCompatibility }` manually.

### Task DSL JDK

For tasks implementing `UsesKotlinJavaToolchain` (currently `KotlinCompile` and `KaptTask`):

```kotlin
val service = project.extensions.getByType<JavaToolchainService>()
val customLauncher = service.launcherFor {
    languageVersion.set(JavaLanguageVersion.of(<MAJOR_JDK_VERSION>))
}
project.tasks.withType<UsesKotlinJavaToolchain>().configureEach {
    kotlinJavaToolchain.toolchain.use(customLauncher)
}
```

Or a local JDK:

```kotlin
tasks.withType<UsesKotlinJavaToolchain>().configureEach {
    kotlinJavaToolchain.jdk.use(
        "/path/to/local/jdk", // Put a path to your JDK
        JavaVersion.<LOCAL_JDK_VERSION> // For example, JavaVersion.17
    )
}
```

### Associate compiler tasks

Associating compilations makes one compilation use the compiled outputs of the other and establishes `internal` visibility between them. `test` and `main` of each target are associated by default.

```kotlin
val integrationTestCompilation = kotlin.target.compilations.create("integrationTest") {
    associateWith(kotlin.target.compilations.getByName("main"))
}
```

### Java Modules (JPMS)

```kotlin
tasks.named("compileJava", JavaCompile::class.java) {
    // Provide compiled Kotlin classes to javac – needed for Java/Kotlin mixed sources to work
    val mainOutput: FileCollection = sourceSets["main"].output
    options.compilerArgumentProviders.add(CommandLineArgumentProvider {
        listOf("--patch-module", "YOUR_MODULE_NAME=${mainOutput.asPath}")
    })
}
```

Put `module-info.java` in `src/main/java`; the package name in Kotlin files must equal the one in `module-info.java`, otherwise the build fails with "package is empty or does not exist".

### Other details

- Since Kotlin 1.8.20 the plugin registers all tasks and does not configure them on a dry run (lazy task creation).
- If you override `destinationDirectory` of `KotlinJvmCompile` / `KotlinCompile`, add `sourceSets.main.kotlin.classesDirectories` to the JAR:

```groovy
tasks.jar(type: Jar) {
    from sourceSets.main.output
    from sourceSets.main.kotlin.classesDirectories
}
```

## Targeting multiple platforms, Android, and the web

Multiplatform projects use the `kotlin-multiplatform` plugin (Gradle 7.6.3 or later):

```kotlin
plugins {
    kotlin("multiplatform") version "2.4.21"
}
```

- Android: Android Studio and the Android Gradle plugin are recommended.
- JavaScript (Kotlin/JS): `kotlin { js().browser { /* ... */ } }` or `js().nodejs`.
- WebAssembly: `wasmJs { browser { } }` (or `nodejs`), and `wasmWasi { nodejs { } }` (or `wasmtime`).
- KGP only handles Kotlin files for the web target; keep Java files separate or declare `kotlin.srcDir("src/main/myKotlin")` in `sourceSets`.

## Triggering configuration actions

```kotlin
import org.jetbrains.kotlin.gradle.plugin.KotlinBasePlugin

// ...

project.plugins.withType<KotlinBasePlugin>() {
    // Configure your action here
}
```

## Configure dependencies

```kotlin
kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation("com.example:my-library:1.0")
        }
    }
}
```

Top-level `dependencies {}` in multiplatform projects (acts like `commonMain` / `commonTest`; requires opt-in; feedback: KT-76446):

```kotlin
kotlin {
    @OptIn(ExperimentalKotlinGradlePluginApi::class)
    dependencies {
        implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
    }
}
```

| Type | Description | When to use |
| --- | --- | --- |
| `api` | Used at compile time and runtime and exported to library consumers | A type from the dependency is used in the module's public API |
| `implementation` | Used at compile time and runtime for the current module, not exposed to modules depending on it | Internal logic; use instead of `api` for unpublished endpoint applications |
| `compileOnly` | Used for compilation of the current module only; not available at runtime or to other modules | APIs with a third-party implementation available at runtime |
| `runtimeOnly` | Available at runtime but not visible during compilation of any module | — |

### Standard library

- `stdlib` is added automatically to each source set at the same version as KGP; the JVM variant is chosen from `compilerOptions.jvmTarget`. An explicitly declared stdlib dependency is not overridden.
- Disable with `kotlin.stdlib.default.dependency=false` in `gradle.properties`.
- From stdlib 1.9.20 Gradle aligns transitive `kotlin-stdlib-jdk7` / `kotlin-stdlib-jdk8` through metadata. For 1.8.0–1.9.10 KGP uses that version for them; disable with `kotlin.stdlib.jdk.variants.version.alignment=false`.
- Other ways to align versions: the Kotlin BOM, `constraints { ... require("2.4.21") }`, updating an old KGP, or excluding transitive `kotlin-stdlib`:

```kotlin
implementation(platform("org.jetbrains.kotlin:kotlin-bom:2.4.21"))
```

### Test libraries

```kotlin
kotlin {
    sourceSets {
        commonTest.dependencies {
            implementation(kotlin("test")) // This brings all the platform dependencies automatically
        }
    }
}
```

- `kotlin("test")` is shorthand for `org.jetbrains.kotlin:kotlin-test`. Kotlin/Native needs no additional test dependencies.
- On the JVM, Gradle uses JUnit 4 by default (`kotlin-test-junit`). Choose JUnit 5 or TestNG with `useJUnitPlatform()` / `useTestNG()` in the test task:

```kotlin
dependencies {
    testImplementation(kotlin("test"))
}

tasks {
    test {
        useTestNG()
    }
}
```

- If automatic JVM variant resolution causes problems, set `kotlin.test.infer.jvm.variant=false`.

### kotlinx libraries

Use the base artifact name once in the shared source set:

```kotlin
kotlin {
    sourceSets {
        commonMain.dependencies {
            implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
        }
    }
}
```

## Declare repositories

```kotlin
repositories {
    mavenCentral()
}
```

- Avoid `mavenLocal()` if you also work with Maven projects; if needed, add it as the last repository.
- Declare repositories centrally in `settings.gradle(.kts)`; repositories declared in subprojects override central ones:

```kotlin
dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}
```

## Register generated sources

Use the `KotlinSourceSet` `generatedKotlin` property (`SourceDirectorySet`) so IDEs and tools can tell generated code from regular sources; `allKotlinSources` exposes everything registered in `KotlinSourceSet.kotlin` and `generatedKotlin`.

```kotlin
val generatorTask = project.tasks.register("generator") {
    val outputDirectory = project.layout.projectDirectory.dir("src/main/kotlinGen")
    outputs.dir(outputDirectory)
    doLast {
        outputDirectory.file("generated.kt").asFile.writeText(
            // language=kotlin
            """
            fun printHello() {
                println("hello")
            }
            """.trimIndent()
        )
    }
}

kotlin.sourceSets.getByName("main").generatedKotlin.srcDir(generatorTask)
```

## Notes

- Do not commit the `.kotlin` directory; add it to `.gitignore`.
- The official page (kotlin-web-site 0b10373, gradle-configure-project.md L596) shows the JAR example with a `kotlin` label although it is Groovy DSL, and writes `sourceSets.main.outputs`; here it is shown as Groovy and corrected to `sourceSets.main.output` (Gradle `SourceSet#getOutput`).
- Distinct from the Android Gradle plugin `android {}` block, `kotlinOptions`, and version catalogs, which are covered by the android-build-gradle skill. This page covers the Kotlin Gradle plugin only.
- Kotlin 2.0.20–2.0.21 and 2.1.0–2.1.10 are fully compatible with Gradle up to 8.6 (rows marked `*`); Gradle 8.7–8.10 are supported except that Multiplatform projects calling `withJava()` in the JVM target may see deprecation warnings.
- Newer Gradle/AGP versions than the listed maximum can be used but may cause deprecation warnings or non-working new features.
- Kotlin/JS, Wasm, and Native target details are out of scope of this skill.

## Related

- [Gradle](./gradle.md)
- [Compiler options in the Kotlin Gradle plugin](./gradle-compiler-options.md)
- [Compilation and caches](./gradle-compilation-and-caches.md)
- [Gradle plugin variants](./gradle-plugin-variants.md)
