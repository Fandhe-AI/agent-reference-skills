# Link

A control for navigating to a URL.

## Signature / Usage

```swift
@MainActor @preconcurrency struct Link<Label> where Label : View
```

```swift
Link("Visit our website",
     destination: URL(string: "https://www.example.com")!)

Link(destination: URL(string: "https://www.example.com")!) {
    Label("Open", systemImage: "safari")
}
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:destination:)` | Title string key + `URL` |
| `init(destination:label:)` | `URL` + custom label view builder |

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `destination` | `URL` | The URL to open |

## Notes

- Available on iOS 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+.
- By default opens the URL using the system handler (Safari for `https://` URLs).
- Override behavior by setting `\.openURL` in the environment:
  ```swift
  Link("Docs", destination: url)
      .environment(\.openURL, OpenURLAction { _ in .handled })
  ```

## Related

- [Button](./button.md)
