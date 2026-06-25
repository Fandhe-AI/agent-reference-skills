# AVURLAsset

A concrete subclass of `AVAsset` that represents media at a local or remote URL. The most common entry point for creating assets from files and HTTP Live Streams.

## Signature / Usage

```swift
class AVURLAsset: AVAsset

// Basic (also callable as AVAsset(url:))
let asset = AVURLAsset(url: mediaURL)

// With options — disable cellular access for HLS
let options: [String: Any] = [
    AVURLAssetAllowsCellularAccessKey: false,
    AVURLAssetPreferPreciseDurationAndTimingKey: true
]
let asset = AVURLAsset(url: hlsURL, options: options)

// Use in a player item
let item = AVPlayerItem(asset: asset)
let player = AVPlayer(playerItem: item)
```

## Options / Props

| Initialization Option Key | Type | Description |
|---------------------------|------|-------------|
| `AVURLAssetAllowsCellularAccessKey` | `Bool` | Whether HLS streams may use cellular data (default `true`) |
| `AVURLAssetPreferPreciseDurationAndTimingKey` | `Bool` | Force precise duration/timing calculation |
| `AVURLAssetHTTPUserAgentKey` | `String` | Custom HTTP User-Agent header |
| `AVURLAssetHTTPCookiesKey` | `[HTTPCookie]` | HTTP cookies to send with requests |

| Instance Property | Type | Description |
|-------------------|------|-------------|
| `url` | `URL` | The URL the asset was initialized with |
| `resourceLoader` | `AVAssetResourceLoader` | Override resource loading (DRM, custom protocols) |
| `assetCache` | `AVAssetCache?` | Cache for offline playback |
| `httpSessionIdentifier` | `UUID` | Identifier sent in HTTP request headers |

| Class Method | Description |
|--------------|-------------|
| `audiovisualTypes()` | Returns UTI strings of supported file types |
| `audiovisualMIMETypes()` | Returns supported MIME types |
| `isPlayableExtendedMIMEType(_:)` | Check codec/container playability |

## Notes

- iOS 4.0+, iPadOS 4.0+, macOS 10.7+, tvOS 9.0+, visionOS 1.0+, watchOS 1.0+
- Inherits all async loading APIs from `AVAsset`; use `load(_:)` for properties like `tracks`, `duration`.
- Use `resourceLoader` to implement custom URL schemes or FairPlay Streaming (DRM).
- `AVURLAssetPreferPreciseDurationAndTimingKey` can significantly increase initialization time for MP4 files; only set when precise seeking is required.

## Related

- [AVAsset](./avasset.md)
- [AVPlayerItem](./avplayeritem.md)
- [AVAssetTrack](./avassettrack.md)
