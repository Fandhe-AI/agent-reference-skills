# findNavController

Retrieves the `NavController` hosted by the nearest `NavHostFragment` associated with a `Fragment`, `View`, or `Activity`.

## Signature / Usage

```kotlin
// Fragment extension (androidx.navigation.fragment)
public fun Fragment.findNavController(): NavController =
    NavHostFragment.findNavController(this)

// NavHostFragment companion (androidx.navigation.fragment)
public fun NavHostFragment.findNavController(fragment: Fragment): NavController

// Static helpers on the Navigation object (androidx.navigation)
public fun Navigation.findNavController(activity: Activity, @IdRes viewId: Int): NavController
public fun Navigation.findNavController(view: View): NavController
```

```kotlin
// From within a Fragment
findNavController().navigate(R.id.confirmationAction)

// From an Activity, given the NavHost view's ID
Navigation.findNavController(this, R.id.nav_host_fragment).navigate(R.id.confirmationAction)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fragment` | `Fragment` | — | Fragment whose parent chain is searched for a hosting `NavHostFragment`. Calling on a Fragment that is not, or is not within, a `NavHostFragment` throws `IllegalStateException`. |
| `activity` | `Activity` | — | Activity to search, together with `viewId`. |
| `viewId` | `Int` (`@IdRes`) | — | ID of the `NavHost` view within the Activity. |
| `view` | `View` | — | View whose hierarchy is searched for the associated `NavController`. |

## Notes

- `Fragment.findNavController()` delegates to `NavHostFragment.findNavController(this)`.
- `Navigation.findNavController(view)` locates the controller for a given `View` or its parent hierarchy; intended for use from click listeners and similar callback interfaces.
- Throws `IllegalStateException` if no `NavController` can be found.
- This is the Fragment/View interop counterpart of Compose's [rememberNavController](./remembernavcontroller.md) — Compose screens should not call `findNavController()`.
- Package: `androidx.navigation` / `androidx.navigation.fragment`.

## Related

- [NavHostFragment](./navhostfragment.md)
- [NavController](./navcontroller.md)
