# Textures

| Name | Description | Path |
|------|-------------|------|
| Texture | Base class for all textures | [Texture.md](./Texture.md) |
| CanvasTexture | Texture from an HTML `<canvas>` element | [CanvasTexture.md](./CanvasTexture.md) |
| CompressedTexture | Texture from pre-compressed data (DXT, ETC, ASTC, etc.) | [CompressedTexture.md](./CompressedTexture.md) |
| CompressedArrayTexture | 2D array texture from compressed data with per-layer updates | [CompressedArrayTexture.md](./CompressedArrayTexture.md) |
| CompressedCubeTexture | Cube map texture from compressed data | [CompressedCubeTexture.md](./CompressedCubeTexture.md) |
| CubeTexture | Cube map texture from six images (skybox, environment map) | [CubeTexture.md](./CubeTexture.md) |
| CubeDepthTexture | Cube depth texture for PointLight shadow maps | [CubeDepthTexture.md](./CubeDepthTexture.md) |
| Data3DTexture | 3D (volumetric) texture from typed array data | [Data3DTexture.md](./Data3DTexture.md) |
| DataArrayTexture | 2D array texture from typed array data with per-layer updates | [DataArrayTexture.md](./DataArrayTexture.md) |
| DataTexture | Texture from raw typed array buffer data | [DataTexture.md](./DataTexture.md) |
| DepthTexture | Depth-only texture for render targets (shadows, post-processing) | [DepthTexture.md](./DepthTexture.md) |
| ExternalTexture | Wraps an externally created WebGL/WebGPU texture | [ExternalTexture.md](./ExternalTexture.md) |
| FramebufferTexture | Captures framebuffer contents via `copyFramebufferToTexture()` | [FramebufferTexture.md](./FramebufferTexture.md) |
| HTMLTexture | Texture from any HTML element with auto-update on repaint | [HTMLTexture.md](./HTMLTexture.md) |
| Source | Decoupled data source shared across multiple textures | [Source.md](./Source.md) |
| VideoTexture | Texture from an HTML `<video>` element with automatic frame updates | [VideoTexture.md](./VideoTexture.md) |
| VideoFrameTexture | Per-frame video texture for use with the WebCodecs API | [VideoFrameTexture.md](./VideoFrameTexture.md) |
