---
source: https://www.electronjs.org/docs/latest/api/structures/shared-texture-handle
---

# Shared texture structures (SharedTexture*, OffscreenSharedTexture)

Structures used by the `sharedTexture` module and by offscreen rendering with shared textures: `SharedTextureHandle`, `SharedTextureImportTextureInfo`, `SharedTextureImported`, `SharedTextureImportedSubtle`, `SharedTextureSubtle`, `SharedTextureSyncToken`, `SharedTextureTransfer` and `OffscreenSharedTexture`.

## Signature / Usage

The original structure pages have no code example; this snippet only reads documented fields.

```js
// transferring between processes via the subtle API
const transfer = imported.subtle.startTransferSharedTexture() // SharedTextureTransfer
const received = sharedTexture.subtle.finishTransferSharedTexture(transfer) // SharedTextureImportedSubtle
const frame = received.getVideoFrame()
```

### SharedTextureHandle Object

* `ntHandle` Buffer (optional) _Windows_ - NT HANDLE holds the shared texture. Note that this NT HANDLE is local to current process. Output textures of `rgba`, `bgra`, `rgbaf16` formats don't have a keyed mutex on the texture handle, but `nv12` format texture handles do have a keyed mutex.
* `ioSurface` Buffer (optional) _macOS_ - IOSurfaceRef holds the shared texture. Note that this IOSurface is local to current process (not global).
* `nativePixmap` Object (optional) _Linux_ - Structure contains planes of shared texture.
  * `planes` Object[] _Linux_ - Each plane's info of the shared texture.
    * `stride` number - The strides and offsets in bytes to be used when accessing the buffers via a memory mapping. One per plane per entry.
    * `offset` number - The strides and offsets in bytes to be used when accessing the buffers via a memory mapping. One per plane per entry.
    * `size` number - Size in bytes of the plane. This is necessary to map the buffers.
    * `fd` number - File descriptor for the underlying memory object (usually dmabuf).
  * `modifier` string _Linux_ - The modifier is retrieved from GBM library and passed to EGL driver.
  * `supportsZeroCopyWebGpuImport` boolean _Linux_ - Indicates whether supports zero copy import to WebGPU.

### SharedTextureImportTextureInfo Object

* `pixelFormat` string - The pixel format of the texture.
  * `bgra` - 32bpp BGRA (byte-order), 1 plane.
  * `rgba` - 32bpp RGBA (byte-order), 1 plane.
  * `rgbaf16` - Half float RGBA, 1 plane.
  * `nv12` - 12bpp with Y plane followed by a 2x2 interleaved UV plane.
  * `nv16` - 16bpp with Y plane followed by a 2x1 interleaved UV plane.
  * `p010le` - 4:2:0 10-bit YUV (little-endian), Y plane followed by a 2x2 interleaved UV plane.
* `colorSpace` ColorSpace (optional) - The color space of the texture.
* `codedSize` Size - The full dimensions of the shared texture.
* `visibleRect` Rectangle (optional) - A subsection of [0, 0, codedSize.width, codedSize.height]. In common cases, it is the full section area.
* `timestamp` number (optional) - A timestamp in microseconds that will be reflected to `VideoFrame`.
* `handle` SharedTextureHandle - The shared texture handle.

### SharedTextureImported Object

* `textureId` string - The unique identifier of the imported shared texture.
* `getVideoFrame` Function<VideoFrame> - Create a `VideoFrame` that uses the imported shared texture in the current process. You can call `VideoFrame.close()` once you've finished using the object. The underlying resources will wait for GPU finish internally.
* `release` Function - Release this object's reference of the imported shared texture. The underlying resource will be alive until every reference is released.
* `subtle` SharedTextureImportedSubtle - Provides subtle APIs to interact with the imported shared texture for advanced users.

### SharedTextureImportedSubtle Object

* `getVideoFrame` Function<VideoFrame> - Create a `VideoFrame` that uses the imported shared texture in the current process. You can call `VideoFrame.close()` once you've finished using the object. The underlying resources will wait for GPU finish internally.
* `release` Function - Release the resources. If you transferred and get multiple `SharedTextureImported` objects, you have to `release` every one of them. The resource on the GPU process will be destroyed when the last one is released.
  * `callback` Function (optional) - Callback when the GPU command buffer finishes using this shared texture. It provides a precise event to safely release dependent resources. For example, if this object is created by `finishTransferSharedTexture`, you can use this callback to safely release the original one that called `startTransferSharedTexture` in other processes. You can also release the source shared texture that was used to `importSharedTexture` safely.
