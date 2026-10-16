---
source: https://developer.apple.com/documentation/appintents/intentitemcollection
---

# IntentItemCollection

Return this object to provide an advanced list of options, optionally divided in sections.

## Signature / Usage

```swift
struct IntentItemCollection<Result> where Result : _IntentValue
```

```swift
struct CreateBookIntent: AppIntent {
    @Parameter(title: "Author Name", optionsProvider: AuthorNamesOptionsProvider())
    var authorName: String

    struct AuthorNamesOptionsProvider: DynamicOptionsProvider {
        func results() async throws -> ItemCollection<Int> {
            ItemCollection {
                ItemSection("Italian Authors") {
                    "Dante Alighieri"
                    "Alessandro Manzoni"
                }
                ItemSection("Russian Authors") {
                    "Anton Chekhov"
                    "Fyodor Dostoevsky"
                }
            }
        }
    }
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `init(promptLabel:usesIndexedCollation:items:)` | `init(promptLabel: LocalizedStringResource?, usesIndexedCollation: Bool, items: [Result])` | Create a `ItemCollection` containing `Items`, or one or more `Sections`. |
| `init(promptLabel:usesIndexedCollation:sections:)` | `init(promptLabel: LocalizedStringResource?, usesIndexedCollation: Bool, sections: [IntentItemSection<Result>])` | Create an `ItemCollection` containing one or more `Sections`. |
| `init(promptLabel:usesIndexedCollation:sectionsBuilder:)` | `init(promptLabel: LocalizedStringResource?, usesIndexedCollation: Bool, sectionsBuilder: () -> [IntentItemSection<Result>])` | Create an `ItemCollection` containing `Items`, or one or more `Sections` provided by a builder. |
| `items` | `var items: [Result.ValueType]` | Returns all results as an array. |
| `sections` | `var sections: [IntentItemSection<Result>]` | The sections of the collection. |
| `empty` | `static var empty: IntentItemCollection<Result>` | Returns an empty result. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+; visionOS (no `introducedAt` value in the source JSON)
- Conforms to `ResultsCollection`, `Sendable`, `SendableMetatype`.
- The example above is verbatim from the source page, including its use of the names `ItemCollection` / `ItemSection`.

## Related

- [IntentItem](./intentitem.md)
- [IntentItemSection](./intentitemsection.md)
- [IntentCollectionSize](./intentcollectionsize.md)
- [IntentResponseStream](./intentresponsestream.md)
