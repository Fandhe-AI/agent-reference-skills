# MediaIntelligenceImageAsset

An image asset to analyze. Each asset has a unique identifier you assign and a `Kind` value describing how the framework accesses the image data.

## Signature / Usage

```swift
struct MediaIntelligenceImageAsset

let asset = MediaIntelligenceImageAsset(
    id: MediaIntelligenceImageAsset.ID(url.standardizedFileURL.path(percentEncoded: false)),
    kind: .url(url)
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(id:kind:)` | `(MediaIntelligenceImageAsset.ID, MediaIntelligenceImageAsset.Kind)` | Creates an image asset with the specified identifier and kind |
| `id` | `MediaIntelligenceImageAsset.ID` | A unique identifier for the asset |
| `kind` | `MediaIntelligenceImageAsset.Kind` | Describes how the framework accesses the image data |
| `ID` | `struct` | A unique identifier for an image asset |
| `Kind` | `enum` | Describes the source of an image asset's data (the guide uses `.url(URL)`) |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+
- Conforms to `Sendable` and `SendableMetatype`.
- Use the same `ID` consistently for a given image. The framework matches new submissions against existing data by this identifier; changing it makes the framework treat the image as a new asset.
- The official sample derives the ID from `url.lastPathComponent`; that collides for same-named files in different directories, so use an identifier that is unique per image and stable across runs (e.g. the full standardized path or your own persistent asset ID).
- Only the `.url(_:)` case of `Kind` is shown in the source pages fetched; other cases not confirmed.
- Source: https://developer.apple.com/documentation/mediaintelligence/mediaintelligenceimageasset

## Related

- [FaceGroupAnalyzer](./facegroupanalyzer.md)
- [Detecting and grouping faces in images](./detecting-and-grouping-faces-in-images.md)
- [MediaIntelligenceVideoAsset](./mediaintelligencevideoasset.md)
