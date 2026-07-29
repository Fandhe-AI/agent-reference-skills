# NavigationUI

Static helper functions (top-level `androidx.navigation.ui` package) plus the `AppBarConfiguration` class that wire a Fragment-based `NavController` to standard app-bar/drawer/bottom-nav UI chrome: `Toolbar`, `CollapsingToolbarLayout`, `ActionBar`, `NavigationView` (drawer), and `NavigationBarView` (shared Material base class for `BottomNavigationView` and `NavigationRailView`).

## Signature / Usage

```kotlin
// Toolbar
fun Toolbar.setupWithNavController(
    navController: NavController,
    appBarConfiguration: AppBarConfiguration,
)

// CollapsingToolbarLayout
fun CollapsingToolbarLayout.setupWithNavController(
    toolbar: Toolbar,
    navController: NavController,
    appBarConfiguration: AppBarConfiguration,
)

// ActionBar (AppCompatActivity)
fun AppCompatActivity.setupActionBarWithNavController(
    navController: NavController,
    appBarConfiguration: AppBarConfiguration,
)

fun NavController.navigateUp(appBarConfiguration: AppBarConfiguration): Boolean

// NavigationView (drawer) / NavigationBarView (BottomNavigationView, NavigationRailView)
fun NavigationView.setupWithNavController(navController: NavController)
fun NavigationBarView.setupWithNavController(navController: NavController)

// Menu item
fun MenuItem.onNavDestinationSelected(navController: NavController): Boolean
```

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    setContentView(R.layout.activity_main)

    val navHostFragment = supportFragmentManager
        .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
    val navController = navHostFragment.navController
    appBarConfiguration = AppBarConfiguration(navController.graph)

    findViewById<Toolbar>(R.id.toolbar)
        .setupWithNavController(navController, appBarConfiguration)
    findViewById<NavigationView>(R.id.nav_view)
        .setupWithNavController(navController)
    findViewById<BottomNavigationView>(R.id.bottom_nav)
        .setupWithNavController(navController)
}

override fun onSupportNavigateUp(): Boolean {
    val navController = findNavController(R.id.nav_host_fragment)
    return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `AppBarConfiguration(navGraph: NavGraph)` | constructor | — | Marks the graph's start destination as the only top-level destination. |
| `AppBarConfiguration(topLevelDestinationIds: Set<Int>)` | constructor | — | Marks each listed destination ID as top-level (no Up button, no back navigation to it). |
| `AppBarConfiguration(navGraph, drawerLayout)` | constructor | — | Same as graph-based config, but shows the drawer icon instead of Up on top-level destinations. |
| `fallbackOnNavigateUpListener` | `() -> Boolean` | `null` | Invoked when `navigateUp()` cannot pop the back stack (e.g. no parent activity). |

## Notes

- A **top-level destination** never shows an Up button; with a `DrawerLayout` supplied it shows the drawer/hamburger icon instead.
- `Toolbar.setupWithNavController` and `setupActionBarWithNavController` both handle Up-button clicks automatically; only `NavigationView`/`NavigationBarView` (`BottomNavigationView`, `NavigationRailView`) variants require no extra Up handling since they don't manage a navigation icon.
- When using `AppCompatActivity.setupActionBarWithNavController` instead of a `Toolbar`, override `onSupportNavigateUp()` and delegate to `NavController.navigateUp(appBarConfiguration)`.
- Menu items whose `id` matches a destination `id` in the graph can navigate via `MenuItem.onNavDestinationSelected(navController)` from `onOptionsItemSelected`.
- Titles shown in the app bar come from each destination's `android:label` (supports `{argName}` placeholder interpolation from arguments); `NavigationView`/`NavigationBarView` selection state is kept in sync via `NavController.addOnDestinationChangedListener`.
- This is the Fragment/View-based navigation integration layer; Navigation Compose apps build their own top bar/drawer/bottom-nav directly from `currentBackStackEntryAsState()` instead of `NavigationUI`.
- Package: `androidx.navigation.ui` (`androidx.navigation:navigation-ui`) — the extension functions live directly in this artifact; there is no separate `-ktx` artifact for current releases.

## Related

- [NavHostFragment](./navhostfragment.md)
- [findNavController](./findnavcontroller.md)
- [NavController](./navcontroller.md)
