# Styles API (Style / StyleScope / StyleState / Modifier.styleable)

Experimental, CSS-like paradigm for styling composables: a single `Style` value replaces multiple styling parameters, supports state-based conditional styling (`pressed { }`, `hovered { }`, ...), and animates transitions between states without triggering recomposition — Styles run in the Layout/Draw phases, skipping Composition.

## Signature / Usage

Signatures from `androidx.compose.foundation:foundation` 1.12.1 (package `androidx.compose.foundation.style`; every API below is annotated `@ExperimentalFoundationStyleApi`, opt-in required):

```kotlin
fun interface CustomStyle<ScopeT : CustomStyleScope> { fun ScopeT.applyStyle() }
fun interface Style : CustomStyle<StyleScope> {
    companion object : Style // the empty style; `style: Style = Style` is the default-parameter idiom
}

infix fun Style.then(other: Style): Style
fun Style(style1: Style, style2: Style): Style
fun Style(style1: Style, style2: Style, style3: Style): Style
fun Style(vararg styles: Style): Style

fun Modifier.styleable(styleState: StyleState? = null, style: Style): Modifier
fun Modifier.styleable(styleState: StyleState?, vararg styles: Style): Modifier
// Modifier.styleable(styleState: StyleState?) with no styles is @Deprecated(level = ERROR)

@Composable
inline fun rememberUpdatedStyleState(
    interactionSource: InteractionSource?,
    block: @Composable (MutableStyleState) -> Unit = {},
): StyleState

class MutableStyleState(override val interactionSource: InteractionSource?) : StyleState()
open class StyleStateKey<T>(defaultValue: T)
```

`Style` is a SAM interface, so `Style { background(Color.Blue) }` works. Later styles override earlier ones on a per-property basis.

