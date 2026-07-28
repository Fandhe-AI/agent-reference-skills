# Repository Declarations

Declares where Gradle should look up dependency artifacts, via the `dependencyResolutionManagement` block in `settings.gradle.kts`.

## Signature / Usage

```kotlin
// settings.gradle.kts
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `google()` | repository | — | Google's Maven repository; hosts AndroidX, Architecture Components, Constraint Layout, Data Binding, Wear OS, Play services, Firebase. |
| `mavenCentral()` | repository | — | Maven Central; hosts most general-purpose JVM/Kotlin libraries. |
| `mavenLocal()` | repository | — | Local `~/.m2` repository. |
| `maven(url = "...")` | repository | — | Custom Maven repository at the given URL. |
| `ivy(url = "...")` | repository | — | Custom Ivy repository at the given URL. |
| `repositoriesMode` | `RepositoriesMode` | — | `FAIL_ON_PROJECT_REPOS` (recommended): rejects repository declarations inside module `build.gradle.kts` files, forcing centralization in `settings.gradle.kts`. `PREFER_SETTINGS`: allows module-level repositories but prefers settings-level ones. |

## Notes

- Gradle searches repositories in the order listed, so put the most likely repository first for resolution performance.
- JCenter became read-only on March 31, 2021 and should not be used; use `mavenCentral()` or `google()` instead.
- Repository order and contents are unrelated to `npm`/`Turborepo`/`Syncpack` workspace or registry concepts of the same name.

## Related

- [dependency-coordinates.md](./dependency-coordinates.md)
- [version-catalog.md](./version-catalog.md)
