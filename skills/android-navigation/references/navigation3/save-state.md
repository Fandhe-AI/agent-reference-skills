# Save and manage navigation state

Strategies for saving the back stack (`rememberNavBackStack`, or a `ViewModel` / custom storage) and for scoping `ViewModel` instances to individual `NavEntry` objects.

## Signature / Usage

```kotlin
@Serializable
data object Home : NavKey

@Composable
fun NavBackStack() {
    val backStack = rememberNavBackStack(Home)
}
```

Preserve a custom `NavKey` subtype:

```kotlin
@Serializable
sealed interface MyAppNavKey : NavKey

@Serializable
data object ScreenA: MyAppNavKey

@Serializable
data class ScreenB(val id: String): MyAppNavKey

@Composable
fun rememberMyAppNavBackStack(vararg elements: MyAppNavKey): NavBackStack<MyAppNavKey> {
    return rememberSerializable(serializer = serializer()) {
        NavBackStack(*elements)
    }
}

@Composable
fun MyApp() {
    // defaultNavBackStack is NavBackStack<NavKey>
    val defaultNavBackStack = rememberNavBackStack(ScreenA)
    // myAppNavBackStack is NavBackStack<MyAppNavKey>
    val myAppNavBackStack = rememberMyAppNavBackStack(ScreenA)
}
```

Scope a `ViewModel` to each `NavEntry`:

```kotlin
NavDisplay(
    entryDecorators = listOf(
        // Add the default decorators for managing scenes and saving state
        rememberSaveableStateHolderNavEntryDecorator(),
        // Then add the view model store decorator
        rememberViewModelStoreNavEntryDecorator()
    ),
    backStack = backStack,
    entryProvider = entryProvider { },
)
```

## Options / Props

| Requirement | Description |
|-------------|-------------|
| Implement `NavKey` | Every key in a `rememberNavBackStack` back stack must implement the `NavKey` marker interface, signalling the key can be saved. |
| `@Serializable` | Key classes and objects must also carry the `@Serializable` annotation. |

## Notes

- In Navigation 3 you own the back stack, so there are no strict guidelines for creating or saving it; `rememberNavBackStack` is a convenience that persists across configuration changes and process death.
- `rememberNavBackStack` returns `NavBackStack<NavKey>`; use a custom remember function (as above) to keep a subtype. For open polymorphism see [`NavBackStackSamples.kt`](https://github.com/androidx/androidx/blob/811e8c9c37f4955d520fe0cf7e39d96866066abc/navigation3/navigation3-runtime/samples/src/main/kotlin/androidx/navigation3/runtime/samples/NavBackStackSamples.kt) (pinned commit 811e8c9).
- Alternative: store the back stack in a `ViewModel`. For process-death persistence you must make keys serializable and manually save/restore the serialized keys (e.g. `SharedPreferences`, database, file).
- By default a `ViewModel` is scoped to the nearest `ViewModelStoreOwner` (typically `Activity` / `Fragment`). The `androidx.lifecycle:lifecycle-viewmodel-navigation3` decorator provides a `ViewModelStoreOwner` per `NavEntry`, so `viewModel()` inside the entry is created when the entry is added and cleared when it is popped.
- Steps: add the `lifecycle-viewmodel-navigation3` dependency, add `rememberSaveableStateHolderNavEntryDecorator()` to `entryDecorators`, then add `rememberViewModelStoreNavEntryDecorator()`.
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.
- Source: https://developer.android.com/guide/navigation/navigation-3/save-state (retrieved 2026-10-17; Navigation 3 1.2.0)

## Related

- [NavBackStack](./navbackstack.md)
- [NavKey](./navkey.md)
- [NavEntryDecorator](./naventrydecorator.md)
- [rememberSaveableStateHolderNavEntryDecorator](./remembersaveablestateholdernaventrydecorator.md)
- [rememberViewModelStoreNavEntryDecorator](./rememberviewmodelstorenaventrydecorator.md)
- [Get started with Navigation 3](./get-started.md)
