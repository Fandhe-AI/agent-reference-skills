# viewModel()

Compose function that retrieves an existing `ViewModel` or creates a new one scoped to a `ViewModelStoreOwner`, defaulting to the current `LocalViewModelStoreOwner`.

## Signature / Usage

```kotlin
@Composable
inline fun <reified VM : ViewModel> viewModel(
    viewModelStoreOwner: ViewModelStoreOwner = checkNotNull(LocalViewModelStoreOwner.current),
    key: String? = null,
    factory: ViewModelProvider.Factory? = null,
    extras: CreationExtras = viewModelStoreOwner.defaultViewModelCreationExtras,
): VM

@Composable
inline fun <reified VM : ViewModel> viewModel(
    viewModelStoreOwner: ViewModelStoreOwner = checkNotNull(LocalViewModelStoreOwner.current),
    key: String? = null,
    noinline initializer: CreationExtras.() -> VM,
): VM
```

```kotlin
@Composable
fun DiceRollScreen(viewModel: DiceRollViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    // ...
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `viewModelStoreOwner` | `ViewModelStoreOwner` | `LocalViewModelStoreOwner.current` | Controls the scope and lifetime of the returned ViewModel. |
| `key` | `String?` | `null` | Identifier distinguishing multiple ViewModels of the same class within one owner. |
| `factory` | `ViewModelProvider.Factory?` | `null` | Custom factory; falls back to the owner's default factory when `null`. |
| `extras` | `CreationExtras` | `viewModelStoreOwner.defaultViewModelCreationExtras` | Extra creation parameters made available to the factory. |
| `modelClass` | `KClass<VM>` | — | Explicit ViewModel type (overload without `reified`). |
| `initializer` | `CreationExtras.() -> VM` | — | Lambda-based construction, alternative to `factory`. |

## Notes

- Package: `androidx.lifecycle.viewmodel.compose` (module `lifecycle-viewmodel-compose`).
- Throws if no `LocalViewModelStoreOwner` is provided and `viewModelStoreOwner` is not passed explicitly.
- Use `key` to host multiple instances of the same ViewModel class (e.g. per list item).

## Related

- [ViewModel](./viewmodel.md)
- [ViewModelProvider.Factory](./viewmodelprovider-factory.md)
- [LocalLifecycleOwner](./locallifecycleowner.md)
- [ViewModelStoreProvider](./viewmodelstoreprovider.md)
