# SpanStyle

Character-level styling configuration used within an `AnnotatedString` (via `SpanStyle` ranges or `Builder.withStyle`) to style text color, font, background, decoration, and shadow for a sub-range of text.

## Signature / Usage

```kotlin
public constructor(
    color: Color = Color.Unspecified,
    fontSize: TextUnit = TextUnit.Unspecified,
    fontWeight: FontWeight? = null,
    fontStyle: FontStyle? = null,
    fontSynthesis: FontSynthesis? = null,
    fontFamily: FontFamily? = null,
    fontFeatureSettings: String? = null,
    letterSpacing: TextUnit = TextUnit.Unspecified,
    baselineShift: BaselineShift? = null,
    textGeometricTransform: TextGeometricTransform? = null,
    localeList: LocaleList? = null,
    background: Color = Color.Unspecified,
    textDecoration: TextDecoration? = null,
    shadow: Shadow? = null,
    platformStyle: PlatformSpanStyle? = null,
    drawStyle: DrawStyle? = null,
)

// Brush-based overload
public constructor(
    brush: Brush?,
    alpha: Float = Float.NaN,
    /* remaining params identical to the Color-based constructor */
)
```

```kotlin
buildAnnotatedString {
    withStyle(SpanStyle(fontWeight = FontWeight.Bold, color = Color.Red)) {
        append("Bold red")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color` | `Color.Unspecified` | Text color (or `brush`/`alpha` in the brush overload for gradients). |
| `fontSize` | `TextUnit` | `TextUnit.Unspecified` | Glyph size. |
| `fontWeight` | `FontWeight?` | `null` | Typeface thickness. |
| `fontStyle` | `FontStyle?` | `null` | Italic or normal. |
| `fontSynthesis` | `FontSynthesis?` | `null` | Fallback rules for synthesizing bold/italic when missing from `fontFamily`. |
| `fontFamily` | `FontFamily?` | `null` | Font family. |
| `fontFeatureSettings` | `String?` | `null` | CSS-format OpenType feature settings (e.g. `"smcp"`). |
| `letterSpacing` | `TextUnit` | `TextUnit.Unspecified` | Space between letters. |
| `baselineShift` | `BaselineShift?` | `null` | Vertical shift, e.g. for superscript/subscript. |
| `textGeometricTransform` | `TextGeometricTransform?` | `null` | Scale/skew transform. |
| `localeList` | `LocaleList?` | `null` | Locale hints for region-specific glyphs. |
| `background` | `Color` | `Color.Unspecified` | Background color covering the full line height. |
| `textDecoration` | `TextDecoration?` | `null` | Underline / line-through. |
| `shadow` | `Shadow?` | `null` | Shadow effect. |
| `drawStyle` | `DrawStyle?` | `null` | Fill or stroke drawing style. |

## Notes

- Package: `androidx.compose.ui.text`.
- Applies at the character/span level; use `ParagraphStyle` for block-level attributes like alignment and line height.

## Related

- [ParagraphStyle](./paragraphstyle.md)
- [AnnotatedString](./annotatedstring.md)
- [TextStyle](./textstyle.md)
