---
source: https://kotlinlang.org/docs/multiplatform/github-actions-for-kmp.html
---

# CI

Commands run by GitHub Actions and TeamCity CI. For the workflow YAML itself, see `references/tooling/github-actions.md` / `references/tooling/teamcity.md`. Sources: `github-actions-for-kmp` / `configure-teamcity-for-kmp` (`https://kotlinlang.org/docs/multiplatform/configure-teamcity-for-kmp.html`).

## Run shared tests

```sh
./gradlew jvmTest
```

Test reports are written to `**/build/reports/tests/` (same task for GitHub Actions and TeamCity).

## Build the Android debug APK

```sh
./gradlew :mobile:assembleDebug
```

The APK is written to `mobile/build/outputs/apk/debug/`. `:mobile` is the module name in the official sample (Jetcaster KMP).

## Build the app for the iOS simulator

```sh
xcodebuild build \
  -project JetcasterMigration/JetcasterMigration.xcodeproj \
  -configuration Debug \
  -scheme JetcasterMigration \
  -sdk iphonesimulator \
  -derivedDataPath ./build \
  -verbose
```

Requires a macOS runner (`macos-latest`) and Xcode. The iOS Simulator is targeted to avoid code signing. The project name and scheme are values from the official sample; replace them with your own. Artifacts are under `build/Build/Products/Debug-iphonesimulator/*`.

## Gradle options (GRADLE_OPTS in GitHub Actions)

```sh
export GRADLE_OPTS="-Dorg.gradle.jvmargs=-Xmx4096M -Dorg.gradle.daemon=false -Dorg.gradle.parallel=true -Dorg.gradle.caching=true"
```

The official docs set this as `env: GRADLE_OPTS:` in the workflow. This is how to use the same settings locally; the `export` form is assembled from the official values.
