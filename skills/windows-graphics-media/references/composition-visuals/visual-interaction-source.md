# VisualInteractionSource

Object for configuring input to an [InteractionTracker](./interaction-tracker.md) relative to a visual. Used only with `InteractionTracker`; defines which gestures (pan, pinch-zoom) and input types are redirected to the tracker to drive its state.

## Signature / Usage

```csharp
var interactionSource = VisualInteractionSource.Create(viewportVisual);
interactionSource.PositionXSourceMode = InteractionSourceMode.EnabledWithInertia;
interactionSource.PositionYSourceMode = InteractionSourceMode.EnabledWithInertia;
interactionSource.ScaleSourceMode = InteractionSourceMode.EnabledWithInertia;

tracker.InteractionSources.Add(interactionSource);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Create(Visual) | static method | Creates a `VisualInteractionSource` bound to a hit-test visual. |
| Source | Visual | The visual used for hit-testing and as the coordinate space for gesture recognition; should not be in motion during a manipulation. |
| PositionXSourceMode / PositionYSourceMode | InteractionSourceMode | Enables horizontal/vertical panning input (`Disabled`, `EnabledWithInertia`, `EnabledWithoutInertia`). Must be enabled to send position data to the tracker. |
| ScaleSourceMode | InteractionSourceMode | Enables pinch-to-zoom input in the same three modes. |
| IsPositionXRailsEnabled / IsPositionYRailsEnabled | bool | Locks a pan gesture to a single axis when it starts sufficiently close to that axis. |
| ManipulationRedirectionMode | VisualInteractionSourceRedirectionMode | Which input types (touch, pen, mouse-wheel, etc.) are redirected to the tracker. |
| PositionXChainingMode / PositionYChainingMode / ScaleChainingMode | InteractionChainingMode | Whether input flows to an ancestor's `VisualInteractionSource`/`ScrollViewer` once the tracker reaches its min/max in that direction. |
| TryRedirectForManipulation(PointerPoint) | method | Redirects a touch pointer stream to the associated `InteractionTracker` instead of the app's UI thread, starting from the given `PointerPoint`. |

## Notes

- Namespace: `Windows.UI.Composition.Interactions` (UWP-origin WinRT API, also usable from Windows App SDK / WinUI 3 desktop apps). Inherits from `CompositionObject`.
- A single `InteractionTracker` commonly uses exactly one `VisualInteractionSource`; multiple sources are used only when there are multiple independent hit-test regions.

## Related

- [InteractionTracker](./interaction-tracker.md)
- [Visual](./visual.md)
