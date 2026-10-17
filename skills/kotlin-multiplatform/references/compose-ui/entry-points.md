---
source: https://kotlinlang.org/docs/multiplatform/compose-multiplatform-entry-points.html
---

# Native application entry points

Compose Multiplatform UI can be implemented entirely in common code, but applications start from native entry points where platform-specific behavior can be altered. In the IDE wizard project the UI base is the common `App()` function, called by an activity (Android), a view controller (iOS), a window (desktop) or a container (web).

## Signature / Usage

Android, inside `setContent()` of `MainActivity`:

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)

        setContent {
            // Calling the common App() composable
            App()
        }
    }
}
```

iOS, a view controller:

```kotlin
fun MainViewController() = ComposeUIViewController { App() }
```

Desktop, `main()` wrapped in `application()` (or `singleWindowApplication()`):

```kotlin
fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "ComposeDemo"
    ) {
        App()
    }
}
```

Web, `main()` in `main.kt` of the `webApp` module:

```kotlin
// The web API is experimental and requires opt-in
@OptIn(ExperimentalComposeUiApi::class)
fun main() {
    // Sets up the Compose environment for the web app
    ComposeViewport {
        // Produces the UI layout
        App()
    }
}
```

## Notes

- In the examples `App()` takes no parameters; in a larger application you typically pass parameters to platform-specific dependencies, provided manually or via a dependency injection library.
- Within `application()` you typically create a `Window`, specify its properties and define with `onCloseRequest` what happens on close; the default project shuts the whole application down (`::exitApplication`).
- Compose Multiplatform provides access to all Jetpack Compose APIs, but some are only available for Android apps (see android-only-components.md).
- The web entry point API is experimental and requires `@OptIn(ExperimentalComposeUiApi::class)`.
- Distance line: the common androidx.compose API (composables, `setContent`) belongs to android-compose-ui / android-compose-components; this skill covers the `org.jetbrains.compose` artifacts and multiplatform-specific differences. iOS `UIViewController` itself belongs to apple-uikit.

## Related

- [Android-only components](./android-only-components.md)
- [Setting up the viewport](./web-css-styles.md)
- [Integration with the SwiftUI framework](../compose-ios/swiftui-integration.md)
- [Integration with the UIKit framework](../compose-ios/uikit-integration.md)
- [Swing interoperability](../compose-desktop/swing-interoperability.md)
