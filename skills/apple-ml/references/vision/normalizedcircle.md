# NormalizedCircle

The center point and radius of a 2D circle in normalized coordinates.

## Signature / Usage

```swift
struct NormalizedCircle

init(center: NormalizedPoint, radius: CGFloat)
static func boundingCircle(for: [NormalizedPoint]) -> NormalizedCircle
func contains(_: NormalizedPoint) -> Bool
func contains(_: NormalizedPoint, inCircumferentialRingOfWidth: CGFloat) -> Bool
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `center` | `NormalizedPoint` (`let`) | The circle's center point |
| `radius` | `CGFloat` (`let`) | The circle's radius |
| `zero` | `NormalizedCircle` (static) | A circle object centered at the origin, with a radius of zero |
| `boundingCircle(for:)` | `([NormalizedPoint]) -> NormalizedCircle` | Creates the smallest circle that encloses the points you specify |
| `contains(_:)` | `(NormalizedPoint) -> Bool` | Whether this circle, including its boundary, contains the specified point |
| `contains(_:inCircumferentialRingOfWidth:)` | `(NormalizedPoint, CGFloat) -> Bool` | Whether a ring around this circle's circumference contains the specified point |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- The docs page does not list protocol conformances for this type.

## Related

- [NormalizedPoint](./normalizedpoint.md)
- [NormalizedRect](./normalizedrect.md)
- [NormalizedRegion](./normalizedregion.md)
- [DetectTrajectoriesRequest](./detecttrajectoriesrequest.md)
