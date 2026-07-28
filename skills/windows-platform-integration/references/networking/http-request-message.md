# HttpRequestMessage

Represents an HTTP request message including HTTP verb, headers, and content, for use with `HttpClient`.

## Signature / Usage

```csharp
using Windows.Web.Http;

var request = new HttpRequestMessage(HttpMethod.Get, new Uri("https://www.contoso.com"));
request.Headers.Append("X-Custom-Header", "value");

HttpResponseMessage response = await httpClient.SendRequestAsync(request);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Method` | `HttpMethod` | HTTP verb to use for the request. |
| `RequestUri` | `Uri` | Target URI for the request. |
| `Content` | `IHttpContent` | Request body content, if any. |
| `Headers` | `HttpRequestHeaderCollection` | Collection of request headers. |
| `TransportInformation` | `HttpTransportInformation` | Underlying transport socket / SSL details for the connection. |
| `Properties` | `IMap<String, Object>` | Free-form developer-owned properties, visible to filters in the pipeline. |

## Notes

- Namespace: `Windows.Web.Http`. Use this class directly when you need low-level control: inspecting SSL/TLS transport info, using an uncommon HTTP method, or setting request properties explicitly.
- `HttpClient` convenience methods (`GetAsync`, `PostAsync`, `PutAsync`, `DeleteAsync`, `GetStringAsync`, etc.) construct an `HttpRequestMessage` internally; any filters added to the client's filter pipeline still see this object.
- Pass the constructed message to `HttpClient.SendRequestAsync(HttpRequestMessage)` or `HttpBaseProtocolFilter.SendRequestAsync(HttpRequestMessage)`.

## Related

- [HttpClient](./http-client.md)
- [HttpResponseMessage](./http-response-message.md)
