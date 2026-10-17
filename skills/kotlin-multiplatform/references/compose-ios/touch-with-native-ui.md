---
source: https://kotlinlang.org/docs/multiplatform/compose-ios-touch.html
---

# Handling touch events with interop on iOS

When a Compose Multiplatform app includes native UIKit or SwiftUI elements, the app may need to react differently to touches in the interop area depending on the context. Compose Multiplatform has one default strategy: touches are processed by the native UI after a short delay, unless Compose consumes them first.

## Signature / Usage

```kotlin
UIKitViewController(
    modifier = modifier,
    update = {},
    factory = { factory.createNativeMap() },
    properties = UIKitInteropProperties(placedAsOverlay = true)
)
```

## Options / Props

`UIKitView` and `UIKitViewController` constructors that accept a `UIKitInteropProperties` object (Experimental) allow setting:

| Name | Type | Description |
|------|------|-------------|
| interactionMode | `Cooperative` / `NonCooperative` / `null` | Selects the touch processing strategy for the interop view |
| isNativeAccessibilityEnabled | Boolean | Changes accessibility behavior for the interop view |
| isInteractive | parameter of the older `UIKitView` / `UIKitViewController` constructors | Set to `false` to disable all touch processing in the interop view |

`interactionMode` values:

- `Cooperative`: the default. Compose Multiplatform introduces a delay (150 ms by default) into touch processing. If Compose components consume any touch events during the delay, the native UI element is not made aware of the touch sequence; otherwise the rest of the touch sequence is handed to the native UI. The experimental API lets you try different delay values.
- `NonCooperative`: the previous strategy, where Compose Multiplatform does not handle any touch events in the interop view.
- `null`: pass `interactionMode = null` to disable any interaction with the native UI.

## Notes

- Experimental: the `UIKitView` / `UIKitViewController` constructors that accept `UIKitInteropProperties` (the page says "With Compose Multiplatform 1.12.2 you can also try out the experimental API").
- Inspired by `UIScrollView`: with scrollable content, if the user holds the touch, it is interpreted as an intention to interact with the native element; a rapid touch sequence is interpreted as an intention to interact with the parent element.
- For more complex gesture scenarios inside interop views, use the `UIGestureRecognizer` class or its subclasses; it allows detecting gestures in the native view and cancelling touch sequences in Compose.
- Snippet quoted from the What's new in Compose Multiplatform 1.10.0 page (`placedAsOverlay` is an experimental `UIKitInteropProperties` parameter requiring `@OptIn(ExperimentalComposeUiApi::class)`); the source page itself has no code.
- Distinct from the apple-uikit skill (`UIGestureRecognizer`, `UIScrollView` APIs); this page covers only the Compose Multiplatform interop touch behavior.

## Related

- [uikit-integration](./uikit-integration.md)
- [swiftui-integration](./swiftui-integration.md)
- [ios-migration](./ios-migration.md)
