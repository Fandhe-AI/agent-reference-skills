---
source: https://kotlinlang.org/docs/multiplatform/compose-native-distribution.html
---

# Native Distribution

Desktop packaging, run, and notarization tasks of the Compose Multiplatform Gradle plugin (`org.jetbrains.compose`). Output goes to `${project.buildDir}/compose/binaries`.

> Note: In the official docs, only `runDistributable` is shown as a full `./gradlew` command line. The others are task names in a table; `./gradlew <task>` is assembled from the task name.

> **警告**: The `notarize*` tasks upload the app image to Apple's notarization service. Follow the official procedure (the "Signing and notarization on macOS" tutorial) for signing and notarization credentials, and never write real values into scripts or the repository.

## Run the distributable image

```sh
./gradlew runDistributable
```

Runs the packaged application image (with a bundled JDK).

## Run the non-packaged JVM application

```sh
./gradlew run
```

Runs the non-packaged application with the Gradle JDK, starting from `mainClass`.

## Create the distributable image (no installer)

```sh
./gradlew createDistributable
```

## Package in a specific format

```sh
./gradlew package<FormatName>
```

Example: `packageDmg`. Cross-compilation is not supported, so each format can only be created on the matching OS (`.dmg` / `.pkg` on macOS, `.exe` / `.msi` on Windows, `.deb` / `.rpm` on Linux).

## Package for the current OS

```sh
./gradlew packageDistributionForCurrentOS
```

## Create an uber JAR

```sh
./gradlew packageUberJarForCurrentOS
```

Requires `compose.desktop.currentOs` to be used as a `compile` / `implementation` / `runtime` dependency.

The official task table writes `compose.desktop.currentOS`; the actual Gradle accessor used in all official code samples is `compose.desktop.currentOs`.

## Suggest missing JDK modules

```sh
./gradlew suggestModules
```

Suggests missing modules by static analysis with `jdeps`. The output may be incomplete or include unnecessary modules.

## Release tasks with ProGuard applied

```sh
./gradlew createReleaseDistributable
./gradlew runReleaseDistributable
./gradlew runRelease
./gradlew packageRelease<FORMAT_NAME>
./gradlew packageReleaseDistributionForCurrentOS
./gradlew packageReleaseUberJarForCurrentOS
```

Each is the ProGuard-enabled counterpart of a default task (for example `createDistributable` maps to `createReleaseDistributable`).

## Notarization (macOS only)

```sh
./gradlew notarize<FORMAT_NAME>
./gradlew checkNotarizationStatus
```

The release variants are `notarizeRelease<FORMAT_NAME>` / `checkReleaseNotarizationStatus`. `notarize<FORMAT_NAME>` uploads the application image; `checkNotarizationStatus` checks whether notarization succeeded.
