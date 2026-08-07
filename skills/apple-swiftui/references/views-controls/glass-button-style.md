# GlassButtonStyle / GlassProminentButtonStyle

Button styles that apply a Liquid Glass effect based on the button's context, accessed via `PrimitiveButtonStyle.glass` and `.glassProminent`.

## Signature / Usage

```swift
nonisolated struct GlassButtonStyle
nonisolated struct GlassProminentButtonStyle

extension PrimitiveButtonStyle where Self == GlassButtonStyle {
    static var glass: GlassButtonStyle { get }
    static func glass(_ glass: Glass) -> GlassButtonStyle
}

extension PrimitiveButtonStyle where Self == GlassProminentButtonStyle {
    static var glassProminent: GlassProminentButtonStyle { get }
}
```

```swift
Button("Sign In") { signIn() }
    .buttonStyle(.glass)

Button("Continue") { proceed() }
    .buttonStyle(.glassProminent)
```

## Options / Props

| Member | Description |
|---|---|
| `PrimitiveButtonStyle.glass` | Static property returning `GlassButtonStyle`; applies a Liquid Glass effect |
| `PrimitiveButtonStyle.glass(_:)` | Returns `GlassButtonStyle` configured with a custom `Glass` value |
| `PrimitiveButtonStyle.glassProminent` | Static property returning `GlassProminentButtonStyle`; a prominent Liquid Glass variant similar to `.borderedProminent` |
| `GlassButtonStyle.init()` / `init(_:)` | Creates the style directly, optionally with a `Glass` configuration |
| `GlassProminentButtonStyle.init()` | Creates the prominent style directly |

## Notes

- Available on iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, watchOS 26.0+.
- Both types conform to `PrimitiveButtonStyle`.
- Apply via the `buttonStyle(_:)` modifier on a `Button` or a container view holding buttons.
- In tvOS, the Liquid Glass effect is applied regardless of whether the button has focus.
- `glassProminent` is the Liquid Glass counterpart to `.borderedProminent`.

## Related

- [Button](./button.md)
