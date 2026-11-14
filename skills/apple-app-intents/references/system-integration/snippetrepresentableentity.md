---
source: https://developer.apple.com/documentation/appintents/snippetrepresentableentity
---

# SnippetRepresentableEntity

An app entity that provides a visual representation for its content.

## Signature / Usage

```swift
protocol SnippetRepresentableEntity : AppEntity
```

```swift
extension MessageEntity: SnippetRepresentableEntity {
    static var snippet: some EntitySnippetContent<MessageEntity> {
        CardSnippet(supportedFamilies: [.standard]) { message, _ in
            // Prepare any extra data before returning the view.
            MessageSnippetCard(message: message)
        }
    }
}
```

From the `snippet` property page:

```swift
extension PhotoEntity: SnippetRepresentableEntity {
    static var snippet: some EntitySnippetContent<Self> {
        CardSnippet(supportedFamilies: [.standard]) { photo, context in
            PhotoCardView(photo: photo)
        }
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `snippet` | `@EntitySnippetContentBuilder<Self> static var snippet: Self.Body { get }` | The snippet that contains the view to display. Set it to a result builder that returns a `CardSnippet`. |
| `Body` | `associatedtype Body : EntitySnippetContent where Self == Self.Body.Entity` | The snippet content type. |

## Notes

- iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, tvOS 27.3+, visionOS 27.3+, watchOS 27.3+
- Adopt the protocol in an app entity to provide a visual representation of its content. When the system needs to show information about the entity, it displays the snippet; for example Siri might show it during a conversation to confirm a choice or show details about a requested item.
- To include interactive controls, add a SwiftUI control that runs an app intent (for example a `Button` or `Toggle` initialized with an app intent). After the intent runs the system generates a new SwiftUI view archive for the snippet, including changes made to the views because of the intent.
- Inherits from `AppEntity`, `AppValue`, `CustomLocalizedStringResourceConvertible`, `DisplayRepresentable`, `Identifiable`, `InstanceDisplayRepresentable`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `TypeDisplayRepresentable`.
- Source: https://developer.apple.com/documentation/appintents/snippetrepresentableentity, https://developer.apple.com/documentation/appintents/snippetrepresentableentity/snippet and https://developer.apple.com/documentation/appintents/snippetrepresentableentity/body (fetched 2026-11-14)

## Related

- [CardSnippet](./cardsnippet.md)
- [EntitySnippetContent / EntitySnippetContentBuilder](./entitysnippetcontent.md)
- [AppEntity](../entities/appentity.md)
