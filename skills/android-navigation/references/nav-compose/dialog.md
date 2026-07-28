# dialog

`NavGraphBuilder` DSL function that adds a dialog destination to a `NavGraph`. Behaves like [composable](./composable.md), but its content is shown as an overlay `Dialog` instead of replacing the current screen.

## Signature / Usage

```kotlin
public inline fun <reified T : Any> NavGraphBuilder.dialog(
    typeMap: Map<KType, NavType<*>> = emptyMap(),
    deepLinks: List<NavDeepLink> = emptyList(),
    dialogProperties: DialogProperties = DialogProperties(),
    noinline content: @Composable (NavBackStackEntry) -> Unit,
)
```

```kotlin
navigation<Game>(startDestination = Match) {
    composable<Match> { MatchScreen() }

    dialog<ResultDialog> { backStackEntry ->
        ResultDialogScreen()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `T` (reified type param) | `Any` | — | The `@Serializable` route class/object identifying this dialog destination. |
| `typeMap` | `Map<KType, NavType<*>>` | `emptyMap()` | Custom `NavType` mappings for non-standard argument types in `T`. |
| `deepLinks` | `List<NavDeepLink>` | `emptyList()` | Deep links that resolve to this dialog. |
| `dialogProperties` | `DialogProperties` | `DialogProperties()` | Standard Compose `Dialog` properties (dismiss-on-back, dismiss-on-click-outside, etc.). |
| `content` | `@Composable (NavBackStackEntry) -> Unit` | — | The dialog's composable content, receiving its `NavBackStackEntry`. |

## Notes

- Distinct from the same-named page in the `android-compose-components` skill's `containers` category, which covers the `androidx.compose.ui.window.Dialog` composable, not a navigation destination.
- A `String`-route overload (`dialog(route: String, arguments, deepLinks, dialogProperties, content)`) exists for the legacy string-route style.
- The underlying `DialogNavigator` is registered automatically by [rememberNavController](./remembernavcontroller.md).
- Content passed to `dialog()` is provided its `LocalViewModelStoreOwner`/`LocalLifecycleOwner`/`LocalSavedStateRegistryOwner` the same way as [composable](./composable.md), via `NavBackStackEntry.LocalOwnersProvider`.
- Package: `androidx.navigation.compose`.

## Related

- [composable](./composable.md)
- [navigation](./navigation.md)
- [NavBackStackEntry](./navbackstackentry.md)
