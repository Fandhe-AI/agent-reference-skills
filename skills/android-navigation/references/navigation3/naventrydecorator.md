# NavEntryDecorator

Wraps every `NavEntry` rendered by `NavDisplay` with the same composable logic — e.g. providing a `CompositionLocal`, running side effects, or cleaning up state when an entry leaves the back stack.

## Signature / Usage

```kotlin
@Immutable
public open class NavEntryDecorator<T : Any>(
    internal val onPop: (key: Any) -> Unit = {},
    internal val decorate: @Composable (entry: NavEntry<T>) -> Unit,
)
```

```kotlin
class CustomNavEntryDecorator<T : Any> : NavEntryDecorator<T>(
    decorate = { entry ->
        Log.d("Nav3", "entry ${entry.contentKey} decorated")
        entry.Content()
    },
    onPop = { contentKey -> Log.d("Nav3", "entry $contentKey popped") }
)

NavDisplay(
    entryDecorators = listOf(
        rememberSaveableStateHolderNavEntryDecorator(),
        remember { CustomNavEntryDecorator() }
    ),
    // ...
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onPop` | `(key: Any) -> Unit` | `{}` | Invoked with a `NavEntry`'s `contentKey` when the last entry with that `contentKey` has been popped and has left composition. |
| `decorate` | `@Composable (entry: NavEntry<T>) -> Unit` | — | Composable invoked per rendered `NavEntry`; must call `entry.Content()`. |

## Notes

- Use a decorator to create a dependency shared by every `NavEntry`, or to scope an object (e.g. a `ViewModel`) to individual entries. Don't use it to pass a dependency to a single `NavEntry` — pass that directly when constructing the `NavEntry` instead.
- Order matters: unless a decorator itself provides a `SaveableStateProvider`, put `rememberSaveableStateHolderNavEntryDecorator()` first in the list.
- `NavDisplay` calls `rememberDecoratedNavEntries` internally to apply `entryDecorators`; call it directly only when managing multiple back stacks that need independent decorator sets.
- Package: `androidx.navigation3.runtime` (module `androidx.navigation3:navigation3-runtime`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [rememberSaveableStateHolderNavEntryDecorator](./remembersaveablestateholdernaventrydecorator.md)
- [rememberViewModelStoreNavEntryDecorator](./rememberviewmodelstorenaventrydecorator.md)
- [NavDisplay](./navdisplay.md)
- [NavEntry](./naventry.md)
