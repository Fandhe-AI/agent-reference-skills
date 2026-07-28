# WebView2

An embedded Chromium-based web browser control for displaying web content inside a WinUI 3 app.

## Signature / Usage

```xml
xmlns:controls="using:Microsoft.UI.Xaml.Controls"
```

```xaml
<controls:WebView2 x:Name="MyWebView" Grid.Row="1" Grid.ColumnSpan="2"
    Source="https://www.microsoft.com" HorizontalAlignment="Stretch"
    VerticalAlignment="Stretch"/>
```

```csharp
private void EnsureHttps(WebView2 sender, CoreWebView2NavigationStartingEventArgs args)
{
    string uri = args.Uri;
    if (!uri.StartsWith("https://"))
    {
        args.Cancel = true;
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Source | Uri | The URL the WebView2 navigates to; re-setting it navigates to a new page. |
| CoreWebView2 | CoreWebView2 | The underlying Chromium engine object; used for advanced APIs like `ExecuteScriptAsync`, cookie management, and settings. |
| NavigationStarting | event | Raised before navigation begins; set `args.Cancel = true` to block navigation. |
| SourceChanged / ContentLoading / HistoryChanged / NavigationCompleted | event | Additional navigation lifecycle events. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.WebView2` (WinUI 3, part of the Windows App SDK / `Microsoft.WindowsAppSDK` NuGet package). Distinct from the UWP `Windows.UI.Xaml.Controls.WebView` (deprecated) and browser iframe elements in web frameworks.
- Requires the WebView2 Runtime, which is pre-installed on most Windows 10/11 devices via Microsoft Edge.
- `ExecuteScriptAsync` injects and runs JavaScript in the hosted page.
- Use `Microsoft.Web.WebView2.Core` namespace for `CoreWebView2NavigationStartingEventArgs` and related event-arg types.

## Related

- [MediaPlayerElement](./media-player-element.md)
- [TitleBar](./title-bar.md)
