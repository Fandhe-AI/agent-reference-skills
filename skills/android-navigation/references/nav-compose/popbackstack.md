# popBackStack

Pops the current destination off the `NavController`'s back stack, navigating to the previous destination (or specific destination/route when given arguments).

## Signature / Usage

```kotlin
@MainThread
public open fun popBackStack(): Boolean

@MainThread
public inline fun <reified T : Any> popBackStack(
    inclusive: Boolean,
    saveState: Boolean = false,
): Boolean

@MainThread
public fun popBackStack(
    route: String,
    inclusive: Boolean,
    saveState: Boolean = false,
): Boolean
```

```kotlin
if (!navController.popBackStack()) {
    // Back stack was already empty (start destination was popped); finish the Activity.
    finish()
}

// Pop up to (and including) a specific route
navController.popBackStack<Match>(inclusive = true)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `T` (reified type param, typed overload) | `Any` | — | Route class to pop up to. |
| `route` | `String` | — | String route to pop up to (legacy string-route style). |
| `inclusive` | `Boolean` | — | If `true`, also pops the specified destination itself. |
| `saveState` | `Boolean` | `false` | If `true`, saves the state of the popped destination(s) for a later `restoreState` navigation. |

## Notes

- Returns `false` when nothing was popped (e.g. the back stack held only the start destination).
- Equivalent to configuring `popUpTo` on a `navigate()` call, but performed immediately without navigating to a new destination.
- Package: `androidx.navigation`.

## Related

- [NavController](./navcontroller.md)
- [NavOptions](./navoptions.md)
- [currentBackStackEntryAsState](./currentbackstackentryasstate.md)
