# AnnotatedString / buildAnnotatedString

A string annotated with character-level (`SpanStyle`) and paragraph-level (`ParagraphStyle`) style ranges, plus optional link/TTS/string annotations. `buildAnnotatedString` is the type-safe DSL builder used to construct one.

## Signature / Usage

```kotlin
public constructor(
    text: String,
    spanStyles: List<AnnotatedString.Range<SpanStyle>> = listOf(),
    paragraphStyles: List<AnnotatedString.Range<ParagraphStyle>> = listOf(),
)

public inline fun buildAnnotatedString(builder: AnnotatedString.Builder.() -> Unit): AnnotatedString
```

```kotlin
Text(
    buildAnnotatedString {
        withStyle(SpanStyle(color = Color.Blue)) { append("H") }
        append("ello ")
        withStyle(SpanStyle(fontWeight = FontWeight.Bold, color = Color.Red)) { append("W") }
        append("orld")
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `String` | — | Raw string content. |
| `spanStyles` | `List<Range<SpanStyle>>` | `listOf()` | Character-level styles applied to `[start, end)` ranges; overlapping ranges are merged. |
| `paragraphStyles` | `List<Range<ParagraphStyle>>` | `listOf()` | Paragraph-level styles; ranges must not overlap or partially intersect, or an `IllegalArgumentException` is thrown. |

## Notes

- Package: `androidx.compose.ui.text`.
- `Builder` key methods: `append(text)`, `withStyle(style, block)` (applies then auto-pops), `pushStyle(style): Int` / `pop()` / `pop(index)` for manual lifecycle control.
- `AnnotatedString.fromHtml(...)` parses a subset of HTML (e.g. `<b>`, `<a href>`) into an `AnnotatedString`, useful for rendering links with `TextLinkStyles`.

## Related

- [SpanStyle](./spanstyle.md)
- [ParagraphStyle](./paragraphstyle.md)
- Text — owned by the `android-compose-components` skill (`references/feedback/text.md`)
