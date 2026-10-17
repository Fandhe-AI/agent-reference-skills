---
source: https://developer.apple.com/documentation/appintents/intentprojection
---

# IntentProjection

Projections for an app intent that returns non-optional values for parameters.

## Signature / Usage

The page has no code listing; declarations below are taken verbatim from the symbol pages.

```swift
@dynamicMemberLookup final class IntentProjection<Intent> where Intent : AppIntent
```

```swift
subscript<Value>(dynamicMember _: KeyPath<Intent, Value>) -> Value.UnwrappedType
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `subscript(dynamicMember:)` | `subscript<Value>(dynamicMember _: KeyPath<Intent, Value>) -> Value.UnwrappedType` | Dynamic-member access to the intent's parameters, returning the unwrapped (non-optional) type. |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+ (the page JSON lists visionOS without an `introducedAt` value).
- Use an `IntentProjection` to create an app intent that returns non-optional values for parameters you list using an `IntentParameterDependency` property wrapper (`IntentParameterDependency`: "A property wrapper that represents an app intent dependency you use to provide dynamic options.").

## Related

- [AppIntent](./appintent.md)
- [IntentDescription](./intentdescription.md)
- [IntentDeprecation](./intentdeprecation.md)
