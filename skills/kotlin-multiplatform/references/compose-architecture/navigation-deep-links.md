---
source: https://kotlinlang.org/docs/multiplatform/compose-navigation-deep-links.html
---

# Deep links

Deep linking lets the operating system take the user to a specific destination in the app. Implement it by registering schemes in the OS, assigning deep links to destinations, and handling received links.

## Signature / Usage

```kotlin
composable<PlantDetail>(
    deepLinks = listOf(
        navDeepLink<PlantDetail>(basePath = "demo://example.com/plant")
    )
) { ... }
```

Several deep links on one destination:

```kotlin
@Serializable @SerialName("dlscreen") data class DeepLinkScreen(val name: String)

val firstBasePath = "demo://example1.org"

NavHost(
    navController = navController,
    startDestination = FirstScreen
) {
    composable<DeepLinkScreen>(
        deepLinks = listOf(
            navDeepLink { uriPattern = "$firstBasePath?name={name}" },
            navDeepLink { uriPattern = "demo://example2.org/name={name}" },
            // The generated pattern only handles the parameters,
            // so we add the serial name for the route type
            navDeepLink<DeepLinkScreen>(basePath = "$firstBasePath/dlscreen"),
        )
    ) { backStackEntry ->
        val deeplink: DeepLinkScreen = backStackEntry.toRoute()
        val nameGenerated = deeplink.name
        val nameGeneral = backStackEntry.arguments?.read { getStringOrNull("name") }
    }
}
```

URI listener singleton in `commonMain`:

```kotlin
object ExternalUriHandler {
    // Storage for when a URI arrives before the listener is set up
    private var cached: String? = null

    var listener: ((uri: String) -> Unit)? = null
        set(value) {
            field = value
            if (value != null) {
                cached?.let { value.invoke(it) }
                cached = null
            }
        }

    fun onNewUri(uri: String) {
        cached = uri
        listener?.let {
            it.invoke(uri)
            cached = null
        }
    }
}
```

Listener setup in the main composable:

```kotlin
DisposableEffect(Unit) {
    ExternalUriHandler.listener = { uri ->
        navController.navigate(NavUri(uri))
    }
    onDispose {
        ExternalUriHandler.listener = null
    }
}
```

## Options / Props

Registering schemes per platform:

| Platform | Where to declare |
| --- | --- |
| Android | Intent filters in `AndroidManifest.xml` |
| iOS / macOS | `Info.plist`, `CFBundleURLTypes` key (macOS: Compose Gradle DSL for `Info.plist`; iOS: edit file or register in Xcode) |
| Windows | Registry keys (Windows 8 and earlier) or package manifest extension (Windows 10 and 11); not configurable in the Compose project itself |
| Linux | `.desktop` file included in the distribution |

Generated URI pattern rules for a route type: required parameters become path parameters (`/{id}`), parameters with defaults become query parameters (`?name={name}`), collections become query parameters (`?items={value1}&items={value2}`), and order follows the route fields. For `PlantDetail` the pattern is `<basePath>/{id}/{name}/?colors={color1}&colors={color2}&latinName={latinName}`.

## Notes

- The official snippet omits the `backStackEntry ->` lambda parameter; it is added here so the example compiles.
- The docs pin `navigation-compose` to `2.10.0-rc01` (pre-release). Setup versions in the page's catalog example (`agp = "8.9.0"`, `kotlin = "2.1.0"`, `kotlinx-serialization = "1.7.3"`) are the page's own example values.
- Outside input can be malicious; follow Android's security guidelines for unsafe deep link use.
- URIs without a scheme are assumed to start with `http://` or `https://`. `{placeholder}` matches one or more characters (use `{.*}` for zero or more). Path placeholders are required; query placeholders are optional; extra query parameters do not affect matching. If several composables match the same URI, behavior is indeterminate.
- Web: put all parameters of the deep link URI pattern in the URL fragment (after `#`) and URL-encode them, for example `navDeepLink { uriPattern = "localhost:8080/#dlscreen%2F{name}" }`.
- Desktop JVM: on macOS use `Desktop.getDesktop().setOpenURIHandler { uri -> ExternalUriHandler.onNewUri(uri.uri.toString()) }`; on other systems pass `args.getOrNull(0)`. iOS: add an `application(_:open:options:)` that calls `ExternalUriHandler.shared.onNewUri(uri: uri.absoluteString)`.
- If the app is closed, the singleton caches the URI and the main composable navigates when it starts; if the app is open, the listener navigates immediately.
- Distinct from Android-only coverage: Android deep links are covered by android-navigation; this page covers multiplatform scheme registration and URI handling.

## Related

- [Navigation in Compose](./navigation.md)
- [Navigation and routing](./navigation-routing.md)
