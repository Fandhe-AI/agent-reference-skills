# Big test stability

Guidance for reducing flakiness in "big" instrumented tests (end-to-end / integration scope), where asynchronous work, background loading, and animations make synchronization harder than in small unit tests. Core rule: never pause with an arbitrary sleep; wait for an explicit condition instead, and retry only as a stopgap while the root cause is fixed.

## Signature / Usage

```kotlin
// Compose: wait-until instead of Thread.sleep()
composeTestRule.waitUntilExactlyOneExists(hasText("Continue"), timeoutMillis = 5_000)

// Espresso: register an IdlingResource instead of sleeping
IdlingRegistry.getInstance().register(myIdlingResource)
```

```kotlin
// A minimal JUnit 4 rule that retries a flaky test a fixed number of times
class RetryRule(private val retryCount: Int = 3) : TestRule {
    override fun apply(base: Statement, description: Description): Statement = object : Statement() {
        override fun evaluate() {
            var lastError: Throwable? = null
            repeat(retryCount) {
                try {
                    base.evaluate()
                    return
                } catch (t: Throwable) {
                    lastError = t
                }
            }
            throw lastError!!
        }
    }
}
```

## Notes

- Root causes of flakiness in big tests: operations the test framework doesn't know about (DB loads, infinite animations, background/async work), and test statements executing before the UI has settled.
- Never use `Thread.sleep()` to wait for stabilization — fixed delays are either too slow or still flaky depending on the environment.
- Use `IdlingResource` (small UI tests, Espresso) or the Compose wait-until APIs (`waitUntil`, `waitUntilExactlyOneExists`, `waitUntilAtLeastOneExists`, `waitUntilDoesNotExist`, `waitUntilNodeCount`) in bigger UI tests to block until a specific condition is true, instead of a specific duration.
- Replace real async modules with queryable test doubles where possible: `TestDispatcher` for coroutines, `RxIdler` for RxJava.
- Prefer Espresso / Compose test APIs for UI assertions over UI Automator, which requires more manual synchronization and is less reliable for primary test flows.
- Standardize on Gradle managed devices for reproducible device state across runs — they retry automatically on device disconnection and handle emulator create/start/teardown, removing a class of environment-caused flakiness.
- Add a retry mechanism (a JUnit rule, or a CI workflow retry step) for big tests as a productivity safety net, but treat every flaky test as a bug to fix — retries mask the symptom, not the cause.
- Retries are useful at two levels: device/connection level (timeouts, lost connection, unresponsive emulator restart) and single-test level (rerun a failed test a bounded number of times).

## Related

- [Gradle managed devices](./gradle-managed-devices.md)
- [Test filter annotations](./test-filter-annotations.md)
- [IdlingResource / IdlingRegistry / CountingIdlingResource](../espresso/idling-resource.md)
- [Synchronization (Compose wait-until APIs)](../compose-testing/synchronization.md)
