# StoreDownloaderExtension

An app extension that uses the system implementation to schedule Apple-hosted asset-pack downloads automatically.

## Signature / Usage

```swift
protocol StoreDownloaderExtension : ManagedDownloaderExtension
```

## Options / Props

| Item | Description |
|------|-------------|
| Inherits from | `AppExtension`, `BADownloaderExtension`, `ManagedDownloaderExtension` |

## Notes

- Available iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- You can optionally implement the inherited `ManagedDownloaderExtension` requirements, but don't implement any of the inherited `BADownloaderExtension` requirements for which this protocol provides a default implementation. The Background Assets framework documents the inherited requirements; this skill does not cover it.
- Source: https://developer.apple.com/documentation/storekit/storedownloaderextension (fetched 2026-11-14)

## Related

- [AppStore](./appstore.md)
