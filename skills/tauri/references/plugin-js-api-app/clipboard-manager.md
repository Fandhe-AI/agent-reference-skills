---
source: https://v2.tauri.app/reference/javascript/clipboard-manager/
---

# @tauri-apps/plugin-clipboard-manager

Read and write to the system clipboard.

## Signature / Usage

```typescript
import { writeText, readText } from '@tauri-apps/plugin-clipboard-manager';
await writeText('Tauri is awesome!');
console.assert((await readText()) === 'Tauri is awesome!');
```

```typescript
function writeText(text: string, opts?: { label?: string }): Promise<void>  // since 2.0.0
function readText(): Promise<string>                                         // since 2.0.0
function writeImage(image: string | Image | Uint8Array | ArrayBuffer | number[]): Promise<void>  // since 2.0.0
function readImage(): Promise<Image>                                         // since 2.0.0
function writeHtml(html: string, altText?: string): Promise<void>            // since 2.0.0
function clear(): Promise<void>                                              // since 2.0.0
function writeSecret(text: string): Promise<void>                            // since 2.5.0
```

`Image` is imported from `@tauri-apps/api/image`.

## Options / Props

| Function | Parameter | Description |
| --- | --- | --- |
| writeText | `opts.label` | A label describing the copied content. Android only, ignored on other platforms. |
| writeImage | `image` | The image to write, as a file path, PNG / ICO encoded bytes (needs the `image-png` / `image-ico` Cargo features of `tauri`), or an existing `Image`. For raw RGBA pixels create an `Image` with `Image.new(rgba, width, height)` first. |
| writeHtml | `html` | The HTML markup to write. |
| writeHtml | `altText` | The plain text fallback written alongside the HTML, used by targets that cannot render it. |

## Notes

- The source example uses an undefined `assert(value, expected)`; it is rewritten as an equality check with `console.assert`.
- The plugin TSDoc says the bytes are raw RGBA, but `writeImage` passes them through `transformImage`, which maps byte arrays to `JsImage::Bytes` (PNG / ICO); see the image page.
- `writeImage`, `readImage`, `writeHtml`: Android / iOS not supported (`writeImage` / `readImage` per source Platform-specific notes; `writeHtml` likewise).
- `clear`: on Android only supported on SDK 28+; for older releases an empty string is written to the clipboard instead.
- `writeSecret` (since 2.5.0): marks the text so the system does not keep or share it. Windows: excluded from clipboard history and cloud sync. macOS and Linux: clipboard managers are asked to skip it. Android: flagged as sensitive so the clipboard preview hides it. iOS: not synced to other devices.
- HTML can be read only as a string, so there is `readText()` but no `readHtml()`.
- Tauri plugin (Rust core + system WebView). Not Electron's `clipboard` module; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@clipboard-manager-v2.5.0` `plugins/clipboard-manager/guest-js/index.ts`.

```typescript
import { writeHtml } from '@tauri-apps/plugin-clipboard-manager';
await writeHtml('<h1>Tauri is awesome!</h1>', 'plaintext');
```

## Related

- [clipboard plugin](../plugins-app/clipboard.md)
- [image](../js-api/image.md)
