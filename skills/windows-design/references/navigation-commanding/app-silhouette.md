# App silhouette

An app silhouette is a common pattern of relationships between an app's base layer (navigation, menus, commands) and content layer. Windows in-box apps converge on four standard silhouettes: top navigation, menu bar, left navigation, and tab view.

## Signature / Usage

```xaml
<!-- Top navigation silhouette: NavigationView's PaneDisplayMode moves
     the pane onto the same row as content, unlike the left nav silhouette -->
<NavigationView PaneDisplayMode="Top">
    <NavigationView.MenuItems>
        <NavigationViewItem Content="Nav Item A"/>
        <NavigationViewItem Content="Nav Item B"/>
    </NavigationView.MenuItems>
    <Frame x:Name="ContentFrame"/>
</NavigationView>
```

## Options / Props

| Silhouette | Base layer control(s) | Typical use | In-box example |
| --- | --- | --- | --- |
| Top navigation | NavigationView (top mode) | Navigation on the same row as commands, maximizing vertical content space | Photos |
| Menu bar | MenuBar + CommandBar | Content area's primary task is composition/editing; menu and commands stay out of the content layer | Notepad |
| Left navigation | NavigationView (left mode) | Focuses the content area on its primary task; used when nav items exist at the top level | Settings |
| Tab View | TabView (integrated with the title bar) | Content area's primary task benefits from multiple open documents/tabs | Terminal |

## Notes

- Silhouettes place navigation/commanding controls on the base layer and the app's central experience on the content layer; see Elevation and layering for the base/content layer model.
- Content margins vary by silhouette: larger margins (e.g. 56epx) suit large media or grouped/expander content; smaller margins (e.g. 12epx) suit dense, utility-focused content such as text editors.
- Top navigation and left navigation are both built from NavigationView, selected via `PaneDisplayMode` (`Top` vs. `Left`); note that the identity/person-picture control's location differs between the two, so check its placement when switching modes. Choosing between the two follows the same criteria as in Navigation basics.
- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3).

## Related

- [Navigation basics](./navigation-basics.md)
- [NavigationView](./navigationview.md)
- [Tab View](./tab-view.md)
- [Command bar](./command-bar.md)
- [Menu flyout and menu bar](./menus.md)
