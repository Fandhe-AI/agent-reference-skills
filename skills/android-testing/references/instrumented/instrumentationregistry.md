# InstrumentationRegistry

Provides access to low-level instrumentation APIs: the running `Instrumentation` object, the test app and target app `Context`s, and command-line arguments passed to the test. Primarily intended for tools implementers; most tests should prefer `ApplicationProvider.getApplicationContext()` for app context access.

## Signature / Usage

```java
InstrumentationRegistry.getInstrumentation()    // Instrumentation currently running
InstrumentationRegistry.getArguments()          // Command-line arguments (Bundle)
InstrumentationRegistry.getContext()            // Context of the test app's package
InstrumentationRegistry.getTargetContext()      // Context of the app under test
```

## Notes

- Gradle dependency: `androidx.test:runner`.
- Requires `AndroidJUnitRunner` (or a compatible instrumentation runner) to be configured as `testInstrumentationRunner`.

## Related

- [ApplicationProvider](./applicationprovider.md)
- [AndroidJUnit4 / AndroidJUnitRunner](./androidjunit4-test-runner.md)
