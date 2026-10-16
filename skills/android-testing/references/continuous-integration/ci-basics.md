# Continuous Integration basics

Continuous Integration (CI) is a practice where developers frequently merge code changes into a central repository, after which automated builds and tests run. A basic CI system blocks changes that would break the build; an advanced one tests the app across API levels, screen sizes, and platforms.

## Signature / Usage

Typical CI pipeline (commands from the source):

```sh
./gradlew build   # build the project
./gradlew test    # run local tests
```

Workflow steps:

1. The CI system detects a change, usually when a developer creates a pull request ("change list" / "merge request").
2. It provisions and initializes a server to run the workflow.
3. It fetches the code, plus tools such as the Android SDK or emulator images if needed.
4. It builds the project (for example `./gradlew build`).
5. It runs the local tests (for example `./gradlew test`).
6. It starts emulators and runs the instrumented tests.
7. It uploads artifacts such as test results and APKs.

## Notes

- Guidelines are generic and apply to the majority of CI solutions.
- Benefits listed in the source: improved software quality (problems found early), reduced risk of broken builds, increased confidence in releases, improved communication and collaboration, increased productivity through automation.
- Source: https://developer.android.com/training/testing/continuous-integration

## Related

- [ci-automation](./ci-automation.md)
- [ci-features](./ci-features.md)
- [test-pyramid](../fundamentals-local/test-pyramid.md)
