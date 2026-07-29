# FeedManager

Sealed class providing methods for querying enabled feed providers and setting custom query-string parameters from within a feed provider.

## Signature / Usage

```csharp
public sealed class FeedManager
```

```csharp
// Get the default instance
var manager = FeedManager.GetDefault();

// Query currently enabled feed providers on startup
var existingFeedProviders = manager.GetEnabledFeedProviders();

// Register custom query-string parameters for a feed
var updateOptions = new CustomQueryParametersUpdateOptions(feedProviderDefinitionId, "param1&param2");
manager.SetCustomQueryParameters(updateOptions);
```

## Options / Props

| Method | Description |
|------|-------------|
| `GetDefault()` (static) | Gets the `FeedManager` instance for the calling app. |
| `GetEnabledFeedProviders()` | Gets `FeedProviderInfo` objects for all of the calling app's currently enabled feed providers, including `EnabledFeedDefinitionIds`. |
| `SetCustomQueryParameters(CustomQueryParametersUpdateOptions)` | Registers a query string (built from a `FeedProviderDefinitionId` and a parameter string) with the Widgets Board, to be appended to the feed's `ContentUri` — typically used to pass authentication tokens. |

## Notes

- Package: `Microsoft.Windows.Widgets.Feeds.Providers`.
- Call `SetCustomQueryParameters` both from `IFeedProvider.OnFeedProviderEnabled` (initial registration) and from `IFeedProvider.OnCustomQueryParametersRequested` (refresh, e.g. after a failed content fetch).
- Parallel to `WidgetManager` on the widget-provider side, but scoped to feed enablement/query-parameter operations rather than widget content updates.

## Related

- [IFeedProvider](./ifeedprovider.md)
- [implement-feed-provider](./implement-feed-provider.md)
- [WidgetManager](./widgetmanager.md)
