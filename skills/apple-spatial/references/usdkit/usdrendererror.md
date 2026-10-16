# USDRenderError

An error produced when rendering a USD stage fails.

## Signature / Usage

```swift
struct USDRenderError: Error, LocalizedError, Sendable

var errorDescription: String? { get }   // localized message describing what error occurred
```

## Notes

- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+. Module: USDKit (related module: RealityKit).
- Occurs while rendering or converting a USD stage for RealityKit.
- Conforms to `Error`, `LocalizedError`, `Sendable`, `SendableMetatype`.

## Related

- [USDStageComponent](./usdstagecomponent.md)
- [USDPlayer](./usdplayer.md)
