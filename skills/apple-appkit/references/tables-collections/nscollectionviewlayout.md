# NSCollectionViewLayout

An abstract base class for objects that compute the visual layout of items in an `NSCollectionView`. Subclass to implement custom layouts.

## Signature / Usage

```swift
class NSCollectionViewLayout: NSObject
```

Do not instantiate directly. Use a concrete subclass:

```swift
let layout = NSCollectionViewFlowLayout()
layout.itemSize = NSSize(width: 100, height: 100)
layout.minimumInteritemSpacing = 8
collectionView.collectionViewLayout = layout
```

## Options / Props

**Override these when subclassing:**

| Method / Property | Description |
|---|---|
| `prepare()` | Perform and cache all layout calculations before any queries |
| `collectionViewContentSize` | Bounding rectangle for all content |
| `layoutAttributesForElements(in:)` | All layout attributes for items within a rect |
| `layoutAttributesForItem(at:)` | Layout attributes for a specific item |
| `layoutAttributesForSupplementaryView(ofKind:at:)` | Attributes for a supplementary view |
| `shouldInvalidateLayout(forBoundsChange:)` | Return `true` if layout must recalculate on scroll |

**Invalidation:**

| Method | Description |
|---|---|
| `invalidateLayout()` | Mark layout as needing recalculation |
| `invalidateLayout(with:)` | Targeted invalidation using an invalidation context |

**Animation support:**

| Method | Description |
|---|---|
| `initialLayoutAttributesForAppearingItem(at:)` | Attributes at item insertion start |
| `finalLayoutAttributesForDisappearingItem(at:)` | Attributes at item deletion end |
| `prepare(forCollectionViewUpdates:)` | Prepare for a batch of updates |
| `finalizeCollectionViewUpdates()` | Called after all updates are applied |

**Transition support:**

| Method | Description |
|---|---|
| `prepareForTransition(from:)` | Prepare before transitioning away from this layout |
| `prepareForTransition(to:)` | Prepare before transitioning to this layout |

**Decoration views:**

| Method | Description |
|---|---|
| `register(_:forDecorationViewOfKind:)` | Register a decoration view class |

**Concrete subclasses (built-in):**

| Class | Description |
|---|---|
| `NSCollectionViewFlowLayout` | Flexible line-based grid layout |
| `NSCollectionViewGridLayout` | Single-section fixed row/column grid |
| `NSCollectionViewCompositionalLayout` | Complex, adaptive multi-section layouts |
| `NSCollectionViewTransitionLayout` | Custom behaviors during layout transitions |

## Notes

- macOS 10.11+.
- Cache all geometry in `prepare()`; return cached values from attribute query methods.
- Use `NSCollectionViewLayoutInvalidationContext` subclasses for fine-grained invalidation to avoid recomputing the full layout.
- Layout objects are independent of data; they work solely with index paths and geometry.

## Related

- [NSCollectionView](./nscollectionview.md)
