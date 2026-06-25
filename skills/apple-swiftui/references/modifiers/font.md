# font / fontWeight

Sets the typeface and weight for text in a view hierarchy.

## Signature / Usage

```swift
nonisolated func font(_ font: Font?) -> some View

nonisolated func fontWeight(_ weight: Font.Weight?) -> some View

nonisolated func fontDesign(_ design: Font.Design?) -> some View
```

```swift
Text("Large title")
    .font(.largeTitle)

VStack {
    Text("All children inherit this font")
    Text("Unless overridden individually")
}
.font(.system(size: 16, weight: .light, design: .default))

Text("Semibold body")
    .font(.body)
    .fontWeight(.semibold)
```

## Options / Props

### `font(_:)`

| Value | Description |
|-------|-------------|
| `.largeTitle`, `.title`, `.title2`, `.title3` | Headline sizes |
| `.headline`, `.subheadline` | Semantic headlines |
| `.body` | Default body text |
| `.callout`, `.footnote`, `.caption`, `.caption2` | Smaller sizes |
| `.system(size:weight:design:)` | Custom system font |
| `Font.custom(_:size:)` | Custom font family |
| `nil` | Removes override; inherits from environment |

### `fontWeight(_:)`

| Value | Description |
|-------|-------------|
| `.ultraLight`, `.thin`, `.light` | Lighter weights |
| `.regular` | Default |
| `.medium`, `.semibold`, `.bold` | Heavier weights |
| `.heavy`, `.black` | Heaviest weights |
| `nil` | Removes weight override |

### `fontDesign(_:)`

`.default`, `.serif`, `.rounded`, `.monospaced`

## Notes

`font(_:)` is available on iOS 13.0+ / macOS 10.15+. `fontWeight(_:)` and `fontDesign(_:)` require iOS 16.0+ / macOS 13.0+. Font values flow down the view hierarchy as environment values; lower views can override.

## Related

- [text-styling.md](./text-styling.md)
- [text-layout.md](./text-layout.md)
- [foreground-style.md](./foreground-style.md)
