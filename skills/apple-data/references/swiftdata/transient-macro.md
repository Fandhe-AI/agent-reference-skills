# @Transient

Excludes a stored property from persistence. SwiftData will not read from or write to the property's value in the persistent store.

## Signature / Usage

```swift
@attached(peer) macro Transient()
```

```swift
@Model
class RemoteImage {
    var sourceURL: URL
    var data: Data

    @Transient
    var isDownloading: Bool = false   // in-memory only; not persisted

    init(sourceURL: URL, data: Data = Data()) {
        self.sourceURL = sourceURL
        self.data = data
    }
}
```

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Computed properties are transient by default; `@Transient` is for stored properties that should be excluded
- A non-optional `@Transient` property must have a default value so SwiftData can materialize instances from the store

## Related

- [@Model](./model-macro.md)
- [@Attribute](./attribute-macro.md)
