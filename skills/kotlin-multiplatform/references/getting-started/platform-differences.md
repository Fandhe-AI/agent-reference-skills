---
source: https://kotlinlang.org/docs/multiplatform/compose-platform-specifics.html
---

# Default UI behavior on different platforms

Compose Multiplatform aims for apps that behave as similarly as possible across platforms. This page lists unavoidable differences and temporary compromises when writing shared UI code.

## Signature / Usage

### Entry points per platform

| Platform | Entry point |
|----------|-------------|
| Android | `Activity` showing the main composable from common code |
| iOS | `@main` class or structure that initializes the app |
| JVM | `main()` function that launches the main common composable |
| Kotlin/JS, Kotlin/Wasm | `main()` function that attaches the main common composable to the web page |

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

## Options / Props

### Differences

| Area | Behavior |
|------|----------|
| Software keyboard | Adopts the Compose window insets approach and imitates it on iOS to account for safe areas; keyboard position may differ slightly on iOS. Verify it does not cover important UI on both platforms |
| Touch and mouse | Desktop interprets all pointer manipulation as mouse gestures; multitouch (e.g. pinch-to-zoom) is not supported |
| Platform-specific functionality | Native pop-up views (e.g. default Copy / Translate text selection actions) are platform-specific and not customizable |
| Scroll physics | Android and iOS match the platform; desktop scrolling is limited to the mouse wheel |
| Interop views | iOS: separate guides for SwiftUI and UIKit; desktop: Swing interoperability |
| Back gesture | Android has it by default; iOS has none by default but Compose Multiplatform for iOS supports it by default to mimic Android; desktop uses the Esc key as default back trigger |
| Text | No pixel-perfect match: default fonts and platform letter aliasing differ, which can interfere with screenshot testing |
| Previews | `@Preview` composables render alongside shared UI code in IntelliJ IDEA and Android Studio; require specific project configuration with explicit dependencies |
| Hot reload | Available only for JVM (desktop) targets |

## Notes

- Platform-specific APIs without multiplatform support must be called from platform-specific source sets; the source suggests checking klibs.io first.
- Snippet (the JVM entry point) quoted from the Native application entry points page; the source page itself has no code.
- Distance line: common Compose API behavior (androidx.compose.*, insets, text, gestures) belongs to android-compose-ui / android-compose-components; this page covers only multiplatform differences.
- Distance line: SwiftUI and UIKit APIs belong to apple-swiftui / apple-uikit.

## Related

- [Relationship between Compose Multiplatform and Jetpack Compose](./compose-and-jetpack-compose.md)
- [Integration with the SwiftUI framework](../compose-ios/swiftui-integration.md)
- [Integration with the UIKit framework](../compose-ios/uikit-integration.md)
- [Swing interoperability](../compose-desktop/swing-interoperability.md)
- [Compose UI previews](../compose-ui/previews.md)
- [Compose Hot Reload](../tooling/compose-hot-reload.md)
- [Navigation in Compose](../compose-architecture/navigation.md)
