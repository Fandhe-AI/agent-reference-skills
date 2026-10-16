# NavBackStack / rememberNavBackStack

`NavBackStack` is a `MutableList<T : NavKey>` backed by a Compose `SnapshotStateList`, so mutations (`add`, `removeLastOrNull`, `+=`) automatically trigger recomposition. `rememberNavBackStack` creates and remembers one, restoring it across configuration changes and process death.

## Signature / Usage

```kotlin
public class NavBackStack<T : NavKey> public constructor(internal val base: SnapshotStateList<T>) :
    MutableList<T> by base, StateObject by base, RandomAccess by base {

    public constructor() : this(base = mutableStateListOf())
    public constructor(vararg elements: T) : this(base = mutableStateListOf(*elements))
}

// Android-specific overload (uses reflection, no explicit SavedStateConfiguration needed)
@Composable
public fun rememberNavBackStack(vararg elements: NavKey): NavBackStack<NavKey>

// Common overload, requires an explicit SerializersModule registering all NavKey subtypes
@Composable
public fun rememberNavBackStack(
    configuration: SavedStateConfiguration,
    vararg elements: NavKey,
): NavBackStack<NavKey>
```

```kotlin
val backStack = rememberNavBackStack(Home)

backStack.add(Product(id = "123"))   // navigate forward
backStack.removeLastOrNull()          // navigate back
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `elements` | `vararg NavKey` | — | Initial back stack contents, bottom to top. |
| `configuration` | `SavedStateConfiguration` | — | Required on non-Android platforms; must supply a `SerializersModule` registering every `NavKey` subtype used, for polymorphic serialization. |

## Notes

- Prefer `rememberNavBackStack` over constructing `NavBackStack` directly — it wires up automatic save/restore via `NavBackStackSerializer`.
- All destination keys must be `@Serializable` and implement `NavKey` for `rememberNavBackStack` to save/restore them.
- `rememberNavBackStack` returns `NavBackStack<NavKey>`. To keep an app-specific sealed `NavKey` subtype, write a custom remember function (see [Save the navigation state](./save-state.md)):

```kotlin
@Serializable
sealed interface MyAppNavKey : NavKey

@Composable
fun rememberMyAppNavBackStack(vararg elements: MyAppNavKey): NavBackStack<MyAppNavKey> {
    return rememberSerializable(serializer = serializer()) {
        NavBackStack(*elements)
    }
}
```

- Package: `androidx.navigation3.runtime` (module `androidx.navigation3:navigation3-runtime`).
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [NavKey](./navkey.md)
- [NavDisplay](./navdisplay.md)
- [Save the navigation state](./save-state.md)
- [Deep Links in Navigation 3](../deep-links/navigation3-deep-links.md)
