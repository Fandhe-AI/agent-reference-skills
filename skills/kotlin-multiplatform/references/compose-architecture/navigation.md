---
source: https://kotlinlang.org/docs/multiplatform/compose-navigation.html
---

# Navigation in Compose

The Compose Multiplatform team contributes multiplatform support to the AndroidX Navigation library. It provides type-safe argument passing, a back stack, deep linking, and uniform animations and back gestures.

## Signature / Usage

```kotlin
kotlin {
    // ...
    sourceSets {
        // ...
        commonMain.dependencies {
            // ...
            implementation("org.jetbrains.androidx.navigation:navigation-compose:2.10.0-rc01")
        }
        // ...
    }
}
```

```kotlin
// Creates routes
@Serializable
object Profile
@Serializable
object FriendsList

// Creates the NavController
val navController = rememberNavController()

// Creates the NavHost with the navigation graph consisting of supplied destinations
NavHost(navController = navController, startDestination = Profile) {
    composable<Profile> { ProfileScreen( /* ... */ ) }
    composable<FriendsList> { FriendsListScreen( /* ... */ ) }
    // You can add more destinations similarly
}
```

## Notes

- The docs pin `org.jetbrains.androidx.navigation` to `2.10.0-rc01`, a pre-release version; it is not a stable release.
- Concepts: a navigation graph (can be nested), a destination (composable, nested graph, or dialog), and a route (identifies a destination and defines its arguments, separate from UI). The user's path is a back stack; each destination can have deep links.
- Steps: define routes as `@Serializable` objects or data classes, create a `NavController` high in the hierarchy, then create a `NavHost` with a start destination.
- Core types: `NavController` (navigation, deep links, back stack), `NavHost` (displays current destination; required `startDestination`), `NavGraph`.
- Go to a destination with `navController.navigate(Profile)`. Pass arguments through route constructors (`navController.navigate(Profile("Alice"))`) and read them with `backStackEntry.toRoute()`. Pass minimal data (IDs, URIs), not complex objects, ViewModels, or app state.
- Back stack: `NavController.popBackStack()` pops the current destination; `navigateUp()` navigates only within the app; `popUpTo()` can be added to `navigate()`; multiple back stacks are possible (for example, nested graphs per tab).
- Back gesture: translated per platform (iOS back swipe, desktop Esc). On iOS the default native-like swipe animation is turned off when `enterTransition` or `exitTransition` is specified on `NavHost`. Disable the iOS handler with `ComposeUIViewController(configure = { enableBackGesture = false }) { App() }`. On Android, configure it in the manifest.
- Alternatives listed: Voyager, Decompose, Circuit, Appyx, PreCompose. For system-rendered iOS effects such as Liquid Glass, the page suggests migrating navigation to native SwiftUI while keeping Compose for screen content.
- Distinct from Android-only coverage: Navigation Compose basics for Android are covered by android-navigation; this page covers the `org.jetbrains.androidx.navigation` artifact and multiplatform behavior.

## Related

- [Navigation and routing](./navigation-routing.md)
- [Navigation 3 in Compose Multiplatform](./navigation-3.md)
- [Deep links](./navigation-deep-links.md)
