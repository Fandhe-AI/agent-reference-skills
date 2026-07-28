# nav-compose

> This is the Android Navigation Compose (Kotlin, `androidx.navigation`) API — distinct from the same-named SwiftUI / React Router v7 / Next.js navigation APIs.

| Name | Description | Path |
|------|-------------|------|
| NavHost | Composable host that displays destinations of a NavGraph as the user navigates. | [navhost.md](./navhost.md) |
| NavController | Central API for managing app navigation and the back stack. | [navcontroller.md](./navcontroller.md) |
| rememberNavController | Composable that creates and remembers a NavHostController for use in a NavHost. | [remembernavcontroller.md](./remembernavcontroller.md) |
| NavHostController | NavController subclass with additional APIs required by the Compose navigation host. | [navhostcontroller.md](./navhostcontroller.md) |
| composable | NavGraphBuilder DSL function that adds a composable destination to a NavGraph. | [composable.md](./composable.md) |
| navigation | NavGraphBuilder DSL function that adds a nested navigation graph. | [navigation.md](./navigation.md) |
| dialog | NavGraphBuilder DSL function that adds a dialog destination. | [dialog.md](./dialog.md) |
| Type-Safe Routes | `@Serializable` route classes and `toRoute()` for compile-time-safe navigation arguments. | [type-safe-routes.md](./type-safe-routes.md) |
| NavBackStackEntry | Lifecycle-aware handle to a single entry on the NavController back stack. | [navbackstackentry.md](./navbackstackentry.md) |
| navArgument | Builder function creating a NamedNavArgument for a string-route destination. | [navargument.md](./navargument.md) |
| NavType | Defines how a typed argument is stored in and retrieved from a Bundle. | [navtype.md](./navtype.md) |
| NavOptions | Special configuration (`popUpTo` / `launchSingleTop` / `restoreState`) applied when calling `navigate()`. | [navoptions.md](./navoptions.md) |
| popBackStack | Pops the current destination off the NavController back stack. | [popbackstack.md](./popbackstack.md) |
| currentBackStackEntryAsState | Composable `State` of the current back stack entry, recomposing on navigation changes. | [currentbackstackentryasstate.md](./currentbackstackentryasstate.md) |
| hiltViewModel | Returns a Hilt-injected ViewModel scoped to the current navigation graph back stack entry. | [hiltviewmodel.md](./hiltviewmodel.md) |
| NavBackStackEntry.LocalOwnersProvider | Provides a NavBackStackEntry as ViewModelStoreOwner/LifecycleOwner/SavedStateRegistryOwner for custom navigation hosts. | [localownersprovider.md](./localownersprovider.md) |
| NavHostFragment | Fragment subclass hosting a NavController for View-based (Fragment) navigation. | [navhostfragment.md](./navhostfragment.md) |
| findNavController | Retrieves the NavController associated with a Fragment / View / Activity. | [findnavcontroller.md](./findnavcontroller.md) |
| Safe Args | Gradle plugin generating type-safe classes for navigating and passing arguments between Fragment destinations. | [safe-args.md](./safe-args.md) |
| Navigation Graph XML | Overview of the XML resource format defining Fragment-based navigation graphs. | [navigation-graph-xml.md](./navigation-graph-xml.md) |
