# LocalClipboard / Clipboard / ClipEntry

`LocalClipboard` is the modern CompositionLocal for reading and writing the platform clipboard from Compose. It exposes a `Clipboard` interface with suspend functions (`getClipEntry()`, `setClipEntry()`) that operate on a `ClipEntry` — a wrapper around the platform `ClipData` that can carry rich content (text, images, arbitrary URIs), not just plain text.

## Signature / Usage

```kotlin
interface Clipboard {
    suspend fun getClipEntry(): ClipEntry?
    suspend fun setClipEntry(clipEntry: ClipEntry?)
    val nativeClipboard: NativeClipboard // deprecated, platform-specific escape hatch
}

val LocalClipboard: ProvidableCompositionLocal<Clipboard>
```

```kotlin
val clipboard = LocalClipboard.current
val scope = rememberCoroutineScope()

Button(onClick = {
    scope.launch {
        val clipData = ClipData.newPlainText("plain text", "Hello, clipboard")
        clipboard.setClipEntry(ClipEntry(clipData))
    }
}) {
    Text("Copy")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `getClipEntry()` | `suspend () -> ClipEntry?` | Reads the current clipboard entry; may contain multiple items/types. Returns `null` if the clipboard is empty. |
| `setClipEntry(ClipEntry?)` | `suspend (ClipEntry?) -> Unit` | Writes an entry to the clipboard; passing `null` clears it. |
| `nativeClipboard` | `NativeClipboard` | Deprecated escape hatch to the platform clipboard object; prefer a platform-specific extension instead. |
| `ClipEntry(clipData: ClipData)` | constructor (Android) | Wraps a `android.content.ClipData` so it can travel through the Compose clipboard API; the clipboard holds only one `ClipEntry` at a time. |

## Notes

- Package: `androidx.compose.ui.platform` (`Clipboard`, `LocalClipboard`); `ClipEntry` is declared per-platform (Android: `androidx.compose.ui.platform.ClipEntry(clipData: ClipData)`).
- `LocalClipboard`/`Clipboard` supersede the older, non-suspend `LocalClipboardManager`/`ClipboardManager` API (`ClipboardManager` is deprecated in favor of `LocalClipboard`, which supports suspend functions and richer content).
- The older `ClipboardManager.setText(AnnotatedString)` / `getText()` pair (still used for the plain-text copy button in `SelectionContainer`) remains for simple text-only cases; use `LocalClipboard`/`ClipEntry` for images or other non-text content.
- Reading the clipboard on Android triggers a system notification to the user; prefer checking availability instead of reading full contents when only presence matters.
- Sensitive content (e.g. passwords) can be flagged via `ClipDescription.EXTRA_IS_SENSITIVE` on the underlying `ClipData` so the system omits it from the Android 13+ clipboard preview UI.
- Pasting rich content (images, etc.) into a text field is handled separately via `Modifier.contentReceiver`/`ReceiveContentListener`, not through `Clipboard` directly.

## Related

- [SelectionContainer / DisableSelection](./selectioncontainer.md)
