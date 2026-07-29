# Test Fixtures Publishing

Publishes a library's test fixtures (enabled via `android.testFixtures.enable`) as a separate Maven artifact. Gradle distinguishes it from the main artifact through the capability mechanism: for a library published as `groupId:artifactId:version`, the test fixtures artifact must declare the capability `groupId:artifactId-test-fixtures:version`.

## Signature / Usage

```kotlin
// settings.gradle.kts — project name becomes the Maven artifactId
include(":path:to:mylibrary")
project(":path:to:mylibrary").name = "my-library"
```

```kotlin
// build.gradle.kts (project level) — group/version become groupId/version
group = "com.my-company"
version = "1.0"
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Project `name` | `String` | last path segment | Becomes the Maven `artifactId`; the test fixtures capability is derived as `<name>-test-fixtures`. Rename via `settings.gradle(.kts)` or by renaming the project folder (the latter requires updating dependents). |
| Project `group` | `String` | — | Becomes the Maven `groupId` for both the main and test fixtures capability. |
| Project `version` | `String` | — | Becomes the Maven `version` for both artifacts. |

## Notes

- This configuration is manual — Gradle does not infer the capability coordinates from anything except project name/group/version, so they must match the publication coordinates set elsewhere (see upload-library.md).
- Prerequisite: `android.testFixtures.enable = true` in the library module (see prep-library-release.md) before there is a `testFixtures` artifact to publish.
- Once configured, test fixtures can be exposed as an additional publication variant through `multipleVariants` (publication-variants.md).

## Related

- [prep-library-release.md](./prep-library-release.md)
- [publication-variants.md](./publication-variants.md)
- [upload-library.md](./upload-library.md)
