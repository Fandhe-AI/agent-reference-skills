---
source: https://developer.apple.com/documentation/appintents/customurlrepresentationparameterconvertible
---

# CustomURLRepresentationParameterConvertible

An interface that allows a type to express its contents in a URL representation.

## Signature / Usage

```swift
protocol CustomURLRepresentationParameterConvertible
```

```swift
var urlRepresentationParameter: String? { get }
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `urlRepresentationParameter` | `var urlRepresentationParameter: String?` | The string representation of the type's content (two default implementations exist). |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Inherited by `URLRepresentableEntity` and `URLRepresentableEnum`.
- Apply to custom types used to build the URL for an app intent or app entity. `EntityURLRepresentation`, `IntentURLRepresentation`, and `EnumURLRepresentation` automatically convert `String`, `Int`, or `URL` properties; for other types adopt this protocol and use `urlRepresentationParameter` to deliver a string that represents the content.

## Related

- [URLRepresentableIntent](./urlrepresentableintent.md)
- [IntentURLRepresentation](./intenturlrepresentation.md)
