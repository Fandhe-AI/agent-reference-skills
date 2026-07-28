# TabViewItem

Represents a single tab (header + content) hosted inside a `TabView`. Is a `ContentControl`, so any object can be its content.

## Signature / Usage

```xaml
<TabViewItem Header="Picture" IsClosable="False">
    <TabViewItem.IconSource>
        <SymbolIconSource Symbol="Pictures"/>
    </TabViewItem.IconSource>
    <TabViewItem.Content>
        <local:PictureSettingsControl/>
    </TabViewItem.Content>
</TabViewItem>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Header` | `object` | Label shown in the tab strip; can be any object, paired with `HeaderTemplate`. |
| `IconSource` | `IconSource` | Icon shown on the tab. |
| `IsClosable` | `bool` | Whether the close (X) button is shown/enabled for this tab (default `true`). |
| `Content` | `object` | Content displayed below the tab strip when this tab is selected (inherited from `ContentControl`). |
| `ContentTemplate` | `DataTemplate` | Template applied to `Content`. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3).
- If closing tabs programmatically outside a `TabCloseRequested` handler, check `IsClosable` first.

## Related

- [TabView](./tabview.md)
