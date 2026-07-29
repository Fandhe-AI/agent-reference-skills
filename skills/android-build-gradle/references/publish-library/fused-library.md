# Fused Library

The `com.android.fused-library` plugin (AGP 9.0+) packages multiple Android Library modules into one publishable AAR. Dependencies are pulled in via a dedicated `include(...)` configuration (transitive dependencies are not packaged), and the result is published — not consumed as a project dependency — through the standard `maven-publish` plugin.

## Signature / Usage

```kotlin
// build.gradle.kts (fused library module)
plugins {
    alias(libs.plugins.android.fusedlibrary)
    `maven-publish`
}

androidFusedLibrary {
    namespace = "com.example.myFusedLibrary"
    minSdk = 21

    aarMetadata {
        minCompileSdk = 21
        minCompileSdkExtension = 1
    }
}

dependencies {
    include(project(":image-rendering"))
    include("mycoolfonts:font-wingdings:5.0")
}

publishing {
    publications {
        register<MavenPublication>("release") {
            groupId = "my-company"
            artifactId = "my-fused-library"
            version = "1.0"
            from(components["fusedLibraryComponent"])
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `androidFusedLibrary.namespace` | `String` | — | Namespace for the fused AAR's `R` class. |
| `androidFusedLibrary.minSdk` | `Int` | — | Minimum SDK for the fused artifact. |
| `androidFusedLibrary.aarMetadata` | block | — | Overrides the merged AAR metadata (otherwise merged from included libraries by highest value). |
| `dependencies { include(...) }` | function | — | Adds a module or external coordinate to be fused into the AAR. Transitive dependencies of an included dependency are **not** packaged. |
| `components["fusedLibraryComponent"]` | component | — | The publishable software component exposed by the plugin for use in a `MavenPublication`. |

## Notes

- Requires the Maven Publish Plugin applied alongside `com.android.fused-library`.
- Included local Android library modules must already be published to a configured repository before being fused.
- Constraints: identical classpaths or identical Java resource paths across included libraries fail the build; Android resources are merged by dependency order (first match wins on name clashes); Data Binding is not supported; multiple build types/flavors cannot be fused into a single fused library; the output is publication-only by default (cannot be consumed as a project dependency) unless `android.experimental.fusedLibrarySupport.publicationOnly=false` is set in `gradle.properties`.
- Debug with `gradle :<module>:report` (JSON dependency report in `build/reports/`) or `gradle :<module>:dependencies`.
- Known gaps at time of writing: consumer ProGuard rules not literally named `proguard.txt` fail the build pre-AGP 9.1; `.aar` file dependencies are unsupported; no RenderScript or Prefab artifact support.

## Related

- [publication-variants.md](./publication-variants.md)
- [upload-library.md](./upload-library.md)
