# currentBackStackEntryAsState

Composable extension on `NavController` that exposes the current back stack entry as a Compose `State`, recomposing whenever `navigate()` or `popBackStack()` changes it.

## Signature / Usage

```kotlin
@Composable
public fun NavController.currentBackStackEntryAsState(): State<NavBackStackEntry?>
```

```kotlin
val navBackStackEntry by navController.currentBackStackEntryAsState()
val currentDestination = navBackStackEntry?.destination
```

## Notes

- Common use: driving selection state in a bottom navigation bar / navigation rail based on the active destination.
- Package: `androidx.navigation.compose`.

## Related

- [NavBackStackEntry](./navbackstackentry.md)
- [NavController](./navcontroller.md)
