# NSLayoutConstraint

Represents a relationship between two UI objects that the constraint-based layout system must satisfy. The fundamental unit of Auto Layout.

## Signature / Usage

```swift
@MainActor
class NSLayoutConstraint : NSObject
```

Each constraint encodes the linear equation:

```
item1.attribute1 = multiplier × item2.attribute2 + constant
```

```swift
// Preferred: use layout anchors instead of direct initializer
button2.leadingAnchor.constraint(equalTo: button1.trailingAnchor, constant: 8).isActive = true

// Direct initializer (verbose, use when anchors are insufficient)
NSLayoutConstraint(
    item: button2,
    attribute: .leading,
    relatedBy: .equal,
    toItem: button1,
    attribute: .trailing,
    multiplier: 1.0,
    constant: 8.0
).isActive = true

// Activate/deactivate multiple constraints at once
NSLayoutConstraint.activate([
    view.topAnchor.constraint(equalTo: superview.topAnchor),
    view.leadingAnchor.constraint(equalTo: superview.leadingAnchor),
])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `firstItem` | `AnyObject?` | First object in the constraint relationship |
| `firstAttribute` | `Attribute` | Attribute of the first object |
| `relation` | `Relation` | Relationship type: `.equal`, `.lessThanOrEqual`, `.greaterThanOrEqual` |
| `secondItem` | `AnyObject?` | Second object in the constraint relationship |
| `secondAttribute` | `Attribute` | Attribute of the second object |
| `multiplier` | `CGFloat` | Multiplier applied to `secondAttribute` |
| `constant` | `CGFloat` | Constant added to the equation (mutable at runtime) |
| `priority` | `UILayoutPriority` | Importance (1–1000). Default `1000` = required |
| `isActive` | `Bool` | Whether the constraint is active |
| `identifier` | `String?` | Name for debugging |
| `firstAnchor` | `NSLayoutAnchor<AnyObject>` | First anchor defining the constraint |
| `secondAnchor` | `NSLayoutAnchor<AnyObject>?` | Second anchor defining the constraint |

### `NSLayoutConstraint.Attribute` (common values)

`left`, `right`, `top`, `bottom`, `leading`, `trailing`, `width`, `height`, `centerX`, `centerY`, `firstBaseline`, `lastBaseline`, `notAnAttribute`

### `NSLayoutConstraint.Relation`

| Case | Meaning |
|------|---------|
| `.equal` | `item1.attr == multiplier × item2.attr + constant` |
| `.lessThanOrEqual` | `item1.attr <= multiplier × item2.attr + constant` |
| `.greaterThanOrEqual` | `item1.attr >= multiplier × item2.attr + constant` |

## Notes

Available iOS 6.0+, iPadOS 6.0+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+. Only `constant` is mutable after creation; all other properties are read-only. A valid layout must be both nonambiguous and nonconflicting. Always set `translatesAutoresizingMaskIntoConstraints = false` on programmatically created views before adding constraints.

## Related

- [NSLayoutAnchor](./nslayoutanchor.md)
- [UILayoutPriority](./uilayoutpriority.md)
- [UIView layout (safeAreaLayoutGuide, intrinsicContentSize, hugging/compression)](./uiview-layout.md)
