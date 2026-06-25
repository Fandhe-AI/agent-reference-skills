# UICollectionViewFlowLayout

A layout object that organizes items into a grid where items flow line by line, with optional headers and footers per section.

```swift
@MainActor
class UICollectionViewFlowLayout: UICollectionViewLayout
```

## Signature / Usage

```swift
let layout = UICollectionViewFlowLayout()
layout.itemSize = CGSize(width: 100, height: 100)
layout.minimumLineSpacing = 10
layout.minimumInteritemSpacing = 5
layout.scrollDirection = .vertical
let collectionView = UICollectionView(frame: bounds, collectionViewLayout: layout)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `itemSize` | `CGSize` | Default size for cells |
| `estimatedItemSize` | `CGSize` | Estimated size for self-sizing cells; use `UICollectionViewFlowLayout.automaticSize` to enable self-sizing |
| `minimumLineSpacing` | `CGFloat` | Minimum spacing between rows (vertical) or columns (horizontal) |
| `minimumInteritemSpacing` | `CGFloat` | Minimum spacing between items in the same line |
| `scrollDirection` | `UICollectionView.ScrollDirection` | `.vertical` (default) or `.horizontal` |
| `sectionInset` | `UIEdgeInsets` | Margins around each section's content |
| `headerReferenceSize` | `CGSize` | Default header size; zero means no header |
| `footerReferenceSize` | `CGSize` | Default footer size; zero means no footer |
| `sectionHeadersPinToVisibleBounds` | `Bool` | Pins section headers while scrolling |
| `sectionFootersPinToVisibleBounds` | `Bool` | Pins section footers while scrolling |

## Notes

- Available iOS 6.0+, iPadOS 6.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Use `UICollectionViewDelegateFlowLayout` to provide per-item sizes and per-section insets dynamically
- Set `estimatedItemSize = UICollectionViewFlowLayout.automaticSize` to enable Auto Layout-based self-sizing cells
- Headers and footers only appear when their reference size is non-zero

## Related

- [UICollectionView](./uicollectionview.md)
- [UICollectionViewLayout](./uicollectionviewlayout.md)
- [UICollectionViewCompositionalLayout](./uicollectionviewcompositionallayout.md)
