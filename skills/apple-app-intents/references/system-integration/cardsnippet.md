---
source: https://developer.apple.com/documentation/appintents/cardsnippet
---

# CardSnippet

A type that presents the SwiftUI view for an app entity as a card.

## Signature / Usage

```swift
struct CardSnippet<Entity, Content> where Entity : AppEntity, Content : View
```

```swift
init(supportedFamilies: [CardSnippetFamily], @ViewBuilder content: @escaping @MainActor (Entity, CardSnippetContext) -> Content)
```

```swift
extension PhotoEntity: SnippetRepresentableEntity {
    static var snippet: some EntitySnippetContent<Self> {
        CardSnippet(supportedFamilies: [.standard]) { photo, context in
            PhotoCardView(photo: photo)
        }
    }
}
```

The builder can adapt the layout based on the rendering family from the card snippet context (from the `init(supportedFamilies:content:)` page):

```swift
CardSnippet(supportedFamilies: [.standard]) { recipe, context in
   switch context.family {
       case .standard:
            LargeRecipeCardView(recipe: recipe)
        default:
            RecipeCardView(recipe: recipe)
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init(supportedFamilies:content:)` | `init(supportedFamilies: [CardSnippetFamily], @ViewBuilder content: @escaping @MainActor (Entity, CardSnippetContext) -> Content)` | Creates a card snippet with the views for specific families of content. `supportedFamilies`: the families the card supports; if the needed family is not supported the system presents the entity's display representation instead. `content`: view builder that receives the entity and a `CardSnippetContext`. |
| `CardSnippetFamily` | `struct CardSnippetFamily` | The supported rendering environments for card snippets; conforms to `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`. |
| `CardSnippetFamily.standard` | `static var standard: CardSnippetFamily { get }` | A family that supports a standard amount of space; chosen for contexts such as iPhone where the display has adequate space. |
| `CardSnippetContext.family` | `var family: CardSnippetFamily { get }` | The environment with which to configure your views. |
| `CardSnippetSize` | `struct CardSnippetSize` | A size category for a snippet card. The page says "Use CardSnippetFamily instead" (iOS 27.0+; `small` and `medium` properties). |

## Notes

- `CardSnippet`, its initializer, `CardSnippetFamily`, `CardSnippetFamily.standard` and `CardSnippetContext.family`: iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, tvOS 27.3+, visionOS 27.3+, watchOS 27.3+. `CardSnippetContext` and `CardSnippetSize`: iOS 27.0+ (not beta) per their pages.
- The system renders snippets in advance and stores the views in a static archive it can use at any time, including when the app is not running; use primarily static content such as text and images. Prepare data (for example custom images) synchronously before returning the view; data generated asynchronously likely is not available in time.
- The system delivers cards in contexts including Siri responses and conversation transcripts. Use SwiftUI environment values (for example `colorScheme`, `locale`) for adjustments not covered by `CardSnippetContext`.
- Distinct from `SnippetIntent` (an interactive snippet presented by running an intent, see snippetintent): a card snippet is the visual representation of an entity.
- Source: https://developer.apple.com/documentation/appintents/cardsnippet, https://developer.apple.com/documentation/appintents/cardsnippet/init(supportedfamilies:content:), https://developer.apple.com/documentation/appintents/cardsnippetfamily, https://developer.apple.com/documentation/appintents/cardsnippetcontext and https://developer.apple.com/documentation/appintents/cardsnippetsize (fetched 2026-11-14)

## Related

- [SnippetRepresentableEntity](./snippetrepresentableentity.md)
- [EntitySnippetContent / EntitySnippetContentBuilder](./entitysnippetcontent.md)
- [SnippetIntent](./snippetintent.md)
