---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-dsl-reference.html#id-and-version
---

# Multiplatform Gradle DSL reference — ID and version / Top-level blocks

The Kotlin Multiplatform Gradle plugin is a tool for creating Kotlin Multiplatform projects. `kotlin {}` is the top-level block for multiplatform project configuration in the Gradle build script.

## Signature / Usage

The fully qualified name of the plugin is `org.jetbrains.kotlin.multiplatform`. With the Kotlin Gradle DSL, apply it with `kotlin("multiplatform")`.

```kotlin
plugins {
    kotlin("multiplatform") version "2.4.21"
}
```

**Groovy**

```groovy
plugins {
    id 'org.jetbrains.kotlin.multiplatform' version '2.4.21'
}
```

## Options / Props

Blocks available inside `kotlin {}`:

| Block | Description |
|-------|-------------|
| _&lt;targetName&gt;_ | Declares a particular target of a project. The names of available targets are listed in the Targets section. |
| `targets` | Lists all targets of the project. |
| `sourceSets` | Configures predefined and declares custom source sets of the project. |
| `compilerOptions` | Specifies common extension-level compiler options that are used as defaults for all targets and shared source sets. |
| `dependencies` | Configures common dependencies. (Experimental) |

## Notes

- The plugin versions match the Kotlin release versions. The most recent version is 2.4.21 (docs pinned at commit 3ad4b02, fetched 2026-10-16).
- The top-level `dependencies {}` block is Experimental; see dsl-dependencies.
- This page covers the multiplatform plugin DSL only; the Kotlin language, stdlib and compiler details belong to the kotlin skill.

## Related

- [Targets](./dsl-targets.md)
- [Source sets](./dsl-source-sets.md)
- [Compiler options](./dsl-compiler-options.md)
- [Dependencies](./dsl-dependencies.md)
