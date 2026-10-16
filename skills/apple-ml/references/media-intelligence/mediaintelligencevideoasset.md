# MediaIntelligenceVideoAsset

A video asset to analyze. Each asset has a unique identifier you assign and a `Kind` value describing how the framework accesses the video data.

## Signature / Usage

```swift
struct MediaIntelligenceVideoAsset

let asset = MediaIntelligenceVideoAsset(
    id: MediaIntelligenceVideoAsset.ID(videoURL.lastPathComponent),
    kind: .url(videoURL)
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(id:kind:)` | `(MediaIntelligenceVideoAsset.ID, MediaIntelligenceVideoAsset.Kind)` | Creates a video asset with the specified identifier and kind |
| `id` | `MediaIntelligenceVideoAsset.ID` | A unique identifier for the asset |
| `kind` | `MediaIntelligenceVideoAsset.Kind` | Describes how the framework accesses the video data |
| `ID` | `struct` | A unique identifier for a video asset |
| `Kind` | `enum` | Describes the source of a video asset's data; `case url(URL)` is a video located at the specified URL |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Conforms to `Sendable` and `SendableMetatype`.
- Use a file URL pointing to the video on disk. Any string that uniquely identifies the video in your app can serve as the ID.
- Source: https://developer.apple.com/documentation/mediaintelligence/mediaintelligencevideoasset

## Related

- [VideoAnalyzer](./videoanalyzer.md)
- [Finding the best moments in a video](./finding-the-best-moments-in-a-video.md)
- [MediaIntelligenceImageAsset](./mediaintelligenceimageasset.md)
