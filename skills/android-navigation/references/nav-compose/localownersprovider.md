# NavBackStackEntry.LocalOwnersProvider

Composable extension on `NavBackStackEntry` that provides it as `LocalViewModelStoreOwner`, `LocalLifecycleOwner`, and `LocalSavedStateRegistryOwner` for its `content`. Used internally by [NavHost](./navhost.md) to give each destination's content the correct scoping, and available for custom navigation host implementations.

## Signature / Usage

```kotlin
@Composable
public fun NavBackStackEntry.LocalOwnersProvider(
    content: @Composable () -> Unit,
)
```

```kotlin
backStackEntry.LocalOwnersProvider {
    DestinationContent()
}
```

## Notes

- Only needed when building a custom navigation host; [NavHost](./navhost.md) already applies this for every registered destination.
- Package: `androidx.navigation.compose`.

## Related

- [NavHost](./navhost.md)
- [NavBackStackEntry](./navbackstackentry.md)
