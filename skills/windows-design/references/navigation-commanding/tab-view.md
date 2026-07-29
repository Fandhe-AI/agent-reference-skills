# Tab View

Displays a set of tabs and their respective content, letting users rearrange, close, or open new tabs. Useful for either static settings-style tabs or dynamic document tabs (like a browser).

## Signature / Usage

```xaml
<TabView VerticalAlignment="Stretch"
         AddTabButtonClick="TabView_AddTabButtonClick"
         TabCloseRequested="TabView_TabCloseRequested">
    <TabViewItem Header="Home" IsClosable="False">
        <TabViewItem.IconSource>
            <SymbolIconSource Symbol="Home" />
        </TabViewItem.IconSource>
        <TabViewItem.Content>
            <TextBlock Text="TabView content" Padding="12"/>
        </TabViewItem.Content>
    </TabViewItem>
</TabView>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| TabItems | collection | The `TabViewItem` objects hosted by the control |
| IsAddTabButtonVisible | bool | Set `false` for static tabs to hide the add-tab (+) button |
| CanReorderTabs | bool | Set `false` for static tabs to prevent drag reordering |
| TabWidthMode | TabViewWidthMode | `Equal` (default), `SizeToContent`, or `Compact` |
| CloseButtonOverlayMode | enum | Controls whether unselected tabs show a close button always or only on pointer-over |
| CanTearOutTabs | bool | Enables drag-to-new-window tab tear-out (Windows App SDK 1.6+) |
| TabViewItem.IsClosable | bool | Set `false` to hide the close button and prevent closing |

### Static vs. document tabs

- **Static tabs**: fixed set of pages in a fixed order (e.g. settings). Set `IsAddTabButtonVisible="False"`, `CanReorderTabs="False"`, and `IsClosable="False"` on each item. If there are more than a few static items, consider `NavigationView` instead.
- **Document tabs** (default configuration): users can dynamically open, close, rearrange, and drag tabs between windows, similar to a browser.

### Keyboard shortcuts (recommended)

| Action | Shortcut |
|------|-------------|
| Move focus to next/previous tab | Left/Right arrow keys (trapped inside the tab strip) |
| Select focused tab | Space or Enter |
| Select next/previous tab | Ctrl+Tab / Ctrl+Shift+Tab |
| Close selected tab | Ctrl+F4 (built-in), or Ctrl+W (custom) |
| Open new tab | Ctrl+T (custom) |
| Select tab N (1-8) / last tab | Ctrl+1...Ctrl+8 / Ctrl+9 (custom) |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.TabView` (WinUI 3). Distinct from Ark UI / Chakra UI `Tabs`, Jetpack Compose `TabRow`, and Apple SwiftUI `TabView`.

## Related

- [Navigation basics](./navigation-basics.md)
- [NavigationView](./navigationview.md)
