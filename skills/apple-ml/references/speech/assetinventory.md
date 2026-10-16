# AssetInventory

Manages the assets that are necessary for transcription or other analyses. Assets are machine-learning models downloaded from Apple's servers and managed by the system.

## Signature / Usage

```swift
if let installationRequest = try await AssetInventory.assetInstallationRequest(supporting: [transcriber]) {
    try await installationRequest.downloadAndInstall()
}
```

## Options / Props

Declaration: `final class AssetInventory`.

| Name | Type | Description |
|------|------|-------------|
| `static assetInstallationRequest(supporting:)` | `async throws -> AssetInstallationRequest?` | Returns an installation request object, used to initiate the asset download and monitor its progress. Parameter: `[any SpeechModule]`. |
| `static reserve(locale:)` | `async throws -> Bool` | Adds an asset locale to the app's current reservations. |
| `static release(reservedLocale:)` | `async -> Bool` | Removes an asset locale reservation. |
| `static reservedLocales` | `[Locale]` | The app's current asset locale reservations. |
| `static maximumReservedLocales` | `Int` | The number of locale reservations permitted to an app. |
| `static status(forModules:)` | `async -> AssetInventory.Status` | Returns the status for the list of modules. |
| `Status` | enum | Asset status values. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Install in four steps: create modules in the configurations you want; assign locale reservations (automatic, or call `reserve(locale:)`; only needed for `LocaleDependentSpeechModule`); call `assetInstallationRequest(supporting:)` then `downloadAndInstall()`; wait for the download (it may finish immediately if assets were preinstalled or already downloaded).
- Your app does not work with assets directly; the system derives the relevant assets from the modules' configuration. Modules can be discarded after installation.
- Once downloaded, assets persist between launches and are shared between apps. The system may unsubscribe your app from assets that have not been used for a while.
- When a locale is no longer needed, call `release(reservedLocale:)`; the system removes the assets later.

## Related

- [SpeechAnalyzer](./speechanalyzer.md)
- [AssetInstallationRequest](./assetinstallationrequest.md)
- [LocaleDependentSpeechModule](./localedependentspeechmodule.md)
- [SpeechModule](./speechmodule.md)
