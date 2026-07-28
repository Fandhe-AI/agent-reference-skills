# Dependency Coordinates

The `group:artifact:version` (GAV) syntax used to reference remote binary dependencies, plus local module and file dependencies.

## Signature / Usage

```kotlin
dependencies {
    // Remote binary dependency (compact GAV notation)
    implementation("com.example.android:app-magic:12.3")

    // Expanded coordinate syntax
    implementation(group = "com.example.android", name = "app-magic", version = "12.3")

    // Local module dependency
    implementation(project(":mylibrary"))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `group` | `String` | — | Organization/namespace of the dependency (e.g. `com.example.android`). |
| `name` | `String` | — | Artifact name (e.g. `app-magic`). |
| `version` | `String` | — | Artifact version. Omit when the version comes from a platform/BOM (see [compose-bom.md](./compose-bom.md)). |
| `project(":path")` | function | — | References a local module in the same Gradle build by its project path. |

## Notes

- Avoid dynamic versions such as `"com.android.tools.build:gradle:3.+"` — they cause unexpected updates and hurt build reproducibility and performance.
- The compact string form `"group:name:version"` and the expanded `group = / name = / version =` form are equivalent; the expanded form is useful when composing coordinates programmatically.
- Local `.aar` / `.jar` file dependencies are declared via `implementation(files("libs/mylibrary.aar"))` or by placing files in the module's `libs/` directory (auto-included by the default `implementation(fileTree(...))` in generated `build.gradle.kts`).

## Related

- [dependency-configurations.md](./dependency-configurations.md)
- [version-catalog.md](./version-catalog.md)
