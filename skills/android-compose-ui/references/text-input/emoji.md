# Emoji display (EmojiSupportMatch)

Compose (BOM March 2023 / Compose UI 1.4+) resolves modern, variable-width emoji automatically in `Text`, `TextField`, `BasicText`, and `BasicTextField`, including on devices as old as API 21, without any code changes. `EmojiSupportMatch` on `PlatformTextStyle` opts a composable out of that default resolution when a custom emoji solution is used instead.

## Signature / Usage

```kotlin
Text(
    text = "Hello $EMOJI_TEXT",
    style = TextStyle(
        platformStyle = PlatformTextStyle(
            emojiSupportMatch = EmojiSupportMatch.None,
        ),
    ),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `emojiSupportMatch` | `EmojiSupportMatch` | `Default` | On `PlatformTextStyle`. `Default` lets Compose resolve modern emoji glyphs automatically; `None` disables it so a custom emoji-rendering solution can take over. |

## Notes

- Package: `androidx.compose.ui.text` (`PlatformTextStyle`), `androidx.compose.ui.text.EmojiSupportMatch`.
- Android 11 (API 30) and lower cannot update their system emoji font; Compose's built-in support backfills modern emoji glyphs on those versions without requiring `AppCompatActivity`.
- Composables built on `BasicText`/`BasicTextField` inherit automatic emoji support for free; only composables opting out need `emojiSupportMatch`.
- Interop with Views: extending `ComponentActivity` (not `AppCompatActivity`) needs the Emoji2 library's `EmojiTextView` for non-Compose text views to get the same support; `AppCompatActivity` gets it via `AppCompatTextView`/standard `TextView`.
- Best tested on a real device running API 30 or lower, since emulators and newer OS versions may already ship an updated emoji font that masks regressions.

## Related

- [TextStyle](./textstyle.md)
