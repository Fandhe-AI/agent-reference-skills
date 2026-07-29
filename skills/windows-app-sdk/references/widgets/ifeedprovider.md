# IFeedProvider

Interface implemented by Windows feed providers to receive callbacks from the Widgets Board Dashboard about feed and feed-provider enablement state, and to supply custom query-string parameters (e.g. authentication tokens) for the provider's content URI.

## Signature / Usage

```csharp
public interface IFeedProvider
```

```csharp
// FeedProvider.cs
[ComVisible(true)]
[ComDefaultInterface(typeof(IFeedProvider))]
[Guid("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")]
public sealed class FeedProvider : IFeedProvider
{
    public void OnFeedProviderEnabled(FeedProviderEnabledArgs args)
    {
        var updateOptions = new CustomQueryParametersUpdateOptions(args.FeedProviderDefinitionId, "param1&param2");
        FeedManager.GetDefault().SetCustomQueryParameters(updateOptions);
    }

    public void OnFeedProviderDisabled(FeedProviderDisabledArgs args) { /* ... */ }
    public void OnFeedEnabled(FeedEnabledArgs args) { /* ... */ }
    public void OnFeedDisabled(FeedDisabledArgs args) { /* ... */ }

    public void OnCustomQueryParametersRequested(CustomQueryParametersRequestedArgs args)
    {
        var updateOptions = new CustomQueryParametersUpdateOptions(args.FeedProviderDefinitionId, "param1&param2");
        FeedManager.GetDefault().SetCustomQueryParameters(updateOptions);
    }
}
```

## Options / Props

| Method | Description |
|------|-------------|
| `OnFeedProviderEnabled(FeedProviderEnabledArgs)` | Invoked when a feed associated with the provider is created by the Widgets Board host. Typically generates the query string (with auth tokens) and registers it via `FeedManager.SetCustomQueryParameters`. |
| `OnFeedProviderDisabled(FeedProviderDisabledArgs)` | Invoked when all of the provider's feeds have been disabled. No action required; useful for telemetry, revoking tokens, or exiting the app if this was the only enabled provider. |
| `OnFeedEnabled(FeedEnabledArgs)` | Invoked when an individual feed is enabled. No action required. |
| `OnFeedDisabled(FeedDisabledArgs)` | Invoked when an individual feed is disabled. No action required. |
| `OnCustomQueryParametersRequested(CustomQueryParametersRequestedArgs)` | Invoked when the Widgets Board determines the custom query parameters need to be refreshed (e.g. after a failed content fetch). Regenerate the query string and call `FeedManager.SetCustomQueryParameters` again. |

## Notes

- Package: `Microsoft.Windows.Widgets.Feeds.Providers` (Windows App SDK, WinRT). Distinct from `IWidgetProvider` (`Microsoft.Windows.Widgets.Providers`) — feed providers supply web-rendered feed content shown as pivots in the Widgets Board's Dashboard/Feeds section, while widget providers supply Adaptive Card widgets.
- Objects passed into callback methods are only guaranteed valid within the callback — do not store references to them.
- The feed providers feature is in preview and, per the official docs, is available only to users in the European Economic Area (EEA).
- Requires activation via COM (`CreateInstance`), implemented the same way as `IWidgetProvider`: a class factory registered with `CoRegisterClassObject`, declared as a `com:Extension` (ComServer) in the package manifest.

## Related

- [FeedManager](./feedmanager.md)
- [implement-feed-provider](./implement-feed-provider.md)
- [feed-provider-manifest](./feed-provider-manifest.md)
- [IWidgetProvider](./iwidgetprovider.md)
