# rememberSaveableStateHolderNavEntryDecorator

Built-in `NavEntryDecorator` that retains a `NavEntry`'s state through configuration changes and process death by wrapping its content in a `SaveableStateProvider`, enabling `rememberSaveable` inside `NavEntry` content.

## Signature / Usage

```kotlin
@Composable
public fun <T : Any> rememberSaveableStateHolderNavEntryDecorator(
    saveableStateHolder: SaveableStateHolder = rememberSaveableStateHolder()
): SaveableStateHolderNavEntryDecorator<T>
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
| `saveableStateHolder` | `SaveableStateHolder` | `rememberSaveableStateHolder()` | Holder that scopes the saved state per `NavEntry`. |

## Notes

- Included in `NavDisplay`'s default `entryDecorators` list, so it applies automatically unless `entryDecorators` is overridden.
- If `entryDecorators` is overridden, keep this decorator first (or otherwise ensure a `SaveableStateProvider` is supplied) so `rememberSaveable` works inside entry content.
- Package: `androidx.navigation3.runtime` (module `androidx.navigation3:navigation3-runtime`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [NavEntryDecorator](./naventrydecorator.md)
- [rememberViewModelStoreNavEntryDecorator](./rememberviewmodelstorenaventrydecorator.md)
- [NavDisplay](./navdisplay.md)
