# HttpBaseProtocolFilter

The base protocol filter used by an `HttpClient` instance when no custom `IHttpFilter` is supplied; exposes low-level HTTP stack behaviors.

## Signature / Usage

```csharp
using Windows.Web.Http;
using Windows.Web.Http.Filters;

var filter = new HttpBaseProtocolFilter
{
    AllowAutoRedirect = true,
    AutomaticDecompression = true,
    MaxConnectionsPerServer = 4
};

var httpClient = new HttpClient(filter);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AllowAutoRedirect` | `Boolean` | Whether to follow redirection responses. |
| `AllowUI` | `Boolean` | Whether the filter can prompt for user credentials. |
| `AutomaticDecompression` | `Boolean` | Whether the filter automatically decompresses response content. |
| `CacheControl` | `HttpCacheControl` | Read/write cache control behavior. |
| `ClientCertificate` | `Certificate` | Client SSL certificate sent when requested by the server. |
| `CookieManager` | `HttpCookieManager` | The cookie manager for cookies associated with the app. |
| `CookieUsageBehavior` | `HttpCookieUsageBehavior` | Cookie handling behavior (automatic by default). |
| `IgnorableServerCertificateErrors` | `IVector<ChainValidationResult>` | SSL server certificate errors the app might choose to ignore. |
| `MaxConnectionsPerServer` | `UInt32` | Maximum TCP connections allowed per HTTP server. |
| `MaxVersion` | `HttpVersion` | Maximum HTTP protocol version to use. |
| `ProxyCredential` / `ServerCredential` | `PasswordCredential` | Credentials for proxy / server authentication negotiation. |
| `UseProxy` | `Boolean` | Whether the filter can use a proxy. |
| `ClearAuthenticationCache()` | method | Clears cached authentication credentials on the device. |
| `SendRequestAsync(HttpRequestMessage)` | method | Sends a request directly through this filter. |

## Notes

- Namespace: `Windows.Web.Http.Filters`. If no additional filters are added to an `HttpClient` instance, `HttpBaseProtocolFilter` is the only filter in the pipeline; custom filters implementing `IHttpFilter` can be chained to further process results.
- Throws exceptions on send/receive network failures; apps may want to add a filter that converts these to HTTP response codes.
- In a desktop app, an instance used to display UI (credential prompts) must be associated with its owner window handle before use.

## Related

- [HttpClient](./http-client.md)
- [HttpCookieManager](./http-cookie-manager.md)
