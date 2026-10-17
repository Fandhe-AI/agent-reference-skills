---
source: https://developer.apple.com/documentation/appintents/longrunningtaskoptions
---

# LongRunningTaskOptions

Options for configuring long-running tasks.

## Signature / Usage

```swift
struct LongRunningTaskOptions
```

```swift
static let requiresGPU: LongRunningTaskOptions
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `requiresGPU` | `static let requiresGPU: LongRunningTaskOptions` | An option that indicates the task requires GPU resources. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Pass these options to `performBackgroundTask(options:operation:)` or `performBackgroundTask(options:operation:onCancel:)` of `LongRunningIntent`.
- Conforms to `Equatable`, `ExpressibleByArrayLiteral`, `OptionSet`, `RawRepresentable`, `Sendable`, `SendableMetatype`, `SetAlgebra`.

## Related

- [LongRunningIntent](./longrunningintent.md)
