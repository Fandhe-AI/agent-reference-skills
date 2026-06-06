# Core

| Name | Description | Path |
|------|-------------|------|
| BufferAttribute | Stores typed vertex attribute data (positions, normals, UVs, etc.) for GPU-efficient geometry | [BufferAttribute.md](./BufferAttribute.md) |
| BufferGeometry | Stores geometry as typed buffers; base for all mesh/line/point geometry | [BufferGeometry.md](./BufferGeometry.md) |
| Clock | Tracks elapsed time and per-frame delta for animations | [Clock.md](./Clock.md) |
| EventDispatcher | Base event system; extended by most Three.js classes | [EventDispatcher.md](./EventDispatcher.md) |
| GLBufferAttribute | Wraps a raw WebGL VBO directly; for GPGPU workflows (WebGLRenderer only) | [GLBufferAttribute.md](./GLBufferAttribute.md) |
| InstancedBufferAttribute | Per-instance BufferAttribute for instanced rendering | [InstancedBufferAttribute.md](./InstancedBufferAttribute.md) |
| InstancedBufferGeometry | BufferGeometry variant for instanced rendering | [InstancedBufferGeometry.md](./InstancedBufferGeometry.md) |
| InstancedInterleavedBuffer | Instanced variant of InterleavedBuffer | [InstancedInterleavedBuffer.md](./InstancedInterleavedBuffer.md) |
| InterleavedBuffer | Stores multiple vertex attributes in a single typed array (interleaved layout) | [InterleavedBuffer.md](./InterleavedBuffer.md) |
| InterleavedBufferAttribute | Exposes a named attribute slice from an InterleavedBuffer | [InterleavedBufferAttribute.md](./InterleavedBufferAttribute.md) |
| Layers | Bitmask-based layer system controlling visibility and raycasting | [Layers.md](./Layers.md) |
| Object3D | Base class for all scene objects; position, rotation, scale, hierarchy | [Object3D.md](./Object3D.md) |
| Raycaster | Casts a ray into the scene for mouse picking and intersection tests | [Raycaster.md](./Raycaster.md) |
| RenderTarget | Off-screen render buffer whose texture can be used in subsequent passes | [RenderTarget.md](./RenderTarget.md) |
| RenderTarget3D | RenderTarget backed by a Data3DTexture for volumetric rendering | [RenderTarget3D.md](./RenderTarget3D.md) |
| Timer | Improved Clock with stable per-frame delta and Page Visibility API support | [Timer.md](./Timer.md) |
| TypedBufferAttributes | Typed convenience subclasses of BufferAttribute (Float32, Uint16, etc.) | [TypedBufferAttributes.md](./TypedBufferAttributes.md) |
| Uniform | Single shader uniform value for use with ShaderMaterial | [Uniform.md](./Uniform.md) |
| UniformsGroup | Manages multiple uniforms as a single GPU Uniform Buffer Object (UBO) | [UniformsGroup.md](./UniformsGroup.md) |
