# Gradle Build Overview

Concepts behind Android builds with Gradle: tasks and plugins, the three build phases, the configuration DSL, external dependencies, and build variants.

## Signature / Usage

```kotlin
android {
    namespace = "com.example.app"
    compileSdk {
        version = release(36) {
            minorApiLevel = 1
        }
    }
    // ...

    defaultConfig {
        applicationId = "com.example.app"
        minSdk {
            version = release(23)
        }
        targetSdk {
            version = release(36)
        }
        // ...
    }
}
```

Behind the scenes, the DSL code is similar to:

```kotlin
fun Project.android(configure: ApplicationExtension.() -> Unit) {
    ...
}

interface ApplicationExtension {
    var namespace: String?

    fun compileSdk(configure: CompileSdkSpec.() -> Unit) {
        ...
    }

    val defaultConfig: DefaultConfig

    fun defaultConfig(configure: DefaultConfig.() -> Unit) {
        ...
    }
}
```

Each block in the DSL is a function that takes a lambda to configure it, plus a property with the same name to access it.

## Notes

- **Build**: a build system transforms source code into an executable application. Gradle organizes commands as tasks. Tasks translate inputs into outputs; plugins define tasks and their configuration. Applying the Android Gradle Plugin (AGP) registers all tasks needed to build an APK or an Android library. The `java-library` plugin builds a jar from Java source. Some plugins extend other plugins (e.g. the `protobuf` plugin adds protobuf support to AGP or `java-library`).
- **Convention over configuration**: plugins ship good defaults; the declarative DSL specifies what to build, while plugin logic manages how.
- **Task inputs/outputs**: inputs can be files, directories, or other information encoded as Java types (integer, strings, custom classes). Outputs can only be directories or files. Wiring one task's output into another's input makes the first run before the second.
- **Keep build logic in plugins**: arbitrary code and task declarations in build files make it harder for tooling to understand the build and for you to maintain it (plugin code can be tested, build-file code cannot). Restrict build logic and task declarations to plugins and declare usage in build files.
- **Three build phases**:
  - Initialization: determines which projects and subprojects are included, and sets up classpaths containing build files and applied plugins. Focuses on the settings file.
  - Configuration: registers tasks for each project and executes the build file. Configuration code has no access to data or files produced during execution.
  - Execution: the output of configuration is a Directed Acyclic Graph (DAG) of tasks. Out-of-date tasks run in graph order; a task whose inputs are unchanged since its last execution is skipped.
- **DSL languages**: build files can be written in Kotlin or Groovy; Kotlin is strongly recommended.
- **External dependencies**: Maven artifacts are identified by group, artifact name, and version, written `group:artifact:version`, and stored in repositories (public or company-internal). You can also modularize into subprojects (called "modules" in Android Studio), which produce outputs (such as jars) consumable by other subprojects; this can improve build time by isolating rebuilds.
- **Build variants**: composed of build types and product flavors. AGP sets up `release` and `debug` build types by default. A debug build does not minify or obfuscate, marks the app "debuggable", and signs it with a generic debug key. A release build is intended to be optimized and signed with your release key; this requires enabling optimization (`isMinifyEnabled = true`, optionally `isShrinkResources = true`) and assigning a release `signingConfig`, neither of which is on by default. The source page describes this as release build behavior. Product flavors (e.g. `demo` / `full`, `free` / `paid`) vary source and dependencies; common source lives in the `main` source set, overridden or extended by a flavor-named source set.
- **Variant naming**: with no flavors, variants are named after the build types; with both, the variant is named `<flavor><Buildtype>`. With build types `release`/`debug` and flavors `demo`/`full`: `demoRelease`, `demoDebug`, `fullRelease`, `fullDebug`.
- Source: `developer.android.com/build/gradle-build-overview` (local copy fetched 2026-10).

## Related

- [Android Build Structure](./android-build-structure.md)
- [Build from the Command Line](./building-cmdline.md)
- [settings.gradle.kts](../build-config/settings-gradle.md)
- [build types](../build-config/build-types.md)
- [product flavors](../build-config/product-flavors.md)
