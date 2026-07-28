# Windows.Web.Http vs System.Net.Http

Guidance for choosing between the WinRT `Windows.Web.Http.HttpClient` and the .NET `System.Net.Http.HttpClient` in a Windows app.

## Signature / Usage

```csharp
// WinRT HttpClient
Windows.Web.Http.HttpClient winrtClient = new Windows.Web.Http.HttpClient();

// .NET HttpClient (WinUI 3, .NET 6+)
System.Net.Http.HttpClient dotnetClient = new System.Net.Http.HttpClient();
```

## Notes

- WinUI 3 apps targeting .NET 6 or later can use either client. `System.Net.Http.HttpClient` supports `IHttpClientFactory`, cancellation tokens, and modern async patterns, and is often simpler for straightforward HTTP requests.
- Use `Windows.Web.Http.HttpClient` when the app needs WinRT-specific features: credential prompts via `HttpBaseProtocolFilter.AllowUI`, cookie management through the WinRT broker (`HttpCookieManager`), SSL/TLS transport inspection via `HttpRequestMessage.TransportInformation`, or integration with Windows network isolation / capability-based sandboxing.
- `Windows.Foundation.Uri` (used by `Windows.Web.Http`) surfaces as `System.Uri` in C#/VB; there is no `TryCreate`-style parser for `Windows.Foundation.Uri` in C++, so URI construction from user input should be wrapped in try/catch.
- For large transfers (uploads or downloads of roughly 10 MB or more), prefer `Windows.Networking.BackgroundTransfer` (`BackgroundDownloader` / `BackgroundUploader`) over either `HttpClient`, since background transfer operations survive app suspension/termination and are resumable.
- Both clients can coexist in the same app; picking one does not require avoiding the other for unrelated code paths.

## Related

- [HttpClient](./http-client.md)
- [BackgroundDownloader](./background-downloader.md)
- [BackgroundUploader](./background-uploader.md)
