---
source: https://kotlinlang.org/docs/multiplatform/compose-navigation-routing.html
---

# Navigation and routing

Compose Multiplatform adopts the Jetpack Compose approach to navigation: list routes, create a `NavHostController`, and add a `NavHost`. This page also covers the lifecycle of back stack entries and browser navigation for web apps.

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

Binding the web app to the navigation graph:

```kotlin
//commonMain source set
@Composable
fun App(
    onNavHostReady: suspend (NavController) -> Unit = {}
) {
    val navController = rememberNavController()
    NavHost(...) {
        //...
    }
    LaunchedEffect(navController) {
        onNavHostReady(navController)
    }
}

//wasmJsMain source set
@OptIn(ExperimentalComposeUiApi::class)
@ExperimentalBrowserHistoryApi
fun main() {
    val body = document.body ?: return
    ComposeViewport(body) {
        App(
          onNavHostReady = { it.bindToBrowserNavigation() }
        )
    }
}

//jsMain source set
@OptIn(ExperimentalComposeUiApi::class)
@ExperimentalBrowserHistoryApi
fun main() {
    onWasmReady {
        val body = document.body ?: return@onWasmReady
        ComposeViewport(body) {
            App(
                onNavHostReady = { it.bindToBrowserNavigation() }
            )
        }
    }
}
```

Custom URL fragment for a route:

```kotlin
// Instead of using the app package and object name,
// this route will be translated to the URL simply as "#start"
@Serializable @SerialName("start") data object StartScreen
```

Full customization via the `getBackStackEntryRoute` lambda:

```kotlin
navController.bindToBrowserNavigation() { entry ->
    val route = entry.destination.route.orEmpty()
    when {
        route.startsWith(StartScreen.serializer().descriptor.serialName) -> "#start"
        route.startsWith(Id.serializer().descriptor.serialName) -> {
            val args = entry.toRoute<Id>()
            "#find_id_${args.id}"
        }
        // Doesn't set a URL fragment for all other routes
        else -> ""
    }
}
```

## Notes

- Experimental: browser navigation support in web apps (`NavController.bindToBrowserNavigation()`, requires `@ExperimentalBrowserHistoryApi`).
- The docs pin `navigation-compose` to `2.10.0-rc01`, a pre-release version; it is not a stable release.
- Steps: list routes (the page's sample project nav_cupcake), create a `NavHostController`, add a `NavHost` (choose a start destination; build the graph inline or with `NavController.createGraph()`).
- Each back stack entry implements `LifecycleOwner`; switching screens changes state from `RESUMED` to `STARTED` and back. `RESUMED` is also described as "settled".
- In Kotlin/JS, wrap `bindToBrowserNavigation()` in `onWasmReady {}` so the Wasm application is initialized and Skia is ready.
- After binding, the URL fragment (after `#`) reflects the current route and manually entered URLs are translated into destinations. Default fragment for type-safe navigation: `<app package>.<serializable type>/<argument1>/<argument2>`, for example `example.org#org.example.app.StartScreen/123/Alice%2520Smith`.
- Every route string returned from `getBackStackEntryRoute` must start with `#`; otherwise copied URLs make the browser access a wrong endpoint.
- For custom URL formats, add reverse processing before `bindToBrowserNavigation()` (for example, read `window.location.hash.substringAfter('#', "")` and call `navController.navigate(...)`).
- Distinct from Android-only coverage: Navigation Compose for Android is covered by android-navigation; this page covers multiplatform setup and web routing.

## Related

- [Navigation in Compose](./navigation.md)
- [Deep links](./navigation-deep-links.md)
- [Lifecycle](./lifecycle.md)
