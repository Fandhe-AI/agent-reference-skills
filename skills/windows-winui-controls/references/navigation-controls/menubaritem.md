# MenuBarItem

A single top-level menu entry hosted inside a `MenuBar` (e.g. "File", "Edit"). Groups `MenuFlyoutItem`/`MenuFlyoutSubItem`/`RadioMenuFlyoutItem`/`MenuFlyoutSeparator` children.

## Signature / Usage

```xaml
<muxc:MenuBarItem Title="View">
    <MenuFlyoutItem Text="Output"/>
    <MenuFlyoutSeparator/>
    <muxc:RadioMenuFlyoutItem Text="Landscape" GroupName="OrientationGroup"/>
    <muxc:RadioMenuFlyoutItem Text="Portrait" GroupName="OrientationGroup" IsChecked="True"/>
</muxc:MenuBarItem>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Title` | `string` | Label of the top-level menu shown in the bar (e.g. "File"). |
| (items) | `IList<object>` | `MenuFlyoutItem`, `MenuFlyoutSubItem`, `ToggleMenuFlyoutItem`, `RadioMenuFlyoutItem`, `MenuFlyoutSeparator` children shown when the item is opened. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3).

## Related

- [MenuBar](./menubar.md)
