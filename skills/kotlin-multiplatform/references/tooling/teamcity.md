---
source: https://kotlinlang.org/docs/multiplatform/configure-teamcity-for-kmp.html
---

# Configure TeamCity for a Kotlin Multiplatform application

Configure a TeamCity Cloud or On-Premises project to build, test, and deploy KMP applications using TeamCity pipelines (YAML plus a visual editor), based on the JetCaster KMP sample.

## Signature / Usage

Job 1, shared tests (YAML pipeline editor):

```yaml
jobs:
  Job1:
    name: Run tests
    steps:
      - type: gradle
        use-gradle-wrapper: true
        name: Gradle test
        jdk-home: '%\env.JDK_17_0%'
        tasks: jvmTest
    files-publication:
      - path: '**/build/reports/tests/**/*'
        share-with-jobs: false
        publish-artifact: true
    allow-reuse: false
```

Parallel tests:

```yaml
    ...
    allow-reuse: false
    parallelism: 3
```

Job 2, Android debug package:

```yaml
jobs:
  Job1:
    name: Run tests
    ...
    Job2:
      name: Build Android
      steps:
        - type: gradle
          jdk-home: '%\env.JDK_17_0%'
          tasks: ':mobile:assembleDebug'
          use-gradle-wrapper: true
      files-publication:
        - path: mobile/build/outputs/apk/debug/*.apk
          share-with-jobs: false
          publish-artifact: true
      runs-on:
        self-hosted:
          - requirement: exists
            name: Android home
            parameter: env.ANDROID_HOME
      dependencies:
        - Job1
```

Job 3, iOS simulator application:

```yaml
jobs:
  Job1:
    ...
  Job2:
    ...
  Job3:
    name: Build iOS
    steps:
      - type: script
        script-content: |-
          xcodebuild build \
            -project JetcasterMigration/JetcasterMigration.xcodeproj \
            -configuration Debug \
            -scheme JetcasterMigration \
            -sdk iphonesimulator \
            -derivedDataPath ./build \
            -verbose
    files-publication:
      - path: build/Build/Products/Debug-iphonesimulator/**/*
        share-with-jobs: false
        publish-artifact: true
    dependencies:
      - Job1
```

## Options / Props

| Object | Description |
|--------|-------------|
| Build configuration | Full range of TeamCity features, settings stored as Kotlin DSL code, more customization; needs more experience and manual setup |
| Pipeline | Visual editor and editable YAML, designed for simpler workflows; introduced in TeamCity 2025.11 and lacks some build configuration functionality |

| Pipeline YAML key | Description |
|-------------------|-------------|
| `type: gradle` / `type: script` | Gradle build step / universal command-line build step |
| `tasks` | Gradle tasks to run |
| `files-publication` | Paths to publish as artifacts |
| `allow-reuse` | Skip re-running tasks if neither pipeline configuration nor source changed |
| `parallelism` | Split the test suite into batches processed on separate agents |
| `runs-on.self-hosted` | Agent requirements (for example `env.ANDROID_HOME` exists) |
| `dependencies` | Jobs that must finish successfully first |

## Notes

- The tutorial chooses pipelines because they are easier to configure and support everything required for the sample. Create a project with the plus button in the side navigation, then Connect new repository (GitHub for a reusable connection, or Any Git URL).
- Defaults leave the pipeline tracking all branches, using `main` as the default branch, and auto-triggering on every committed change.
- TeamCity Cloud uses JetBrains-hosted agents with a wide range of build tools. For On-Premises, make sure every job can run on at least one agent that has the required tools (Android SDK for Job 2, Xcode for Job 3).
- Job 2 and Job 3 depend on `Job1`, so they can run in parallel but start only after the tests finish. The Android job requirement guarantees assignment only to agents with the Android SDK.
- With build configurations, the Script step for iOS can be replaced with the specialized Xcode Project step.
- Switching from Any Git URL to a GitHub connection enables run status posting to GitHub and a Pull requests toggle; build configurations additionally enable build chains, composite configurations, Kubernetes agents, issue tracker and secret vault integrations.
- `:mobile:assembleDebug` and the Xcode project names are specific to the JetCaster sample.

## Related

- [iOS delivery pipeline with TeamCity](./ios-ci-cd-teamcity.md)
- [GitHub Actions](./github-actions.md)
