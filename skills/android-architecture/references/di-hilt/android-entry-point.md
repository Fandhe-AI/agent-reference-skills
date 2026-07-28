# @AndroidEntryPoint

Enables field injection and generates an individual Hilt component for the annotated Android framework class.

## Signature / Usage

```kotlin
@AndroidEntryPoint
class ExampleActivity : ComponentActivity() { ... }
```

## Notes

- Supported Android classes: `Application` (via `@HiltAndroidApp`), `Activity`, `Fragment`, `View`, `Service`, `BroadcastReceiver`, and `ViewModel` (via `@HiltViewModel`).
- Only supports activities that extend `ComponentActivity` (e.g. `AppCompatActivity`).
- Android classes are injected in the following order: `Application`, then `Activity`, then `Fragment`/`View`/`Service`/`BroadcastReceiver`.
- If a `Fragment` is annotated, any `View`s it hosts must also be annotated separately.
- In Compose, annotate the root `ComponentActivity` as the single DI entry point for the whole UI hierarchy.

## Related

- [HiltAndroidApp](./hilt-android-app.md)
- [Inject](./inject.md)
- [HiltViewModel / hiltViewModel()](./hilt-view-model.md)
