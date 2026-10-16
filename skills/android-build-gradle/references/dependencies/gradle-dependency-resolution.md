# Gradle Dependency Resolution

How Gradle resolves versions across direct and transitive dependencies, including version catalogs and BOMs.

## Signature / Usage

```kotlin
dependencies {
    implementation(platform("androidx.compose:compose-bom:2024.10.00"))
    implementation("androidx.compose.ui:ui")
}
```

Inspect resolved versions:

```
./gradlew app:dependencies

1: releaseRuntimeClasspath - Runtime classpath of /release.
2: +--- org.jetbrains.kotlin:kotlin-stdlib:2.0.0
4: +--- com.sample:library.a:1.2.3
5: |    +--- com.sample:library.c:2.1.1
8: +--- com.sample:library.c:1.4.1 -> 2.1.1 (*)
```

Version catalog with a BOM (libraries in the BOM omit versions):

```toml
[versions]
composeBom = "2024.10.00"

[libraries]
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-compose-ui = { group = "androidx.compose.ui", name = "ui" }
```

```kotlin
dependencies {
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
}
```

## Notes

- By default Gradle resolves each dependency to the newest candidate version in the graph. Transitive dependencies can override the version you request directly.
- Semantic versioning (`major.minor.patch`): a `major` change may include breaking API or behavior changes; `minor` / `patch` changes are likely compatible.
- `->` in the dependencies report means a requestor uses a version it did not request. Usually harmless, but it helps trace new behavior issues.
- Direct specification: the declared version becomes a candidate alongside versions requested transitively.
- Version catalog: only variables actually used in a build file add candidates; unused catalog entries are ignored.
- BOM: versions of all libraries in the BOM become candidates (also for transitive dependencies), whether or not you use them directly; a higher version requested by another library still wins over the BOM version.
- Gradle dependency resolution can be customized, but "newest version wins" usually works well.
- Source: `developer.android.com/build/gradle-dependency-resolution` (local copy fetched 2026-10).

## Related

- [viewing-dependencies.md](./viewing-dependencies.md)
- [version-catalog.md](./version-catalog.md)
- [compose-bom.md](./compose-bom.md)
- [tool-and-library-dependencies.md](./tool-and-library-dependencies.md)
