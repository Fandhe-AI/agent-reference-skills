# NSLayoutAnchor

Factory base class for creating `NSLayoutConstraint` objects using a fluent, type-safe API. Never used directly; access via one of its three concrete subclasses.

## Signature / Usage

```swift
@MainActor
class NSLayoutAnchor<AnchorType> where AnchorType : AnyObject
```

Anchors are accessed as properties on `UIView`, `NSView`, or `UILayoutGuide`. Use the subclass-specific methods to build constraints.

```swift
// Preferred over NSLayoutConstraint's verbose initializer
let margins = view.layoutMarginsGuide
subview.leadingAnchor.constraint(equalTo: margins.leadingAnchor).isActive = true
subview.trailingAnchor.constraint(equalTo: margins.trailingAnchor).isActive = true
```

## Options / Props

### Constraint-building methods (inherited by all subclasses)

| Method | Description |
|--------|-------------|
| `constraint(equalTo:)` | Anchor == other anchor |
| `constraint(equalTo:constant:)` | Anchor == other anchor + offset |
| `constraint(greaterThanOrEqualTo:)` | Anchor >= other anchor |
| `constraint(greaterThanOrEqualTo:constant:)` | Anchor >= other anchor + offset |
| `constraint(lessThanOrEqualTo:)` | Anchor <= other anchor |
| `constraint(lessThanOrEqualTo:constant:)` | Anchor <= other anchor + offset |

### Debugging properties

| Name | Type | Description |
|------|------|-------------|
| `name` | `String` | Anchor name for use in constraint descriptions |
| `item` | `AnyObject` | Object that owns this anchor |
| `constraintsAffectingLayout` | `[NSLayoutConstraint]` | Active constraints that affect this anchor |
| `hasAmbiguousLayout` | `Bool` | Whether the anchor's position/size is ambiguous |

## Notes

Available iOS 9.0+, iPadOS 9.0+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+. The compiler enforces type compatibility between anchors at build time — passing an X-axis anchor where a Y-axis anchor is expected produces a compile warning. All returned constraints are inactive by default; set `.isActive = true` or use `NSLayoutConstraint.activate(_:)`.

## Related

- [NSLayoutXAxisAnchor](./nslayoutxaxisanchor.md)
- [NSLayoutYAxisAnchor](./nslayoutyaxisanchor.md)
- [NSLayoutDimension](./nslayoutdimension.md)
- [NSLayoutConstraint](./nslayoutconstraint.md)