```kotlin
val animatingStyle = Style {
    externalPadding(48.dp)
    border(3.dp, Color.Black)
    background(Color.White)
    size(100.dp)

    pressed {
        animate {
            borderColor(Color.Magenta)
            background(Color(0xFFB39DDB))
        }
    }
}

val styleState = remember { MutableStyleState(null) }
Box(
    Modifier.styleable(styleState, animatingStyle)
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `StyleScope.contentPadding(...)` / `externalPadding(...)` | `Dp` (`all`, `horizontal`/`vertical`, per-edge), `PaddingValues` | Inner/outer padding; per-edge variants (`contentPaddingStart`, `externalPaddingTop`, etc.) also available. `PaddingValues` overloads added in 1.12.0-alpha01. |
| `StyleScope.background(...)` / `foreground(...)` | `Color` \| `Brush` | Fill properties. |
| `StyleScope.borderWidth` / `borderColor` / `borderBrush` / `border(width, color or brush)` / `shape` | — | Border and shape. |
| `StyleScope.dropShadow` / `innerShadow` | — | Shadow properties. |
| `StyleScope.width` / `height` / `size` / `fillWidth()` / `fillHeight()` / `fillSize()` | `Dp` / `DpSize` / `Float` fraction / none | Sizing. `left` / `top` / `right` / `bottom` offsets position the element. |
| `StyleScope.translationX/Y`, `scaleX/Y`, `rotationX/Y/Z`, `alpha`, `zIndex`, `transformOrigin`, `colorFilter` | — | Graphics-layer properties. `colorFilter` added in 1.12.0-alpha01. |
| `StyleScope.textStyle` / `fontSize` / `fontWeight` / `fontStyle` / `fontFamily` / `contentColor` / `contentBrush` / `lineHeight` / `letterSpacing` / `textAlign` / `textDirection` / `lineBreak` / `hyphens` / `textDecoration` / `textIndent` / `baselineShift` / `textMotion` | — | Typography; inherited by children (inheritance is opt-in while experimental, see Notes). `textMotion` added in 1.12.0-alpha01. |
| `pressed { }` / `hovered { }` / `focused { }` / `selected { }` / `checked { }` / `disabled { }` / `triStateToggleOn { }` / `triStateToggleOff { }` / `triStateToggleIndeterminate { }` | `StyleStateScope.(block: () -> Unit)` extension functions | Apply properties conditionally; blocks can nest (e.g. `hovered { pressed { ... } }`) to combine states. |
| `StyleStateScope.state(key: StyleStateKey<Boolean>, block: () -> Unit)` and `state(key, block, active: (key, state) -> Boolean)` | — | Helpers for custom state-reading functions. |
| `animate { }` / `animate(spec: AnimationSpec<Float>) { }` | `AnimateStyleScope` extension | Wraps property changes inside a state block to animate the transition instead of snapping. |
| `StyleState.isEnabled` / `isFocused` / `isHovered` / `isPressed` / `isSelected` / `isChecked` / `triStateToggle` | `Boolean` / `ToggleableState` | Read-only state flags (`MutableStyleState` makes them settable); `StyleState.get(key)` / `state[key]` reads custom state. Readable inside a `Style` block via `state`. |

## Notes

- Experimental API (`@ExperimentalFoundationStyleApi`, "likely to change or be removed in the future"). Stable Compose Foundation 1.12.x (BOM 2026.09.00) ships Styles, but it is still experimental. The Styles guide still shows `compose = "1.12.0-alpha03"` in its dependency snippet. Material Design 3 support for Styles is planned but not yet available.
- Migration (Compose Foundation 1.12.0-alpha03, breaks binary and source compatibility): custom style types with custom style scopes were added (`CustomStyle` / `CustomStyleScope`); `StyleScope` helper functions moved to extension functions on sub-scopes (`ContentPaddingScope`, `ExternalPaddingScope`, `BorderScope`, `SizeScope`, ...). Fix compile errors by importing the extension functions, or all symbols from `androidx.compose.foundation.style.*` (the release note spells the package `androidx.compose.foundation.styles`; the 1.12.1 sources use `.style`). (release notes: https://developer.android.com/jetpack/androidx/releases/compose-foundation)
- Migration (pre-release): Compose Foundation 1.13.0-alpha03 refactors Styles into the Styles DSL plus the modifiers it configures (`CustomStyle` / `CommonStyle`, `StyleResolver`, `Modifier.appearance`, `Modifier.placement`, `stylePropertyOf`, `styleLocalOf`); the previous `Style`-based implementation remains but will be deprecated and removed in favor of the `CommonStyle`-based API. 1.13.0-beta01 adds `CommonStyle.styleLayer()`; `state()` and state helpers such as `pressed()` then implicitly create a layer. Not in 1.12.1. (release notes: https://developer.android.com/jetpack/androidx/releases/compose-foundation)
- Styles vs modifiers: a Style is internally a modifier, but Styles do not replace modifiers. Modifiers are additive (a second border stacks on the first), Styles are over-writable (last write wins). Styles are themeable (they can read `CompositionLocal`s), skip the Composition phase, allocate less, and have built-in `animate { }`. Styles cannot handle click logic, gestures or accessibility semantics; use modifiers for behavior, custom drawing, one-off layouts, or additive properties.
- Properties set in a `Style` are **not additive**: setting the same property twice keeps only the last value (e.g. `contentPaddingTop(16.dp)` after `contentPadding(64.dp)` overrides only the top). Merge with `style1 then style2`; the right-hand style wins per property.
- `Modifier.styleable` applies only to the container it is on; children do not receive its properties except inherited ones (typography / `contentColor`). Chained `styleable` modifiers are additive for non-inherited properties; for inherited ones the last wins. Inheritance priority: direct composable arguments, then the `Style` parameter, then the modifier chain, then parent styles. While experimental, enable inheritance with `ComposeFoundationFlags.isInheritedTextStyleEnabled = true`.
- Adoption paths: a component's own `style: Style` parameter, `Modifier.styleable(style)` on layout composables without one, or in a custom design system expose `style: Style = Style` after `modifier` and apply `Modifier.styleable(styleState, defaultStyle, style)`. A component that already takes a `Style` parameter already applies `styleable` internally; do not apply it again.
- Custom reusable properties are plain extension functions on `StyleScope` (e.g. `fun StyleScope.outlinedBackground(color: Color) { border(1.dp, color); background(color) }`); creating genuinely new styleable properties is unsupported. Custom state uses `StyleStateKey(defaultValue)`, a `MutableStyleState` extension property, and `StyleScope` extension functions calling `state(key, block, active)`.
- Theming layers: subsystem values (named values), atomic styles (one property each, composed with `then`), component styles, and components consuming a style. Styles read `CompositionLocal`s through `currentValue` inside the style lambda (not by reading them in a `@Composable` that builds the style, because the value is read where the style is defined, not where it is consumed). Do not give `style` a non-empty default parameter value; merge defaults inside. Do not expose `style` on layout or screen-level composables. Switch whole Styles only when themes are fundamentally different.
- Performance: Styles shift work to the Layout/Draw phase (phase shifting), defer animation allocation until an animation starts (lazy allocation), and use one lambda for many properties instead of one modifier object per property. The guide's illustrative benchmarks (Compose 1.11.0-alpha06) report, for `basic_box_border_change`, -59.91% time and -77.22% allocations.
- Limitations (Styles guide): no infinite animations (keep `rememberInfiniteTransition`); no custom shapes or shape animations yet; no custom property scoping beyond standard attributes; no interop with `themes.xml` / `styles.xml`; using `pressed` without `indication = null` on `clickable` shows the ripple and the pressed style at once.
- Package: `androidx.compose.foundation.style` (both `Style` / `StyleScope` / `StyleState` and `Modifier.styleable`).

## Related

- [Modifier (layout)](./modifier-layout.md)
- [MediaQuery / UiMediaScope](./media-query.md)
