# ParagraphStyle

Paragraph-level styling configuration used within an `AnnotatedString` to style alignment, direction, line height, and indentation for an entire paragraph range.

## Signature / Usage

```kotlin
public class ParagraphStyle(
    public val textAlign: TextAlign = TextAlign.Unspecified,
    public val textDirection: TextDirection = TextDirection.Unspecified,
    public val lineHeight: TextUnit = TextUnit.Unspecified,
    public val textIndent: TextIndent? = null,
    public val platformStyle: PlatformParagraphStyle? = null,
    public val lineHeightStyle: LineHeightStyle? = null,
    public val lineBreak: LineBreak = LineBreak.Unspecified,
    public val hyphens: Hyphens = Hyphens.Unspecified,
    public val textMotion: TextMotion? = null,
)
```

```kotlin
buildAnnotatedString {
    withStyle(ParagraphStyle(textAlign = TextAlign.Center)) {
        append("Centered paragraph")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `textAlign` | `TextAlign` | `TextAlign.Unspecified` | Horizontal alignment of the paragraph. |
| `textDirection` | `TextDirection` | `TextDirection.Unspecified` | LTR/RTL resolution. |
| `lineHeight` | `TextUnit` | `TextUnit.Unspecified` | Line height for the paragraph. |
| `textIndent` | `TextIndent?` | `null` | First-line/rest-of-paragraph indentation. |
| `platformStyle` | `PlatformParagraphStyle?` | `null` | Platform-specific paragraph parameters. |
| `lineHeightStyle` | `LineHeightStyle?` | `null` | Controls how extra line height is distributed (alignment/trim). |
| `lineBreak` | `LineBreak` | `LineBreak.Unspecified` | Line-breaking strategy. |
| `hyphens` | `Hyphens` | `Hyphens.Unspecified` | Hyphenation configuration. |
| `textMotion` | `TextMotion?` | `null` | Character placement optimization (static vs. animated text). |

## Notes

- Package: `androidx.compose.ui.text`.
- Paragraph ranges within an `AnnotatedString` must not partially overlap; violating nesting throws `IllegalArgumentException`.

## Related

- [SpanStyle](./spanstyle.md)
- [AnnotatedString](./annotatedstring.md)
- [TextStyle](./textstyle.md)
