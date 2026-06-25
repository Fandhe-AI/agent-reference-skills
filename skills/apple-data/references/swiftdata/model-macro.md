# @Model

Converts a Swift class into a stored model managed by SwiftData. At build time the macro adds conformance to `PersistentModel` and `Observable`.

## Signature / Usage

```swift
@attached(member, conformances: Observable, PersistentModel, Sendable, ...)
@attached(memberAttribute)
@attached(extension, conformances: Observable, PersistentModel, Sendable)
macro Model()
```

```swift
@Model
class Trip {
    var name: String
    var destination: String
    var startDate: Date
    var endDate: Date

    init(name: String, destination: String, startDate: Date, endDate: Date) {
        self.name = name
        self.destination = destination
        self.startDate = startDate
        self.endDate = endDate
    }
}
```

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Apply only to classes; structs and enums are not supported
- All stored properties become persistent by default; use `@Transient` to opt out

## Related

- [PersistentModel](./persistent-model.md)
- [@Attribute](./attribute-macro.md)
- [@Relationship](./relationship-macro.md)
- [@Transient](./transient-macro.md)
