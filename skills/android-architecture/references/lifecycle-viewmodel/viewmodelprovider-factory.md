# ViewModelProvider.Factory / viewModelFactory

Mechanism for instantiating `ViewModel`s that take constructor dependencies. Required unless the ViewModel has a no-arg constructor or takes only a `SavedStateHandle`. `viewModelFactory { }` is the Kotlin DSL for building a `Factory` from `initializer { }` blocks driven by `CreationExtras`.

## Signature / Usage

```kotlin
interface ViewModelProvider.Factory {
    fun <T : ViewModel> create(modelClass: KClass<T>, extras: CreationExtras): T
}

fun viewModelFactory(builder: ViewModelFactoryBuilder.() -> Unit): ViewModelProvider.Factory
inline fun <reified VM : ViewModel> ViewModelFactoryBuilder.initializer(
    noinline initializer: CreationExtras.() -> VM,
)
```

```kotlin
class MyViewModel(
    private val myRepository: MyRepository,
    private val savedStateHandle: SavedStateHandle,
) : ViewModel() {
    companion object {
        val Factory: ViewModelProvider.Factory = viewModelFactory {
            initializer {
                val savedStateHandle = createSavedStateHandle()
                val app = this[APPLICATION_KEY] as MyApplication
                MyViewModel(app.myRepository, savedStateHandle)
            }
        }
    }
}

// Compose:
val viewModel: MyViewModel = viewModel(factory = MyViewModel.Factory)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `create(modelClass, extras)` | function | — | Instantiates a ViewModel of `modelClass` using data available in `extras`. |
| `CreationExtras[APPLICATION_KEY]` | key | — | The `Application` instance. |
| `CreationExtras[VIEW_MODEL_KEY]` | key | — | Custom key passed to `ViewModelProvider.get(key, ...)`. |
| `CreationExtras[DEFAULT_ARGS_KEY]` | key | — | `Bundle` of arguments used to build a `SavedStateHandle`. |
| `CreationExtras[SAVED_STATE_REGISTRY_OWNER_KEY]` | key | — | The `SavedStateRegistryOwner`. |
| `CreationExtras[VIEW_MODEL_STORE_OWNER_KEY]` | key | — | The `ViewModelStoreOwner`. |
| `CreationExtras.createSavedStateHandle()` | function | — | Creates a new `SavedStateHandle` from the extras. |

## Notes

- Not needed when using Hilt: `@HiltViewModel`-annotated classes get a generated factory automatically.
- `ViewModelProvider.create(owner, factory, extras)` and `ViewModelProvider.create(store, factory, extras)` build a `ViewModelProvider`; `provider[ModelClass::class]` retrieves/creates the cached instance.
- For custom dependencies unavailable via `APPLICATION_KEY` (e.g. Kotlin Multiplatform), define a custom `CreationExtras.Key<T>()` and supply it via `MutableCreationExtras`.
- Package: `androidx.lifecycle` / `androidx.lifecycle.viewmodel` (module `lifecycle-viewmodel`).

## Related

- [ViewModel](./viewmodel.md)
- [viewModel() (Compose)](./viewmodel-compose.md)
- [SavedStateHandle](./savedstatehandle.md)
- [AndroidViewModel](./androidviewmodel.md)
