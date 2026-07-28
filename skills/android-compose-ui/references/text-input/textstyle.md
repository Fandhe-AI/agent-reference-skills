# TextStyle

Styling configuration for an entire block of text, combining both character-level (`SpanStyle`-equivalent) and paragraph-level (`ParagraphStyle`-equivalent) properties into a single class. Passed to `Text`, `BasicText`, and `BasicTextField` via the `style` parameter.

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
    drawStyle: DrawStyle? = null,
    textAlign: TextAlign = TextAlign.Unspecified,
    textDirection: TextDirection = TextDirection.Unspecified,
    lineHeight: TextUnit = TextUnit.Unspecified,
    textIndent: TextIndent? = null,
    platformStyle: PlatformTextStyle? = null,
    lineHeightStyle: LineHeightStyle? = null,
    lineBreak: LineBreak = LineBreak.Unspecified,
    hyphens: Hyphens = Hyphens.Unspecified,
    textMotion: TextMotion? = null,
)

// Brush-based overload accepts `brush: Brush?, alpha: Float = Float.NaN` instead of `color`
```

```kotlin
Text(
    text = "Hello world!",
    style = TextStyle(
        fontSize = 24.sp,
        fontWeight = FontWeight.Bold,
        textAlign = TextAlign.Center,
        textDecoration = TextDecoration.Underline,
    )
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `Color` | `Color.Unspecified` | Text color (or `brush`/`alpha` in the brush overload for gradients). |
| `fontSize` | `TextUnit` | `TextUnit.Unspecified` | Glyph size; inherits from parent/default if unspecified. |
| `fontWeight` | `FontWeight?` | `null` | Typeface thickness. |
| `fontStyle` | `FontStyle?` | `null` | Italic or normal. |
| `fontFamily` | `FontFamily?` | `null` | Font family for rendering. |
| `letterSpacing` | `TextUnit` | `TextUnit.Unspecified` | Space between letters. |
| `textDecoration` | `TextDecoration?` | `null` | Underline / line-through. |
| `shadow` | `Shadow?` | `null` | Shadow effect. |
| `textAlign` | `TextAlign` | `TextAlign.Unspecified` | Alignment within the lines of the paragraph. |
| `textDirection` | `TextDirection` | `TextDirection.Unspecified` | LTR/RTL resolution. |
| `lineHeight` | `TextUnit` | `TextUnit.Unspecified` | Line height. |
| `textIndent` | `TextIndent?` | `null` | Paragraph indentation. |
| `lineHeightStyle` | `LineHeightStyle?` | `null` | Distribution of extra line height. |
| `lineBreak` | `LineBreak` | `LineBreak.Unspecified` | Line-breaking rules. |
| `hyphens` | `Hyphens` | `Hyphens.Unspecified` | Hyphenation configuration. |
| `textMotion` | `TextMotion?` | `null` | Character placement optimization. |

## Notes

- Package: `androidx.compose.ui.text`.
- Combines the character-level fields found in `SpanStyle` with the paragraph-level fields found in `ParagraphStyle` into one type; `MaterialTheme.typography` provides pre-built `TextStyle`s (`bodyMedium`, `headlineMedium`, etc.).
- Explicit parameters passed directly to `Text`/`BasicText` (e.g. `color`, `fontSize`) override the equivalent field in `style`.

## Related

- [SpanStyle](./spanstyle.md)
- [ParagraphStyle](./paragraphstyle.md)
- Text — owned by the `android-compose-components` skill (`references/feedback/text.md`)
- [FontFamily / Font](./fontfamily.md)
