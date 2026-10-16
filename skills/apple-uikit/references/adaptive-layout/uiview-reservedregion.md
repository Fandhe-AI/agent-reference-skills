# UIView.ReservedRegion

A region within a view's coordinate space that another entity occupies. Arrange your view content to account for it.

## Signature / Usage

```swift
struct ReservedRegion   // nested in UIView; Equatable, Hashable, Identifiable

func reservedRegions(
    kind: UIView.ReservedRegion.Kind,
    options: UIView.ReservedRegion.QueryOptions
) -> [UIView.ReservedRegion]
```

`reservedRegions(kind:options:)` returns all reserved regions of the given kind that currently intersect the view, regardless of whether they are currently active.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| frame | `CGRect` | The rectangle of the region in the view's coordinate space, including the margins. |
| isActive | `Bool` | Whether the region is currently active. |
| kind | `UIView.ReservedRegion.Kind` | The kind of the region. |
| margins | `UIEdgeInsets` | The margins included in the frame around the reserved region for interactive content. |
| Kind.occlusion | `static let` `Kind` | A region where an element, such as the Dynamic Island, a camera, or window controls, occludes content. |
| Kind.division | `static let` `Kind` | A region where content splits into separate regions, such as at the fold of a hinge. |
| QueryOptions.includeInactive | `UIView.ReservedRegion.QueryOptions` (set-like options struct) | A Boolean value that indicates whether inactive reserved regions are included in a query result. |

## Notes

- iOS 27.1+, iPadOS 27.1+, Mac Catalyst 27.1+, tvOS 27.1+, visionOS 27.1+.
- Each region describes a frame, margins, active state, and an identifier.
- The default values of the `reservedRegions(kind:options:)` parameters are not stated in the source page and are not recorded here.
- The Objective-C counterpart is `UIViewReservedRegion`.

## Related

- [UIHingeInteraction](./uihingeinteraction.md)
- [UIArrangementViewController](./uiarrangementviewcontroller.md)
