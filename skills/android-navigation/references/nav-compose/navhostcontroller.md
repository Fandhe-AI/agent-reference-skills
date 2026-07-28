# NavHostController

`NavController` subclass with additional APIs required to integrate a `NavController` with a hosting environment (lifecycle, view model storage). Returned by [rememberNavController](./remembernavcontroller.md) and passed into [NavHost](./navhost.md).

## Signature / Usage

```kotlin
public expect open class NavHostController : NavController
```

```kotlin
@Composable
fun MyAppNavHost(
    navController: NavHostController = rememberNavController(),
    startDestination: Any = Home,
) {
    NavHost(navController = navController, startDestination = startDestination) {
        composable<Home> { HomeScreen() }
    }
}
```

## Notes

- Application code virtually never instantiates `NavHostController` directly; use [rememberNavController](./remembernavcontroller.md) instead.
- Exposing `NavHostController` as a default parameter (as above) is a common pattern for making a screen's `NavHost` testable/previewable.
- Package: `androidx.navigation`.

## Related

- [rememberNavController](./remembernavcontroller.md)
- [NavHost](./navhost.md)
- [NavController](./navcontroller.md)
