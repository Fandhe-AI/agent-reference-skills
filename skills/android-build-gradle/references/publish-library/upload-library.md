# Upload Library

Creates and executes the actual Maven publication for an Android library AAR using the Gradle Maven Publish Plugin's `publishing {}` block: a `MavenPublication` (coordinates + software component) plus a target `repositories {}` entry to push it to.

## Signature / Usage

```kotlin
// build.gradle.kts (library module)
publishing {
    publications {
        register<MavenPublication>("release") {
            groupId = "com.my-company"
            artifactId = "my-library"
            version = "1.0"

            afterEvaluate {
                from(components["release"])
            }
        }
    }

    repositories {
        maven {
            name = "myrepo"
            url = uri(layout.buildDirectory.dir("repo"))
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `MavenPublication.groupId/artifactId/version` | `String` | — | Maven coordinates for the published AAR. |
| `from(components["<name>"])` | function | — | Attaches the software component created by `singleVariant()`/`multipleVariants()`; must run inside `afterEvaluate {}` since AGP creates the component late. |
| `repositories { maven { name; url } }` | block | — | Target repository for the generated `publish<Publication>To<Repo>Repository` task. `url` may point at a remote Maven repo, Maven Central (via Sonatype), or a local `build/` folder for testing. |

## Notes

- Publishing through a repository (rather than distributing the AAR file directly) is the recommended approach: it lets Gradle resolve the library's own transitive dependencies, gives single-version resolution to consumers, and carries POM metadata instead of a raw AAR.
- A publication task is generated per publication/repository pair, e.g. `publishReleasePublicationToMyrepoRepository`.
- To hand out a repository as a downloadable bundle instead of a remote URL, zip the local repo directory produced by that task (e.g. with a `Zip` task reading `publishTask.map { it.repository.url }`) into `build/distributions/`.
- Prerequisites before uploading: the library is prepared for release (prep-library-release.md), publication variants are configured (publication-variants.md), and test fixtures publishing is set up if applicable (test-fixtures-publishing.md).
- Distinct from `dependencies/repositories.md` in this skill: that page's `dependencyResolutionManagement.repositories {}` (in `settings.gradle.kts`) is for **consuming** dependencies; the `publishing.repositories {}` block here is for **publishing** to a repository, and is declared per-module, not in `settings.gradle.kts`.

## Related

- [prep-library-release.md](./prep-library-release.md)
- [publication-variants.md](./publication-variants.md)
- [test-fixtures-publishing.md](./test-fixtures-publishing.md)
- [fused-library.md](./fused-library.md)
