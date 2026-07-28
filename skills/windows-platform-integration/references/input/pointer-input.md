# Pointer input (PointerPressed / PointerMoved / PointerReleased)

Handle pointer events (touch, mouse, pen/stylus, touchpad) through `UIElement` pointer event handlers and the `Microsoft.UI.Input.PointerPoint` object for extended properties.

## Signature / Usage

```csharp
Dictionary<uint, Microsoft.UI.Xaml.Input.Pointer> pointers = new();

Target.PointerPressed += Target_PointerPressed;
Target.PointerMoved += Target_PointerMoved;
Target.PointerReleased += Target_PointerReleased;

void Target_PointerPressed(object sender, PointerRoutedEventArgs e)
{
    e.Handled = true;
    PointerPoint ptrPt = e.GetCurrentPoint(Target);

    // CapturePointer must be called from PointerPressed; IsInContact must be true.
    Target.CapturePointer(e.Pointer);

    pointers[ptrPt.PointerId] = e.Pointer;
}

void Target_PointerReleased(object sender, PointerRoutedEventArgs e)
{
    e.Handled = true;
    PointerPoint ptrPt = e.GetCurrentPoint(Target);
    Target.ReleasePointerCapture(e.Pointer);
    pointers.Remove(ptrPt.PointerId);
}
```

## Options / Props

| Event | Description |
|------|-------------|
| `PointerPressed` | Press action (touch down, mouse/pen/touchpad down) within the element's bounding area. `CapturePointer` must be called from this handler. |
| `PointerMoved` | Pointer changes coordinates, button state, pressure, tilt, or contact geometry. |
| `PointerReleased` | Release action within the bounding area, or outside it if the pointer was captured. |
| `PointerEntered` / `PointerExited` | Pointer enters/leaves the bounding area (device-specific semantics differ for touch/mouse/pen). |
| `PointerCanceled` | Fired when touch is superseded by pen-in-range, no contact for >100ms, display change, desktop lock, or too many simultaneous contacts. |
| `PointerCaptureLost` | Fired instead of `PointerReleased` when capture moves to another element or pointer, or is programmatically released. |
| `PointerWheelChanged` | Mouse wheel rotated. |

| Member | Type | Description |
|------|------|-------------|
| `PointerRoutedEventArgs.GetCurrentPoint(element)` | `PointerPoint` | Returns extended pointer info relative to `element`. |
| `PointerRoutedEventArgs.GetIntermediatePoints(element)` | `IVector<PointerPoint>` | Returns buffered intermediate points between events. |
| `PointerPoint.Position` | `Point` | Pointer location relative to the reference element. |
| `PointerPoint.PointerId` | `uint` | Unique id of the contact for this input sequence. |
| `PointerPoint.PointerDevice.PointerDeviceType` | `PointerDeviceType` | `Mouse` / `Pen` / `Touch`. |
| `PointerPoint.IsInContact` | `bool` | True if the pointer is in contact (mouse button down, touch/pen contact). Required for `CapturePointer` to succeed. |
| `PointerPoint.Properties` | `PointerPointProperties` | Extended per-pointer properties (see below). |
| `PointerPointProperties.IsPrimary` | `bool` | Identifies the primary pointer of a multi-pointer input sequence (the first pointer detected). |
| `PointerPointProperties.Pressure` | `double` | Pen/touch pressure. |
| `PointerPointProperties.IsLeftButtonPressed` / `IsMiddleButtonPressed` / `IsRightButtonPressed` | `bool` | Mouse button state. |
| `PointerPointProperties.IsBarrelButtonPressed` | `bool` | Pen barrel button state. |
| `PointerPointProperties.IsInRange` | `bool` | Pen hover state. |
| `UIElement.CapturePointer(Pointer)` | `bool` | Constrains subsequent pointer input to this element until released or lost. |

## Notes

- Namespace: `Microsoft.UI.Input` (`PointerPoint`, `PointerPointProperties`) and `Microsoft.UI.Xaml.Input` (`PointerRoutedEventArgs`, `Pointer`) in WinUI 3 desktop apps; equivalent UWP types live in `Windows.UI.Input` / `Windows.UI.Xaml.Input`. Pointer property access (pressure, tilt, barrel button) and device detection work in any WinUI 3 app without package identity.
- `PointerPressed` and `PointerReleased` do not always occur in pairs; also listen for `PointerExited`, `PointerCanceled`, and `PointerCaptureLost` to conclude a pointer-down state.
- Mouse input is associated with a single pointer; additional button clicks route through `PointerMoved`, not additional `PointerPressed` events.

## Related

- [Keyboard input](./keyboard-input.md)
- [Touch and gestures](./gesture-recognizer.md)
- [Pen and Windows Ink](./pen-and-ink.md)
