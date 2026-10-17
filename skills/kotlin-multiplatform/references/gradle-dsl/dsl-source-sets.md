---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-dsl-reference.html#source-sets
---

# Multiplatform Gradle DSL reference — Source sets

The `sourceSets {}` block describes source sets of the project. A source set contains Kotlin source files that participate in compilations together, along with their resources and dependencies.

## Signature / Usage

```kotlin
kotlin {
    //...
    sourceSets {
        commonMain { /* ... */ }
    }
}
```

Custom source sets are marked `by creating` in the Kotlin Gradle DSL:

```kotlin
kotlin {
    //...
    sourceSets {
        val myMain by creating { /* ... */ } // create a new source set by the name 'MyMain'
    }
}
```

Source set parameters:

```kotlin
kotlin {
    //...
    sourceSets {
        commonMain {
            kotlin.srcDir("src")
            resources.srcDir("res")

            dependencies {
                /* ... */
            }
        }
    }
}
```

## Options / Props

Predefined source sets (set up automatically upon creation of a multiplatform project):

| Name | Description |
|------|-------------|
| `commonMain` | Code and resources shared between all platforms. Available in all multiplatform projects. Used in all main compilations of a project. |
| `commonTest` | Test code and resources shared between all platforms. Available in all multiplatform projects. Used in all test compilations of a project. |
| _&lt;targetName&gt;&lt;compilationName&gt;_ | Target-specific sources for a compilation. Examples: `jsTest`, `jvmMain`. |

Source set parameters:

| Name | Description |
|------|-------------|
| `kotlin.srcDir` | Location of Kotlin source files inside the source set directory. |
| `resources.srcDir` | Location of resources inside the source set directory. |
| `dependsOn` | Connection with another source set. |
| `dependencies` | Dependencies of the source set. |
| `languageSettings` | Language settings applied to the shared source set. |

## Notes

- A newly created custom source set isn't connected to other ones. To use it in the project's compilations, connect it with other source sets (manual `dependsOn` configuration, see project-structure/hierarchy).
- Groovy form of a custom source set: `sourceSets { myMain { /* ... */ } }` creates or configures a source set named `myMain`.

## Related

- [Compilations](./dsl-compilations.md)
- [Dependencies](./dsl-dependencies.md)
- [Language settings](./dsl-language-settings.md)
