---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-publish-libraries-to-npm.html
---

# Publish your library to npm - tutorial

Tutorial for publishing a Kotlin Multiplatform library (JS target) to npm with the npm-publish Gradle plugin, manually or through GitHub Actions with an npm Trusted Publisher.

## Signature / Usage

Plugin (library module `build.gradle.kts`):

```kotlin
plugins {
    kotlin("npm-publish") version "3.7.0"
}
```

Configuration (only `organization`, `authToken`, `packageName`, and `version` are required; the rest is an extended example):

```kotlin
npmPublish {
    organization = "organization_name_without_the_@_sign"

    registries {
        npmjs {
            // You'll pass your npm token as this environment variable
            // when you run the command to publish the package
            authToken = System.getenv("NPM_TOKEN")
        }
    }

    packages {
        named("js") {
            version = "0.0.1"
            packageName = "greetings"
            readme = file("../README.md")

            packageJson {
                license = "Apache 2.0"
                homepage = "https://github.com/Kotlin/kotlin-multiplatform-web-library#readme"
                description = "Shared Kotlin/JS Greetings library"
                keywords = listOf("kotlin", "kotlin-js", "greetings", "shared", "api")
                author {
                    name = "Kotlin Developer Advocate"
                    url = "https://github.com/kotlin-hands-on/"
                }
                contributors = listOf(
                    Person {
                        name = "John Smith"
                        email = "john.smith@example.com"
                        url = "https://github.com/johnsmith"
                    },
                )
                repository {
                    type = "git"
                    url = "https://github.com/Kotlin/kotlin-multiplatform-web-library.git"
                }
            }
        }
    }
}
```

Manual publication (replace `YOUR_ACCESS_TOKEN`):

```bash
NPM_TOKEN=YOUR_ACCESS_TOKEN ./gradlew :shared:publishJsPackageToNpmjsRegistry
```

GitHub Actions workflow (`.github/workflows/publish.yml`):

```yaml
name: Publish

on:
  release:
    types: [released, prereleased]

permissions:
  id-token: write  # Required for GitHub Actions
                   # to integrate with npm trusted publishing
  contents: read

jobs:
  publish:
    name: Release build and publish
    runs-on: ubuntu-latest
    steps:
      # Check out the triggering branch
      - name: Check out code
        uses: actions/checkout@v4

      # Set up the JDK to run the Gradle task
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: 21

      # Run the publishing Gradle task for the library module
      - name: Publish to npm
        run: ./gradlew :shared:publishJsPackageToNpmjsRegistry
```

## Notes

- Steps: prepare credentials (npm account and access token), configure the publishing plugin, provide credentials or set up a Trusted Publisher for CI, run the publication task manually or in CI.
- The tutorial publishes under an npm organization to avoid naming conflicts. For manual publishing, the access token uses a simplified configuration: enable **Bypass two-factor authentication (2FA)** and set both general and organization permissions to **Read and write**.
- If reusing the sample project, rename the library module and the project name in `settings.gradle.kts`.
- `version` can be omitted to use the module's version; `packageName` can be omitted to use the module name. The `organization` parameter and `registries {}` block hold authentication details (here the main npm registry and the `NPM_TOKEN` variable). The `packageJson {}` block holds metadata. Configuration can also use Gradle properties.
- Troubleshooting: npm fails publication if the same or an earlier version is already published; for organization-scoped packages set both general and organization token permissions.
- CI: the npm Trusted Publisher mechanism uses OpenID Connect, avoiding tokens. The workflow needs `permissions: id-token: write` and `contents: read`. After publishing the package once, open the package page, Settings, Trusted Publisher, choose GitHub Actions, and enter the GitHub user or organization, repository name, and workflow file name (`publish.yml`), then click Setup connection. npm does not verify the provided coordinates, so enter them correctly.
- The workflow can also trigger on tag push. Keep the tag aligned with the module version.
- Plugin version 3.7.0 is the value pinned by the docs at the time of capture; check the plugin's Releases page for the latest.
- Gradle publishing in general overlaps the `android-build-gradle` skill; this page is the KMP / Kotlin JS npm-specific tutorial.

## Related

- [Setting up multiplatform library publication](./publish-lib-setup.md)
- [Publish your library to Maven Central](./publish-to-maven.md)
