# BasicText

Foundation-level composable that displays text with semantics/accessibility information but without Material Design styling (no default color/typography from a theme). Prefer `Text` for themed app UI; use `BasicText` for design systems that need full control.

## Signature / Usage

```kotlin
@Composable
public fun BasicText(
    text: String,
    modifier: Modifier = Modifier,
    style: TextStyle = TextStyle.Default,
    onTextLayout: ((TextLayoutResult) -> Unit)? = null,
    overflow: TextOverflow = TextOverflow.Clip,
    softWrap: Boolean = true,
    maxLines: Int = Int.MAX_VALUE,
    minLines: Int = 1,
    color: ColorProducer? = null,
    autoSize: TextAutoSize? = null,
)
```

```kotlin
BasicText(
    text = "Hello world!",
    style = TextStyle(fontSize = 24.sp),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `String` / `AnnotatedString` | — | Text to display. The `AnnotatedString` overload also accepts `inlineContent: Map<String, InlineTextContent>` for embedded composables. |
| `modifier` | `Modifier` | `Modifier` | Applied to this layout node. |
| `style` | `TextStyle` | `TextStyle.Default` | Style configuration; unlike `Text`, there is no theme-provided default. |
| `onTextLayout` | `((TextLayoutResult) -> Unit)?` | `null` | Callback executed when a new text layout is calculated. |
| `overflow` | `TextOverflow` | `TextOverflow.Clip` | How visual overflow is handled. |
| `softWrap` | `Boolean` | `true` | Whether the text should break at soft line breaks. |
| `maxLines` | `Int` | `Int.MAX_VALUE` | Optional maximum number of lines. |
| `minLines` | `Int` | `1` | Minimum number of lines to occupy. |
| `color` | `ColorProducer?` | `null` | Overrides any color specified in `style`; producer form avoids recomposition for frequently-changing colors. |
| `autoSize` | `TextAutoSize?` | `null` | Automatically shrinks text to fit available space. |

## Notes

- Package: `androidx.compose.foundation.text`.
- Material's `Text` composable wraps `BasicText` and supplies `LocalTextStyle` / `LocalContentColor` from the theme.

## Related

- Text — owned by the `android-compose-components` skill (`references/feedback/text.md`)
- [TextStyle](./textstyle.md)
