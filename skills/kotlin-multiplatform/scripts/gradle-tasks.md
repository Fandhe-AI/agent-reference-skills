---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-build-native-binaries.html
---

# Gradle Tasks

Gradle tasks documented for KMP projects (web distributions, tests, XCFramework). Sources: `build-and-run-kmp` / `multiplatform-run-tests` / `multiplatform-build-native-binaries` (docs SHA `3ad4b02`).

> Note: Where the official docs show only a task name and no full `./gradlew` command line, the item says so.

## Generate the web compatibility-mode distribution

```sh
./gradlew composeCompatibilityBrowserDistribution
```

Produces artifacts for both the `js` and `wasmJs` targets. Example output: `webApp/build/dist/composeWebCompatibility/productionExecutable`. The Gradle JVM must be Java 11 or later; Java 17 or later is recommended for Compose Multiplatform (source: `build-and-run-kmp`).

## Generate the Wasm browser distribution

```sh
./gradlew wasmJsBrowserDistribution
```

The official docs paste `wasmJsBrowserDistribution` into **Tasks and arguments** of an IDE Gradle run configuration (source: `multiplatform-publish-apps`). The `./gradlew` form does not appear on that page; only the task name comes from the docs.

## Run all tests

```sh
./gradlew allTests
```

Runs all tests in the project with the corresponding test runners. The HTML report is generated in `sharedLogic/build/reports/tests` (source: `multiplatform-run-tests`). The docs say "run the `allTests` Gradle task"; the `./gradlew` form is assembled from the task name.

## Assemble an XCFramework

```sh
./gradlew assembleXCFramework
```

Declaring `XCFramework()` makes the Kotlin Gradle plugin register `assembleXCFramework` / `assemble<Framework name>DebugXCFramework` / `assemble<Framework name>ReleaseXCFramework` (source: `multiplatform-build-native-binaries`). The `./gradlew` form is assembled from the task name.

## Assemble an XCFramework with the CocoaPods plugin

```sh
./gradlew podPublishXCFramework
```

Tasks when the CocoaPods Gradle plugin is used. `podPublishReleaseXCFramework` (release only) / `podPublishDebugXCFramework` (debug only) / `podPublishXCFramework` (both) generate the XCFramework together with a podspec (source: `multiplatform-build-native-binaries`). The `./gradlew` form is assembled from the task name.

## Stop the Gradle daemon

```sh
./gradlew --stop
```

After disabling Xcode's User Script Sandboxing, stops Gradle daemons that may have been started under the sandbox (source: `multiplatform-cocoapods-overview` / `multiplatform-direct-integration`).

## Other Gradle notes

- `build-and-run-kmp` only states that "the default Gradle build task always builds debug and release for all targets"; the `./gradlew build` command line is not in the docs, so it is not included.
- The names and usage of `link*` tasks (such as `linkDebugExecutable*`) are not documented on the target pages, so they are not included.
