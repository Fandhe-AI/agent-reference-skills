# UILayoutGuide

A rectangular area that participates in Auto Layout without adding a view to the hierarchy. Used to define spacing, encapsulate groups of constraints, or represent system areas (safe area, margins, keyboard).

## Signature / Usage

```swift
@MainActor
class UILayoutGuide : NSObject
```

```swift
// Create equal-spacing guides between three buttons
let space1 = UILayoutGuide()
let space2 = UILayoutGuide()
view.addLayoutGuide(space1)
view.addLayoutGuide(space2)

space1.widthAnchor.constraint(equalTo: space2.widthAnchor).isActive = true
leadButton.trailingAnchor.constraint(equalTo: space1.leadingAnchor).isActive = true
midButton.leadingAnchor.constraint(equalTo: space1.trailingAnchor).isActive = true
midButton.trailingAnchor.constraint(equalTo: space2.leadingAnchor).isActive = true
trailButton.leadingAnchor.constraint(equalTo: space2.trailingAnchor).isActive = true
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `identifier` | `String` | String identifier for debugging |
| `layoutFrame` | `CGRect` | Guide's frame in the owning view's coordinate system (read-only) |
| `owningView` | `UIView?` | View that owns this layout guide (read-only) |
| `hasAmbiguousLayout` | `Bool` | Whether the guide's position/size is ambiguous |

### Layout anchors

| Anchor | Axis |
|--------|------|
| `leadingAnchor`, `trailingAnchor`, `leftAnchor`, `rightAnchor`, `centerXAnchor`, `widthAnchor` | Horizontal |
| `topAnchor`, `bottomAnchor`, `centerYAnchor`, `heightAnchor` | Vertical |

### Methods

| Method | Description |
|--------|-------------|
| `constraintsAffectingLayout(for:)` | Returns active constraints affecting the guide on the given axis |

## Notes

Available iOS 9.0+, iPadOS 9.0+, Mac Catalyst 13.1+, tvOS 9.0+, visionOS 1.0+. Add guides via `UIView.addLayoutGuide(_:)`; remove via `removeLayoutGuide(_:)`. System-provided guides (`safeAreaLayoutGuide`, `layoutMarginsGuide`, `readableContentGuide`) are pre-installed on every `UIView` and must not be manually added. `UIKeyboardLayoutGuide` and `UITrackingLayoutGuide` are specialized subclasses.

## Related

- [NSLayoutAnchor](./nslayoutanchor.md)
- [UIView layout (safeAreaLayoutGuide, layoutMarginsGuide)](./uiview-layout.md)
- [NSLayoutConstraint](./nslayoutconstraint.md)
