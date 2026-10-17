---
source: https://www.electronjs.org/docs/latest/api/clipboard
---

# clipboard

Perform copy and paste operations on the system clipboard. Process: Main.

The `clipboard` module is modeled after the W3C Clipboard API: `clipboard.read()` returns a `Promise` that resolves with a list of `ClipboardItem` objects, and `clipboard.write()` accepts an array of `ClipboardItem` instances that map MIME types to Blob payloads.

## Signature / Usage

```js
const { clipboard, ClipboardItem } = require('electron')

async function writeClipboard() {
  await clipboard.write([
    new ClipboardItem({
      'web application/x.my-app-clip': new Blob(['arbitrary payload'])
    })
  ])
}

writeClipboard()
```

In addition to the standard MIME types (`text/plain`, `text/html`, `text/rtf`, `image/png`, `image/jpeg`, …), Electron exposes a small set of custom formats so the clipboard can carry desktop-specific payloads. These follow the W3C custom format proposal, using an `electron` prefix instead of `web` to avoid collisions. The custom formats Electron exposes are:

* `electron application/bookmark` — a URL bookmark. Unlike every other MIME type/custom format, its payload is a ClipboardBookmark object on both the write and read sides rather than a `Blob`, so `getType('electron application/bookmark')` resolves to `{ title: string, url: string }`.
* `electron application/findtext` (_macOS_) — the contents of the active app's find pasteboard.
* `electron application/osclipboard;format="<name>"` — a raw payload for a platform-specific clipboard format. The `<name>` is the platform format (e.g. `HTML Format` on Windows or `public.utf8-plain-text` on macOS). `clipboard.read()` also surfaces any platform clipboard format that has no standard MIME mapping under this custom format, so a raw OS format round-trips through the same string on write and read.

Beyond the well-known MIME types, both `clipboard.read()` and `clipboard.write()` accept arbitrary MIME types including custom formats starting with the `web` prefix (followed by a space, e.g. `web application/x.my-format`) that follow the W3C web custom format proposal.

On Linux there is also a `selection` clipboard. It is exposed via the `clipboard.selection` sub-namespace, which mirrors the top-level `clipboard` interface. The `selection` clipboard operates against the selection clipboard instead of the system clipboard.

It exposes the same surface as the top-level `clipboard` module, but each method targets the selection clipboard rather than the system clipboard. The two clipboards are independent: writing via `clipboard.selection` does not affect the data returned by `clipboard.read()` (and vice versa).

```js
const { clipboard } = require('electron')

async function run() {
  await clipboard.selection.writeText('Example string')
  console.log(await clipboard.selection.readText())
}

run()
```

### Methods

#### `clipboard.readText()`

Returns `Promise<string>` - A promise that resolves with the content of the clipboard as plain text. Modeled after the W3C `navigator.clipboard.readText` API.

```js
const { clipboard } = require('electron')

async function readText() {
  await clipboard.writeText('hello i am a bit of text!')
  const text = await clipboard.readText()
  console.log(text)
  // 'hello i am a bit of text!'
}

readText()
```

#### `clipboard.writeText(text)`

* `text` string

Returns `Promise<void>` - A promise that resolves once the text has been written to the clipboard. Modeled after the W3C `navigator.clipboard.writeText` API.

#### `clipboard.read()`

Returns `Promise<ClipboardItem[]>` - A promise that resolves with an array of ClipboardItem objects containing the clipboard's contents.

```js
const { clipboard } = require('electron')

async function dumpClipboard() {
  const items = await clipboard.read()
  for (const item of items) {
    for (const type of item.types) {
      const blob = await item.getType(type)
      console.log(type, blob)
    }
  }
}

dumpClipboard()
```

#### `clipboard.write(data)`

* `data` ClipboardItem[] - An array of `ClipboardItem` instances constructed via `new ClipboardItem({ [mime]: payload })`.

Returns `Promise<void>` - Resolves once the data has been written to the clipboard. All entries supplied in a single `write()` call are committed to the system clipboard atomically.

```js
const { clipboard, ClipboardItem, nativeImage } = require('electron')

const png = nativeImage.createFromPath('/path/to/icon.png').toPNG()

async function writeClipboard() {
  await clipboard.write([
    new ClipboardItem({
      'text/plain': 'hello',
      'text/html': '<b>hello</b>',
      'image/png': new Blob([png], { type: 'image/png' }),
      'electron application/bookmark': {
        title: 'Electron',
        url: 'https://electronjs.org'
      }
    })
  ])
}

writeClipboard()
```

#### `clipboard.has(mimetype)`

* `mimetype` string - MIME type to check

Returns `Promise<boolean>` - A promise that resolves with `true` if the clipboard contains data of the specified `mimetype`, otherwise `false`. To check for a raw format, eg `public/utf8-plain-text`, use the `electron application/osclipboard` custom format (`electron application/osclipboard;format="public/utf8-plain-text"`).

```js
const { clipboard } = require('electron')

async function check() {
  const hasFormat = await clipboard.has('text/html')
  console.log(hasFormat)
  // 'true' or 'false'
  const rawFormat = 'electron application/osclipboard;format="public/utf8-plain-text"'
  const hasRawFormat = await clipboard.has(rawFormat)
}

check()
```

#### `clipboard.clear()`

Clears the clipboard content.

### Properties

#### `clipboard.selection` _Linux_ _Readonly_

A `Clipboard` property — a `Clipboard` object on Linux that operates against the selection clipboard instead of the system clipboard, and `undefined` on all other platforms. It exposes the same `read`, `write`, `readText`, `writeText`, `has`, and `clear` methods as the top-level `clipboard` module.

### ClipboardBookmark Object

* `title` string - The title of the bookmark.
* `url` string - The URL of the bookmark.

A `ClipboardBookmark` is the payload used by the `electron application/bookmark` clipboard custom format. It is passed to `clipboard.write()` as a `ClipboardItem` `data` value, and is what `getType('electron application/bookmark')` resolves to when reading via `clipboard.read()`.

## Notes

* Removed (v44): the clipboard module is no longer exposed to renderer processes (previously deprecated; see the breaking-changes category, "Removed: clipboard module is no longer available in the renderer process"). Renderers should use navigator.clipboard, or expose only the necessary helpers from a preload script via contextBridge without exposing the clipboard API to untrusted content.
* The `selection` clipboard does not support the W3C web custom format.
* Structure page: https://www.electronjs.org/docs/latest/api/structures/clipboard-bookmark
* Distinction: this is the Electron main-process module for the OS clipboard. Web UI components are in ark-ui / chakra-ui / fandhe-frontend; native clipboard APIs of other platforms are in apple-appkit, windows-winui-controls and android-compose-components.

## Related

* [ClipboardItem](./clipboard-item.md)
* [nativeImage](./native-image.md)
