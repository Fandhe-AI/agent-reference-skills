# bold / italic

Applies bold or italic styling to text in a view.

## Signature / Usage

```swift
nonisolated func bold(_ isActive: Bool = true) -> some View

nonisolated func italic(_ isActive: Bool = true) -> some View
```

```swift
Text("Bold text")
    .bold()

Text("Italic text")
    .italic()

Text("Conditionally bold")
    .bold(isBold)

Text("Combined")
    .bold()
    .italic()
```

## Options / Props

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `isActive` | `Bool` | `true` | When `false`, the modifier has no effect. Useful for conditional styling. |

## Notes

Both `bold(_:)` and `italic(_:)` require iOS 16.0+ / macOS 13.0+. For iOS 13–15 bold styling, use `.font(.system(size: 17, weight: .bold))` or `Text("…").fontWeight(.bold)` (also iOS 16+). Italic can be approximated on older OS versions with `Font.italic()` on a `Font` value. These modifiers propagate through the view hierarchy and apply to all `Text` descendants.

## Related

- [font.md](./font.md)
- [text-layout.md](./text-layout.md)
