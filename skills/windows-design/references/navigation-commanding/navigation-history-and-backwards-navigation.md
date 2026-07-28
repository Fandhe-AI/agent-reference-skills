# Navigation history and backwards navigation

Guidance for implementing a back button and back-stack behavior when you don't use `NavigationView`'s built-in back button.

## Signature / Usage

```xaml
<Page>
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="Auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>

        <Button x:Name="BackButton"
                Click="BackButton_Click"
                Style="{StaticResource TitleBarBackButtonStyle}"
                IsEnabled="{x:Bind Frame.CanGoBack, Mode=OneWay}"
                ToolTipService.ToolTip="Back"/>
    </Grid>
</Page>
```

```csharp
// App.xaml.cs
public static bool TryGoBack()
{
    Frame rootFrame = Window.Content as Frame;
    if (rootFrame.CanGoBack)
    {
        rootFrame.GoBack();
        return true;
    }
    return false;
}
```

## Back button placement

- Place the back button in the upper-left corner of the app.
- If the title bar is customized, place the back button in the title bar (use the built-in `TitleBar` control's `IsBackButtonVisible` / `IsBackButtonEnabled` and handle `BackRequested`).
- For a stand-alone back button, use `Button` with the `TitleBarBackButtonStyle` resource; if a top `CommandBar` exists, place the button in `CommandBar.Content`.
- Show a disabled back button (bound to `Frame.CanGoBack`) rather than hiding it, unless the app will never have a backstack.

## Add-to-history rules for custom back stacks

| Navigation action | Add to navigation history? |
|------|-------------|
| Page to page, different peer groups | Yes |
| Page to page, same peer group, no on-screen navigation element | Yes |
| Page to page, same peer group, with an on-screen navigation element (e.g. NavigationView) | Usually yes; skip it if users switch between the peer pages frequently or you want to preserve navigational hierarchy |
| Show a transient UI (dialog, splash screen, on-screen keyboard, selection mode) | No — dismiss the transient UI on back instead |
| Enumerate items (e.g. list/details detail pane) | No — navigate to the page preceding the item enumeration |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.Frame` / `Page` (WinUI 3). Important APIs: `Frame.GoBack`, `Frame.CanGoBack`, `Frame.BackStack`, `Frame.ForwardStack`.
- For most multi-page apps, prefer `NavigationView`'s built-in back button (`BackRequested` event) over building custom back-stack logic; use this guidance only when not using `NavigationView`.

## Related

- [Navigation basics](./navigation-basics.md)
- [NavigationView](./navigationview.md)
