# Windows.Web.Syndication

Retrieves and parses RSS and Atom web feeds asynchronously. `SyndicationClient` downloads a feed from a URI and materializes it as a `SyndicationFeed` object graph (`SyndicationItem`, `SyndicationCategory`, etc.), auto-detecting the wire format via `SyndicationFormat`.

## Signature / Usage

```csharp
using Windows.Web.Syndication;

var client = new SyndicationClient { BypassCacheOnRetrieve = true };
SyndicationFeed feed = await client.RetrieveFeedAsync(new Uri("https://example.com/feed.xml"));

foreach (SyndicationItem item in feed.Items)
{
    string title = item.Title.Text;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `SyndicationClient()` / `SyndicationClient(PasswordCredential)` | constructor | Creates a client, optionally with credentials for an authenticated feed endpoint. |
| `BypassCacheOnRetrieve` | `bool` | Skips the HTTP cache when retrieving the feed. |
| `MaxResponseBufferSize` | `uint` | Maximum bytes to buffer from the server response. |
| `ServerCredential` / `ProxyCredential` | `PasswordCredential` | Credentials for the feed server / an intervening proxy. |
| `Timeout` | `uint` | Milliseconds to wait before an asynchronous operation fails as timed out. |
| `RetrieveFeedAsync(Uri)` | method | Downloads and parses the feed at the given URI into a `SyndicationFeed`. |
| `SetRequestHeader(string, string)` | method | Sets (or appends, comma-separated, if called again for the same name) an HTTP request header. |

## Notes

- Namespace: `Windows.Web.Syndication` (WinRT/UWP). `SyndicationFeed` supports both RSS and Atom; the source format is exposed via `SyndicationFeed.SourceFormat`.
- Considered a legacy/niche API by Microsoft's own networking overview relative to `HttpClient` + manual XML parsing, but still the documented way to consume RSS/Atom feeds without a third-party library.

## Related

- [HttpClient](./http-client.md)
