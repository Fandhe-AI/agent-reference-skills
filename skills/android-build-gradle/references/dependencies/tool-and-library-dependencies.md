# Tool and Library Dependencies

Overview of the relationships between source code, library dependencies, and tools in an Android build, and how Gradle scopes group dependencies.

## Signature / Usage

```kotlin
// In a module-level build script
// explicit dependency strings ("group:artifact:version")
dependencies {
    implementation("com.example:library1:1.2.3")
    api("com.example:library2:1.1.1")
}
```

Using a version catalog:

```toml
# Version catalog - gradle/libs.versions.toml
[versions]
exampleLib = "1.2.3"
examplePlugin = "2.3.4"

[libraries]
example-library = { group = "com.example", name = "library", version.ref = "exampleLib" }

[plugins]
example-plugin = { id = "com.example.plugin", version.ref = "examplePlugin" }
```

```kotlin
plugins {
    alias(libs.plugins.example.plugin)
}

dependencies {
    implementation(libs.example.library)
}
```

## Notes

- Build relationships: source code (Kotlin/Java you write), library dependencies (JAR, AAR, subprojects), and tools (Gradle, Gradle plugins, compilers, compiler plugins, Android SDK, JDK).
- Upgrading one dependency can cascade to many others through transitive dependencies.
- Semantic versioning (`major.minor.patch`): `major` changes may break API or behavior; `minor` / `patch` should stay compatible. Experimental or opt-in APIs may change even in minor or patch releases.
- Annotated source (e.g. `@Composable`) needs processing by a compiler plugin, a Kotlin Symbol Processor (KSP), or other annotation-processing tools. Jetpack Room ships a KSP; Jetpack Compose requires the Compose compiler plugin.
- A library may declare a minimum `minSdk` / `compileSdk`. If the app's `minSdk` is lower than a library requires, manifest merger fails the build; raise the app's `minSdk` explicitly, use a compatible library version, or (with care) override via `tools:overrideLibrary`.
- The source page states the app `minSdk` is effectively the highest `minSdk` requested by the app and all its library dependencies; in practice manifest merger reports an error instead of raising it automatically.
- Gradle scopes (called configurations in the Gradle API) separate dependency sets for different parts of the build, e.g. test libraries such as JUnit only for unit tests. AGP defines `implementation` and `api` to control whether a dependency is exposed to users of your subproject.
- The source page also provides Groovy equivalents of the snippets.
- Source: `developer.android.com/build/tool-and-library-dependencies` (local copy fetched 2026-10).

## Related

- [dependency-configurations.md](./dependency-configurations.md)
- [gradle-dependency-resolution.md](./gradle-dependency-resolution.md)
- [version-catalog.md](./version-catalog.md)
- [annotation-processors.md](./annotation-processors.md)
