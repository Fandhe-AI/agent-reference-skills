# ServiceTestRule

JUnit 4 rule that simplifies launching and managing a `Service` during instrumented tests. Starts or binds the service before the test and automatically stops or unbinds it after the test and any `@After` methods complete.

## Signature / Usage

```kotlin
@RunWith(AndroidJUnit4::class)
@MediumTest
class MyServiceTest {
    @get:Rule
    val serviceRule = ServiceTestRule()

    @Test
    fun testWithStartedService() {
        serviceRule.startService(
            Intent(ApplicationProvider.getApplicationContext(), MyService::class.java)
        )
        // test code
    }

    @Test
    fun testWithBoundService() {
        val binder = serviceRule.bindService(
            Intent(ApplicationProvider.getApplicationContext(), MyService::class.java)
        )
        val service = (binder as MyService.LocalBinder).service
        assertThat(service.doSomethingToReturnTrue()).isTrue()
    }
}
```

## Notes

- `startService(intent: Intent)` starts the service and waits for it to start.
- `bindService(intent: Intent)` binds the service and returns an `IBinder`.
- Does not support `IntentService`, since it self-destroys once `onHandleIntent(Intent)` finishes.
- Gradle dependency: `androidx.test:rules`.

## Related

- [ApplicationProvider](./applicationprovider.md)
- [ActivityScenarioRule](./activityscenariorule.md)
