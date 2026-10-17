---
source: https://developer.apple.com/documentation/appintents/indexedentityquery
---

# IndexedEntityQuery

An interface that adds Spotlight reindexing support to your entity query.

## Signature / Usage

```swift
protocol IndexedEntityQuery : EntityQuery where Self.Entity : IndexedEntity
```

```swift
struct PhotoQuery: IndexedEntityQuery {
    func reindexEntities(for identifiers: [PhotoEntity.ID], indexDescription: CSSearchableIndexDescription) async throws {
        let photos = try await photoStore.fetch(ids: identifiers)
        try await CSSearchableIndex(name: "MyPhotosApp").indexAppEntities(photos)
    }

    func reindexAllEntities(indexDescription: CSSearchableIndexDescription) async throws {
        let allPhotos = try await photoStore.fetchAll()
        try await CSSearchableIndex(name: "MyPhotosApp").indexAppEntities(allPhotos)
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `reindexEntities(for:indexDescription:)` | `func reindexEntities(for: [Self.Entity.ID], indexDescription: CSSearchableIndexDescription) async throws` (required) | Reindexes a specific subset of app entities within an index. |
| `reindexAllEntities(indexDescription:)` | `func reindexAllEntities(indexDescription: CSSearchableIndexDescription) async throws` (required) | Reindexes all entities in the app index with the specified characteristics. |

## Notes

- Platforms: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+.- Adopt in query types for app entities that you donate to your app's Spotlight index with `CSSearchableIndex.indexAppEntities(_:priority:)`. When the system encounters an issue with an app's index, it can ask the app to reindex its content, and calls the methods of this protocol if the query type supports it.
- If the type does not support the protocol, Spotlight continues to ask the app's `CSSearchableIndexDelegate` object to reindex content. Likewise, if an entity was donated by associating it with a `CSSearchableItem`, Spotlight uses the `CSSearchableIndexDelegate` object.
- The original code listing uses typographic quotes around the index name; straight quotes are used above so the snippet is valid Swift.
- Core Spotlight itself (`CSSearchableIndex`, `CSSearchableIndexDelegate`, `CSSearchableItem`) is a separate framework and not covered by this skill.
- Official article: "Making app entities available in Spotlight" (not reproduced here).

## Related

- [EntityQuery](./entityquery.md)
- [EnumerableEntityQuery](./enumerableentityquery.md)
