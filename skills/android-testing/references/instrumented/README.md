# instrumented

| Name | Description | Path |
|------|-------------|------|
| ActivityScenario | Cross-platform AndroidX Test API that places an activity in a particular lifecycle state to test device-level events. | [activityscenario.md](./activityscenario.md) |
| ActivityScenarioRule | JUnit 4 rule that provides functional testing of a single activity by wrapping `ActivityScenario`. | [activityscenariorule.md](./activityscenariorule.md) |
| AndroidJUnit4 / AndroidJUnitRunner | `AndroidJUnitRunner` is the AndroidX Test instrumentation test runner; `AndroidJUnit4` is the JUnit 4 test runner class. | [androidjunit4-test-runner.md](./androidjunit4-test-runner.md) |
| AndroidTestOrchestrator | Runs each instrumented test in its own `Instrumentation` instance, isolating tests from shared state and crashes. | [androidtestorchestrator.md](./androidtestorchestrator.md) |
| ApplicationProvider | Returns the `Context` of the application under test when running with `AndroidJUnitRunner`. | [applicationprovider.md](./applicationprovider.md) |
| Testing content providers | Instrumented testing of a `ContentProvider` in isolation without touching actual user data. | [content-provider-testing.md](./content-provider-testing.md) |
| FragmentScenario / launchFragmentInContainer | Creates a fragment and drives it through lifecycle states in isolation without depending on hosting activity. | [fragmentscenario.md](./fragmentscenario.md) |
| Gradle managed devices | Build-managed devices let the Android Gradle plugin fully own lifecycle (create, deploy, teardown) of virtual/physical devices. | [gradle-managed-devices.md](./gradle-managed-devices.md) |
| GrantPermissionRule | JUnit 4 rule that grants runtime permissions before test execution on API 23+ to prevent permission dialogs. | [grantpermissionrule.md](./grantpermissionrule.md) |
| InstrumentationRegistry | Provides access to low-level instrumentation APIs: `Instrumentation`, `Context`s, and command-line arguments. | [instrumentationregistry.md](./instrumentationregistry.md) |
| Screenshot testing | Screenshot tests capture rendered UI and compare it against previously-approved reference ("golden") images. | [screenshot-testing.md](./screenshot-testing.md) |
| ServiceTestRule | JUnit 4 rule that simplifies launching and managing a `Service` during instrumented tests. | [servicetestrule.md](./servicetestrule.md) |
| Set up project for AndroidX Test | Gradle configuration required to write and run instrumented tests with AndroidX Test. | [set-up-project.md](./set-up-project.md) |
| Test filter annotations (@SmallTest / @MediumTest / @LargeTest / @SdkSuppress / @FlakyTest) | AndroidX Test annotations to classify or conditionally run instrumented tests. | [test-filter-annotations.md](./test-filter-annotations.md) |
| Big test stability | Guidance for reducing flakiness in "big" instrumented tests (end-to-end / integration scope). | [test-stability.md](./test-stability.md) |
| UI Automator | Cross-app UI testing framework (API 18+) for building tests that interact with app and system UI. | [uiautomator.md](./uiautomator.md) |
