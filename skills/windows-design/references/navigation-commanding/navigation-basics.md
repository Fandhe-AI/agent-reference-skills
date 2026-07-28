# Navigation basics

Navigation is the act of moving between pages and within a page in a Windows app. It is based on a flexible model of navigation structures, navigation elements, and system-level features.

## Signature / Usage

```xaml
<!-- A Frame hosts the pages a user navigates between -->
<NavigationView>
    <NavigationView.MenuItems>
        <NavigationViewItem Content="Nav Item A"/>
        <NavigationViewItem Content="Nav Item B"/>
    </NavigationView.MenuItems>
    <Frame x:Name="ContentFrame"/>
</NavigationView>
```

## Principles of good navigation

- **Consistency** - use standard controls and conventions for icons, location, and styling so navigation is predictable.
- **Simplicity** - fewer navigation items simplify decision making; hide less important items.
- **Clarity** - clear paths and clearly labeled destinations prevent users from getting lost.

## Structure: flat vs. hierarchical

| Structure | Use when |
|------|-------------|
| Flat/lateral | Pages can be viewed in any order, are clearly distinct, and there are fewer than 8 pages in the group |
| Hierarchical | Pages should be traversed in a specific order, have a clear parent-child relationship, or there are more than 7 pages in the group |

Many apps combine both: flat structures for top-level pages, hierarchical structures for pages with more complex relationships. If a structure has multiple levels, peer-to-peer navigation elements should only link to peers within the current subtree, not across subtrees.

## Choosing navigation controls

| Control | Use when |
|------|-------------|
| Frame | Any app with multiple pages; loads and displays the page selected by the primary navigation element |
| Top navigation (NavigationView) | You want all navigation options visible, need more content space, or icons can't clearly describe categories |
| Tabs (TabView) | Users need to dynamically open, close, or rearrange tabs, or expect many tabs open at once |
| Breadcrumb (BreadcrumbBar) | You want to show the path to the current location across many navigation levels |
| Left navigation (NavigationView) | Pages exist at the top level, there are more than 5 navigation items, and users don't switch pages frequently |
| List/details | Users switch between child items frequently and need both list-level and detail-level operations |
| Hyperlinks | Content-embedded navigation elements that are unique from page to page |

## General recommendations

- Avoid deep navigation hierarchies; beyond two levels, provide a breadcrumb bar so users can quickly get back out.
- Avoid "pogo-sticking" — related content that requires navigating up a level and back down again.

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from React Router's route-based navigation, Jetpack Compose Navigation, and Apple SwiftUI's `NavigationStack`.
- For guidance on adding your own back-stack behavior, see [Navigation history and backwards navigation](./navigation-history-and-backwards-navigation.md).

## Related

- [NavigationView](./navigationview.md)
- [Navigation history and backwards navigation](./navigation-history-and-backwards-navigation.md)
- [Tab View](./tab-view.md)
- [List/details](./list-details.md)
