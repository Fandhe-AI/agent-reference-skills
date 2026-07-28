# rememberViewModelStoreNavEntryDecorator

Built-in `NavEntryDecorator` that creates and provides a `ViewModelStoreOwner` for each `NavEntry`, so `ViewModel`s obtained inside a `NavEntry`'s content are scoped to that entry: created when the entry is added, cleared when it's removed from the back stack.

## Signature / Usage

```kotlin
public fun <T : Any> rememberViewModelStoreNavEntryDecorator(
    viewModelStoreOwner: ViewModelStoreOwner =
        checkNotNull(LocalViewModelStoreOwner.current) {
            "No ViewModelStoreOwner was provided via LocalViewModelStoreOwner"
        },
    removeViewModelStoreOnPop: () -> Boolean = { true },
): ViewModelStoreNavEntryDecorator<T>

public fun <T : Any> rememberViewModelStoreNavEntryDecorator(
    viewModelStoreProvider: ViewModelStoreProvider
): ViewModelStoreNavEntryDecorator<T>
```

```kotlin
NavDisplay(
    entryDecorators = listOf(
        rememberSaveableStateHolderNavEntryDecorator(),
        rememberViewModelStoreNavEntryDecorator()
    ),
    backStack = backStack,
    entryProvider = entryProvider { /* ... */ },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `viewModelStoreOwner` | `ViewModelStoreOwner` | `LocalViewModelStoreOwner.current` (throws if absent) | Parent owner from which per-entry `ViewModelStore`s are derived. |
| `removeViewModelStoreOnPop` | `() -> Boolean` | `{ true }` | Whether to clear the `ViewModelStore` when the owning entry is popped. |
| `viewModelStoreProvider` | `ViewModelStoreProvider` | — | Alternate overload: supply a custom provider of `ViewModelStoreOwner`s directly instead of deriving from `LocalViewModelStoreOwner`. |

## Notes

- Requires the `androidx.lifecycle:lifecycle-viewmodel-navigation3` add-on artifact (not included in `navigation3-runtime`/`navigation3-ui`).
- Not part of `NavDisplay`'s default `entryDecorators` — add it explicitly alongside `rememberSaveableStateHolderNavEntryDecorator()`.
- Package: `androidx.lifecycle.viewmodel.navigation3` (module `androidx.lifecycle:lifecycle-viewmodel-navigation3`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [NavEntryDecorator](./naventrydecorator.md)
- [rememberSaveableStateHolderNavEntryDecorator](./remembersaveablestateholdernaventrydecorator.md)
- [NavDisplay](./navdisplay.md)
