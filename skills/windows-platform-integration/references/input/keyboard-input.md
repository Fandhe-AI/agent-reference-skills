# Keyboard input (KeyDown / KeyUp / KeyRoutedEventArgs / VirtualKey)

Handle keystrokes from hardware and software keyboards through the `UIElement.KeyDown` / `KeyUp` routed events and `KeyRoutedEventArgs`.

## Signature / Usage

```xaml
<Grid KeyDown="Grid_KeyDown" KeyUp="Grid_KeyUp">
  ...
</Grid>
```

```csharp
private void Grid_KeyDown(object sender, KeyRoutedEventArgs e)
{
    if (e.Key == Windows.System.VirtualKey.Escape)
    {
        e.Handled = true;
    }
}
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `UIElement.KeyDown` | event | Occurs when a key is pressed. Routed (bubbling) event. |
| `UIElement.KeyUp` | event | Occurs when a key is released. Routed (bubbling) event. |
| `KeyRoutedEventArgs.Key` | `VirtualKey` | The key that was pressed/released. |
| `KeyRoutedEventArgs.KeyStatus` | `CorePhysicalKeyStatus` | Low-level status (repeat count, scan code, extended key, etc.). |
| `KeyRoutedEventArgs.Handled` | `bool` | Set true to stop the event from bubbling to parent elements. |
| `KeyRoutedEventArgs.OriginalSource` | `object` (inherited from `RoutedEventArgs`) | The actual element that raised the event, useful when handling on a parent. |

## Notes

- Namespace: `Microsoft.UI.Xaml.Input` (`KeyRoutedEventArgs`) and `Microsoft.UI.Xaml` (`UIElement.KeyDown`/`KeyUp`) in WinUI 3 desktop apps; `VirtualKey` is `Windows.System.VirtualKey` (WinRT, works directly in WinUI 3 desktop apps without package identity).
- A control only raises keyboard events when it has input focus (`IsEnabled`, `IsTabStop`, `HitTestVisible` all true). Some controls (e.g. `Button`) handle Space/Enter internally via `OnKeyDown`/`OnPointerPressed` and route to `Click`, so `KeyDown`/`KeyUp` are not raised for those keys.
- **Difference from `CoreWindow`**: `CoreWindow.KeyDown`/`KeyUp`/`CharacterReceived` are UWP-only, window-scoped, non-routed events tied to `ApplicationView`/`GetForCurrentView`. `UIElement.KeyDown`/`KeyUp` with `KeyRoutedEventArgs` are the WinUI (XAML) element-scoped, bubbling equivalent and work in both UWP and WinUI 3 desktop apps; use `Microsoft.UI.Input.InputKeyboardSource` instead of `CoreWindow.GetKeyState` for modifier-key state in WinUI 3 desktop apps.
- Detect modifier keys (Ctrl, Shift, Alt/`VirtualKey.Menu`) either by tracking `KeyDown`/`KeyUp` state or, in WinUI 3, via `InputKeyboardSource.GetKeyStateForCurrentThread(VirtualKey.Control)`.
- The `Handled` property, once set true, stops bubbling to parent elements; use `UIElement.AddHandler` with `KeyDownEvent`/`KeyUpEvent` to still observe already-handled events.
- Set `TextBox`/`RichEditBox` input focus programmatically with `Control.Focus(FocusState.Programmatic)` if no control has default focus (needed for global keyboard shortcuts to fire).

## Related

- [Pointer input](./pointer-input.md)
- [Keyboard accelerators](./keyboard-accelerators.md)
- [Access keys](./access-keys.md)
- [Focus manager](./focus-manager.md)
- [InputKeyboardSource](./input-keyboard-source.md)
