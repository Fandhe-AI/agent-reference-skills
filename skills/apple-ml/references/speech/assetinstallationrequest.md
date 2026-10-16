# AssetInstallationRequest

An object that describes, downloads, and installs a selection of assets.

## Signature / Usage

```swift
if let installationRequest = try await AssetInventory.assetInstallationRequest(supporting: [transcriber]) {
    try await installationRequest.downloadAndInstall()
}
```

## Options / Props

Declaration: `@objc final class AssetInstallationRequest` (inherits `NSObject`; conforms to `ProgressReporting`, `Sendable`).

| Name | Type | Description |
|------|------|-------------|
| `downloadAndInstall()` | `async throws` | Downloads and installs assets not already on the device. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Do not create instances directly; obtain them from `AssetInventory.assetInstallationRequest(supporting:)`.
- The system consolidates requests; you may obtain several instances and call `downloadAndInstall()` several times without redundant downloads.
- Progress is observable through its `ProgressReporting` conformance.
- Source: https://developer.apple.com/documentation/speech/assetinstallationrequest

## Related

- [AssetInventory](./assetinventory.md)
- [SpeechModels](./speechmodels.md)
