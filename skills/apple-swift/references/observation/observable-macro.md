# @Observable

Defines and implements conformance of the Observable protocol.

## Signature

```swift
@attached(member, names: named(_$observationRegistrar), named(access), named(withMutation), named(shouldNotifyObservers))
@attached(memberAttribute)
@attached(extension, conformances: Observable)
macro Observable()
```

## Usage

```swift
@Observable
class Car {
    var name: String = ""
    var needsRepairs: Bool = false

    init(name: String, needsRepairs: Bool = false) {
        self.name = name
        self.needsRepairs = needsRepairs
    }
}
```

## Notes

- Applying `@Observable` to a class automatically conforms it to the `Observable` protocol and synthesizes the `_$observationRegistrar`, `access`, `withMutation`, and `shouldNotifyObservers` members.
- All stored properties become tracked by default; use `@ObservationIgnored` to opt out individual properties.
- The macro expands at compile time — the generated code is inspectable via "Expand Macro" in Xcode.
- Available: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+

## Related

- [Observable protocol](./observable-protocol.md)
- [@ObservationIgnored](./observationignored.md)
- [@ObservationTracked](./observationtracked.md)
- [ObservationRegistrar](./observationregistrar.md)
