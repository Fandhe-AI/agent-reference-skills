# URLRequest

A struct representing a URL load request — encapsulating the URL, HTTP method, headers, body, and policies — independent of protocol or URL scheme.

## Signature / Usage

```swift
var request = URLRequest(url: URL(string: "https://api.example.com/data")!)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.httpBody = try JSONEncoder().encode(payload)

let (data, response) = try await URLSession.shared.data(for: request)
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `init(url:cachePolicy:timeoutInterval:)` | `URLRequest` | Designated initializer |
| `url` | `URL?` | The request URL |
| `httpMethod` | `String?` | HTTP method (`"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, etc.) |
| `httpBody` | `Data?` | Request body data |
| `httpBodyStream` | `InputStream?` | Streaming body alternative to `httpBody` |
| `allHTTPHeaderFields` | `[String: String]?` | All headers as a dictionary |
| `cachePolicy` | `URLRequest.CachePolicy` | Cache behavior |
| `timeoutInterval` | `TimeInterval` | Request timeout in seconds (default 60) |
| `setValue(_:forHTTPHeaderField:)` | `Void` | Set a header value (replaces existing) |
| `addValue(_:forHTTPHeaderField:)` | `Void` | Append to an existing header |
| `value(forHTTPHeaderField:)` | `String?` | Retrieve a header value |
| `allowsCellularAccess` | `Bool` | Allow cellular radio |
| `allowsConstrainedNetworkAccess` | `Bool` | Allow Low Data Mode |
| `allowsExpensiveNetworkAccess` | `Bool` | Allow expensive interfaces |
| `httpShouldHandleCookies` | `Bool` | Whether cookies are sent |
| `networkServiceType` | `URLRequest.NetworkServiceType` | Quality-of-service hint |

**`URLRequest.CachePolicy` cases:** `.useProtocolCachePolicy` (default), `.reloadIgnoringLocalCacheData`, `.returnCacheDataElseLoad`, `.returnCacheDataDontLoad`

## Notes

- Available iOS 8.0+, macOS 10.10+.
- Conforms to `Hashable`, `Sendable`.
- Use with `URLSession` to perform the actual network transfer.
- Default `httpMethod` when not set is `"GET"`.

## Related

- [URL](./url.md)
- [URLSession](./urlsession.md)
- [URLComponents](./urlcomponents.md)
