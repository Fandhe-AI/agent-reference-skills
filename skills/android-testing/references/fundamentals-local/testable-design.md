# Testable Design (DI and Constructor Injection)

Code becomes easy to unit test by layering (presentation/domain/data), keeping business logic out of framework-bound classes, and injecting dependencies through constructors as interfaces instead of concrete implementations.

## Signature / Usage

```kotlin
class HomeViewModel(
    private val userRepository: UserRepository, // interface, injected
) : ViewModel() { /* ... */ }

// Test: inject a fake instead of the real repository
val viewModel = HomeViewModel(FakeUserRepository)
```

## Notes

- Split the app into presentation, domain, and data layers; move business logic into composables, `ViewModel`s, or domain/use-case classes rather than `Activity`/`Fragment`.
- Avoid direct Android framework dependencies (e.g. `Context`) in business logic — pass abstractions instead.
- Depend on interfaces, not concrete implementations, so a [fake test double](./test-doubles.md) can be substituted at test time.
- Apply dependency injection (e.g. Hilt) to make this replacement automatic; this matters most for large end-to-end and instrumented UI tests where manual wiring is costly.
- Hilt's own testing APIs (`@HiltAndroidTest`, etc.) are covered by the `android-architecture` skill's `di-hilt/hilt-testing.md` — not duplicated here.

## Related

- [test-doubles](./test-doubles.md)
- [test-pyramid](./test-pyramid.md)
- [viewmodel-testing](./viewmodel-testing.md)
