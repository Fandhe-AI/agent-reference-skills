# Keyboard accelerators

Keyboard shortcuts (e.g. Ctrl+C) that let users invoke common actions or commands without navigating the UI. Improve usability for power users and accessibility for users with motor disabilities.

## Signature / Usage

```xaml
<AppBarButton
  Icon="Copy"
  Label="Copy"
  ToolTipService.ToolTip="Copy (Ctrl+C)"
  Click="OnCopy"
  AccessKey="C">
  <AppBarButton.KeyboardAccelerators>
    <KeyboardAccelerator Modifiers="Control" Key="C" />
  </AppBarButton.KeyboardAccelerators>
</AppBarButton>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Key | VirtualKey | The non-modifier key (Delete, F3, Spacebar, alphanumeric, etc.) |
| Modifiers | VirtualKeyModifiers | Shift, Menu, Control, Windows key; default `None` |
| ScopeOwner | DependencyObject | Scopes the accelerator to a subtree (e.g. a context menu's parent `ListView`) instead of app-wide |
| Invoked | event | Fires when the accelerator is triggered; set `args.Handled = true` to stop bubbling |
| KeyboardAcceleratorPlacementMode | enum | `Auto` (show in tooltip/label) or `Hidden` |
| KeyboardAcceleratorTextOverride | string | Overrides the accelerator text shown in a `MenuFlyoutItem` / `AppBarButton` label |

### Notation and display convention

- Accelerators are described as modifier(s) + key, joined by `+` (e.g. "Ctrl+Shift+M"), following `VirtualKeyModifiers` enum order.
- For `Button`, `AppBarButton`, and `AppBarToggleButton`, the accelerator is appended to the control's default tooltip automatically.
- For `MenuFlyoutItem` and `ToggleMenuFlyoutItem`, the accelerator is displayed with the flyout item's text instead of a tooltip.
- Only the first accelerator is presented if a control has more than one.

### Common keyboard accelerators

| Action | Accelerator |
|------|-------------|
| Select all | Ctrl+A |
| Undo / Redo | Ctrl+Z / Ctrl+Y |
| Copy / Cut / Paste | Ctrl+C / Ctrl+X / Ctrl+V |
| Rename | F2 |
| Delete (with / without undo) | Del, Ctrl+D / Shift+Del |
| Find | Ctrl+F |
| Refresh | F5 or Ctrl+R |
| Save | Ctrl+S |

## Notes

- Package: `Microsoft.UI.Xaml.Input.KeyboardAccelerator` (WinUI 3), attached via `UIElement.KeyboardAccelerators`.
- Distinguished from **access keys** (Alt + mnemonic, sequential, used to navigate visible UI) — see [Access keys](./access-keys.md). Keyboard accelerators are simultaneous shortcuts for invoking actions from anywhere.
- Localize accelerators for localized apps; choose only from the predefined `VirtualKey` collection.

## Related

- [Access keys](./access-keys.md)
- [Commanding](./commanding.md)
