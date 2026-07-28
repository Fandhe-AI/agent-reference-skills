# Commanding

Commands can be invoked directly (button click, context menu selection) or indirectly (keyboard accelerator, gesture, speech, automation tooling), then handled by a control, a window, or the application. `ICommand`, `XamlUICommand`, and `StandardUICommand` let you share and manage commands consistently across multiple UI surfaces.

## Signature / Usage

```xaml
<Page.Resources>
    <XamlUICommand x:Name="CustomXamlUICommand"
                    ExecuteRequested="DeleteCommand_ExecuteRequested"
                    Description="Delete item"
                    Label="Delete">
        <XamlUICommand.IconSource>
            <SymbolIconSource Symbol="Delete"/>
        </XamlUICommand.IconSource>
        <XamlUICommand.KeyboardAccelerators>
            <KeyboardAccelerator Key="D" Modifiers="Control"/>
        </XamlUICommand.KeyboardAccelerators>
    </XamlUICommand>
</Page.Resources>
```

```csharp
var deleteCommand = new StandardUICommand(StandardUICommandKind.Delete);
deleteCommand.ExecuteRequested += DeleteCommand_ExecuteRequested;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ICommand` | interface | `Microsoft.UI.Xaml.Input.ICommand` (C++) or `System.Windows.Input.ICommand` (C#) — fully custom, reusable commands |
| `XamlUICommand` | class | Adds built-in properties: icon, label, description, keyboard shortcuts (access key + accelerator key) |
| `StandardUICommand` | class | Derives from `XamlUICommand`; provides pre-defined platform commands (e.g. `Save`, `Delete`) with standard icon/accelerator/description |
| Command | property | Bindable property on many controls (`Button`, `AppBarButton`, `MenuFlyoutItem`, `SwipeItem`) that accepts an `ICommand` |

## Choosing where to place a command

Expose commands through as many commanding surfaces as makes sense for the input types you support: `Swipe`, `MenuBar`, `CommandBar`, `CommandBarFlyout`, and context menu.

| Input type | Typical accelerator |
|------|-------------|
| Pointer (mouse/pen) | Hover buttons |
| Keyboard | Shortcuts (access keys and keyboard accelerators) |
| Touch | Swipe, pull-to-refresh |

- **For critical commands**, use input-specific accelerators so power users can act quickly regardless of device.
- **Always provide a context menu** with all relevant contextual commands — it is supported for every input type, unlike pointer-hover-only affordances.

## Notes

- Package: `Microsoft.UI.Xaml.Input` (WinUI 3): `ICommand`, `XamlUICommand`, `StandardUICommand`.
- For placing commands in a persistent command surface, see [Command bar](./command-bar.md). For menu/context-menu placement, see [Menus and context menus](./menus-and-context-menus.md). For keyboard shortcut notation, see [Keyboard accelerators](./keyboard-accelerators.md) and [Access keys](./access-keys.md).

## Related

- [Command bar](./command-bar.md)
- [Menus and context menus](./menus-and-context-menus.md)
- [Menu flyout and menu bar](./menus.md)
- [Keyboard accelerators](./keyboard-accelerators.md)
- [Access keys](./access-keys.md)
