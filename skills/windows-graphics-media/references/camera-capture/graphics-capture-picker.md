# GraphicsCapturePicker

A system picker UI control that lets the user select a window or display to capture, returning a `GraphicsCaptureItem`.

## Signature / Usage

```csharp
public sealed class GraphicsCapturePicker
```

```csharp
var picker = new GraphicsCapturePicker();
GraphicsCaptureItem item = await picker.PickSingleItemAsync();
```

## Methods

| Name | Description |
|------|-------------|
| `PickSingleItemAsync()` | Opens the capture picker UI and lets the user choose a target on the screen to capture. Returns `null` if the user cancels. |

## Notes

- Namespace: `Windows.Graphics.Capture` (WinRT).
- In a desktop (Win32/WinUI 3) app, before showing the picker UI you must associate the `GraphicsCapturePicker` instance with the owner window handle (via `IInitializeWithWindow` / `WindowNative`), otherwise the call fails.

## Related

- [GraphicsCaptureItem](./graphics-capture-item.md)
