---
source: https://kotlinlang.org/docs/multiplatform/compose-ios-accessibility.html
---

# Support for iOS accessibility features

Compose Multiplatform accessibility support lets people with disabilities use the Compose Multiplatform UI as comfortably as the native iOS UI: screen readers and VoiceOver can access the content, and the UI supports the same navigation and interaction gestures as native iOS.

## Signature / Usage

Semantics data produced by Compose APIs is mapped to native objects and properties consumed by iOS Accessibility Services. For most interfaces built with Material widgets this happens automatically. Properties such as `testTag` map to native accessibility properties such as `accessibilityIdentifier`, so the data is available to Accessibility Services and the XCTest framework.

Run an automated accessibility audit in XCTest UI tests:

```swift
func testAccessibilityTabView() throws {
	let app = XCUIApplication()
	app.launch()
	app.tabBars.buttons["MyLabel"].tap()

	try app.performAccessibilityAudit()
}
```

Always synchronize the accessibility tree (for debugging and testing):

```kotlin
ComposeUIViewController(configure = {
    accessibilitySyncOptions = AccessibilitySyncOptions.Always(debugLogger = null)
}) {
    // your @Composable content
}
```

`AccessibilitySyncOptions` contains all available options:

```kotlin
// package androidx.compose.ui.platform

@ExperimentalComposeApi
sealed class AccessibilitySyncOptions {
    
    // Option to never synchronize the accessibility tree
    object Never: AccessibilitySyncOptions

    // Option to synchronize the tree only when Accessibility Services are running
    //
    // You can include an AccessibilityDebugLogger to log interactions and tree syncing events
    class WhenRequiredByAccessibilityServices(debugLogger: AccessibilityDebugLogger?)

    // Option to always synchronize the accessibility tree
    //
    // You can include an AccessibilityDebugLogger to log interactions and tree syncing events
    class Always(debugLogger: AccessibilityDebugLogger?)
}
```

Implement the `AccessibilityDebugLogger` interface to write custom messages:

```kotlin
ComposeUIViewController(configure = {
    accessibilitySyncOptions = AccessibilitySyncOptions.WhenRequiredByAccessibilityServices(object: AccessibilityDebugLogger {
         override fun log(message: Any?) {
             if (message == null) {
                 println()
             } else { 
                 println("[a11y]: $message") 
             } 
         } 
    })
}) {
    // your @Composable content
}
```

High-contrast palette: Compose Multiplatform uses the Material3 `ColorScheme` class, which lacks out-of-the-box high-contrast support. Define extra palettes manually, for example:

```kotlin
import androidx.compose.ui.graphics.Color

// Defines a data class to hold the color palette for high-contrast themes
data class HighContrastColors(
    val primary: Color, // Main interactive elements, primary text, top app bars
    val onPrimary: Color, // Content displayed on top of a 'primary' color
    val secondary: Color, // Secondary interactive elements, floating action buttons
    val onSecondary: Color, // Content displayed on top of a 'secondary' color
    val tertiary: Color, // An optional third accent color
    val onTertiary: Color, // Content displayed on top of a 'tertiary' color
    val background: Color, // Main background of the screen
    val onBackground: Color, // Content displayed on top of a 'background' color
    val surface: Color, // Card backgrounds, sheets, menus, elevated surfaces
    val onSurface: Color, // Content displayed on top of a 'surface' color
    val error: Color, // Error states and messages
    val onError: Color, // Content displayed on top of an 'error' color
    val success: Color, // Success states and messages
    val onSuccess: Color, // Content displayed on top of a 'success' color
    val warning: Color, // Warning states and messages
    val onWarning: Color, // Content displayed on top of a 'warning' color
    val outline: Color, // Borders, dividers, disabled states
    val scrim: Color // Dimming background content behind modals/sheets
)
```

The source page continues with `LightHighContrastPalette` and `DarkHighContrastPalette` instances (e.g. `primary = RoyalBlue`, `onPrimary = White` for light; `primary = SkyBlue`, `onPrimary = Black` for dark) built from neutral, accent, and status colors.

## Notes

- High contrast: iOS provides the **Increase Contrast** setting, detectable via `UIAccessibilityDarkerSystemColorsEnabled`; you can also track `UIAccessibilityDarkerSystemColorsStatusDidChangeNotification`. Use a WCAG-compliant contrast checker: contrast ratio at least 4.5:1 between colors (`onPrimary` vs `primary`, `onSurface` vs surface, ...), and 7:1 for custom foreground and background colors, especially for small text. This applies to both `lightColorScheme` and `darkColorScheme`.
- Trackpad and keyboard: AssistiveTouch (**Settings** | **Accessibility** | **Touch** | **AssistiveTouch**) controls an iPhone with a mouse or trackpad pointer. On an iPad, a connected mouse or trackpad works out of the box for basic usage, but adjusting pointer size, tracking speed, or button actions still needs AssistiveTouch. Full Keyboard Access (**Settings** | **Accessibility** | **Keyboards** | **Full Keyboard Access**) enables control with a keyboard, for example **Tab** to navigate and **Space** to activate.
- Default tree synchronization: the iOS accessibility tree is synchronized with the UI only when Accessibility Services are running, and synchronization events are not logged.
- Removed in Compose Multiplatform 1.8.0: the tree synchronization option, because the accessibility tree is synchronized lazily and needs no configuration. The page keeps the `AccessibilitySyncOptions` examples for reference.
- Synchronizing the tree after each UI event is useful for debugging and testing but can degrade app performance.
- `AccessibilitySyncOptions` is annotated `@ExperimentalComposeApi`.
- Distinct from the apple-swiftui / apple-uikit accessibility APIs (`accessibilityIdentifier`, VoiceOver); this page covers only how Compose semantics map onto them. Common Compose semantics belong to the android-compose-ui skill.

## Related

- [uikit-integration](./uikit-integration.md)
- [touch-with-native-ui](./touch-with-native-ui.md)
