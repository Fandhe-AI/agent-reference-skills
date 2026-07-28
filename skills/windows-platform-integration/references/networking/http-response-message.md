# HttpResponseMessage

Represents an HTTP response message including headers, status code, and content, returned by `HttpClient` requests.

## Signature / Usage

```csharp
HttpResponseMessage httpResponse = await httpClient.GetAsync(requestUri);
httpResponse.EnsureSuccessStatusCode();
string body = await httpResponse.Content.ReadAsStringAsync();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `StatusCode` | `HttpStatusCode` | HTTP status code of the response. |
| `ReasonPhrase` | `String` | Reason phrase sent by the server together with the status code. |
| `IsSuccessStatusCode` | `Boolean` | Whether the status code indicates success. |
| `Content` | `IHttpContent` | Response body content. |
| `Headers` | `HttpResponseHeaderCollection` | Collection of response headers sent by the server. |
| `RequestMessage` | `HttpRequestMessage` | The request message that led to this response. |
| `Source` | `HttpResponseMessageSource` | Origin of the response data (network vs. cache). |
| `Version` | `HttpVersion` | HTTP protocol version used. |
| `EnsureSuccessStatusCode()` | method | Throws if `IsSuccessStatusCode` is `false`; no-op otherwise. |

## Notes

- Namespace: `Windows.Web.Http`. Instances are commonly obtained as the return value of `HttpClient.GetAsync`, `PostAsync`, `PutAsync`, `DeleteAsync`, or `SendRequestAsync`.

## Related

- [HttpClient](./http-client.md)
- [HttpRequestMessage](./http-request-message.md)
