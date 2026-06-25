# NSDiffableDataSourceSnapshot

A representation of the state of data in a view at a specific point in time. Used with `UITableViewDiffableDataSource` and `UICollectionViewDiffableDataSource` to drive UI updates.

```swift
struct NSDiffableDataSourceSnapshot<SectionIdentifierType, ItemIdentifierType>
    where SectionIdentifierType: Hashable & Sendable,
          ItemIdentifierType: Hashable & Sendable
```

## Signature / Usage

```swift
var snapshot = NSDiffableDataSourceSnapshot<Section, Item>()
snapshot.appendSections([.main])
snapshot.appendItems(items, toSection: .main)
dataSource.apply(snapshot, animatingDifferences: true)
```

## Options / Props

### Populating

| Method | Description |
|--------|-------------|
| `appendSections(_:)` | Adds sections at the end |
| `appendItems(_:toSection:)` | Adds items to a section (or last section if nil) |
| `insertSections(_:afterSection:)` | Inserts sections after a reference section |
| `insertSections(_:beforeSection:)` | Inserts sections before a reference section |
| `insertItems(_:afterItem:)` | Inserts items after a reference item |
| `insertItems(_:beforeItem:)` | Inserts items before a reference item |

### Removing

| Method | Description |
|--------|-------------|
| `deleteAllItems()` | Removes all sections and items |
| `deleteSections(_:)` | Removes specified sections and their items |
| `deleteItems(_:)` | Removes specified items |

### Reordering

| Method | Description |
|--------|-------------|
| `moveSection(_:afterSection:)` | Moves a section after another |
| `moveSection(_:beforeSection:)` | Moves a section before another |
| `moveItem(_:afterItem:)` | Moves an item after another |
| `moveItem(_:beforeItem:)` | Moves an item before another |

### Reloading & Reconfiguring

| Method | Description |
|--------|-------------|
| `reloadSections(_:)` | Marks sections for reload (replaces cells) |
| `reloadItems(_:)` | Marks items for reload (replaces cells) |
| `reconfigureItems(_:)` | Marks items for reconfiguration (updates cell content in-place) |

### Querying

| Name | Type | Description |
|------|------|-------------|
| `sectionIdentifiers` | `[SectionIdentifierType]` | All section identifiers in order |
| `itemIdentifiers` | `[ItemIdentifierType]` | All item identifiers in order |
| `numberOfSections` | `Int` | Total section count |
| `numberOfItems` | `Int` | Total item count |
| `numberOfItems(inSection:)` | `Int` | Item count in a specific section |
| `itemIdentifiers(inSection:)` | `[ItemIdentifierType]` | Items in a specific section |
| `sectionIdentifier(containingItem:)` | `SectionIdentifierType?` | Section containing an item |
| `indexOfSection(_:)` | `Int?` | Position of a section |
| `indexOfItem(_:)` | `Int?` | Position of an item |

## Notes

- Available iOS 13.0+, iPadOS 13.0+, Mac Catalyst, tvOS 13.0+, visionOS
- All identifiers must be unique and conform to `Hashable` and `Sendable`
- Prefer `reconfigureItems(_:)` over `reloadItems(_:)` when updating displayed data without replacing cells (iOS 15+)
- To update incrementally: call `dataSource.snapshot()`, mutate, then `dataSource.apply(_:)`

## Related

- [UITableViewDiffableDataSource](./uitableviewdiffabledatasource.md)
- [UICollectionViewDiffableDataSource](./uicollectionviewdiffabledatasource.md)
