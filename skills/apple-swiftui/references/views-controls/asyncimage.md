# AsyncImage

A view that asynchronously loads and displays an image from a URL, or (27.0+) from a `URLRequest`.

## Signature / Usage

```swift
nonisolated struct AsyncImage<Content> where Content : View
```

```swift
AsyncImage(url: URL(string: "https://example.com/icon.png")) { phase in
    if let image = phase.image {
        image // Displays the loaded image.
    } else if phase.error != nil {
        Color.red // Indicates an error.
    } else {
        Color.blue // Acts as a placeholder.
    }
}
```

```swift
// 27.0+: load from a URLRequest
AsyncImage(request: URLRequest(url: imageURL)) { image in
    image.resizable(resizingMode: .tile)
} placeholder: {
    Color.green
}
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init(url:scale:)` | Loads and displays an image from a URL with the default placeholder |
| `init(url:scale:content:placeholder:)` | Custom placeholder; `content` receives the loaded `Image` |
| `init(url:scale:transaction:content:)` | `content` receives an `AsyncImagePhase` (`empty` / `success` / `failure`) |
| `init(request: URLRequest, scale: CGFloat = 1)` (27.0+) | Same as `init(url:scale:)` but from a `URLRequest`; `Content == Image` |
| `init<I, P>(request: URLRequest?, scale: CGFloat = 1, @ContentBuilder content: (Image) -> I, @ContentBuilder placeholder: () -> P)` (27.0+) | Custom placeholder; on failure the placeholder stays |
| `init(request: URLRequest?, scale: CGFloat = 1, transaction: Transaction = Transaction(), @ContentBuilder content: (AsyncImagePhase) -> Content)` (27.0+) | Phase-based content for a `URLRequest` |

Related modifier (27.0+): `nonisolated func asyncImageURLSession(_ urlSession: URLSession) -> some View` — adds a `URLSession` for `AsyncImage` instances in the view hierarchy to use for image download data tasks.

`AsyncImagePhase` (iOS 15.0+): `empty`, `success(_:)`, `failure(_:)`, plus `image` and `error` properties.

## Notes

- `AsyncImage`, `AsyncImagePhase`, and the `url` initializers: iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, macOS 12.0+, tvOS 15.0+, visionOS 1.0+, watchOS 8.0+.
- The `request` initializers and `asyncImageURLSession(_:)`: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- By default the view uses the shared `URLSession` instance. Until the image loads, a standard placeholder that fills the available space is shown.
- You cannot apply image-specific modifiers such as `resizable(capInsets:resizingMode:)` directly to an `AsyncImage`; apply them to the `Image` your `content` closure receives.
- If an `Image` used as the placeholder does not load, nothing is shown and no error is reported.
- In iOS 27, macOS 27, watchOS 27, tvOS 27, and visionOS 27 and later, `AsyncImage` caches downloaded image data following the transport protocol. The system creates the cache with a default `URLSessionConfiguration`. To change the cache policy (and timeout interval), set it on the `URLRequest` and pass it to `init(request:scale:transaction:content:)`. To customize downloads in a view hierarchy, use `asyncImageURLSession(_:)`.
- In the phase initializers, the phase is `empty` while the request is `nil` or before the load completes, then `failure(_:)` (see `error`) or `success(_:)` (see `image`). To add transitions when the `URLRequest` changes, apply an identifier to the `AsyncImage`.

## Related

- [Image](./image.md)
- [ProgressView](./progressview.md)
