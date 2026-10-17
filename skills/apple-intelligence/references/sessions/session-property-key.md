---
source: https://developer.apple.com/documentation/foundationmodels/sessionpropertykey, https://developer.apple.com/documentation/foundationmodels/sessionpropertyvalues, https://developer.apple.com/documentation/foundationmodels/sessionpropertyentry()
---

# SessionPropertyKey / SessionPropertyValues / SessionPropertyEntry()

Custom session properties: a protocol for defining a key, a container for the values, and a macro to declare entries.

## Signature / Usage

### SessionPropertyKey

```swift
protocol SessionPropertyKey : SendableMetatype
```

### SessionPropertyValues

```swift
final class SessionPropertyValues
```

```swift
struct CompactingProfile: LanguageModelSession.DynamicProfile {
    @SessionProperty(\.history)
    var history

    var body: some LanguageModelSession.DynamicProfile {
        Profile {
            // Custom instructions and tools that you define.
        }
        .onResponse { _ in
            // Compact the history when the entries exceed a certain limit.
            if history.count > 100 {
                history = Array(history.suffix(50))
            }
        }
    }
}
```

### SessionPropertyEntry()

```swift
@attached(accessor) @attached(peer, names: prefixed(__Key_)) macro SessionPropertyEntry()
```

## Options / Props

| Name | Owner | Description |
|------|-------|-------------|
| defaultValue | `SessionPropertyKey` | The default value of the property key. |
| Value | `SessionPropertyKey` | The type of value that represent this property key. |
| history | `SessionPropertyValues` | The history portion of the session's transcript. |
| subscript(_:) | `SessionPropertyValues` | Accesses the value stored for the given session property key. |

## Notes

- Availability (all three): iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Updating the transcript history can cause cache invalidations for some models, so consider carefully how you modify an existing transcript.
- `SessionPropertyEntry()` has no abstract on the official page; use it to create custom session properties.

## Related

- [SessionProperty](./session-property.md)
- [LanguageModelSession](./languagemodelsession.md)
