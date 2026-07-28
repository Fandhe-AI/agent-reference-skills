# Version Catalog

Centralizes dependency and plugin versions in `gradle/libs.versions.toml`, exposed to build scripts via type-safe `libs.*` accessors.

## Signature / Usage

```toml
# gradle/libs.versions.toml
[versions]
agp = "8.3.0"
androidx-macro-benchmark = "1.2.2"

[libraries]
androidx-benchmark-macro = { group = "androidx.benchmark", name = "benchmark-macro-junit4", version.ref = "androidx-macro-benchmark" }

[bundles]
compose-ui = ["androidx-compose-ui", "androidx-compose-ui-tooling"]

[plugins]
androidApplication = { id = "com.android.application", version.ref = "agp" }
```

```kotlin
// build.gradle.kts
plugins {
    alias(libs.plugins.androidApplication)
}

dependencies {
    implementation(libs.androidx.benchmark.macro)
    implementation(libs.bundles.compose.ui)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `[versions]` | TOML table | — | Named version identifiers, as a plain string or a rich version object (`{ strictly = "...", prefer = "..." }`). Referenced elsewhere via `version.ref`. |
| `[libraries]` | TOML table | — | Aliases mapped to GAV coordinates: `module = "group:name"` + `version.ref`, or a compact `"group:name:version"` string. |
| `[plugins]` | TOML table | — | Aliases mapped to a plugin `id` and version, used with `alias(libs.plugins.<name>)` in a `plugins {}` block. |
| `[bundles]` | TOML table | — | Named groups of library aliases, applied together via `implementation(libs.bundles.<name>)`. |
| `strictly` / `require` / `prefer` / `reject` / `rejectAll` | rich version keys | — | Fine-grained version constraint modifiers inside a `[versions]` entry or an inline `version { }` block. |

## Notes

- Alias dashes convert to dots for the generated accessor: `ktor-client-core` in TOML becomes `libs.ktor.client.core` in Kotlin.
- This is Gradle's built-in version catalog feature (`docs.gradle.org/current/userguide/version_catalogs.html`), not Android-specific, but `libs.versions.toml` at the project root is the default file Android Studio scaffolds and recognizes.
- Use with the Compose BOM by omitting `version` / `version.ref` on individual Compose library aliases and letting the BOM platform supply it — see [compose-bom.md](./compose-bom.md).

## Related

- [dependency-coordinates.md](./dependency-coordinates.md)
- [compose-bom.md](./compose-bom.md)
