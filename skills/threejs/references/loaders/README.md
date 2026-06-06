# Loaders (Core)

Core loader classes included in the main `three` package.

| Name | Description | Path |
|------|-------------|------|
| Loader | Abstract base class for all loaders | [Loader.md](./Loader.md) |
| LoadingManager | Tracks multiple concurrent loads; fires callbacks on completion | [LoadingManager.md](./LoadingManager.md) |
| AnimationLoader | Loads animation clips from JSON | [AnimationLoader.md](./AnimationLoader.md) |
| AudioLoader | Loads `AudioBuffer` from audio files | [AudioLoader.md](./AudioLoader.md) |
| BufferGeometryLoader | Loads `BufferGeometry` from JSON | [BufferGeometryLoader.md](./BufferGeometryLoader.md) |
| Cache | Global in-memory cache for `FileLoader` responses | [Cache.md](./Cache.md) |
| CompressedTextureLoader | Abstract base for compressed GPU texture loaders (S3TC, ASTC, ETC) | [CompressedTextureLoader.md](./CompressedTextureLoader.md) |
| CubeTextureLoader | Loads a `CubeTexture` from six separate images | [CubeTextureLoader.md](./CubeTextureLoader.md) |
| DataTextureLoader | Abstract base for binary image format loaders (EXR, HDR, TGA) | [DataTextureLoader.md](./DataTextureLoader.md) |
| FileLoader | Low-level Fetch API loader; used internally by most other loaders | [FileLoader.md](./FileLoader.md) |
| ImageBitmapLoader | Loads images as `ImageBitmap` for efficient GPU upload | [ImageBitmapLoader.md](./ImageBitmapLoader.md) |
| ImageLoader | Loads images via HTML `Image` element | [ImageLoader.md](./ImageLoader.md) |
| MaterialLoader | Loads `Material` from Three.js JSON format | [MaterialLoader.md](./MaterialLoader.md) |
| ObjectLoader | Loads full scenes or object graphs from Three.js JSON format | [ObjectLoader.md](./ObjectLoader.md) |
| TextureLoader | Loads a `Texture` from standard image files (JPEG, PNG, etc.) | [TextureLoader.md](./TextureLoader.md) |
