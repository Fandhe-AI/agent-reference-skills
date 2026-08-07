# Styles API (Style / StyleScope / StyleState / Modifier.styleable)

Experimental, CSS-like paradigm for styling composables: a single `Style` value replaces multiple styling parameters, supports state-based conditional styling (`pressed { }`, `hovered { }`, ...), and animates transitions between states without triggering recomposition — Styles run in the Layout/Draw phases, skipping Composition.

## Signature / Usage

```kotlin
fun Style(block: StyleScope.() -> Unit): Style

fun Modifier.styleable(style: Style): Modifier
fun Modifier.styleable(styleState: StyleState, style: Style): Modifier

@Composable
fun rememberUpdatedStyleState(
    interactionSource: InteractionSource,
    update: (MutableStyleState) -> Unit = {},
): StyleState

class MutableStyleState(interactionSource: InteractionSource?) : StyleState
```

```kotlin
val buttonStyle = Style {
    background(Color.White)
    border(3.dp, Color.Black)
    externalPadding(48.dp)

    pressed {
        animate {
            borderColor(Color.Magenta)
            background(Color(0xFFB39DDB))
        }
    }
}

BaseButton(
    onClick = { },
    style = { background(Color.Blue) },
) {
    BaseText("Click me")
}

// or, on composables without a Style parameter:
Row(modifier = Modifier.styleable(buttonStyle)) {
    BaseText("Content")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `StyleScope.contentPadding(...)` / `externalPadding(...)` | `Dp` overloads (`all`, `horizontal`/`vertical`, per-edge) | Inner/outer padding; per-edge variants (`contentPaddingStart`, etc.) also available. |
| `StyleScope.background(...)` / `foreground(...)` | `Color` \| `Brush` | Fill properties. |
| `StyleScope.borderWidth` / `borderColor` / `borderBrush` / `shape` | — | Border and shape. |
| `StyleScope.dropShadow` / `innerShadow` | — | Shadow properties. |
| `StyleScope.width` / `height` / `size` / `fillWidth()` / `fillHeight()` / `fillSize()` | `Dp` / none | Sizing. |
| `StyleScope.translationX/Y`, `scaleX/Y`, `rotationX/Y/Z`, `alpha`, `zIndex`, `transformOrigin` | — | Graphics-layer transforms. |
| `StyleScope.textStyle` / `fontSize` / `fontWeight` / `contentColor` / `lineHeight` / `letterSpacing` / `textAlign` / ... | — | Typography (several, e.g. `contentColor`, `fontFamily`, are inherited down the tree). |
| `pressed { }` / `hovered { }` / `focused { }` / `selected { }` (state blocks) | `StyleScope.() -> Unit` | Apply properties conditionally; blocks can nest (e.g. `hovered { pressed { ... } }`) to combine states. |
| `animate { }` / `animate(animationSpec) { }` | lambda of property setters | Wraps property changes inside a state block to animate the transition instead of snapping. |
| `StyleState.isPressed/isHovered/isFocused/isSelected/isEnabled/isToggled` | `Boolean` | Read-only interaction-state flags, readable inside a `Style` block via the scope's `state`. |

## Notes

- Experimental API (`compose = "1.12.0-alpha03"` or later); subject to change. Material Design 3 support for Styles is planned but not yet available.
- Not a replacement for `Modifier` — Styles replace styling *parameters* (padding, colors, etc.), modifiers remain for layout/gesture/other concerns.
- Properties set in a `Style` are **not additive**: setting the same property twice (e.g. across merged styles) keeps only the last value, unlike modifier chains.
- Merge styles with `style1 then style2`.
- Custom reusable properties are plain extension functions on `StyleScope` (e.g. `fun StyleScope.outlinedBackground(color: Color) { border(1.dp, color); background(color) }`).
- Custom state beyond the built-ins uses `StyleStateKey`, exposed as a `var` on `MutableStyleState`.
- Three adoption paths: a component's own `style: Style` parameter, `Modifier.styleable(style)` on any layout composable, or `Modifier.styleable(styleState, style)` when driving state manually from an `InteractionSource`.
- Package: `androidx.compose.foundation` (core `Style`/`StyleScope`) and `androidx.compose.ui` (`Modifier.styleable`).

## Related

- [Modifier (layout)](./modifier-layout.md)
- [MediaQuery / UiMediaScope](./media-query.md)
