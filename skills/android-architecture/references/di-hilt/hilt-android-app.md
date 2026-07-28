# @HiltAndroidApp

Triggers Hilt's code generation, including a base class for the application that serves as the app-level dependency container.

## Signature / Usage

```kotlin
@HiltAndroidApp
class ExampleApplication : Application() { ... }
```

## Notes

- Must be applied to the `Application` class (or a class extending `Application`).
- The generated Hilt component is attached to the `Application` object's lifecycle and provides dependencies to it.
- Any other Hilt-annotated classes in the app depend on this being present, so it must be applied first.

## Related

- [AndroidEntryPoint](./android-entry-point.md)
- [Hilt components and scopes](./hilt-components-scopes.md)
