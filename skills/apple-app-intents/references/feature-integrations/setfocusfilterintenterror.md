---
source: https://developer.apple.com/documentation/appintents/setfocusfilterintenterror
---

# SetFocusFilterIntentError

Errors that can occur when you try to retrieve the current Focus configuration settings.

## Signature / Usage

```swift
enum SetFocusFilterIntentError

case missingParameterValue
case notFound
```

## Options / Props

| Name | Description |
| --- | --- |
| `missingParameterValue` | An error indicating that the intent has an invalid parameter value. |
| `notFound` | (no abstract in the source) |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS (no `introducedAt` given in the source JSON)
- Conforms to `Equatable`, `Error`, `Hashable`, `LocalizedError`, `Sendable`, `SendableMetatype`.
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [SetFocusFilterIntent](./setfocusfilterintent.md)
