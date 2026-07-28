# instrumented

| Name | Description | Path |
| --- | --- | --- |
| AndroidJUnit4 / AndroidJUnitRunner | JUnit 4 instrumentation test runner and `@RunWith` runner class. | [androidjunit4-test-runner.md](./androidjunit4-test-runner.md) |
| Set up project for AndroidX Test | Gradle dependencies and `testInstrumentationRunner` configuration. | [set-up-project.md](./set-up-project.md) |
| InstrumentationRegistry | Low-level access to `Instrumentation`, contexts, and command-line arguments. | [instrumentationregistry.md](./instrumentationregistry.md) |
| ApplicationProvider | Returns the application `Context` under `AndroidJUnitRunner`. | [applicationprovider.md](./applicationprovider.md) |
| ActivityScenario | Thread-safe activity lifecycle control for tests. | [activityscenario.md](./activityscenario.md) |
| ActivityScenarioRule | JUnit rule wrapping `ActivityScenario` for single-activity tests. | [activityscenariorule.md](./activityscenariorule.md) |
| FragmentScenario / launchFragmentInContainer | Launches and drives a fragment's lifecycle in isolation. | [fragmentscenario.md](./fragmentscenario.md) |
| ServiceTestRule | JUnit rule to start/bind and clean up a `Service` under test. | [servicetestrule.md](./servicetestrule.md) |
| UI Automator | Cross-app UI testing framework (`UiDevice` / `By` / `UiObject2` / `until`). | [uiautomator.md](./uiautomator.md) |
| Test filter annotations | `@SmallTest` / `@MediumTest` / `@LargeTest` / `@SdkSuppress` / `@FlakyTest`. | [test-filter-annotations.md](./test-filter-annotations.md) |
| GrantPermissionRule | JUnit rule granting runtime permissions before test execution. | [grantpermissionrule.md](./grantpermissionrule.md) |
| AndroidTestOrchestrator | Runs each test in its own `Instrumentation` instance for isolation. | [androidtestorchestrator.md](./androidtestorchestrator.md) |
| Screenshot testing | Golden-image UI comparison testing (see compose-testing for Compose Preview screenshot tests). | [screenshot-testing.md](./screenshot-testing.md) |
| Gradle managed devices | Gradle-plugin-managed virtual/physical devices for scaled instrumented test runs. | [gradle-managed-devices.md](./gradle-managed-devices.md) |
