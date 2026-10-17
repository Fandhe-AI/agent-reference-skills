---
source: https://developer.apple.com/documentation/foundationmodels/languagemodelsession/sessionproperty
---

# LanguageModelSession.SessionProperty

A property wrapper that provides access to properties from within profiles, dynamic instructions, and tools.

## Signature / Usage

```swift
@propertyWrapper struct SessionProperty<Value>
```

```swift
// Get a reference to the session history.
@SessionProperty(\.history)
var history
```

## Options / Props

| Name | Description |
|------|-------------|
| `init(_:)` | Creates a session property with the specified key path. |
| `wrappedValue` | The wrapped value of this property wrapper. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- To create a custom session property, use the `SessionPropertyEntry()` macro to define a custom key that you access with `LanguageModelSession.SessionProperty`.

## Related

- [SessionPropertyKey / SessionPropertyValues / SessionPropertyEntry()](./session-property-key.md)
- [LanguageModelSession](./languagemodelsession.md)
