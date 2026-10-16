# SectionedResults / ResultsSection

`SectionedResults` is a `RandomAccessCollection` of `ResultsSection` instances representing sectioned query results. Each `ResultsSection` is a section of fetched results grouped by a common `sectionBy` key path value.

## Signature / Usage

```swift
struct SectionedResults<Element, SectionTitle> where Element : PersistentModel, SectionTitle : Hashable

struct ResultsSection<Element, SectionTitle> where Element : PersistentModel, SectionTitle : Hashable
```

```swift
@Query(sort: \.name, sectionBy: \.category)
var items: SectionedResults<Item, String>

ForEach(items) { section in              // section: ResultsSection<Item, String>
    Section(section.title) {             // "Work", "Personal", …
        ForEach(section) { item in … }   // item: Item
    }
}

// O(1) named lookup
let workCount = items[sectionTitle: "Work"]?.count ?? 0
```

## Options / Props

SectionedResults

| Member | Type | Description |
|--------|------|-------------|
| `sectionTitles` | `[SectionTitle]` | The section titles in order |
| `contains(sectionTitle:)` | `(SectionTitle) -> Bool` | Returns whether a section with the given title exists in the collection |
| `index(ofSectionTitled:)` | `(SectionTitle) -> Int?` | Returns the ordered index of the section with the given title, or `nil` if not found |
| `subscript(sectionTitle:)` | `(SectionTitle) -> ResultsSection<Element, SectionTitle>?` | Returns the section with the given title, or `nil` if no such section exists |

ResultsSection

| Member | Type | Description |
|--------|------|-------------|
| `title` | `let title: SectionTitle` | The identifier of the section; the common value shared by all elements in this section, as determined by the `sectionBy` key path provided at creation |
| `id` | `var id: SectionTitle` | The unique identifier for the section, which is its `title` |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- `SectionedResults` is the result type for sectioned `@Query` properties; iterating it yields sections, and each section is itself a `RandomAccessCollection` of model elements
- `SectionedResults` conforms to `BidirectionalCollection`, `Collection`, `Equatable`, `RandomAccessCollection`, `Sequence`; `ResultsSection` additionally conforms to `Identifiable`
- Use `subscript(sectionTitle:)` for O(1) lookup by section title
- Source: https://developer.apple.com/documentation/swiftdata/sectionedresults , https://developer.apple.com/documentation/swiftdata/resultssection (fetched 2026-10-16, iOS 27 SDK docs)

## Related

- [Query macro](./query-macro.md)
- [Query struct](./query-struct.md)
- [ResultsObserver](./results-observer.md)
- [PersistentModel](./persistent-model.md)
