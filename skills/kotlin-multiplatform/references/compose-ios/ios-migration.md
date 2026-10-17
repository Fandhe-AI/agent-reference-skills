---
source: https://kotlinlang.org/docs/multiplatform/compose-ios-migration.html
---

# iOS migration guides

iOS considerations for upgrading the Compose Multiplatform library in a project to a newer version, starting with 1.7.0.

## Signature / Usage

Compose Multiplatform 1.6.11 to 1.7.0. Do not combine a non-null `onReset` with a `remember`ed view:

```kotlin
val view = remember { UIView() }

UIKitView(factory = { view }, onReset = { /* ... */ })
```

## Notes

- Migration (1.6.11 → 1.7.0): the `background` parameter was removed from `UIKitView` and `UIKitViewController` (deprecated APIs have it, new ones do not). Set the background of new instances in `factory`; put it in the `update` lambda if it must be updatable.
- Migration (1.6.11 → 1.7.0): touches or gestures may stop working as expected. The new default touch behavior waits at least 150 ms before the interop view receives a touch. To restore the old behavior use the experimental `UIKitInteropProperties` constructor with `interactionMode` set to `UIKitInteropInteractionMode.NonCooperative`. The constructor is experimental because the intent is to eventually keep interactability of interop views as a single boolean flag.
- Migration (1.6.11 → 1.7.0): `accessibilityEnabled` was moved and renamed to `UIKitInteropProperties.isNativeAccessibilityEnabled`, and is `false` by default. It taints the merged Compose subtree with native accessibility resolution, so enabling it is not recommended unless you need rich accessibility capabilities of the interop view (such as web views).
- Migration (1.6.11 → 1.7.0): the `onResize` parameter was removed because it did not affect Compose layout. To react to frame changes override `layoutSubviews` of the interop `UIView`, override `viewDidLayoutSubviews` of the interop `UIViewController`, or add `onGloballyPositioned` to the `Modifier` chain. To set the frame use Compose modifiers such as `size` and `fillMaxSize`.
- Migration (1.6.11 → 1.7.0): some `onReset` usage patterns are invalid. When a `UIKitView` enters the composition either `factory` or `onReset` is called, never both, so with a non-null `onReset` the remembered `view` can differ from the one shown onscreen. Do not specify an `onReset` value in that case; to pass context-dependent callbacks, store the callback inside the view using `update` or `onReset`.
- Distinct from the apple-uikit skill; this page covers only Compose Multiplatform interop API changes.

## Related

- [touch-with-native-ui](./touch-with-native-ui.md)
- [uikit-integration](./uikit-integration.md)
