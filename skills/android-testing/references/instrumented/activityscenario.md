# ActivityScenario

Cross-platform AndroidX Test API that places an activity in a particular lifecycle state to test device-level events (configuration changes, background/foreground transitions, system destruction and recreation). Provides thread-safe synchronization between the instrumentation thread and the thread running the activity under test. Usable in both local unit tests and on-device instrumented tests.

## Signature / Usage

```kotlin
@RunWith(AndroidJUnit4::class)
class MyTestSuite {
    @Test
    fun testEvent() {
        launchActivity<MyActivity>().use { scenario ->
            scenario.onActivity { activity ->
                activity.handleSwipeToRefresh()
            }
            scenario.moveToState(State.CREATED)
            scenario.recreate()
        }
    }
}
```

## Notes

- `launchActivity<A>()` (or `ActivityScenario.launch(A::class.java)`) returns a scenario with the activity in `RESUMED` state.
- `onActivity { activity -> ... }` runs a block against the current activity instance; don't retain the passed-in activity reference outside the block, since it may become stale after recreation.
- `moveToState(State)` transitions to `CREATED`, `STARTED`, or `RESUMED`; moving to the current state is a no-op, not an exception.
- `recreate()` simulates the system destroying and recreating the activity due to low resources; saved instance state and `@NonConfigurationInstance`-annotated objects are preserved into the new instance.
- All `ActivityScenario` methods are blocking calls and must run on the instrumentation thread.
- Implements `Closeable`; use Kotlin's `.use { }` extension, or call `close()` explicitly, so resources are released and stability improves.
- For Compose activities, `createAndroidComposeRule<A>()` wraps an `ActivityScenario` accessible via `composeTestRule.activityRule.scenario`.
- Gradle dependency: `androidx.test:core`.

## Related

- [ActivityScenarioRule](./activityscenariorule.md)
- [FragmentScenario](./fragmentscenario.md)
