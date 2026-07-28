# @Inject

Requests a dependency from the Hilt dependency graph, either through constructor injection or field injection.

## Signature / Usage

```kotlin
// Constructor injection
class AnalyticsAdapter @Inject constructor(
  private val service: AnalyticsService
) { ... }
```

```kotlin
// Field injection (Android framework classes only)
@AndroidEntryPoint
class ExampleActivity : ComponentActivity() {
  @Inject lateinit var analytics: AnalyticsAdapter
  ...
}
```

## Notes

- Constructor injection is preferred: annotating the constructor with `@Inject` tells Hilt how to provide instances of that class and also makes the class's own dependencies available to Hilt.
- Field injection is required for classes instantiated by the Android system (`Activity`, `Fragment`, etc.); the enclosing class must also be annotated with `@AndroidEntryPoint`.
- Fields injected by Hilt cannot be `private`.
- Predefined qualifiers `@ApplicationContext` and `@ActivityContext` can be injected alongside other dependencies to obtain the corresponding `Context`.

## Related

- [AndroidEntryPoint](./android-entry-point.md)
- [Provides](./provides.md)
- [Binds](./binds.md)
- [Qualifier / @Named](./qualifier-named.md)
