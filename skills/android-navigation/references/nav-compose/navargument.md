# navArgument

Builder function that creates a `NamedNavArgument`, describing one argument (its `NavType`, nullability, default value) for a legacy `String`-route destination.

## Signature / Usage

```kotlin
public fun navArgument(name: String, builder: NavArgumentBuilder.() -> Unit): NamedNavArgument
```

```kotlin
composable(
    route = "details/{itemId}",
    arguments = listOf(
        navArgument("itemId") { type = NavType.IntType },
    ),
) { backStackEntry ->
    val itemId = backStackEntry.arguments?.getInt("itemId")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `String` | — | The argument's key, matching a `{name}` placeholder in the route string. |
| `builder` | `NavArgumentBuilder.() -> Unit` | — | DSL block configuring the resulting `NavArgument`. |

`NavArgumentBuilder` (inside `builder`):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `NavType<*>` | throws if read before set | The argument's `NavType`. Throws `IllegalStateException` if accessed without first being assigned. |
| `nullable` | `Boolean` | `false` | Whether the argument accepts `null`. |
| `defaultValue` | `Any?` | `null` | Default value used when the argument is omitted from the route. |

## Notes

- Used with the `String`-route overloads of `composable`/`dialog`/`navigation` (`arguments: List<NamedNavArgument>`); type-safe routes (`@Serializable` classes) infer arguments automatically and do not need `navArgument`.
- Package: `androidx.navigation` (`navigation-common` artifact).

## Related

- [NavType](./navtype.md)
- [Type-Safe Routes](./type-safe-routes.md)
- [composable](./composable.md)
