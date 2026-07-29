# nav-compose

| Name | Description | Path |
|------|-------------|------|
| composable | `NavGraphBuilder` DSL function that adds a composable destination to a `NavGraph`. | [composable.md](./composable.md) |
| currentBackStackEntryAsState | Composable extension on `NavController` exposing the current back stack entry as Compose `State`. | [currentbackstackentryasstate.md](./currentbackstackentryasstate.md) |
| dialog | `NavGraphBuilder` DSL function that adds a dialog destination shown as an overlay. | [dialog.md](./dialog.md) |
| findNavController | Retrieves the `NavController` hosted by the nearest `NavHostFragment`. | [findnavcontroller.md](./findnavcontroller.md) |
| hiltViewModel | Returns a `@HiltViewModel`-annotated `ViewModel` scoped to a `ViewModelStoreOwner` (e.g. a nested graph). | [hiltviewmodel.md](./hiltviewmodel.md) |
| NavBackStackEntry.LocalOwnersProvider | Composable extension providing `NavBackStackEntry` as the local ViewModelStore/Lifecycle/SavedState owner. | [localownersprovider.md](./localownersprovider.md) |
| navArgument | Builder function that creates a `NamedNavArgument` for a legacy string-route destination. | [navargument.md](./navargument.md) |
| NavBackStackEntry | Represents a single entry on the `NavController` back stack. | [navbackstackentry.md](./navbackstackentry.md) |
| NavController | Central API for navigation; tracks the graph and back stack of destinations. | [navcontroller.md](./navcontroller.md) |
| NavHost | Composable that displays the current destination of a `NavGraph`. | [navhost.md](./navhost.md) |
| NavHostController | `NavController` subclass with APIs to integrate with a hosting environment. | [navhostcontroller.md](./navhostcontroller.md) |
| NavHostFragment | `Fragment` subclass providing an area for View-based self-contained navigation. | [navhostfragment.md](./navhostfragment.md) |
| Navigation with Feature Modules | The Dynamic Navigator library for destinations in Play Feature Delivery dynamic feature modules. | [navigation-feature-modules.md](./navigation-feature-modules.md) |
| Navigation Graph XML | XML resource format (`res/navigation/*.xml`) describing a Fragment-based navigation graph. | [navigation-graph-xml.md](./navigation-graph-xml.md) |
| navigation (nested graph) | `NavGraphBuilder` DSL function that adds a self-contained nested navigation graph. | [navigation.md](./navigation.md) |
| NavigationUI | Static helper functions wiring a `NavController` to app-bar/drawer/bottom-nav UI chrome. | [navigationui.md](./navigationui.md) |
| NavOptions | Configuration object controlling back-stack behavior for a `navigate()` call. | [navoptions.md](./navoptions.md) |
| NavType | Defines how a typed navigation argument is stored in and retrieved from a `Bundle`. | [navtype.md](./navtype.md) |
| popBackStack | Pops the current destination off the `NavController`'s back stack. | [popbackstack.md](./popbackstack.md) |
| rememberNavController | Composable that creates and remembers a `NavHostController`. | [remembernavcontroller.md](./remembernavcontroller.md) |
| Safe Args | Gradle plugin generating type-safe `Directions`/`Args` classes from a Fragment navigation graph XML. | [safe-args.md](./safe-args.md) |
| TestNavHostController | `NavHostController` subclass from `androidx.navigation:navigation-testing` for isolated navigation tests. | [testnavhostcontroller.md](./testnavhostcontroller.md) |
| Type-Safe Routes | Navigation 2.8+ pattern defining destinations as `@Serializable` Kotlin classes/objects. | [type-safe-routes.md](./type-safe-routes.md) |
