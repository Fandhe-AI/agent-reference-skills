# Dependency Exclusion and Constraints

Mechanisms for controlling transitive dependency versions: `exclude` removes a transitive dependency outright, `constraints` sets a minimum version without adding a direct dependency, and `resolutionStrategy` forces a specific outcome.

## Signature / Usage

```kotlin
dependencies {
    // Exclude a transitive dependency from a specific declaration
    implementation("commons-beanutils:commons-beanutils:1.9.4") {
        exclude(group = "commons-collections", module = "commons-collections")
    }

    // Constrain a transitive dependency's version without declaring it directly
    constraints {
        implementation("org.apache.httpcomponents:httpclient:4.5.3") {
            because("previous versions have a bug impacting this application")
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exclude(group, module)` | function | — | Removes the named transitive dependency from the enclosing dependency declaration. Only applies if all dependency declarations that pull in the same transitive agree on the exclusion. |
| `constraints { }` | block inside `dependencies` | — | Declares a version requirement for a module without adding it as a direct dependency; participates in normal conflict resolution ("at least this version" unless `strictly` is used). |
| `version { strictly(...) }` | rich version | — | Inside a constraint or dependency, forces an exact version, rejecting Gradle's normal "newest wins" substitution. |
| `because("...")` | function | — | Documents the reason for a constraint or exclusion; shown in dependency insight reports. |

## Notes

- This is Gradle dependency management (`docs.gradle.org/current/userguide/how_to_exclude_transitive_dependencies.html`, `dependency_constraints.html`), not Android-specific, but fully applicable in Android module `build.gradle.kts` files.
- Dependency constraints are only published between Gradle projects when using Gradle Module Metadata; they don't propagate the same way to consumers of a published POM.
- Prefer `constraints` over `exclude` when the goal is "use at least version X" rather than "never include this module" — exclusion can silently drop functionality if the transitive is actually required.
- For viewing which version actually won a conflict, see [viewing-dependencies.md](./viewing-dependencies.md).

## Related

- [viewing-dependencies.md](./viewing-dependencies.md)
- [version-catalog.md](./version-catalog.md)
