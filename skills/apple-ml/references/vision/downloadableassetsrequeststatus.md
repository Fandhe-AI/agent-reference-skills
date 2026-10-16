# DownloadableAssetsRequestStatus

An enumeration of the status of the assets required by a `DownloadableAssetsRequest`.

## Signature / Usage

```swift
switch await request.assetStatus {
case .ready:
    break
case .notReady:
    try await request.downloadAssets()
case .downloading, .error:
    return
@unknown default:
    return
}
```

## Options / Props

| Case | Description |
|------|-------------|
| `notReady` | The assets are not ready or the status is unknown. Call `downloadAssets()` or `downloadAssets(progress:)` to initiate the download |
| `ready` | The assets are ready |
| `downloading` | The assets are being downloaded. Check progress through the subprogress that was passed to `downloadAssets(progress:)` |
| `error(_:)` | The asset download failed with an error (`case error(any Error)`) |

## Notes

- iOS 27.0+ / iPadOS 27.0+ / Mac Catalyst 27.0+ / macOS 27.0+ / tvOS 27.0+ / visionOS 27.0+
- `enum` conforming to `Equatable`, `Sendable`, `SendableMetatype`.
- The usage snippet above is taken from the "Isolating an object from a tap, box, or scribble" article.

## Related

- [DownloadableAssetsRequest](./downloadableassetsrequest.md)
- [GenerateIterativeSegmentationRequest](./generateiterativesegmentationrequest.md)
- [Isolating an object from a tap, box, or scribble](./isolating-an-object-from-a-tap-box-or-scribble.md)