* `startTransferSharedTexture` Function<SharedTextureTransfer> - Create a `SharedTextureTransfer` that can be serialized and transferred to other processes.
* `getFrameCreationSyncToken` Function<SharedTextureSyncToken> - This method is for advanced users. If used, it is typically called after `finishTransferSharedTexture`, and should be passed to the object which was called `startTransferSharedTexture` to prevent the source object release the underlying resource before the target object actually acquire the reference at gpu process asyncly.
* `setReleaseSyncToken` Function - This method is for advanced users. If used, this object's underlying resource will not be released until the set sync token is fulfilled at gpu process. By using sync tokens, users are not required to use release callbacks for lifetime management.
  * `syncToken` SharedTextureSyncToken - The sync token to set.

### SharedTextureSubtle Object

* `importSharedTexture` Function<SharedTextureImportedSubtle> - Imports the shared texture from the given options. Returns the imported shared texture.
  * `textureInfo` SharedTextureImportTextureInfo - The information of shared texture to import.
* `finishTransferSharedTexture` Function<SharedTextureImportedSubtle> - Finishes the transfer of the shared texture and gets the transferred shared texture. Returns the imported shared texture from the transfer object.
  * `transfer` SharedTextureTransfer - The transfer object of the shared texture.

### SharedTextureSyncToken Object

* `syncToken` string - The opaque data for sync token.

### SharedTextureTransfer Object

* `transfer` string _Readonly_ - The opaque transfer data of the shared texture. This can be transferred across Electron processes.
* `syncToken` string _Readonly_ - The opaque sync token data for frame creation.
* `pixelFormat` string _Readonly_ - The pixel format of the transferring texture.
* `codedSize` Size _Readonly_ - The full dimensions of the shared texture.
* `visibleRect` Rectangle _Readonly_ - A subsection of [0, 0, codedSize.width(), codedSize.height()]. In common cases, it is the full section area.
* `timestamp` number _Readonly_ - A timestamp in microseconds that will be reflected to `VideoFrame`.

Use `sharedTexture.subtle.finishTransferSharedTexture` to get `SharedTextureImportedSubtle` back.

### OffscreenSharedTexture Object

* `textureInfo` Object - The shared texture info.
  * `widgetType` string - The widget type of the texture. Can be `popup` or `frame`.
  * `pixelFormat` string - The pixel format of the texture.
    * `rgba` - The texture format is 8-bit unorm RGBA.
    * `bgra` - The texture format is 8-bit unorm BGRA.
    * `rgbaf16` - The texture format is 16-bit float RGBA.
  * `codedSize` Size - The full dimensions of the video frame.
  * `colorSpace` ColorSpace - The color space of the video frame.
  * `visibleRect` Rectangle - A subsection of [0, 0, codedSize.width, codedSize.height]. In OSR case, it is expected to have the full section area.
  * `contentRect` Rectangle - The region of the video frame that capturer would like to populate. In OSR case, it is the same with `dirtyRect` that needs to be painted.
  * `timestamp` number - The time in microseconds since the capture start.
  * `metadata` Object - Extra metadata. See comments in src\media\base\video_frame_metadata.h for accurate details.
    * `captureUpdateRect` Rectangle (optional) - Updated area of frame, can be considered as the `dirty` area.
    * `regionCaptureRect` Rectangle (optional) - May reflect the frame's contents origin if region capture is used internally.
    * `sourceSize` Rectangle (optional) - Full size of the source frame.
    * `frameCount` number (optional) - The increasing count of captured frame. May contain gaps if frames are dropped between two consecutively received frames.
  * `handle` SharedTextureHandle - The shared texture handle data.
* `release` Function - Release the resources. The `texture` cannot be directly passed to another process, users need to maintain texture lifecycles in main process, but it is safe to pass the `textureInfo` to another process. Only a limited number of textures can exist at the same time, so it's important that you call `texture.release()` as soon as you're done with the texture.

## Notes

* Structure pages: https://www.electronjs.org/docs/latest/api/structures/shared-texture-handle , .../shared-texture-import-texture-info , .../shared-texture-imported , .../shared-texture-imported-subtle , .../shared-texture-subtle , .../shared-texture-sync-token , .../shared-texture-transfer , .../offscreen-shared-texture

## Related

* [sharedTexture](./shared-texture.md)
* [nativeImage](./native-image.md)
* [Geometry structures (Display, Point, Rectangle, Size)](./screen-structures.md)
