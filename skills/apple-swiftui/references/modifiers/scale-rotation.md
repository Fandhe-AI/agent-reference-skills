# scaleEffect / rotationEffect

Scales or rotates a view's rendered output around an anchor point without affecting layout.

## Signature / Usage

```swift
// Uniform scale
nonisolated func scaleEffect(_ s: CGFloat, anchor: UnitPoint = .center) -> some View

// Non-uniform scale
nonisolated func scaleEffect(x: CGFloat = 1, y: CGFloat = 1, anchor: UnitPoint = .center) -> some View

// 2D rotation
nonisolated func rotationEffect(_ angle: Angle, anchor: UnitPoint = .center) -> some View
```

```swift
Image(systemName: "star.fill")
    .scaleEffect(2, anchor: .leading)   // 2× scale, anchored at leading edge

Text("Rotated")
    .rotationEffect(.degrees(45))       // 45° clockwise

Text("Counter-clockwise")
    .rotationEffect(.radians(-.pi / 4))
```

## Options / Props

### `scaleEffect`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `s` | `CGFloat` | — | Uniform scale factor applied to both axes. |
| `x` | `CGFloat` | `1` | Horizontal scale factor. |
| `y` | `CGFloat` | `1` | Vertical scale factor. |
| `anchor` | `UnitPoint` | `.center` | Point within the view's bounds used as the scale origin. |

### `rotationEffect`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `angle` | `Angle` | — | Rotation angle. Use `.degrees(_:)` or `.radians(_:)`. |
| `anchor` | `UnitPoint` | `.center` | Point within the view's bounds used as the rotation pivot. |

## Notes

`scaleEffect` on iOS/macOS/tvOS/watchOS is available from iOS 13.0+ (the uniform overload is iOS 13+; macOS/tvOS/watchOS availability mirrors this). `rotationEffect` is available on iOS 13.0+ / macOS 10.15+. Neither modifier changes the view's layout frame. For layout-impacting rotation, use `rotation3DLayout`. For 3D effects, see `rotation3DEffect` and `scaleEffect(x:y:z:anchor:)`.

## Related

- [offset-position.md](./offset-position.md)
- [opacity.md](./opacity.md)
