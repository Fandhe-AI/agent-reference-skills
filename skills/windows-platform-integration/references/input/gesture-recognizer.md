# Touch and gestures (GestureRecognizer, ManipulationStarted/Delta/Completed, ManipulationModes)

`GestureRecognizer` interprets raw pointer input into taps, holds, and manipulations (pan/zoom/rotate) at the API level; `UIElement` exposes the same manipulation concepts as built-in routed events gated by `ManipulationMode`.

## Signature / Usage

```csharp
// Element-level manipulation events (most common for XAML apps).
myElement.ManipulationMode = ManipulationModes.TranslateX | ManipulationModes.TranslateY;
myElement.ManipulationStarted += (s, e) => { /* interaction begins */ };
myElement.ManipulationDelta += (s, e) => { /* e.Delta.Translation.X/Y, e.Delta.Rotation, e.Delta.Scale */ };
myElement.ManipulationCompleted += (s, e) => { /* inertia finished */ };
```

```csharp
// Lower-level GestureRecognizer for custom pointer pipelines.
var recognizer = new Microsoft.UI.Input.GestureRecognizer();
recognizer.GestureSettings = GestureSettings.ManipulationTranslateX | GestureSettings.Tap;
recognizer.ManipulationStarted += (s, e) => { };
recognizer.ManipulationUpdated += (s, e) => { };
recognizer.ManipulationCompleted += (s, e) => { };
recognizer.Tapped += (s, e) => { };

// Feed pointer events from PointerPressed/Moved/Released handlers:
recognizer.ProcessDownEvent(pointerPoint);
recognizer.ProcessMoveEvents(intermediatePoints);
recognizer.ProcessUpEvent(pointerPoint);
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `UIElement.ManipulationMode` | `ManipulationModes` | Flags enum controlling which manipulations the element handles in app code (`None`, `System` default, `TranslateX`, `TranslateY`, `TranslateRailsX`, `TranslateRailsY`, `Rotate`, `Scale`, `TranslateInertia`, `RotateInertia`, `ScaleInertia`, `All`). Must be set away from `System`/`None` to receive manipulation events. |
| `UIElement.ManipulationStarted` / `ManipulationDelta` / `ManipulationCompleted` | event | Routed manipulation lifecycle events on any `UIElement`. |
| `GestureRecognizer` (ctor) | class `Microsoft.UI.Input.GestureRecognizer` | Standalone gesture/manipulation recognizer for custom pointer-input pipelines (e.g. `SwapChainPanel`, DirectX surfaces). |
| `GestureRecognizer.GestureSettings` | `GestureSettings` | Flags enum selecting which gestures/manipulations are recognized. |
| `GestureRecognizer.ProcessDownEvent` / `ProcessMoveEvents` / `ProcessUpEvent` | methods | Feed raw `PointerPoint` data in; recognizer raises the corresponding events. |
| `GestureRecognizer.ManipulationStarted` / `ManipulationUpdated` / `ManipulationCompleted` / `ManipulationInertiaStarting` | event | Manipulation lifecycle, including inertia. |
| `GestureRecognizer.Tapped` / `RightTapped` / `Holding` / `Dragging` / `CrossSliding` | event | Discrete gesture events. |
| `GestureRecognizer.IsActive` / `IsInertial` | `bool` | Current interaction/inertia state. |

## Notes

- Namespace: `Microsoft.UI.Input.GestureRecognizer` (Windows App SDK) mirrors the UWP `Windows.UI.Input.GestureRecognizer`; `ManipulationModes` is `Microsoft.UI.Xaml.Input`. Distinct from third-party gesture libraries — this is the native WinUI manipulation/gesture pipeline, not `react-native`/`motion` gesture APIs.
- `UIElement`'s built-in `ManipulationStarted`/`ManipulationDelta`/`ManipulationCompleted` are sufficient for most XAML scenarios; use `GestureRecognizer` directly only when processing pointer input outside the XAML tree (e.g. `SwapChainPanel`/DirectX, background thread via `InputPointerSource`).
- When `ManipulationMode="System"` (the default for most elements), manipulations are consumed by the platform (e.g. `ScrollViewer` scrolling) instead of being delivered to app code.

## Related

- [Pointer input](./pointer-input.md)
- [InputPointerSource](./input-pointer-source.md)
