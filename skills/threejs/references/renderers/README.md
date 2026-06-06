# Renderers

| Name | Description | Path |
|------|-------------|------|
| WebGLRenderer | Primary WebGL 2 renderer. The most important renderer class — handles rendering, shadow maps, XR, tone mapping, and more. | [WebGLRenderer.md](./WebGLRenderer.md) |
| WebGLRenderTarget | Off-screen render target for rendering to a 2D texture instead of the canvas. | [WebGLRenderTarget.md](./WebGLRenderTarget.md) |
| WebGLCubeRenderTarget | Render target for cube map textures. Used for dynamic environment maps with `CubeCamera`. | [WebGLCubeRenderTarget.md](./WebGLCubeRenderTarget.md) |
| WebGL3DRenderTarget | Render target for 3D (volume) textures (`Data3DTexture`). | [WebGL3DRenderTarget.md](./WebGL3DRenderTarget.md) |
| WebGLArrayRenderTarget | Render target for texture arrays (`DataArrayTexture`, multiple 2D layers). | [WebGLArrayRenderTarget.md](./WebGLArrayRenderTarget.md) |
| WebGPURenderer | Modern renderer targeting WebGPU with automatic WebGL 2 fallback. Supports compute shaders and TSL node materials. | [WebGPURenderer.md](./WebGPURenderer.md) |
| WebXRManager | XR session manager accessed via `renderer.xr`. Manages controllers, cameras, and frame rendering for VR/AR. | [WebXRManager.md](./WebXRManager.md) |
| WebXRDepthSensing | Provides depth texture access from the WebXR Depth Sensing API for AR depth occlusion. | [WebXRDepthSensing.md](./WebXRDepthSensing.md) |
