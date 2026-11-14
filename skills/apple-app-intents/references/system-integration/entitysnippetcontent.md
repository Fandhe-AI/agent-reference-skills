---
source: https://developer.apple.com/documentation/appintents/entitysnippetcontent
---

# EntitySnippetContent and EntitySnippetContentBuilder

A visual representation that the system renders for an entity, and the result builder that assembles an entity's snippet declarations.

## Signature / Usage

```swift
protocol EntitySnippetContent<Entity>
```

```swift
@resultBuilder enum EntitySnippetContentBuilder<Entity> where Entity : AppEntity
```

```swift
static func buildBlock<C>(_ content: C) -> some EntitySnippetContent<Entity> where Entity == C.Entity, C : EntitySnippetContent

```

```swift
static func buildBlock<C1, C2>(_ c1: C1, _ c2: C2) -> some EntitySnippetContent<Entity> where Entity == C1.Entity, C1 : EntitySnippetContent, C2 : EntitySnippetContent, C1.Entity == C2.Entity

```

```swift
static func buildExpression(_ expression: some EntitySnippetContent<Entity>) -> some EntitySnippetContent<Entity>

```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `EntitySnippetContent.Entity` | `associatedtype Entity : AppEntity` | An entity type that the snippet content represents. |
| `EntitySnippetContent.Input` / `Output` | `typealias Input` / `typealias Output` | Type aliases; no abstract on their pages. |
| `buildBlock(_:)` | single declaration | Creates a snippet from a single view declaration. |
| `buildBlock(_:_:)` | two declarations | Creates a snippet by combining two snippet declarations into a single representation. |
| `buildExpression(_:)` | expression | No abstract on the page. |

## Notes

- iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, tvOS 27.3+, visionOS 27.3+, watchOS 27.3+
- You do not conform to `EntitySnippetContent` directly. Build an entity's presentation from a type that already conforms to it, such as `CardSnippet`, and return it from the `snippet` property of a `SnippetRepresentableEntity` type. The only conforming type listed is `CardSnippet`.
- The builder backs the `snippet` property; providing a `CardSnippet` instance there applies the builder implicitly.
- Source: https://developer.apple.com/documentation/appintents/entitysnippetcontent and https://developer.apple.com/documentation/appintents/entitysnippetcontentbuilder (fetched 2026-11-14)

## Related

- [CardSnippet](./cardsnippet.md)
- [SnippetRepresentableEntity](./snippetrepresentableentity.md)
