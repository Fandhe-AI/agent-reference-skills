# Types of CI automation

Typical forms of automation for an Android CI system: basic jobs, instrumented tests, performance regression tests, and test coverage regression checks.

## Signature / Usage

```sh
./gradlew build   # Build job: compile from scratch
./gradlew test    # Local (host-side) tests
```

## Notes

- Basic jobs: Build (from scratch, confirms code compiles and libraries/tools are compatible); Lint or style checks (optional but recommended, static analysis keeps code reviews focused); Local (host-side) tests, which run on the build machine, usually the JVM, fast and reliable, including Robolectric tests.
- Instrumented tests need provisioning and waiting for devices to boot or connect. Options: Gradle Managed Devices (define devices such as "Pixel 2 emulator on API 27", handles provisioning); a CI-provided third-party plugin ("action", "integration", "step") for Android emulators; delegating to a device farm such as Firebase Test Lab (emulators or physical devices, high reliability).
- Performance regression tests: use the benchmark libraries. Automating them requires physical devices for consistent, realistic results.
- Benchmarks can take long; instead of running all for every merged feature or commit, consider a regularly scheduled build such as a nightly build.
- Step fitting: a rolling window of previous build results compared against the current build, combining several benchmark results into one regression-specific metric. It reduces false positives when a single build is slow and then normalizes.
- Test coverage is a useful metric but should not be the only indicator. A common regression check fails or warns when coverage goes down relative to the base branch.
- Coverage from an instrumentation test differs from that of a unit test (bigger tests typically make fewer assertions per line and have different goals); consider keeping two separate coverage metrics.
- Source: https://developer.android.com/training/testing/continuous-integration/automation

## Related

- [ci-basics](./ci-basics.md)
- [ci-features](./ci-features.md)
- [robolectric](../fundamentals-local/robolectric.md)
