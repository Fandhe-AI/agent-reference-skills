# Pen and Windows Ink (InkPresenter, InkStrokeContainer, InkDrawingAttributes)

The Windows Ink platform captures pen (and optionally touch/mouse) input as digital ink strokes through the `InkCanvas` control and its code-behind `InkPresenter` object.

## Signature / Usage

```csharp
public MainPage()
{
    this.InitializeComponent();

    // Enable mouse and pen as ink input, in addition to the pen-only default.
    inkCanvas.InkPresenter.InputDeviceTypes =
        Windows.UI.Core.CoreInputDeviceTypes.Mouse |
        Windows.UI.Core.CoreInputDeviceTypes.Pen;

    var drawingAttributes = new InkDrawingAttributes
    {
        Color = Windows.UI.Colors.Black,
        IgnorePressure = false,
        FitToCurve = true
    };
    inkCanvas.InkPresenter.UpdateDefaultDrawingAttributes(drawingAttributes);
}
```

```xaml
<InkCanvas x:Name="inkCanvas" />
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `InkCanvas` | control | XAML control that receives and renders pen input as ink/erase strokes by default. |
| `InkCanvas.InkPresenter` | `InkPresenter` (read-only) | Code-behind object providing the `InkCanvas`'s inking implementation; cannot be constructed directly. |
| `InkPresenter.InputDeviceTypes` | `CoreInputDeviceTypes` | Device types treated as ink input (default: `Pen` only; add `Mouse`/`Touch` as needed). |
| `InkPresenter.UpdateDefaultDrawingAttributes(InkDrawingAttributes)` / `CopyDefaultDrawingAttributes()` | methods | Set/read the attributes applied to new strokes. |
| `InkPresenter.StrokeContainer` | `InkStrokeContainer` | Holds all committed ink strokes; supports `GetStrokes()`, `SelectWithPolyLine(...)`, add/erase. |
| `InkPresenter.InputProcessingConfiguration.RightDragAction` | `InkInputRightDragAction` | Set to `LeaveUnprocessed` to pass modified input (barrel button/right mouse) through to `UnprocessedInput` instead of drawing ink. |
| `InkPresenter.UnprocessedInput` | `InkUnprocessedInput` | `PointerPressed`/`PointerMoved`/`PointerReleased` events for input excluded from ink processing (e.g. custom lasso selection). |
| `InkPresenter.StrokeInput.StrokeStarted` / `StrokesErased` | event | New stroke begun / strokes removed. |
| `InkDrawingAttributes.Color` | `Color` | Stroke color. |
| `InkDrawingAttributes.IgnorePressure` | `bool` | Whether pressure sensitivity affects stroke width. |
| `InkDrawingAttributes.FitToCurve` | `bool` | Smooths strokes into curves. |
| `InkPresenter.ActivateCustomDrying()` | method | Returns an `InkSynchronizer` for rendering "dry" ink to a `SurfaceImageSource`/`VirtualSurfaceImageSource`/`SwapChainPanel` instead of the default `InkCanvas` layer. |

## Notes

- Namespace: `Windows.UI.Xaml.Controls.InkCanvas` (UWP control) and `Windows.UI.Input.Inking` (`InkPresenter`, `InkStrokeContainer`, `InkDrawingAttributes`) — UWP-only APIs, distinct from general pointer input (`Handle pointer input`) covered in [Pointer input](./pointer-input.md).
- `InkToolbar` (`Windows.UI.Xaml.Controls.InkToolbar`) provides a ready-made button collection for common ink actions bound to an `InkCanvas`.
- Custom-dried ink (via `ActivateCustomDrying`) is not visible to the `InkToolbar`'s built-in erase commands — you must implement erase manually in that mode.

## Related

- [Pointer input](./pointer-input.md)
