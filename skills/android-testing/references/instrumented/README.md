# instrumented

| Name | Description | Path |
|------|-------------|------|
| ActivityScenario | Cross-platform AndroidX Test API that places an activity in a particular lifecycle state to test device-level events such as configuration changes | [activityscenario.md](./activityscenario.md) |
| ActivityScenarioRule | JUnit 4 rule that provides functional testing of a single activity by wrapping `ActivityScenario` | [activityscenariorule.md](./activityscenariorule.md) |
| AndroidJUnit4 / AndroidJUnitRunner | `AndroidJUnitRunner` is the AndroidX Test instrumentation runner for JUnit 4 instrumented tests, including Espresso, UI Automator, and Compose tests | [androidjunit4-test-runner.md](./androidjunit4-test-runner.md) |
| AndroidTestOrchestrator | Runs each instrumented test in its own `Instrumentation` instance, isolating tests from shared state and from each other's crashes | [androidtestorchestrator.md](./androidtestorchestrator.md) |
| ApplicationProvider | Returns the `Context` of the application under test when running with `AndroidJUnitRunner` | [applicationprovider.md](./applicationprovider.md) |
| Testing content providers | Instrumented testing of a `ContentProvider` in isolation, so tests exercise real query/insert/update/delete/getType logic without touching user data | [content-provider-testing.md](./content-provider-testing.md) |
| FragmentScenario / launchFragmentInContainer | `FragmentScenario` (AndroidX `fragment-testing`) drives a fragment through lifecycle states without a real hosting activity; `launchFragmentInContainer` is for UI tests | [fragmentscenario.md](./fragmentscenario.md) |
| Gradle managed devices | Build-managed devices let the Android Gradle plugin own the lifecycle of virtual or remote test devices declared in Gradle files (API 27+) | [gradle-managed-devices.md](./gradle-managed-devices.md) |
| GrantPermissionRule | JUnit 4 rule that grants one or more runtime permissions before test execution on API 23+, so the permission dialog never blocks the app | [grantpermissionrule.md](./grantpermissionrule.md) |
| InstrumentationRegistry | Provides access to low-level instrumentation APIs (the `Instrumentation` object, app `Context`s, test arguments), primarily for tools implementers | [instrumentationregistry.md](./instrumentationregistry.md) |
| Screenshot testing | Screenshot tests capture a rendered UI and compare it against an approved reference (golden) image; the test fails if the images differ beyond tolerance | [screenshot-testing.md](./screenshot-testing.md) |
| ServiceTestRule | JUnit 4 rule that simplifies launching and managing a `Service` during instrumented tests, stopping or unbinding it after the test | [servicetestrule.md](./servicetestrule.md) |
| Set up project for AndroidX Test | Gradle configuration required to write and run instrumented tests with AndroidX Test | [set-up-project.md](./set-up-project.md) |
| Test filter annotations (@SmallTest / @MediumTest / @LargeTest / @SdkSuppress / @FlakyTest) | AndroidX Test annotations used to classify or conditionally run instrumented tests, so subsets can be selected for execution | [test-filter-annotations.md](./test-filter-annotations.md) |
| Big test stability | Guidance for reducing flakiness in end-to-end and integration instrumented tests: never pause with an arbitrary sleep, wait for an explicit condition instead | [test-stability.md](./test-stability.md) |
| Automate UI tests | UI tests launch an app (or part of it), simulate user interactions, and check that the app reacted appropriately | [ui-tests.md](./ui-tests.md) |
| UI Automator | Cross-app UI testing framework (API 18+) for tests that interact with the app under test and with other apps or system UI such as notifications | [uiautomator.md](./uiautomator.md) |
