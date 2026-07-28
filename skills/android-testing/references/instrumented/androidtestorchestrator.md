# AndroidTestOrchestrator

Runs each instrumented test in its own `Instrumentation` instance, isolating tests from shared state and from each other's crashes, and optionally clearing app data between tests.

## Signature / Usage

```gradle
android {
    defaultConfig {
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        testInstrumentationRunnerArguments clearPackageData: 'true'
    }

    testOptions {
        execution 'ANDROIDX_TEST_ORCHESTRATOR'
    }
}

dependencies {
    androidTestImplementation 'androidx.test:runner:1.1.0'
    androidTestUtil 'androidx.test:orchestrator:1.1.0'
}
```

```bash
./gradlew connectedCheck
```

## Notes

- Minimal shared state: each test runs in its own `Instrumentation` instance.
- Isolated crashes: a crash in one test doesn't take down the rest of the suite.
- `clearPackageData: 'true'` clears all app and shared state between tests for complete cleanup.
- Gradle dependencies: `androidx.test:runner` and `androidx.test:orchestrator` (as `androidTestUtil`).

## Related

- [AndroidJUnit4 / AndroidJUnitRunner](./androidjunit4-test-runner.md)
- [Screenshot testing](./screenshot-testing.md)
