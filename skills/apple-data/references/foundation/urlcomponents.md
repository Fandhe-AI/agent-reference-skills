# URLComponents

A struct that parses URLs into constituent parts and constructs URLs from those parts per RFC 3986. The preferred way to build URLs with dynamic query parameters.

## Signature / Usage

```swift
var components = URLComponents()
components.scheme = "https"
components.host = "example.com"
components.path = "/api/users"
components.queryItems = [
    URLQueryItem(name: "id", value: "123"),
    URLQueryItem(name: "format", value: "json")
]

if let url = components.url {
    print(url)  // https://example.com/api/users?id=123&format=json
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `init()` | `URLComponents` | Empty instance |
| `init(string:)` | `URLComponents?` | Parse from URL string |
| `init(url:resolvingAgainstBaseURL:)` | `URLComponents?` | Parse from `URL` |
| `scheme` | `String?` | URL scheme (e.g., `"https"`) |
| `user` | `String?` | Username |
| `password` | `String?` | Password |
| `host` | `String?` | Host (decoded) |
| `encodedHost` | `String?` | Host (percent-encoded) |
| `port` | `Int?` | Port number |
| `path` | `String` | Path (decoded) |
| `query` | `String?` | Query string (decoded) |
| `queryItems` | `[URLQueryItem]?` | Parsed query key-value pairs |
| `percentEncodedQueryItems` | `[URLQueryItem]?` | Query items with percent-encoded values |
| `fragment` | `String?` | Fragment/anchor |
| `url` | `URL?` | Construct `URL` from components |
| `url(relativeTo:)` | `URL?` | Construct relative `URL` |
| `string` | `String?` | URL as string |

## Notes

- Available iOS 8.0+, macOS 10.10+.
- Conforms to `Codable`, `Hashable`, `Sendable`.
- Percent-encoding is handled automatically when reading/writing non-`percentEncoded` properties.
- Subtle differences from `URL` in RFC 3986 compliance; prefer `URLComponents` for constructing URLs with user input.

## Related

- [URL](./url.md)
- [URLRequest](./urlrequest.md)
