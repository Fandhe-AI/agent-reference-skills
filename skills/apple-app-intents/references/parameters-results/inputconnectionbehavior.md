---
source: https://developer.apple.com/documentation/appintents/inputconnectionbehavior
---

# InputConnectionBehavior

Describes the input behaviors for connecting a parameter to the output of the previous App Intent.

## Signature / Usage

```swift
enum InputConnectionBehavior
```

## Options / Props

| Case | Description |
|------|-------------|
| `connectToPreviousIntentResult` | A behavior that permits the parameter to accept the output. |
| `` `default` `` | A behavior that allows the system to determine if the parameter accepts the output. |
| `never` | A behavior that prohibits the parameter from accepting the output. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- Conforms to `Equatable` and `Hashable`.

## Related

- [IntentParameter](./intentparameter.md)
- [DynamicOptionsProvider](./dynamicoptionsprovider.md)
