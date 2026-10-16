# DownloadableAssetsRequest

A protocol for a request whose execution depends on assets that may need to be downloaded. Inspect `assetStatus` to determine whether the required assets are ready, and call `downloadAssets()` to initiate the download when they are not.

## Signature / Usage

```swift
protocol DownloadableAssetsRequest

var assetStatus: DownloadableAssetsRequestStatus { get }
func downloadAssets() async throws
func downloadAssets(progress: consuming Subprogress) async throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `assetStatus` | `DownloadableAssetsRequestStatus` | The current download status of the assets required by the request |
| `downloadAssets()` | `async throws` | Downloads the assets required to perform the request (has a default implementation) |
| `downloadAssets(progress:)` | `(consuming Subprogress) async throws` | Downloads the assets, reporting progress through the provided subprogress (has a default implementation) |

## Notes

- iOS 27.0+ / iPadOS 27.0+ / Mac Catalyst 27.0+ / macOS 27.0+ / tvOS 27.0+ / visionOS 27.0+
- The only conforming type listed in the docs is `GenerateIterativeSegmentationRequest`.
- Per the iterative-segmentation article, the request throws an error if you perform it before Vision downloads the model.
- Source: https://developer.apple.com/documentation/vision/downloadableassetsrequest

## Related

- [DownloadableAssetsRequestStatus](./downloadableassetsrequeststatus.md)
- [GenerateIterativeSegmentationRequest](./generateiterativesegmentationrequest.md)
- [Isolating an object from a tap, box, or scribble](./isolating-an-object-from-a-tap-box-or-scribble.md)
