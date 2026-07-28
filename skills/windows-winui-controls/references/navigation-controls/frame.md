# Frame

Navigation control that displays `Page` instances, supports navigation to new pages, and maintains a navigation history for forward/backward navigation. Implements `INavigate`.

## Signature / Usage

```xaml
<NavigationView>
    <NavigationView.MenuItems>
        <NavigationViewItem Icon="Home" Content="Home"/>
    </NavigationView.MenuItems>

    <Frame x:Name="ContentFrame" NavigationFailed="ContentFrame_NavigationFailed"/>
</NavigationView>
```

```csharp
// Navigate, passing a parameter.
ContentFrame.Navigate(typeof(Page2), "some parameter");

// Go back if possible.
if (ContentFrame.CanGoBack)
{
    ContentFrame.GoBack();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Navigate(Type)` / `Navigate(Type, object)` / `Navigate(Type, object, NavigationTransitionInfo)` | method | Navigates the frame to a `Page` type, optionally with a parameter and transition animation. |
| `NavigateToType(Type, object, FrameNavigationOptions)` | method | Navigate with extended options (e.g. disabling the navigation stack). |
| `GoBack()` / `GoBack(NavigationTransitionInfo)` | method | Navigates to the most recent back-stack entry. |
| `GoForward()` | method | Navigates to the most recent forward-stack entry. |
| `CanGoBack` / `CanGoForward` | `bool` | Whether back/forward navigation is currently possible. |
| `BackStack` / `ForwardStack` | `IList<PageStackEntry>` | Navigation history collections. |
| `BackStackDepth` | `int` | Number of entries in the back stack. |
| `CurrentSourcePageType` / `SourcePageType` | `TypeName` | Type of the currently displayed (or target) page. |
| `CacheSize` | `int` | Number of pages to cache; pair with `Page.NavigationCacheMode`. |
| `IsNavigationStackEnabled` | `bool` | Whether navigation is recorded in the back/forward stacks. |

## Events

- `Navigating` — raised before navigation begins.
- `Navigated` — raised after navigation completes.
- `NavigationStopped` — raised when navigation is canceled.
- `NavigationFailed` — raised when navigation fails (e.g. page type not found); handle it or an exception is thrown.

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3), inherits `ContentControl`. Distinct from `System.Windows.Controls.Frame` (WPF) and `Windows.UI.Xaml.Controls.Frame` (UWP).
- Typically placed as the `Content` of a `NavigationView`, or as the root content of a `Window`.
- `NavigationView` does not perform navigation automatically; call `Frame.Navigate` from `NavigationView.ItemInvoked`/`SelectionChanged` handlers.

## Related

- [NavigationView](./navigationview.md)
- [BreadcrumbBar](./breadcrumbbar.md)
