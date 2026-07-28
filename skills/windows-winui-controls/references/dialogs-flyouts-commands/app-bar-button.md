# AppBarButton

A templated button control designed to be displayed in an `AppBar`, `CommandBar`, or `CommandBarFlyout`. Characterized by an icon and text label; appearance changes automatically depending on whether it's shown in the command bar or the overflow menu.

## Signature / Usage

```xaml
<AppBarButton Icon="Like" Label="Like" Click="AppBarButton_Click"/>

<AppBarButton Label="Settings" Click="AppBarButton_Click">
    <AppBarButton.Icon>
        <FontIcon FontFamily="Candara" Glyph="&#x2699;"/>
    </AppBarButton.Icon>
</AppBarButton>
```

```csharp
AppBarButton button = new AppBarButton { Icon = new SymbolIcon(Symbol.Like), Label = "Like" };
button.Click += AppBarButton_Click;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Label | string | Text displayed on the button |
| Icon | IconElement | Image shown on the button; `SymbolIcon`, `BitmapIcon`, `FontIcon`, `PathIcon`, or `ImageIcon`. 20x20px in the primary area, 16x16px in overflow (auto-scaled for vector icon types) |
| IsCompact | bool | Whether the label is hidden and padding reduced; managed automatically when hosted in a `CommandBar` |
| LabelPosition | CommandBarLabelPosition | Placement/visibility of the label |
| IsInOverflow | bool | Read-only; whether the item currently sits in the overflow menu |
| DynamicOverflowOrder | int | Order in which the item moves into the `CommandBar` overflow when space runs short |

## Events

| Name | Description |
|------|-------------|
| Click | Occurs when the button is clicked (inherited from `ButtonBase`) |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.Button` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` Button, and Jetpack Compose `Button`.
- Implements `ICommandBarElement`, so it can be added directly to `CommandBar.PrimaryCommands`/`SecondaryCommands` and `CommandBarFlyout.PrimaryCommands`/`SecondaryCommands`.
- In Windows App SDK 1.4 and earlier, primary commands in a `CommandBarFlyout` show only the icon (no label); use a tooltip via `ToolTipService.ToolTip` in that case. From 1.5 onward, both icon and label are shown when both are set.

## Related

- [AppBarToggleButton](./app-bar-toggle-button.md)
- [AppBarSeparator](./app-bar-separator.md)
- [CommandBar](./command-bar.md)
- [CommandBarFlyout](./command-bar-flyout.md)
- [ToolTip / ToolTipService](./tool-tip.md)
