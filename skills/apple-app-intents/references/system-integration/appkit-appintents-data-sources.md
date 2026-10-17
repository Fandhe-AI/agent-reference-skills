---
source: https://developer.apple.com/documentation/appintents/nscollectionviewappintentsdatasource
---

# NSCollectionViewAppIntentsDataSource / NSTableViewAppIntentsDataSource

The methods adopted by the object you use to make items in a collection view, table view, or outline view discoverable by Apple Intelligence and Siri (macOS).

## Signature / Usage

```swift
@MainActor protocol NSCollectionViewAppIntentsDataSource : AnyObject
```

```swift
func collectionView(NSCollectionView, appEntityIdentifierForItemAt: IndexPath) -> EntityIdentifier?
```

```swift
@MainActor protocol NSTableViewAppIntentsDataSource : AnyObject
```

```swift
func tableView(NSTableView, appEntityIdentifierFor: Int) -> EntityIdentifier?
func outlineView(NSOutlineView, appEntityIdentifierFor: Any?) -> EntityIdentifier?
```

## Options / Props

| Protocol | Member (required, with a default implementation) | Description |
| --- | --- | --- |
| `NSCollectionViewAppIntentsDataSource` | `collectionView(_:appEntityIdentifierForItemAt:)` | Asks the data source to return an app entity identifier for a cell at a particular location in the collection view. |
| `NSTableViewAppIntentsDataSource` | `tableView(_:appEntityIdentifierFor:)` | Asks the data source to return an app entity identifier for a particular row in the table view. |
| `NSTableViewAppIntentsDataSource` | `outlineView(_:appEntityIdentifierFor:)` | Asks the data source to return an app entity identifier for a particular item in the outline view. |

## Notes

- macOS 15.4+ (both protocols)
- The source pages carry only the declaration (the collection-view page adds a pointer to the article "Providing contextual cues to Apple Intelligence and Siri" and the App Intents framework page). `NSCollectionView` / `NSTableView` / `NSOutlineView` themselves are covered by apple-appkit. The UIKit counterparts are on the `uikit-appintents-data-sources` page.

## Related

- [UIKit data sources](./uikit-appintents-data-sources.md)
- [AppEntityUIElement](./appentityuielement.md)
