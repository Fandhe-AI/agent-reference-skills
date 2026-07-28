# Keyboard accelerators (KeyboardAccelerator)

Shortcuts that invoke an app command (typically Ctrl + a letter/function key) via the `KeyboardAccelerator` object, without manually handling `KeyDown` events.

## Signature / Usage

```xaml
<AppBarButton Icon="Copy" Label="Copy" Click="OnCopy">
  <AppBarButton.KeyboardAccelerators>
    <KeyboardAccelerator Modifiers="Control" Key="C" />
  </AppBarButton.KeyboardAccelerators>
</AppBarButton>
```

```csharp
void SelectAllInvoked(KeyboardAccelerator sender, KeyboardAcceleratorInvokedEventArgs args)
{
    MyListView.SelectAll();
    args.Handled = true;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Key` | `VirtualKey` | Non-modifier key for the accelerator. |
| `Modifiers` | `VirtualKeyModifiers` | Modifier key(s) (Control, Shift, Menu, Windows). Default `None`. |
| `ScopeOwner` | `DependencyObject` | Restricts the accelerator to the subtree of the given element (default is app-wide/global). |
| `IsEnabled` | `bool` | Disabling the owning control also disables its accelerator. |
| `Invoked` | event `TypedEventHandler<KeyboardAccelerator, KeyboardAcceleratorInvokedEventArgs>` | Fired when the accelerator is executed; required for controls without a matching UIA control pattern. |
| `KeyboardAcceleratorInvokedEventArgs.Handled` | `bool` | Set true to suppress the control-pattern invocation and stop bubbling. |
| `KeyboardAcceleratorInvokedEventArgs.Element` | `DependencyObject` | The element associated with the accelerator. |
| `UIElement.KeyboardAccelerators` | collection | Per-element collection of `KeyboardAccelerator` objects. |
| `UIElement.KeyboardAcceleratorPlacementMode` | `KeyboardAcceleratorPlacementMode` | `Auto` or `Hidden`; controls tooltip presentation of the accelerator text. |

## Notes

- Namespace: `Microsoft.UI.Xaml.Input` (`KeyboardAccelerator`, `KeyboardAcceleratorInvokedEventArgs`). `VirtualKey`/`VirtualKeyModifiers` are `Windows.System`.
- Invocation uses the UI Automation (UIA) control pattern of the target element (priority: Invoke > Toggle > Selection > Expand/Collapse); if no pattern matches, only the `Invoked` event fires.
- A `KeyboardAccelerator` instance is not shareable across multiple elements.
- Distinct from access keys (Alt + letter, UI navigation) — see [Access keys](./access-keys.md).
- Event order for a key press: Preview KeyDown → app accelerators → `OnKeyDown` → `KeyDown` (bubbling) → `CharacterReceived` → Preview KeyUp → `KeyUp`.

## Related

- [Access keys](./access-keys.md)
- [Keyboard input](./keyboard-input.md)
