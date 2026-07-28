# ApplicationProvider

Returns the `Context` of the application under test when running with `AndroidJUnitRunner`. If the app has a custom `Application` subclass, returns that subclass's context.

## Signature / Usage

```kotlin
val context = ApplicationProvider.getApplicationContext<Context>()
```

```kotlin
serviceRule.startService(
    Intent(ApplicationProvider.getApplicationContext(), MyService::class.java)
)
```

## Notes

- Preferred over `InstrumentationRegistry.getTargetContext()` for obtaining application context in tests.
- Gradle dependency: `androidx.test:core`.

## Related

- [InstrumentationRegistry](./instrumentationregistry.md)
- [ServiceTestRule](./servicetestrule.md)
