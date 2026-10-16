# ReservedRegion

A region within a view's coordinate space that another entity, such as the device hardware, reserves.

## Signature / Usage

```swift
GeometryReader { proxy in
    RegionAvoidingLayout(
        regions: proxy.reservedRegions(kind: .occlusion)
    ) {
        ForEach(items) { item in
            ItemView(item)
        }
    }
}
```

```swift
struct ReservedRegion

func reservedRegions(kind: ReservedRegion.Kind, options: ReservedRegion.QueryOptions = [], layoutDirectionBehavior: LayoutDirectionBehavior = .mirrors) -> [ReservedRegion]   // GeometryProxy
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `ReservedRegion.ID` | Identifier for the region |
| `frame` | `CGRect` | The rect of the region in the view's coordinate space, including the margins |
| `isActive` | `Bool` | Whether the region is active |
| `kind` | `ReservedRegion.Kind` | The kind of region: `.division` (content should split into two separate regions) or `.occlusion` (region occluded by an element) |
| `margins` | `EdgeInsets` | The margins included in the frame around the rect for interactive content |
| `ReservedRegion.QueryOptions` | `OptionSet` | Query options; member `includeInactive` |
| `kind` (reservedRegions) | `ReservedRegion.Kind` | Which kind of regions to return |
| `layoutDirectionBehavior` | `LayoutDirectionBehavior` | `.mirrors` (default) or `.fixed` |

## Notes

- Available: iOS 27.1+ (and iPadOS, Mac Catalyst, macOS, tvOS, visionOS, watchOS 27.1+)
- `reservedRegions(kind:options:layoutDirectionBehavior:)` returns all reserved regions currently intersecting your view regardless of whether they are active
- Reserved regions are typically in a fixed coordinate space (a device camera does not flip with language). By default the system mirrors region geometry for right-to-left layout before giving it to SwiftUI APIs, so a `Layout` needs no direction handling
- Pass `LayoutDirectionBehavior.fixed` to prevent mirroring when you position content manually
- Conforms to `Identifiable`, `Equatable`, `Hashable`, `Sendable`

## Related

- [DeviceHinge](./devicehinge.md)
- [ArrangementView](./arrangementview.md)
