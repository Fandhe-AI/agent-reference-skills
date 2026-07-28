# ToolTip / ToolTipService

`ToolTip` is a popup that shows supplemental info about another control; it must be assigned to an owner element. `ToolTipService` provides the attached property and static methods used to assign and control tooltips.

## Signature / Usage

```xaml
<Button Content="New" ToolTipService.ToolTip="Create a new document"/>
```

```xaml
<Image Source="Assets/StoreLogo.png">
    <ToolTipService.ToolTip>
        <ToolTip Content="Offset ToolTip."
                 Placement="Right"
                 HorizontalOffset="20"/>
    </ToolTipService.ToolTip>
</Image>
```

```csharp
ToolTip toolTip = new ToolTip { Content = "Create a new document" };
ToolTipService.SetToolTip(submitButton, toolTip);
```

## Options / Props

`ToolTip`:

| Name | Type | Description |
|------|------|-------------|
| Content | object | Content of the tooltip (any object, e.g. text or an `Image`) |
| Placement | PlacementMode | `Top` (default, centered above the pointer), `Bottom`, `Left`, `Right`, `Mouse` |
| VerticalOffset / HorizontalOffset | double | Distance between the pointer and the tooltip; only the axis matching `Placement` applies |
| PlacementRect | Rect | Anchors position and defines an exclusion area the tooltip avoids occluding, relative to the owner |

`ToolTipService` (attached property / static methods on any `FrameworkElement`):

| Name | Type | Description |
|------|------|-------------|
| ToolTipService.ToolTip | object | Attached property to assign a `ToolTip` (or plain content) to an owner element |
| ToolTipService.Placement | PlacementMode | Attached-property equivalent of `ToolTip.Placement` |
| SetToolTip(element, tooltip) | static method | Assigns a `ToolTip` to an owner element in code |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.ToolTip` (WPF) and Jetpack Compose `PlainTooltip`/`RichTooltip`.
- Tooltip placement is not constrained by the app window, so it can render partially or fully outside the window bounds.
- Tooltips display on pointer hover, focus, or press-and-hold, and dismiss on focus/hover loss (or CTRL key press since Windows 11 21H2). Don't put interactive controls inside a tooltip — users can't interact with them.
- Keyboard accelerators are shown in tooltips by default; custom tooltips should still surface accelerator info if relevant.

## Related

- [Flyout](./flyout.md)
