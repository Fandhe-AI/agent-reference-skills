---
source: https://kotlinlang.org/docs/multiplatform/github-actions-for-kmp.html
---

# Configure GitHub Actions for continuous integration of a Kotlin Multiplatform application

An example workflow that runs shared tests and builds Android and iOS artifacts on every push or pull request to `main`, based on the Jetcaster KMP sample.

## Signature / Usage

Composite action `.github/actions/gradle-setup/action.yml` (installs Java 17 and configures Gradle):

```yaml
name: gradle-setup
description: Setup Java and Gradle
runs:
  using: "composite"
  steps:
    - name: Setup Java
      uses: actions/setup-java@387ac29b308b003ca37ba93a6cab5eb57c8f5f93 # v4.0.0
      with:
        java-version: "17"
        distribution: "temurin"
    - name: Setup Gradle
      uses: gradle/actions/setup-gradle@4d9f0ba0025fe599b4ebab900eb7f3a1d93ef4c2 # v5.0.0
```

Workflow base `.github/workflows/build.yml`:

```yaml
name: Build

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

env:
  GRADLE_OPTS: "-Dorg.gradle.jvmargs=-Xmx4096M -Dorg.gradle.daemon=false -Dorg.gradle.parallel=true -Dorg.gradle.caching=true"
```

Shared tests job:

```yaml
jobs:
  test:
    name: Run tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4

      - name: Gradle setup
        uses: ./.github/actions/gradle-setup

      - name: Run unit tests
        run: ./gradlew jvmTest

      - name: Upload test reports
        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02 # v4
        with:
          name: test-reports
          path: "**/build/reports/tests/"
```

Android debug APK job:

```yaml
jobs:
  # ...
  build-android:
    name: Build Android
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Checkout
        uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4

      - name: Gradle setup
        uses: ./.github/actions/gradle-setup

      - name: Build Android debug APK
        run: ./gradlew :mobile:assembleDebug

      - name: Upload Android debug APK
        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02 # v4
        with:
          name: android-apk
          path: mobile/build/outputs/apk/debug/*.apk
```

iOS simulator job (macOS runner):

```yaml
jobs:
  #...
  build-ios:
    name: Build iOS simulator app
    runs-on: macos-latest
    needs: test
    steps:
      - name: Checkout
        uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262 # v4

      - name: Gradle setup
        uses: ./.github/actions/gradle-setup

      - name: Build iOS simulator app
        run: |
          xcodebuild build \
          -project JetcasterMigration/JetcasterMigration.xcodeproj \
          -configuration Debug \
          -scheme JetcasterMigration \
          -sdk iphonesimulator \
          -derivedDataPath ./build \
          -verbose

      - name: Upload app folder
        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02 # v4
        with:
          name: iphonesimulator-app
          path: build/Build/Products/Debug-iphonesimulator/*
```

## Notes

- Third-party actions are pinned to commit SHAs here; the source page uses mutable tags.
- The setup is split into a reusable composite action (Java and Gradle) and a main workflow; reuse the action in every job so all builds share one configuration.
- Gradle options disable the daemon and enable parallel execution with caching. `workflow_dispatch` allows manual runs (Actions tab, Run workflow).
- The iOS job targets the iOS Simulator to avoid signing, and uses `xcodebuild` on `macos-latest`. The `-project` / `-scheme` values are from the Jetcaster sample; adapt them to your project.
- The `:mobile:assembleDebug` task path and `mobile/` output directory are specific to the Jetcaster sample module layout.
- The full Jetcaster configuration also includes jobs building desktop JVM applications for macOS, Windows, and Linux (not reproduced on this page). For app store publishing with GitHub Actions, the page points to Marco Gomiero's series of posts.
- This is a KMP-specific example workflow; general GitHub Actions authoring is covered by github-docs.

## Related

- [Configure TeamCity](./teamcity.md)
- [iOS delivery pipeline with TeamCity](./ios-ci-cd-teamcity.md)
- [Build and run](./build-and-run.md)
