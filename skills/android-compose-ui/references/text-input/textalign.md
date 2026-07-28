# TextAlign / TextOverflow / TextDecoration

Small value/inline classes controlling horizontal alignment, overflow handling, and line decoration for text. Used as fields of `TextStyle`/`ParagraphStyle`/`SpanStyle` or passed directly to `Text`/`BasicText`.

## Signature / Usage

```kotlin
@JvmInline
public value class TextAlign internal constructor(public val value: Int) {
    public companion object {
        public val Left: TextAlign
        public val Right: TextAlign
        public val Center: TextAlign
        public val Justify: TextAlign
        public val Start: TextAlign
        public val End: TextAlign
        public val Unspecified: TextAlign
    }
}

@JvmInline
public value class TextOverflow internal constructor(internal val value: Int) {
    public companion object {
        public val Clip: TextOverflow
        public val Ellipsis: TextOverflow
        public val Visible: TextOverflow
        public val StartEllipsis: TextOverflow
        public val MiddleEllipsis: TextOverflow
    }
}

public class TextDecoration {
    public companion object {
        public val None: TextDecoration
        public val Underline: TextDecoration
        public val LineThrough: TextDecoration
        public fun combine(decorations: List<TextDecoration>): TextDecoration
    }
}
```

```kotlin
Text(
    text = "Long text that may overflow…",
    textAlign = TextAlign.Center,
    overflow = TextOverflow.Ellipsis,
    maxLines = 1,
    style = TextStyle(textDecoration = TextDecoration.combine(
        listOf(TextDecoration.Underline, TextDecoration.LineThrough)
    )),
)
```

## Options / Props

| Name | Values | Description |
|------|--------|-------------|
| `TextAlign` | `Left`, `Right`, `Center`, `Justify`, `Start`, `End`, `Unspecified` | `Start`/`End` map to left/right depending on `LayoutDirection` (LTR vs. RTL); `Justify` stretches lines to fill the container width. |
| `TextOverflow` | `Clip`, `Ellipsis`, `Visible`, `StartEllipsis`, `MiddleEllipsis` | `Visible` lets text render outside its bounds (combine with `heightIn`/`widthIn`). `StartEllipsis`/`MiddleEllipsis` fall back to `Clip` for multiline text on Android. |
| `TextDecoration` | `None`, `Underline`, `LineThrough` | Decorations combine via bitmask; use `TextDecoration.combine(list)` or the `+` operator to apply more than one at once. |

## Notes

- Package: `androidx.compose.ui.text.style`.

## Related

- [TextStyle](./textstyle.md)
- Text — owned by the `android-compose-components` skill (`references/feedback/text.md`)
