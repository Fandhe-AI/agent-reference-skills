# InputPointerSource

Reports low-latency pointer input and cursor handling for a top-level window, `ContentIsland`, or a `SwapChainPanel`'s independent input thread — used for custom/DirectX rendering surfaces outside the normal XAML `UIElement` pointer pipeline.

## Signature / Usage

```csharp
void SetupBackgroundPenInput(SwapChainPanel swapChainPanel)
{
    m_dispatcherQueueController = DispatcherQueueController.CreateOnDedicatedThread();
    m_dispatcherQueueController.DispatcherQueue.TryEnqueue(() =>
    {
        var deviceKind = InputPointerSourceDeviceKinds.Touch | InputPointerSourceDeviceKinds.Pen;
        m_coreInput = swapChainPanel.CreateCoreIndependentInputSource(deviceKind);
        m_coreInput.PointerMoved += SwapChainPanel_OnPointerMoved;
    });
}
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `InputPointerSource.GetForWindowId(WindowId)` / `GetForIsland(ContentIsland)` / `GetForVisual(Visual)` | static methods | Retrieve the pointer source for a window, island, or composition visual. |
| `Cursor` | `InputCursor` | Cursor displayed when a mouse/pen pointer is over the input target. |
| `DeviceKinds` | `InputPointerSourceDeviceKinds` | Device types supported (`Mouse`, `Touch`, `Pen`). |
| `PointerPressed` / `PointerMoved` / `PointerReleased` / `PointerEntered` / `PointerExited` / `PointerWheelChanged` | event | Same semantics as `UIElement` pointer events, but delivered independent of the XAML visual tree/UI thread. |
| `PointerCaptureLost` | event | Raised when an in-contact pointer is routed to a different input target; no further events follow for that pointer. |
| `PointerRoutedAway` / `PointerRoutedTo` / `PointerRoutedReleased` | event | Raised when a pointer is handed off between input targets (e.g. cross-process). |

## Notes

- Namespace: `Microsoft.UI.Input` (Windows App SDK). Primarily used with `SwapChainPanel.CreateCoreIndependentInputSource` for low-latency pen/touch input on a background thread, distinct from standard `UIElement.PointerPressed`/`PointerMoved`/`PointerReleased` handled on the UI thread (see [Pointer input](./pointer-input.md)).
- Normal event order: `PointerEntered` → `PointerPressed` → `PointerMoved` → `PointerReleased` → `PointerExited`. `PointerCaptureLost` and `PointerRoutedReleased` are both valid terminal states that replace `PointerReleased`/`PointerExited`.

## Related

- [Pointer input](./pointer-input.md)
- [InputKeyboardSource](./input-keyboard-source.md)
