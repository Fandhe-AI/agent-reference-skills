# settings.gradle.kts

Gradle settings file at the project root. Read during Gradle's initialization phase, before any `build.gradle.kts` file, to determine which projects/subprojects are part of the build.

## Signature / Usage

```kotlin
pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "My Application"
include(":app")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `pluginManagement { repositories { ... } }` | block | — | Repositories used to resolve Gradle plugins declared in the `plugins { }` block. |
| `dependencyResolutionManagement { repositories { ... } }` | block | — | Centralized repositories for dependency resolution across all subprojects. |
| `rootProject.name` | `String` | — | Name of the root project. |
| `include(":module")` | function | — | Declares a subproject (module) to include in the build. |

## Notes

- Belongs to Gradle's **initialization phase**: it sets up classpaths containing build files and applied plugins, and declares which projects to build.
- Also holds external Version Catalog imports (`gradle/libs.versions.toml`).
- `.gradle.kts` extension indicates Kotlin DSL syntax; `.gradle` indicates Groovy DSL.

## Related

- [Root build.gradle.kts](./root-build-gradle.md)
- [Module build.gradle.kts](./module-build-gradle.md)
