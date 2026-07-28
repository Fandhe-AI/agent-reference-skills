# rememberNavController

Composable that creates and remembers a `NavHostController`, automatically registering the `ComposeNavigator` and `DialogNavigator` needed by `NavHost`.

## Signature / Usage

```kotlin
@Composable
public expect fun rememberNavController(
    vararg navigators: Navigator<out NavDestination>
): NavHostController
```

```kotlin
val navController = rememberNavController()

NavHost(navController = navController, startDestination = Home) {
    composable<Home> { HomeScreen() }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `navigators` | `vararg Navigator<out NavDestination>` | none | Additional `Navigator` instances to register alongside the built-in Compose/Dialog navigators. |

## Notes

- Each extra `Navigator` passed in must itself be `remember`ed; changing any of the inputs recreates the `NavController`.
- Must be called at the composable level where the `NavHost` is defined so the controller survives recomposition.
- Package: `androidx.navigation.compose`.

## Related

- [NavHost](./navhost.md)
- [NavHostController](./navhostcontroller.md)
- [NavController](./navcontroller.md)
