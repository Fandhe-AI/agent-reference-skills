# List/details

A navigation pattern with a list pane and a details pane; selecting an item in the list updates the details pane. Frequently used for email and address-book style apps.

## Signature / Usage

```xaml
<!-- Side-by-side style: list view in a SplitView pane, details in the content -->
<SplitView>
    <SplitView.Pane>
        <ListView ItemsSource="{x:Bind Items}" SelectionChanged="ListView_SelectionChanged"/>
    </SplitView.Pane>
    <SplitView.Content>
        <Grid x:Name="DetailsPane"/>
    </SplitView.Content>
</SplitView>
```

## Options / Props

| Available window width | Recommended style |
|------|-------------|
| 320-640 epx | Stacked — only one pane (list or details) is visible at a time; user "drills down" via separate pages |
| 641 epx or wider | Side-by-side — list pane and details pane are both visible; use a `SplitView` with the list in the pane and details in the content |

For a fully responsive layout, define `VisualState`s with `AdaptiveTrigger` breakpoints to switch between stacked and side-by-side.

### When to use

- Building an email app, address book, or any list-driven app.
- Locating and prioritizing a large collection of content.
- Allowing quick addition/removal of list items while working back-and-forth between contexts.

## Notes

- Important APIs: `ListView` class, `SplitView` class (`Microsoft.UI.Xaml.Controls`, WinUI 3).
- For stacked-style navigation between the list page and the details page, see [Navigation history and backwards navigation](./navigation-history-and-backwards-navigation.md).
- For the content elements inside the details pane, use a `Grid` layout when there are many separate fields to arrange as a form.

## Related

- [Navigation basics](./navigation-basics.md)
- [Navigation history and backwards navigation](./navigation-history-and-backwards-navigation.md)
