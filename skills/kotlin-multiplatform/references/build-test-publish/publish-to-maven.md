---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-publish-libraries-to-maven.html
---

# Publish your library to Maven Central - tutorial

Tutorial for publishing a Kotlin Multiplatform library to Maven Central with the vanniktech gradle-maven-publish-plugin: namespace and PGP key setup, plugin configuration, local checks, and a GitHub Actions workflow.

## Signature / Usage

Plugin (library module `build.gradle.kts`):

```kotlin
plugins {
    id("com.vanniktech.maven.publish") version "0.37.0"
}
```

Configuration (customize all values for your library):

```kotlin
mavenPublishing {
    publishToMavenCentral()

    signAllPublications()

    coordinates(group.toString(), "fibonacci", version.toString())

    pom {
        name = "Fibonacci library"
        description = "A mathematics calculation library."
        inceptionYear = "2024"
        url = "https://github.com/kotlin-hands-on/fibonacci/"
        licenses {
            license {
                name = "The Apache License, Version 2.0"
                url = "https://www.apache.org/licenses/LICENSE-2.0.txt"
                distribution = "https://www.apache.org/licenses/LICENSE-2.0.txt"
            }
        }
        developers {
            developer {
                id = "kotlin-hands-on"
                name = "Kotlin Developer Advocate"
                url = "https://github.com/kotlin-hands-on/"
            }
        }
        scm {
            url = "https://github.com/kotlin-hands-on/fibonacci/"
            connection = "scm:git:git://github.com/kotlin-hands-on/fibonacci.git"
            developerConnection = "scm:git:ssh://git@github.com/kotlin-hands-on/fibonacci.git"
        }
    }
}
```

Key pair generation, upload, and local checks:

```bash
./gradlew -Psigning.password=example-password generatePgpKeys --name "John Smith <john@example.com>"
./gradlew uploadPublicPgpKey --keyring /path_to/build/pgp/public_KEY_ID.asc
./gradlew checkSigningConfiguration
./gradlew checkPomFileFor<PUBLICATION_NAME>Publication
```

GitHub Actions workflow (`.github/workflows/publish.yml`):

```yaml
name: Publish
on:
  release:
    types: [released, prereleased]
jobs:
  publish:
    name: Release build and publish
    runs-on: macOS-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v4
      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: 21
      - name: Publish to MavenCentral
        run: ./gradlew publishToMavenCentral --no-configuration-cache
        env:
          ORG_GRADLE_PROJECT_mavenCentralUsername: ${{ secrets.MAVEN_CENTRAL_USERNAME }}
          ORG_GRADLE_PROJECT_mavenCentralPassword: ${{ secrets.MAVEN_CENTRAL_PASSWORD }}
          ORG_GRADLE_PROJECT_signingInMemoryKeyId: ${{ secrets.SIGNING_KEY_ID }}
          ORG_GRADLE_PROJECT_signingInMemoryKeyPassword: ${{ secrets.SIGNING_PASSWORD }}
          ORG_GRADLE_PROJECT_signingInMemoryKey: ${{ secrets.GPG_KEY_CONTENTS }}
```

## Options / Props

GitHub repository secrets used by the workflow:

| Secret | Value |
| --- | --- |
| `MAVEN_CENTRAL_USERNAME`, `MAVEN_CENTRAL_PASSWORD` | Values generated for the User Token on the Central Portal |
| `SIGNING_KEY_ID` | The last 8 characters of the signing key identifier |
| `SIGNING_PASSWORD` | The passphrase given when generating the GPG key |
| `GPG_KEY_CONTENTS` | The entire contents of the exported `key.gpg` file |

## Notes

- Steps: set up credentials (Maven Central account and PGP key), configure the publishing plugin, provide credentials to the plugin, run the publication task locally or in CI.
- Assumptions: open-source library, code in a GitHub repository, macOS or Linux (Windows users use GnuPG or Gpg4win), a Central Portal account (new, created after March 12th, 2024, or migrated), GitHub Actions for CI. Apple targets must be built on macOS.
- Namespace: register and verify a namespace on the Central Portal. Maven coordinates are `groupId` (reverse-DNS), `artifactId`, `version` (any string, not ending in `-SNAPSHOT`). A registered `com.example` allows `com.example.libraryname` and so on. Verify with a GitHub repository (`io.github.<your username>`, create a public repository named with the verification key) or with a domain (TXT DNS record containing the verification key). Delete the repository or record after successful verification.
- Key pair: the private key signs artifacts and must never be shared; the public key must be uploaded to a keyserver (the tutorial uses `keyserver.ubuntu.com`). Generate with the Kotlin Gradle plugin task (`generatePgpKeys`, stored in `build/pgp`; move it to a secure location) or with `gpg --full-generate-key` (defaults at time of writing: ECC with Curve 25519; no expiration unless you extend it later). With gpg: `gpg --keyserver keyserver.ubuntu.com --send-keys <KEY_ID>` and export with `gpg --armor --export-secret-keys <KEY_ID> > key.gpg`. Never share the private key file.
- Android target: follow the Android steps to prepare a library release; set a unique `android { namespace = ... }`, which is different from the Maven namespace.
- Required `mavenPublishing` settings: `coordinates`, license, developer information, SCM information. Configuration may also use Gradle properties. With the vanniktech plugin the publication is typically named `Maven`, so the POM check task is `checkPomFileForMavenPublication`. `checkSigningConfiguration` verifies the public key is uploaded to `keyserver.ubuntu.com` or `keys.openpgp.org`.
- Token: generate a user token on the Central Portal "Setup Token-Based Authentication" page; it is shown once and not stored by Maven Central. Store secrets as GitHub repository secrets (Settings, Security, Secrets and variables, Actions); never commit real values.
- `publishToMavenCentral` requires releasing the deployment manually on the Maven Central Deployments dashboard (after it reaches the validated state, click Publish). `publishAndReleaseToMavenCentral` fully automates the release. Artifacts usually become public in about 15-30 minutes but can take several hours; indexing can take longer.
- `--no-configuration-cache` is used because the publication plugin does not support Gradle configuration cache (open Gradle issue). The workflow can also trigger on tag push.
- Plugin version 0.37.0 is the value pinned by the docs at the time of capture; check the plugin's Releases page for the latest.
- Gradle publishing mechanics and Maven POM requirements overlap the `android-build-gradle` skill (publish-library); this page is the KMP-specific Maven Central tutorial.

## Related

- [Setting up multiplatform library publication](./publish-lib-setup.md)
- [Publish your library to npm](./publish-to-npm.md)
