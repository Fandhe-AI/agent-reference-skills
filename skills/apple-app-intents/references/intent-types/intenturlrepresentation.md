---
source: https://developer.apple.com/documentation/appintents/intenturlrepresentation
---

# IntentURLRepresentation

The type that provides the URL for an app intent.

## Signature / Usage

```swift
struct IntentURLRepresentation<Intent> where Intent : AppIntent
```

```swift
struct OpenAppleDotCom: URLRepresentableIntent {
   static var urlRepresentation: URLRepresentation = "https://www.apple.com/\(\.$page)"

   @Parameter(title: "Page")
   var page: String

   static var title: LocalizedStringResource = "Open Apple website"
}
```

## Options / Props

| Member | Declaration | Description |
| --- | --- | --- |
| `init(_:)` | `init(String)` | Creates a URL representation for an app intent using the provided Swift string. |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Conforms to `ExpressibleByExtendedGraphemeClusterLiteral`, `ExpressibleByStringInterpolation`, `ExpressibleByStringLiteral`, `ExpressibleByUnicodeScalarLiteral`.
- Use when an app intent adopts `URLRepresentableIntent`. Construct it as a Swift string of URL-suitable characters. To incorporate parameters, include a key path to the parameter in the string; the type replaces `\(\.$page)` with the value of the `page` parameter before returning the URL.
- Parameters of type `String`, `Int`, and `URL` are converted automatically to URL-suitable values. For other types, implement `CustomURLRepresentationParameterConvertible`.
- Entities and enums use the sibling types `EntityURLRepresentation` and `EnumURLRepresentation` (covered in the entities category of this skill).

## Related

- [URLRepresentableIntent](./urlrepresentableintent.md)
- [CustomURLRepresentationParameterConvertible](./customurlrepresentationparameterconvertible.md)
