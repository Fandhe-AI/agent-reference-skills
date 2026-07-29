# Migrate to Version Catalogs

Incremental, per-dependency migration path from hardcoded `build.gradle` dependency strings to a `libs.versions.toml` version catalog.

## Signature / Usage

```kotlin
// Before: inline declaration in build.gradle.kts
dependencies {
    implementation("androidx.core:core-ktx:1.9.0")
}
```

```toml
# gradle/libs.versions.toml — 1. add the new entry to the catalog
[versions]
ktx = "1.9.0"

[libraries]
androidx-ktx = { group = "androidx.core", name = "core-ktx", version.ref = "ktx" }
```

```kotlin
// build.gradle.kts — 3. after syncing, replace the string with the accessor
dependencies {
   implementation(libs.androidx.ktx)
}
```

## Notes

- A build can consume dependencies and plugins from build scripts and catalogs simultaneously, so catalog entries and inline (non-catalog) declarations may coexist in the same project while migrating one dependency at a time; there is no requirement to convert everything at once.
- Migration workflow per dependency: (1) add the entry to the catalog, (2) sync the project, (3) replace the previous string declaration with the catalog's type-safe accessor.
- If using a Gradle version below 8.1, the `plugins {}` block must be annotated with `@Suppress("DSL_SCOPE_VIOLATION")` when using version catalogs (see [gradle/gradle#22797](https://github.com/gradle/gradle/issues/22797)); Gradle 8.1+ does not need this.

## Related

- [version-catalog.md](./version-catalog.md)
- [dependency-coordinates.md](./dependency-coordinates.md)
