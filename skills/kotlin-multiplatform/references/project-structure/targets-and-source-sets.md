---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-discover-project.html
---

# The basics of Kotlin Multiplatform project structure

Explains common code, targets, platform-specific and intermediate source sets, and test integration. The model is simplified compared to the one Kotlin uses, but adequate for most cases.

## Signature / Usage

Declare targets inside the `kotlin {}` block, and access source sets by name inside `kotlin.sourceSets {}`:

```kotlin
kotlin {
    jvm() // Declares a JVM target
    iosArm64() // Declares a target that corresponds to 64-bit iPhones
}
```

```kotlin
kotlin {
    // Targets declaration:
    // …

    // Source set declaration:
    sourceSets {
        commonMain {
            // Configure the commonMain source set
        }
    }
}
```

## Concepts

| Concept | Description |
|---------|-------------|
| Common code | Kotlin code shared among platforms, typically in `commonMain`. The compiler rejects platform-specific APIs (for example `java.io.File`) there |
| Target | An identifier describing a compilation target. Defines the produced binary format, available language constructions, and allowed dependencies. Must be declared first |
| Source set | A set of source files with its own targets, dependencies, and compiler options. Unique name per project; usually a directory under `src` |
| Platform-specific source set | One per target (for example `jvmMain` for `jvm`); compiles to that target only |
| Intermediate source set | Compiles to some, but not all, targets (for example `appleMain`); also called hierarchical source set |
| `Main` / `Test` suffix | `Main` holds production code, `Test` holds tests; the connection is automatic (`commonTest`, `jvmTest`, ...) |

## Notes

- `commonMain` is present in all multiplatform projects and compiles to all declared targets.
- Platform-specific source sets can access declarations from `commonMain`; the opposite is not true.
- With a single target (for example JVM), target-specific symbols can be accessed from common code; once a second target is added, they become unavailable.
- There is no single `ios` target. Mobile projects usually need a device target (`iosArm64`) and a simulator target (`iosSimulatorArm64` on Apple silicon Macs); `iosArm64Main` / `iosSimulatorArm64Main` are usually empty and code is shared through the `iosMain` intermediate source set. The same applies to `tvosMain`.
- It is fine for some source sets to have no sources.
- For multiplatform testing, Kotlin provides the default `kotlin.test` library (`@kotlin.Test`, `assertEquals`, `assertTrue`). Run tests for a target with the `<targetName>Test` task.
- Targets are also called platforms; the full list is in the Multiplatform Gradle DSL reference (`multiplatform-dsl-reference.html#targets`).
- Distance line: Kotlin language and stdlib semantics belong to the kotlin skill; Gradle plugin and AGP specifics belong to android-build-gradle.

## Related

- [hierarchy.md](./hierarchy.md)
- [advanced-project-structure.md](./advanced-project-structure.md)
- [share-on-platforms.md](./share-on-platforms.md)
