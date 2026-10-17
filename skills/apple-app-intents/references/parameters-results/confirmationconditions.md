---
source: https://developer.apple.com/documentation/appintents/confirmationconditions
---

# ConfirmationConditions

Conditions for a confirmation request. If any of the conditions are met, confirmation will be requested.

## Signature / Usage

```swift
struct ConfirmationConditions
```

```swift
static let lowConfidenceSource: ConfirmationConditions
```

## Options / Props

| Name | Declaration | Description |
|------|-------------|-------------|
| `lowConfidenceSource` | `static let lowConfidenceSource: ConfirmationConditions` | Only confirm if initiated from a low-confidence action source. |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+.
- Conforms to `Equatable`, `ExpressibleByArrayLiteral`, `OptionSet`, `RawRepresentable`, `Sendable`, `SendableMetatype`, `SetAlgebra`.
- The page does not document which API consumes `ConfirmationConditions`; none is stated in the saved source.

## Related

- [IntentChoiceOption](./intentchoiceoption.md)
- [IntentParameter](./intentparameter.md)
