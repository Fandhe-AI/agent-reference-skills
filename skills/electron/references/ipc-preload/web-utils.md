---
source: https://www.electronjs.org/docs/latest/api/web-utils
---

# webUtils

A utility layer to interact with Web API objects (Files, Blobs, etc.). Process: Renderer.

## Signature / Usage

```js
// Renderer:
const file = document.querySelector('input[type=file]').files[0]
electronApi.doSomethingWithFile(file)

// Preload script:
const { contextBridge, webUtils } = require('electron')

contextBridge.exposeInMainWorld('electronApi', {
  doSomethingWithFile(file) {
    const path = webUtils.getPathForFile(file)
    // Do something with the path, e.g., send it over IPC to the main process.
    // It's best not to expose the full file path to the web content if possible.
  }
})
```

## Methods

| Method | Params | Description |
| --- | --- | --- |
| `webUtils.getPathForFile(file)` | `file` File (a web File object) | Returns `string`, the file system path the `File` points to. Throws if the argument is not a `File`; returns an empty string if the File was constructed in JS and is not backed by a file on disk. |

## Notes

- Supersedes the previous augmentation of `File` with a `path` property. Before (renderer): `document.querySelector('input[type=file]').files[0].path`.
- With context isolation enabled, call this from the preload script and expose it with `contextBridge`.

## Related

- [contextBridge](./context-bridge.md)
- [Context Isolation](./context-isolation.md)
