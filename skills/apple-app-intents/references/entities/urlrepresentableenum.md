---
source: https://developer.apple.com/documentation/appintents/urlrepresentableenum
---

# URLRepresentableEnum / EnumURLRepresentation

An interface you apply to an app enum type so the system can handle it like a universal link. `EnumURLRepresentation` is the type that provides the URL for an app enum.

## Signature / Usage

```swift
protocol URLRepresentableEnum : AppEnum, CustomURLRepresentationParameterConvertible
```

```swift
struct EnumURLRepresentation<Enum> where Enum : AppEnum
```

```swift
enum Destination: String, AppEnum, URLRepresentableEnum {
   case root
   case locationServices

   static var urlRepresentation = URLRepresentation("https://example.com/root=\(.rawValue)")
}
```

To differentiate URLs by more than the enum's current value, provide a dictionary of values instead:

```swift
enum Destination: String, AppEnum, URLRepresentableEnum {
   case root
   case locationServices

   static var urlRepresentation = URLRepresentation([
      .root: "https://example.com/link1=\(.root)",
      .locationServices: "https://example.com/link2=\(.locationServices)"
   ])
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `URLRepresentation` | `typealias URLRepresentation` | The type that provides the URL for the app enum. |
| `urlRepresentation` | `static var urlRepresentation: Self.URLRepresentation` (required; 1 default implementation) | The URL representation of the app enum. |
| `EnumURLRepresentation.init(_:)` | `init(_: String)` | Creates a URL representation for an app enum using the provided Swift string. |
| `EnumURLRepresentation.init(_:)` | `init([Enum : EnumURLRepresentation<Enum>.EnumSingleURLRepresentation])` | Creates a URL representation for an app enum using the provided dictionary. |
| `EnumSingleURLRepresentation` | `struct EnumSingleURLRepresentation` | Nested type; available when `Enum` conforms to `AppEnum`. |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+ (both `URLRepresentableEnum` and `EnumURLRepresentation`)
- If your app already supports universal links for content, use this protocol to express your app enum types as URLs. This protocol requires universal links; you can't use it with a custom URL scheme or other approaches.
- Construct URLs using static text and the value of your app enum. Define the app enum using a URL-friendly value; the system automatically converts values of type `String`, `Int`, and `URL`.
- `EnumURLRepresentation` conforms to `ExpressibleByExtendedGraphemeClusterLiteral`, `ExpressibleByStringInterpolation`, `ExpressibleByStringLiteral`, `ExpressibleByUnicodeScalarLiteral`.

## Related

- [AppEnum](./appenum.md)
- [URLRepresentableEntity](./urlrepresentableentity.md)
