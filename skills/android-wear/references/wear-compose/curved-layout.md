# CurvedLayout / curvedText / curvedRow / curvedColumn / CurvedModifier

Low-level building blocks for arranging content along an arc (polar coordinate layout), used to draw text/rows/columns that follow a round screen's curvature.

## Signature / Usage

```kotlin
@Composable
public fun CurvedLayout(
    modifier: Modifier = Modifier,
    anchor: Float = 270f,
    anchorType: AnchorType = AnchorType.Center,
    radialAlignment: CurvedAlignment.Radial? = null,
    angularDirection: CurvedDirection.Angular = CurvedDirection.Angular.Normal,
    contentBuilder: CurvedScope.() -> Unit,
)
```

```kotlin
CurvedLayout(anchor = 90f) {
    curvedText("Hello")
}
```

```kotlin
public fun CurvedScope.curvedText(
    text: String,
    modifier: CurvedModifier = CurvedModifier,
    maxSweepAngle: Float = CurvedTextDefaults.ScrollableContentMaxSweepAngle,
    background: Color = Color.Unspecified,
    color: Color = Color.Unspecified,
    fontSize: TextUnit = TextUnit.Unspecified,
    fontFamily: FontFamily? = null,
    fontWeight: FontWeight? = null,
    fontStyle: FontStyle? = null,
    fontSynthesis: FontSynthesis? = null,
    letterSpacing: TextUnit = TextUnit.Unspecified,
    letterSpacingCounterClockwise: TextUnit = TextUnit.Unspecified,
    style: CurvedTextStyle? = null,
    angularDirection: CurvedDirection.Angular? = null,
    overflow: TextOverflow = TextOverflow.Clip,
)
```

```kotlin
public fun CurvedScope.curvedRow(
    modifier: CurvedModifier = CurvedModifier,
    radialAlignment: CurvedAlignment.Radial? = null,
    angularDirection: CurvedDirection.Angular? = null,
    contentBuilder: CurvedScope.() -> Unit,
)

public fun CurvedScope.curvedColumn(
    modifier: CurvedModifier = CurvedModifier,
    radialDirection: CurvedDirection.Radial? = null,
    angularAlignment: CurvedAlignment.Angular? = null,
    contentBuilder: CurvedScope.() -> Unit,
)
```

`CurvedModifier` is a sealed interface — an ordered, immutable chain of modifier elements for curved components in polar coordinate space (analogous to `Modifier` for normal layout).

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `anchor` (CurvedLayout) | `Float` | `270f` | Angle (degrees) the arc content is anchored to. |
| `anchorType` (CurvedLayout) | `AnchorType` | `AnchorType.Center` | Which part of the arc content aligns to `anchor`. |
| `angularDirection` | `CurvedDirection.Angular` | `Normal` | Clockwise/counter-clockwise layout direction. |
| `radialAlignment` (CurvedLayout/curvedRow) | `CurvedAlignment.Radial?` | `null` | Alignment across the radial axis. |
| `text` (curvedText) | `String` | — | Text to render along the arc. |
| `maxSweepAngle` (curvedText) | `Float` | `CurvedTextDefaults.ScrollableContentMaxSweepAngle` | Maximum arc angle the text may occupy. |
| `contentBuilder` | `CurvedScope.() -> Unit` | — | DSL for nested curved children (`curvedText`, `curvedRow`, `curvedColumn`, etc). |

## Notes

- `curvedRow` stacks children along the arc (angular axis); `curvedColumn` stacks children along the radial axis, outermost child first.
- These are the primitives `TimeText` is built on; most apps use `TimeText` directly rather than `CurvedLayout` from scratch.
- Package: `androidx.wear.compose.foundation` for `CurvedLayout` / `curvedRow` / `curvedColumn` / `CurvedModifier` (artifact `androidx.wear.compose:compose-foundation`); `curvedText` lives in `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`) as a themed wrapper.

## Related

- [TimeText](./time-text.md)
