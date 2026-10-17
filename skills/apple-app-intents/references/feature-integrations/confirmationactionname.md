---
source: https://developer.apple.com/documentation/appintents/confirmationactionname
---

# ConfirmationActionName

A structure of predefined (and custom) action names used for confirmation prompts. The official page has no abstract or overview.

## Signature / Usage

```swift
struct ConfirmationActionName

static func custom(
    acceptLabel: LocalizedStringResource,
    acceptAlternatives: [LocalizedStringResource],
    denyLabel: LocalizedStringResource,
    denyAlternatives: [LocalizedStringResource],
    destructive: Bool
) -> ConfirmationActionName
```

## Options / Props

| Name | Description |
| --- | --- |
| `add`, `addData`, `book`, `buy`, `call`, `checkIn` | Predefined action names (no per-member description in the source). |
| `continue`, `create`, `do`, `download`, `filter`, `find` | Predefined action names. `continue` and `do` are declared with backticks. |
| `get`, `go`, `log`, `open`, `order`, `pay` | Predefined action names. |
| `play`, `playSound`, `post`, `request`, `run`, `search` | Predefined action names. |
| `send`, `set`, `share`, `start`, `startNavigation`, `toggle` | Predefined action names. |
| `turnOff`, `turnOn`, `view` | Predefined action names. |
| `custom(acceptLabel:acceptAlternatives:denyLabel:denyAlternatives:destructive:)` | Type method that builds a custom action name. |

## Notes

- The predefined action names are type properties, each declared as `static var <name>: ConfirmationActionName`.
- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS (no `introducedAt` given in the source JSON)
- Conforms to `Sendable`, `SendableMetatype`.
- The official page lists it under "Action button" (see article "Responding to the Action button on Apple Watch Ultra") but gives no description of where the names are consumed; this reference does not state that usage beyond the declarations.
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [StartWorkoutIntent](./startworkoutintent.md)
- IntentDialog
