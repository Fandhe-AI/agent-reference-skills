---
source: https://developer.apple.com/documentation/appintents/deprecatedappintent
---

# DeprecatedAppIntent

An app intent that marks an action as deprecated and informs people which action to use instead.

## Signature / Usage

```swift
protocol DeprecatedAppIntent : AppIntent
```

Required members (from the Topics section):

```swift
associatedtype ReplacementIntent : AppIntent = Never
static var deprecation: IntentDeprecation<Self.ReplacementIntent> { get }
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `ReplacementIntent` | `associatedtype ReplacementIntent : AppIntent = Never` | The intent that replaces this one; defaults to `Never` (no abstract on the page). |
| `deprecation` | `static var deprecation: IntentDeprecation<Self.ReplacementIntent>` | Deprecation description (no abstract on the page; one default implementation exists). |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS (version not listed on the page), watchOS 10.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`.
- The page has no overview text beyond the abstract.

## Related

- [OpenIntent](./openintent.md)
- [SetValueIntent](./setvalueintent.md)
- [DeleteIntent](./deleteintent.md)
