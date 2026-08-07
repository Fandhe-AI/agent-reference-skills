# Navigation 3

Navigation 3 (`androidx.navigation3`) is a Compose-first navigation library built around a plain, observable back stack of keys instead of a navigation graph. Navigating is as simple as adding or removing items from a `List`.

## Signature / Usage

```kotlin
data object Home
data class Product(val id: String)

@Composable
fun MyApp() {
    val backStack = remember { mutableStateListOf<Any>(Home) }

    NavDisplay(
        backStack = backStack,
        onBack = { backStack.removeLastOrNull() },
        entryProvider = entryProvider {
            entry<Home> { Text("Home") }
            entry<Product> { product -> Text("Product ${product.id}") }
        }
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `androidx.navigation3:navigation3-runtime` | artifact | — | Core API: `NavEntry`, `NavKey`, `NavBackStack`, `entryProvider`/`entry` DSL. |
| `androidx.navigation3:navigation3-ui` | artifact | — | Display layer: `NavDisplay`, `Scene`, `SceneStrategy`. |
| `androidx.lifecycle:lifecycle-viewmodel-navigation3` | artifact | — | `ViewModelStoreNavEntryDecorator` for scoping `ViewModel`s to a `NavEntry`. |
| `androidx.compose.material3.adaptive:adaptive-navigation3` | artifact | — | `ListDetailSceneStrategy` / `SupportingPaneSceneStrategy` for adaptive multi-pane layouts. |
| `org.jetbrains.kotlinx:kotlinx-serialization-core` | artifact | — | Serializes `NavKey` implementations for `rememberNavBackStack` state saving. |

## Notes

- Package: `androidx.navigation3` (runtime/ui), `androidx.lifecycle.viewmodel.navigation3` (ViewModel add-on), `androidx.compose.material3.adaptive.navigation3` (Material adaptive add-on).
- Stability (as of this reference): `navigation3-runtime`/`navigation3-ui` reached **1.0.0 stable** in November 2025; current stable line is **1.1.x** (e.g. 1.1.5, July 29, 2026), with active `1.2.0-alpha` development ongoing. This is **not alpha** — check the [androidx navigation3 release notes](https://developer.android.com/jetpack/androidx/releases/navigation3) for the latest version before pinning a dependency.
- Requires `compileSdk = 36` or later.
- Building blocks, at a glance: define keys (`NavKey`) → hold a back stack (`NavBackStack` / `rememberNavBackStack`) → map keys to content (`NavEntry` via `entryProvider`) → render with `NavDisplay`, which resolves a `Scene` per `SceneStrategy`.
- Recipes with runnable examples live outside the main docs site, in the [android/nav3-recipes](https://github.com/android/nav3-recipes) repository.
- `NavHost` / `NavController` / `composable()` / `navigation()` are Navigation Compose (2.x) APIs, not part of Navigation 3 — see `../nav-compose/README.md`.

## Related

- [NavKey](./navkey.md)
- [NavBackStack](./navbackstack.md)
- [NavEntry](./naventry.md)
- [NavDisplay](./navdisplay.md)
- [Deep Links in Navigation 3](../deep-links/navigation3-deep-links.md)
