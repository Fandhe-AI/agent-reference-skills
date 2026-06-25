# UICollectionViewCompositionalLayout

A layout object that composes items, groups, and sections into flexible, adaptive visual arrangements. The recommended modern layout for complex collection views.

```swift
@MainActor
class UICollectionViewCompositionalLayout: UICollectionViewLayout
```

## Signature / Usage

```swift
func createLayout() -> UICollectionViewLayout {
    let itemSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                          heightDimension: .fractionalHeight(1.0))
    let item = NSCollectionLayoutItem(layoutSize: itemSize)

    let groupSize = NSCollectionLayoutSize(widthDimension: .fractionalWidth(1.0),
                                           heightDimension: .absolute(44))
    let group = NSCollectionLayoutGroup.horizontal(layoutSize: groupSize, subitems: [item])

    let section = NSCollectionLayoutSection(group: group)
    return UICollectionViewCompositionalLayout(section: section)
}
```

## Options / Props

### Initializers

| Name | Description |
|------|-------------|
| `init(section:)` | Single-section layout |
| `init(section:configuration:)` | Single-section with scroll direction and spacing config |
| `init(sectionProvider:)` | Multi-section layout; closure receives section index and environment |
| `init(sectionProvider:configuration:)` | Multi-section with configuration |
| `list(using:)` | Convenience factory for list-style layouts using `UICollectionLayoutListConfiguration` |

### Configuration

| Name | Type | Description |
|------|------|-------------|
| `configuration` | `UICollectionViewCompositionalLayoutConfiguration` | Scroll direction, section spacing, and boundary supplementary items |

### Key Related Types

| Type | Description |
|------|-------------|
| `NSCollectionLayoutItem` | Individual element; defined by a size |
| `NSCollectionLayoutGroup` | Container for items; arranged horizontally, vertically, or custom |
| `NSCollectionLayoutSection` | Top-level grouping with optional orthogonal scrolling |
| `NSCollectionLayoutSize` | Dimension using `.fractionalWidth`, `.fractionalHeight`, `.absolute`, or `.estimated` |
| `NSCollectionLayoutBoundarySupplementaryItem` | Header or footer pinned to a section boundary |
| `UICollectionLayoutListConfiguration` | Configuration for list-style sections with built-in appearances |

## Notes

- Available iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.1+, tvOS 13.0+, visionOS 1.0+
- `NSCollectionLayoutSection` supports orthogonal (cross-axis) scrolling via `orthogonalScrollingBehavior`
- Use `UICollectionLayoutListConfiguration` with `list(using:)` for sidebar, inset-grouped, and plain list appearances without manual item/group/section setup
- Prefer compositional layout over `UICollectionViewFlowLayout` for new designs

## Related

- [UICollectionView](./uicollectionview.md)
- [UICollectionViewLayout](./uicollectionviewlayout.md)
- [UICollectionViewListCell](./uicollectionviewlistcell.md)
