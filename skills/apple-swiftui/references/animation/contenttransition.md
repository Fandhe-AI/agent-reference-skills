# ContentTransition

A value that defines how content within a single view animates when it changes, as opposed to how the view itself appears or disappears.

## Signature / Usage

```swift
struct ContentTransition: Equatable, Sendable
```

Apply via the `contentTransition(_:)` modifier inside an animation context:

```swift
Text(count, format: .number)
    .contentTransition(.numericText())
    .animation(.default, value: count)
```

## Options / Props

### Static properties

| Name | Description |
|------|-------------|
| `.identity` | No animation; content changes instantly. |
| `.opacity` | Fades out the old content and fades in the new content. |
| `.interpolate` | Interpolates paths between content states where possible. |
| `.symbolEffect` | Applies the default symbol effect transition to SF Symbols. |

### Static methods

| Method | Description |
|--------|-------------|
| `.numericText(countsDown:)` | Animates `Text` displaying numbers with a count-up or count-down effect. |
| `.numericText(value:)` | Determines direction automatically from the new value. |
| `.symbolEffect(_:options:)` | Applies a specific symbol Replace animation. |

## Notes

- Available iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- **Only takes effect inside an `Animation` context**; without animation, content changes instantly regardless of this modifier
- Different from `transition(_:)`, which animates view insertion/removal — `contentTransition` animates changes within a stable view

## Related

- [contentTransition(_:) modifier](./contenttransition-modifier.md)
- [AnyTransition](./anytransition.md)
- [Animation](./animation.md)
