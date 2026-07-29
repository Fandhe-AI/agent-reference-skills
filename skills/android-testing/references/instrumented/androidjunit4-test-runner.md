# AndroidJUnit4 / AndroidJUnitRunner

`AndroidJUnitRunner` is the AndroidX Test instrumentation test runner that lets you run JUnit 4 instrumented tests on Android devices, including tests using Espresso, UI Automator, and Compose testing. `AndroidJUnit4` is the JUnit 4 test runner class used with `@RunWith` to enable JUnit 4 test classes and test filtering.

## Signature / Usage

```gradle
android {
    defaultConfig {
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
}
```

```kotlin
@RunWith(AndroidJUnit4::class)
@SmallTest
class LogHistoryAndroidUnitTest {
    private lateinit var logHistory: LogHistory

    @Before
    fun createLogHistory() {
        logHistory = LogHistory()
    }

    @Test
    fun logHistory_ParcelableWriteRead() {
        // test body
    }
}
```

## Notes

- `@RunWith(AndroidJUnit4::class)` is required only if the project mixes JUnit 3 and JUnit 4 libraries; otherwise `AndroidJUnitRunner` picks it up automatically.
- `AndroidJUnitRunner` is only for instrumented tests (`src/androidTest/`), not local unit tests.
- Loads the test package and app under test onto the device, executes tests, and reports results.
- Test filtering by size: `-Pandroid.testInstrumentationRunnerArguments.size=small`.
- Gradle dependencies: `androidx.test:runner`, `androidx.test:rules`.

## Related

- [InstrumentationRegistry](./instrumentationregistry.md)
- [ApplicationProvider](./applicationprovider.md)
- [Test filter annotations](./test-filter-annotations.md)
- [Set up project for AndroidX Test](./set-up-project.md)
- [JUnit4 basics](../fundamentals-local/junit4-basics.md)
