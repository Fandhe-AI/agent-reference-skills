---
source: https://developer.apple.com/documentation/appintents/uicollectionviewappintentsdatasource
---

# UICollectionViewAppIntentsDataSource / UITableViewAppIntentsDataSource

The methods adopted by the object you use to make items in a collection view (or table view) discoverable by Apple Intelligence and Siri.

## Signature / Usage

```swift
@MainActor protocol UICollectionViewAppIntentsDataSource : AnyObject
```

```swift
func collectionView(UICollectionView, appEntityIdentifierForItemAt: IndexPath) -> EntityIdentifier?
```

```swift
@MainActor protocol UITableViewAppIntentsDataSource : AnyObject
```

```swift
func tableView(UITableView, appEntityIdentifierForRowAt: IndexPath) -> EntityIdentifier?
```

## Options / Props

| Protocol | Member (required, with a default implementation) | Description |
| --- | --- | --- |
| `UICollectionViewAppIntentsDataSource` | `collectionView(_:appEntityIdentifierForItemAt:)` | Asks the data source to return an app entity identifier for a cell at a particular location in the collection view. |
| `UITableViewAppIntentsDataSource` | `tableView(_:appEntityIdentifierForRowAt:)` | Asks the data source to return an app entity identifier for a cell at a particular location in the table view. |

## Notes

- iOS 18.4+, iPadOS 18.4+, Mac Catalyst 18.4+, tvOS 18.4+, visionOS 2.4+ (both protocols)
- The source pages carry only the declaration and a pointer to the article "Providing contextual cues to Apple Intelligence and Siri" (`/documentation/appintents/providing-contextual-cues-to-apple-intelligence-and-siri`) and the App Intents framework page. Collection views and table views are the standard UIKit views; the view classes themselves are covered by apple-uikit. The AppKit counterparts (macOS) are on the `appkit-appintents-data-sources` page.
- For custom views that manage their own UI state or use custom drawing, the article's counterpart is `AppEntityUIElement` via `UIView.appEntityUIElementProvider`.

## Related

- [AppKit data sources](./appkit-appintents-data-sources.md)
- [AppEntityUIElement](./appentityuielement.md)
- [AppEntityUIElementsContext](./appentityuielementscontext.md)
