---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-publish-libraries-to-maven.html
---

# Publish

Commands for publishing libraries to Maven Central / Maven Local / npm. Sources: `multiplatform-publish-libraries-to-maven` / `multiplatform-publish-lib-setup` / `multiplatform-publish-libraries-to-npm`.

> **警告**: The publishing commands on this page push artifacts to external registries (hard to undo). Replace the official placeholders (`example-password` / `YOUR_ACCESS_TOKEN` / `<...>` etc.) with real values passed through environment variables or a secret store, and never write them into scripts or the repository. Try a disposable test library first.

## Publish to Maven Local

```sh
./gradlew publishToMavenLocal
```

Publishes all per-target publications and the root publication to Maven Local.

## Publish the complete library (any Maven repository)

```sh
./gradlew publishAllPublicationsToGithubPackagesRepository
```

Example of `publishAllPublicationsTo<MavenRepositoryName>Repository` (the official docs use the `GithubPackages` repository).

## Publish the root publication only

```sh
./gradlew publishKotlinMultiplatformPublicationToMavenLocal
```

Publishes only the `*.module` file; per-target publications must be published separately.

## Publish a single target publication

```sh
./gradlew publish<TargetName>PublicationToMavenLocal
```

## Generate a PGP key pair (Kotlin Gradle plugin)

```sh
./gradlew -Psigning.password=example-password generatePgpKeys --name "John Smith <john@example.com>"
```

The key pair is saved to `build/pgp`. Move it to a safe location and replace `example-password` with a real password.

## Upload the public key (Kotlin Gradle plugin)

```sh
./gradlew uploadPublicPgpKey --keyring /path_to/build/pgp/public_KEY_ID.asc
```

## Generate a PGP key pair (gpg)

```sh
brew install gpg
gpg --full-generate-key
gpg --list-keys
```

## Upload the public key (gpg)

```sh
gpg --keyserver keyserver.ubuntu.com --send-keys F175482952A225BFC4A07A715EE6B5F76620B385CE
```

The key ID is the official example. Replace it with your own key ID.

## Export the private key

> **警告**: `key.gpg` is the private key itself. Do not share it and do not commit it to the repository.

```sh
gpg --armor --export-secret-keys F175482952A225BFC4A07A715EE6B5F76620B385CE > key.gpg
```

## Verify the signing configuration locally

```sh
./gradlew checkSigningConfiguration
```

Checks whether the public key has been uploaded to `keyserver.ubuntu.com` or `keys.openpgp.org`.

## Verify pom.xml locally

```sh
./gradlew checkPomFileFor<PUBLICATION_NAME>Publication
```

With the vanniktech gradle-maven-publish-plugin the publication name is normally `Maven`, so the command becomes:

```sh
./gradlew checkPomFileForMavenPublication
```

## Publish to Maven Central (manual release)

```sh
./gradlew publishToMavenCentral --no-configuration-cache
```

Credentials are passed through the environment variables `ORG_GRADLE_PROJECT_mavenCentralUsername` / `ORG_GRADLE_PROJECT_mavenCentralPassword` / `ORG_GRADLE_PROJECT_signingInMemoryKeyId` / `ORG_GRADLE_PROJECT_signingInMemoryKeyPassword` / `ORG_GRADLE_PROJECT_signingInMemoryKey` (the official docs set them from GitHub Actions secrets). Check the deployment on the Maven Central site and **Publish** it manually. `--no-configuration-cache` is needed because the publishing plugin does not support the configuration cache.

## Publish to Maven Central (automatic release)

```sh
./gradlew publishAndReleaseToMavenCentral --no-configuration-cache
```

Releases automatically once validation completes. `--no-configuration-cache` is handled as above (the official docs only show the `publishToMavenCentral` workflow example; the full line with this flag is derived by substituting `publishAndReleaseToMavenCentral`).

## Publish to npm manually

```sh
NPM_TOKEN=YOUR_ACCESS_TOKEN ./gradlew :shared:publishJsPackageToNpmjsRegistry
```

`YOUR_ACCESS_TOKEN` is the official placeholder. Assumes `authToken = System.getenv("NPM_TOKEN")` in `build.gradle.kts`. npm rejects publishing the same or an older `version`.

## Publish to npm (Trusted Publisher CI)

```sh
./gradlew :shared:publishJsPackageToNpmjsRegistry
```

Run inside a GitHub Actions workflow (requires `permissions: id-token: write` and a Trusted Publisher setting on the npm side). No token is needed.
