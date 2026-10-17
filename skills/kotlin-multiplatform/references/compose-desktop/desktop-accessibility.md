---
source: https://kotlinlang.org/docs/multiplatform/compose-desktop-accessibility.html
---

# Support for desktop accessibility features

Compose Multiplatform builds on top of Jetpack Compose, making most accessibility features available in common code across all platforms.

## Signature / Usage

To create a native distribution that includes accessibility features, add the `jdk.accessibility` module using the `modules` DSL method:

```kotlin
compose.desktop {
    application {
        nativeDistributions {
            modules("jdk.accessibility")
        }
    }
}
```

Custom button with semantic rules (a screen reader announces "Click to increment value"):

```kotlin
Box(modifier = Modifier
    .background(Color.LightGray)
    .fillMaxSize()
    .clickable { count += 1 }
    // Uses text from the content
    .semantics(mergeDescendants = true) {
        // Assigns the type of UI element
        role = Role.Button
        // Adds some help text to button
        contentDescription = "Click to increment value"
    }
) {
    // Text(...) content
}
```

## Options / Props

Current accessibility status on desktop:

| Platform | Accessibility status |
| --- | --- |
| macOS | Fully supported |
| Windows | Supported via Java Access Bridge |
| Linux | Not supported |

## Notes

- Accessibility on Windows is provided via Java Access Bridge, disabled by default. To develop accessibility features on Windows, enable it with `%JAVA_HOME%\bin\jabswitch.exe /enable` (the source page writes the variable as `%\JAVA_HOME%`).
- The `jdk.accessibility` module workaround is tied to issue CMP-373 in a source comment.
- To test on macOS use Accessibility Inspector (Xcode | Open Developer Tool | Accessibility Inspector). On Windows use **Show Speech History** in JAWS or the **Speech Viewer** in NVDA.
- Distance line: common `semantics` / `contentDescription` APIs are covered by android-compose-ui (Jetpack Compose accessibility guide); this page covers desktop platform status only. iOS accessibility is in compose-ios/ios-accessibility.md.

## Related

- [Native distributions](./native-distribution.md)
- [Accessibility](../compose-ui/accessibility.md)
- [Support for iOS accessibility features](../compose-ios/ios-accessibility.md)
