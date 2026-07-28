# HttpClient

Sends HTTP requests and receives HTTP responses from a resource identified by a URI, using the HTTP 2.0 and HTTP 1.1 protocols.

## Signature / Usage

```csharp
using Windows.Web.Http;

HttpClient httpClient = new Windows.Web.Http.HttpClient();
Uri requestUri = new Uri("https://www.contoso.com");

HttpResponseMessage httpResponse = await httpClient.GetAsync(requestUri);
httpResponse.EnsureSuccessStatusCode();
string httpResponseBody = await httpResponse.Content.ReadAsStringAsync();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DefaultRequestHeaders` | `HttpRequestHeaderCollection` | Headers sent with every request made by this instance. |
| `GetAsync(Uri)` / `GetAsync(Uri, HttpCompletionOption)` | method | Send a GET request. |
| `PostAsync(Uri, IHttpContent)` | method | Send a POST request. |
| `PutAsync(Uri, IHttpContent)` | method | Send a PUT request. |
| `DeleteAsync(Uri)` | method | Send a DELETE request. |
| `SendRequestAsync(HttpRequestMessage)` / `SendRequestAsync(HttpRequestMessage, HttpCompletionOption)` | method | Send a fully custom `HttpRequestMessage`. |
| `GetBufferAsync(Uri)` / `GetInputStreamAsync(Uri)` / `GetStringAsync(Uri)` | method | Convenience GET variants returning buffer, stream, or string. |
| `TryGetAsync` / `TryPostAsync` / `TryPutAsync` / `TryDeleteAsync` / `TrySendRequestAsync` | method | Non-throwing variants that return a result object instead of throwing on failure (added 1903 / SDK 18362). |
| `Close()` / `Dispose()` | method | Release resources held by the client. |

## Notes

- Namespace: `Windows.Web.Http` (WinRT). Every `HttpClient` instance owns its own connection pool and setting collection; construct one instance per logical "session" and reuse it, do not create one per request.
- The base filter applied to an `HttpClient` instance is an `HttpBaseProtocolFilter` unless a custom `IHttpFilter` is passed to the `HttpClient(IHttpFilter)` constructor.
- For downloads of 50 MB or more, stream the response instead of relying on default buffering, or use `Windows.Networking.BackgroundTransfer.BackgroundDownloader`.
- Content types for requests/responses: `HttpBufferContent`, `HttpFormUrlEncodedContent`, `HttpMultipartContent`, `HttpMultipartFormDataContent`, `HttpStreamContent`, `HttpStringContent`, and the `IHttpContent` base interface.
- See `windows-vs-dotnet-http.md` for guidance on choosing between this WinRT `HttpClient` and `System.Net.Http.HttpClient`.
- Exceptions are thrown as HRESULT-backed errors (no built-in convenience method to map them); use `SocketError.GetStatus` / `WebErrorStatus` patterns from related namespaces where applicable.

## Related

- [HttpRequestMessage](./http-request-message.md)
- [HttpResponseMessage](./http-response-message.md)
- [HttpBaseProtocolFilter](./http-base-protocol-filter.md)
- [HttpCookieManager](./http-cookie-manager.md)
- [Windows.Web.Http vs System.Net.Http](./windows-vs-dotnet-http.md)
