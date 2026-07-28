# Text

High-level element that displays text and provides semantics/accessibility information. Accepts either a plain `String` or an `AnnotatedString`, with the color supplied either as a static `Color` or a `ColorProducer` for deferred/animated tinting.

## Signature / Usage

```kotlin
@Composable
fun Text(
    text: String,
    modifier: Modifier = Modifier,
    color: Color = Color.Unspecified,
    fontSize: TextUnit = TextUnit.Unspecified,
    fontStyle: FontStyle? = null,
    fontWeight: FontWeight? = null,
    fontFamily: FontFamily? = null,
    letterSpacing: TextUnit = TextUnit.Unspecified,
    textDecoration: TextDecoration? = null,
    textAlign: TextAlign? = null,
    lineHeight: TextUnit = TextUnit.Unspecified,
    overflow: TextOverflow = TextOverflow.Clip,
    softWrap: Boolean = true,
    maxLines: Int = Int.MAX_VALUE,
    minLines: Int = 1,
    onTextLayout: ((TextLayoutResult) -> Unit)? = null,
    style: TextStyle = LocalTextStyle.current,
)
```

```kotlin
Text("Filled")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `String` / `AnnotatedString` | — | Text to display; overloads exist for both types. |
| `modifier` | `Modifier` | `Modifier` | Applied to this text. |
| `color` | `Color` / `ColorProducer` | `Color.Unspecified` | Text color; overrides `style`'s color if specified. |
| `fontSize` | `TextUnit` | `TextUnit.Unspecified` | Size of glyphs. |
| `fontStyle` | `FontStyle?` | `null` | E.g. italic. |
| `fontWeight` | `FontWeight?` | `null` | Boldness of the font. |
| `fontFamily` | `FontFamily?` | `null` | Font family to use. |
| `letterSpacing` | `TextUnit` | `TextUnit.Unspecified` | Spacing between letters. |
| `textDecoration` | `TextDecoration?` | `null` | E.g. underline, line-through. |
| `textAlign` | `TextAlign?` | `null` | Alignment of text within its container. |
| `lineHeight` | `TextUnit` | `TextUnit.Unspecified` | Line height for the paragraph. |
| `overflow` | `TextOverflow` | `TextOverflow.Clip` | How overflowing text is handled. |
| `softWrap` | `Boolean` | `true` | Whether the text should break at soft line breaks. |
| `maxLines` | `Int` | `Int.MAX_VALUE` | Maximum number of lines. |
| `minLines` | `Int` | `1` | Minimum number of lines. |
| `onTextLayout` | `((TextLayoutResult) -> Unit)?` | `null` | Callback executed when a new text layout is calculated. |
| `style` | `TextStyle` | `Local­TextStyle.current` | Style configuration such as color, font, line height, and typography. |

## Notes

- The `AnnotatedString` overloads additionally accept `inlineContent: Map<String, InlineTextContent>` for embedding composables inline.
- Default text style comes from `LocalTextStyle`, typically set via `MaterialTheme.typography`.
- Package: `androidx.compose.material3`.

## Related

- [Icon](./icon.md)
- BasicText — owned by the `android-compose-ui` skill (`references/text-input/basictext.md`)
