# matchedGeometryEffect(id:in:properties:anchor:isSource:)

Defines a group of views with synchronized geometry, enabling hero-style animations when one view is swapped for another.

## Signature / Usage

```swift
nonisolated func matchedGeometryEffect<ID>(
    id: ID,
    in namespace: Namespace.ID,
    properties: MatchedGeometryProperties = .frame,
    anchor: UnitPoint = .center,
    isSource: Bool = true
) -> some View where ID: Hashable
```

```swift
@Namespace private var ns

var body: some View {
    if isExpanded {
        RoundedRectangle(cornerRadius: 12)
            .matchedGeometryEffect(id: "card", in: ns)
            .frame(width: 300, height: 200)
    } else {
        RoundedRectangle(cornerRadius: 12)
            .matchedGeometryEffect(id: "card", in: ns)
            .frame(width: 60, height: 60)
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `ID: Hashable` | Shared identifier linking views in the same animation group. |
| `namespace` | `Namespace.ID` | Created via `@Namespace`; scopes the identifier. |
| `properties` | `MatchedGeometryProperties` | Which geometry properties to copy (default: `.frame`). |
| `anchor` | `UnitPoint` | Reference point for the shared position (default: `.center`). |
| `isSource` | `Bool` | If `true`, this view provides geometry to others in the group (default: `true`). |

## Notes

- Available iOS 14.0+, macOS 11.0+, tvOS 14.0+, watchOS 7.0+, visionOS 1.0+
- Exactly **one** view with `isSource: true` must be visible at a time; undefined behavior otherwise
- Wrap state changes that swap the views in `withAnimation` for the interpolation to occur
- Use `@Namespace` as a property on the enclosing `View` type to create the namespace

## Related

- [Animation](./animation.md)
- [withAnimation](./withanimation.md)
