# opacity

Sets the transparency of a view.

## Signature / Usage

```swift
nonisolated func opacity(_ opacity: Double) -> some View
```

```swift
Image(systemName: "star.fill")
    .opacity(0.5)   // 50% transparent

// Fade based on state
Text("Status")
    .opacity(isEnabled ? 1.0 : 0.3)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `opacity` | `Double` | A value from `0` (fully transparent) to `1` (fully opaque). |

## Notes

Available on iOS 13.0+ / macOS 10.15+. Applying `opacity` to a view that already has an opacity modifier multiplies the effects. To hide a view while still reserving its layout space, prefer `.opacity(0)` over `.hidden()` when you need to animate the transition. For fully removing a view from layout, use an `if` statement instead.

## Related

- [hidden-disabled.md](./interaction.md)
- [shadow.md](./shadow.md)
- [scale-rotation.md](./scale-rotation.md)
