# UICollectionViewLayout

An abstract base class for generating layout information for a collection view. Determines the placement of cells, supplementary views, and decoration views.

```swift
@MainActor
class UICollectionViewLayout: NSObject
```

## Signature / Usage

```swift
class CustomLayout: UICollectionViewLayout {
    override var collectionViewContentSize: CGSize {
        // return total content size
        return CGSize(width: totalWidth, height: totalHeight)
    }

    override func layoutAttributesForElements(in rect: CGRect) -> [UICollectionViewLayoutAttributes]? {
        return attributes.filter { $0.frame.intersects(rect) }
    }

    override func layoutAttributesForItem(at indexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
        return attributes[indexPath.item]
    }
}
```

## Options / Props

### Required Overrides (for subclasses)

| Method | Description |
|--------|-------------|
| `collectionViewContentSize` | Total scrollable content size |
| `layoutAttributesForElements(in:)` | Attributes for all elements in a rect |
| `layoutAttributesForItem(at:)` | Attributes for a specific item |

### Optional Overrides

| Method | Description |
|--------|-------------|
| `layoutAttributesForSupplementaryView(ofKind:at:)` | Attributes for a supplementary view |
| `layoutAttributesForDecorationView(ofKind:at:)` | Attributes for a decoration view |
| `prepare()` | Called before layout; compute and cache attributes here |
| `shouldInvalidateLayout(forBoundsChange:)` | Return `true` to recompute on scroll |
| `targetContentOffset(forProposedContentOffset:withScrollingVelocity:)` | Snap scroll position |

### Invalidation

| Method | Description |
|--------|-------------|
| `invalidateLayout()` | Marks layout as needing recalculation |
| `invalidateLayout(with:)` | Invalidates with context for partial updates |
| `invalidationContextClass` | Override to use a custom invalidation context class |

### Insertion & Deletion Animations

| Method | Description |
|--------|-------------|
| `initialLayoutAttributesForAppearingItem(at:)` | Start attributes for inserted item |
| `finalLayoutAttributesForDisappearingItem(at:)` | End attributes for deleted item |
| `prepare(forCollectionViewUpdates:)` | Called before batch update animations |
| `finalizeCollectionViewUpdates()` | Called after batch update animations |

## Notes

- Available iOS 6.0+, iPadOS 6.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Before subclassing, evaluate whether `UICollectionViewCompositionalLayout` can meet your needs
- Use custom `UICollectionViewLayoutInvalidationContext` subclasses to invalidate only changed portions and avoid full recomputation
- Three visual element types: cells (interactive), supplementary views (data-driven, non-selectable), decoration views (adornments, not data-tied)

## Related

- [UICollectionViewCompositionalLayout](./uicollectionviewcompositionallayout.md)
- [UICollectionViewFlowLayout](./uicollectionviewflowlayout.md)
- [UICollectionView](./uicollectionview.md)
