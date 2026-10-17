---
source: https://developer.apple.com/documentation/appintents/appentityuielementscontext
---

# AppEntityUIElementsContext

Contextual information for UI elements you make discoverable by Apple Intelligence.

## Signature / Usage

```swift
struct AppEntityUIElementsContext
```

```swift
let bounds: CGRect
let requests: Set<AppEntityUIElementsContext.ElementsRequest>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `bounds` | `CGRect` | The bounds that the system uses to understand the location of a UI element within the local coordinate space. |
| `requests` | `Set<AppEntityUIElementsContext.ElementsRequest>` | The set of requests for elements from the system. |
| `AppEntityUIElementsContext.ElementsRequest` | enum | A type that describes which UI elements the system is requesting. |

## Notes

- iOS 18.4+, iPadOS 18.4+, Mac Catalyst 18.4+, macOS 15.4+, tvOS 18.4+, visionOS 2.4+, watchOS 11.4+
- When you implement your custom app entity provider for a custom view, you provide `AppEntityUIElement` objects; this context holds the additional information the system uses to understand where content appears onscreen.
- The `ElementsRequest` cases are not listed on the fetched page.
- Conforms to `Sendable`, `SendableMetatype`.

## Related

- [AppEntityUIElement](./appentityuielement.md)
