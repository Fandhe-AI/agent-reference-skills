# lineLimit / multilineTextAlignment

Controls the maximum number of lines and the alignment of wrapped text.

## Signature / Usage

```swift
// Limit to a fixed number of lines (nil = unlimited)
nonisolated func lineLimit(_ number: Int?) -> some View

// Limit with a closed range
nonisolated func lineLimit(_ limit: ClosedRange<Int>) -> some View

// Limit with reserving space
nonisolated func lineLimit(_ limit: Int, reservesSpace: Bool) -> some View

// Alignment of wrapped lines
nonisolated func multilineTextAlignment(_ alignment: TextAlignment) -> some View
```

```swift
Text("This is a long string that may wrap across several lines.")
    .frame(width: 200)
    .lineLimit(3)
    .multilineTextAlignment(.center)
```

## Options / Props

### `lineLimit`

| Parameter | Type | Description |
|-----------|------|-------------|
| `number` | `Int?` | Maximum lines. `nil` removes the limit. |
| `limit` | `ClosedRange<Int>` | Minimum and maximum line range (iOS 16+). |
| `reservesSpace` | `Bool` | When `true`, always reserves space for `limit` lines even if shorter. |

### `multilineTextAlignment`

| Value | Description |
|-------|-------------|
| `.leading` | Align lines to the leading edge (default). |
| `.center` | Center each line. |
| `.trailing` | Align lines to the trailing edge. |

## Notes

`lineLimit(_:)` is available on iOS 13.0+ / macOS 10.15+. The `ClosedRange` and `reservesSpace` overloads require iOS 16.0+. `multilineTextAlignment` has no effect on single-line `Text` whose width matches its content; use container alignment instead. The alignment value propagates via the environment to all `Text` descendants.

## Related

- [font.md](./font.md)
- [text-styling.md](./text-styling.md)
