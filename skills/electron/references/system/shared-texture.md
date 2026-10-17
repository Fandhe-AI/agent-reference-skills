---
source: https://www.electronjs.org/docs/latest/api/shared-texture
---

# sharedTexture

Import shared textures into Electron and converts platform specific handles into `VideoFrame`. Supports all Web rendering systems, and can be transferred across Electron processes. Process: Main, Renderer.

**Note:** Experimental APIs are marked as such and could be removed in the future.

## Signature / Usage

The original page has no code example; this usage only combines the documented signatures below (`textureInfo` and `handle` come from your own native producer).

```js
// main process
const { sharedTexture } = require('electron')

const imported = sharedTexture.importSharedTexture({
  textureInfo, // SharedTextureImportTextureInfo
  allReferencesReleased: () => {
    // safe to free the original texture
  }
})
await sharedTexture.sendSharedTexture({ frame: win.webContents.mainFrame, importedSharedTexture: imported })

// renderer process
sharedTexture.setSharedTextureReceiver(async ({ importedSharedTexture }) => {
  const frame = importedSharedTexture.getVideoFrame()
  // ... use frame, then frame.close()
  importedSharedTexture.release()
})
```

## Methods

### `sharedTexture.importSharedTexture(options)` _Experimental_

* `options` Object - Options for importing shared textures.
  * `textureInfo` SharedTextureImportTextureInfo - The information of the shared texture to import.
  * `allReferencesReleased` Function (optional) - Called when all references in all processes are released. You should keep the imported texture valid until this callback is called.

Imports the shared texture from the given options.

> [!NOTE]
> This method is only available in the main process.

Returns `SharedTextureImported` - The imported shared texture.

### `sharedTexture.sendSharedTexture(options, ...args)` _Experimental_

* `options` Object - Options for sending shared texture.
  * `frame` WebFrameMain - The target frame to transfer the shared texture to. For `WebContents`, you can pass `webContents.mainFrame`. If you provide a `webFrameMain` that is not a main frame, you'll need to enable `webPreferences.nodeIntegrationInSubFrames` for this, since this feature requires IPC between main and the frame.
  * `importedSharedTexture` SharedTextureImported - The imported shared texture.
* `...args` any[] - Additional arguments to pass to the renderer process.

Send the imported shared texture to a renderer process. You must register a receiver at renderer process before calling this method. This method has a 1000ms timeout. Ensure the receiver is set and the renderer process is alive before calling this method.

> [!NOTE]
> This method is only available in the main process.

Returns `Promise<void>` - Resolves when the transfer is complete.

### `sharedTexture.setSharedTextureReceiver(callback)` _Experimental_

* `callback` Function<Promise<void>> - The function to receive the imported shared texture.
  * `receivedSharedTextureData` Object - The data received from the main process.
    * `importedSharedTexture` SharedTextureImported - The imported shared texture.
  * `...args` any[] - Additional arguments passed from the main process.

Set a callback to receive imported shared textures from the main process.

> [!NOTE]
> This method is only available in the renderer process.

## Properties

### `sharedTexture.subtle` _Experimental_

A `SharedTextureSubtle` property, provides subtle APIs for interacting with shared texture for advanced users.

## Notes

* All methods and the `subtle` property are marked _Experimental_ and could be removed in the future. See the experimental-apis page in getting-started.
* Distinction: GPU texture sharing between Electron processes and native producers via `VideoFrame`; general GPU compute and rendering APIs are in nvidia-cuda, apple-graphics and windows-graphics-media.

## Related

* [Shared texture structures](./shared-texture-structures.md)
* [desktopCapturer](./desktop-capturer.md)
