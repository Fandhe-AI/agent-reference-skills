# AssetError

An error that occurs during model asset operations.

## Signature / Usage

```swift
struct AssetError: Error, LocalizedError

init(kind: AssetError.Kind, debugMessage: String?)
var kind: AssetError.Kind
var debugMessage: String?
var errorDescription: String?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `kind` | `AssetError.Kind` | The classification of the error |
| `debugMessage` | `String?` | An optional message with additional debugging context |
| `errorDescription` | `String?` | A localized description of the error |
| `init(kind:debugMessage:)` | `init(kind: AssetError.Kind, debugMessage: String?)` | Creates an asset error |
| `AssetError.Kind` | enum | The reasons an asset operation can fail |

## Notes

- iOS 27.0+, iPadOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+. Conforms to `Error`, `LocalizedError`, `Sendable`.
- The individual `Kind` cases are not listed on this page.

## Related

- [AIModelAsset](./aimodelasset.md)
