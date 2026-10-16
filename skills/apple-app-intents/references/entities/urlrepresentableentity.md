---
source: https://developer.apple.com/documentation/appintents/urlrepresentableentity
---

# URLRepresentableEntity / EntityURLRepresentation

An interface you apply to an app entity type so the system can handle it like a universal link. `EntityURLRepresentation` is the type that provides the URL for an app entity.

## Signature / Usage

```swift
protocol URLRepresentableEntity : AppEntity, CustomURLRepresentationParameterConvertible
```

```swift
struct EntityURLRepresentation<Entity> where Entity : AppEntity
```

```swift
struct MyAppData: AppEntity, URLRepresentableEntity {
    static let defaultQuery = MyAppDataQuery()

    @Property(title: "Content ID")
    var contentID: String

    static var urlRepresentation = URLRepresentation("https://example.com/note=\(.$contentID)")
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `URLRepresentation` | `typealias URLRepresentation` | The type that provides the URL for the app entity. |
| `urlRepresentation` | `static var urlRepresentation: Self.URLRepresentation` (required; 1 default implementation) | The URL representation of the app entity. |
| `EntityURLRepresentation.init(_:)` | `init(_: String)` | Creates a URL representation for an app entity using the provided Swift string. |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+ (both `URLRepresentableEntity` and `EntityURLRepresentation`)
- If your app already supports universal links for content, use this protocol to express your app entity types as URLs. When an `OpenIntent` type contains the entity, the system can open the item by sending the entity's URL to your app's URL handling code. It also makes it easier to share the entity's contents with Siri, Shortcuts, and other system features.
- This protocol requires your app to support universal links. You can't use this protocol with a custom URL scheme or other approaches.
- Construct URLs using static text and the content of properties in your app entity. Build the `EntityURLRepresentation` as a Swift string; include a key path to a property (for example `\(.$contentID)`) and the system replaces it with the property's value before returning the URL.
- The system automatically converts properties of type `String`, `Int`, and `URL` to values suitable for a URL. To incorporate other types, implement `CustomURLRepresentationParameterConvertible` in the type.
- `EntityURLRepresentation` conforms to `ExpressibleByExtendedGraphemeClusterLiteral`, `ExpressibleByStringInterpolation`, `ExpressibleByStringLiteral`, `ExpressibleByUnicodeScalarLiteral`.
- `URLRepresentableEntity` inherits from `AppEntity`, `AppValue`, `CustomLocalizedStringResourceConvertible`, `CustomURLRepresentationParameterConvertible`, `DisplayRepresentable`, `Identifiable`, `InstanceDisplayRepresentable`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `TypeDisplayRepresentable`.

## Related

- [AppEntity](./appentity.md)
- [URLRepresentableEnum](./urlrepresentableenum.md)
- [DisplayRepresentable protocols](./display-representable-protocols.md)
