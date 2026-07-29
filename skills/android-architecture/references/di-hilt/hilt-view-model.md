# @HiltViewModel / hiltViewModel()

`@HiltViewModel` marks a `ViewModel` as injectable by Hilt; `hiltViewModel()` retrieves a Hilt-provided `ViewModel` instance scoped to the current navigation destination in Compose.

## Signature / Usage

```kotlin
@HiltViewModel
class ExampleViewModel @Inject constructor(
  private val savedStateHandle: SavedStateHandle,
  private val repository: ExampleRepository
) : ViewModel() { ... }
```

```kotlin
// In Jetpack Compose
val viewModel = hiltViewModel()
```

```kotlin
// In an Activity (non-Compose)
@AndroidEntryPoint
class ExampleActivity : AppCompatActivity() {
  private val exampleViewModel: ExampleViewModel by viewModels()
}
```

## Notes

- The `ViewModel` constructor must be annotated with `@Inject`, and the class with `@HiltViewModel`.
- All Hilt `ViewModel`s are provided by `ViewModelComponent`; use `@ViewModelScoped` to scope a dependency to a single `ViewModel` instance.
- With Navigation Compose, `hiltViewModel()` automatically scopes the `ViewModel` to the current navigation destination.
- With Navigation 3, use `rememberViewModelStoreNavEntryDecorator()` together with `hiltViewModel()` inside the entry provider.
- Assisted injection is supported via `@HiltViewModel(assistedFactory = ...)` combined with `@AssistedInject` / `@Assisted` / `@AssistedFactory` for passing runtime arguments alongside Hilt-managed dependencies.
- `WorkManager` and Fragment-based Navigation integration (`@HiltWorker`, `hiltNavGraphViewModels`) are covered in Use Hilt with other Jetpack libraries.

## Related

- [AndroidEntryPoint](./android-entry-point.md)
- [Hilt components and scopes](./hilt-components-scopes.md)
- [Use Hilt with other Jetpack libraries](./hilt-jetpack.md)
