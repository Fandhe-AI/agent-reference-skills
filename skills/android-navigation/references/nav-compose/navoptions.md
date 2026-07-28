# NavOptions

Configuration object controlling back-stack behavior for a `NavController.navigate()` call: which destinations to pop, whether to avoid duplicate top entries, and whether to restore previously saved state.

## Signature / Usage

```kotlin
navController.navigate(route = B) {
    popUpTo<A> {
        inclusive = true
        saveState = true
    }
    restoreState = true
    launchSingleTop = true
}
```

```kotlin
// String-route DSL equivalent
navController.navigate("destination_b") {
    popUpTo("destination_a") { inclusive = true }
    launchSingleTop = true
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `popUpTo` | `T` / `KClass<T>` / route `String` | none | Destination to pop the back stack up to before navigating. |
| `inclusive` | `Boolean` | `false` | If `true`, also pops the `popUpTo` destination itself. |
| `saveState` | `Boolean` | `false` | If `true`, saves the state of popped destinations for later `restoreState`. |
| `restoreState` | `Boolean` | `false` | If `true`, restores previously `saveState`-saved state for the destination being navigated to, instead of creating a new instance. |
| `launchSingleTop` | `Boolean` | `false` | If `true`, does not create a new instance if the target is already at the top of the back stack. |

## Notes

- Built inline via the `NavOptionsBuilder` lambda on `navController.navigate(route) { ... }`, or explicitly via `NavOptions.Builder()` (Views/Fragments, Java-friendly).
- `popUpTo<A> { ... }` uses the type-safe route class; the string-DSL form uses `popUpTo("route") { ... }`.
- The `anim`/`enterAnim`/`exitAnim` XML-style animation attributes on `NavOptions` are not usable from Navigation Compose; use `composable`'s transition lambdas instead.
- Package: `androidx.navigation`.

## Related

- [NavController](./navcontroller.md)
- [popBackStack](./popbackstack.md)
- [navigation](./navigation.md)
