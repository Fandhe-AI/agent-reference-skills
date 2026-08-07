# Info

A renderer module that provides statistical information about GPU memory and the rendering process. Accessed via `renderer.info`. Useful for debugging and monitoring performance.

## Signature / Usage

```js
console.log(renderer.info.render.calls, renderer.info.render.triangles);
renderer.info.autoReset = false; // for multi-pass frames
renderer.info.reset();           // reset manually
```

## Properties

| Name | Type | Description |
|------|------|-------------|
| `autoReset` | boolean | Whether frame metrics reset automatically (default `true`). Set `false` for custom/multi-pass animation loops. |
| `calls` | number (readonly) | Total render calls since app start (default `0`). |
| `frame` | number (readonly) | Current frame ID managed by `NodeFrame` (default `0`). |
| `compute` | Object (readonly) | Compute metrics: `calls`, `frameCalls`, `timestamp`. |
| `memory` | Object (readonly) | Memory metrics: `attributes`, `attributesSize`, `geometries`, `indexAttributes`, `textures`, `texturesSize`, `programs`, `renderTargets`, `uniformBuffers`, `storageAttributes`, `indirectStorageAttributes`, `readbackBuffers`, `total`. |
| `render` | Object (readonly) | Render metrics: `calls`, `frameCalls`, `drawCalls`, `triangles`, `points`, `lines`, `timestamp`. |

## Methods

| Method | Description |
|--------|-------------|
| `createAttribute(attribute)` | Track regular attribute memory. |
| `createTexture(texture)` | Track texture memory. |
| `createProgram(program)` | Track program memory. |
| `createUniformBuffer(uniformBuffer)` | Track uniform buffer memory. |
| `createStorageAttribute(attribute)` | Track storage attribute memory. |
| `createReadbackBuffer(readbackBuffer)` | Track readback buffer memory. |
| `destroyAttribute(attribute)` | Remove attribute memory tracking. |
| `destroyTexture(texture)` | Remove texture memory tracking. |
| `destroyProgram(program)` | Remove program memory tracking. |
| `destroyUniformBuffer(uniformBuffer)` | Remove uniform buffer tracking. |
| `destroyReadbackBuffer(readbackBuffer)` | Remove readback buffer tracking. |
| `reset()` | Reset frame-related metrics. |
| `dispose()` | Complete reset of the object. |
| `update(object, count, instanceCount)` | Update metrics per draw call. |

## Notes

- Exposed as `renderer.info` on both `WebGLRenderer` and the node-based `Renderer`/`WebGPURenderer`.
- For multi-pass rendering pipelines, set `autoReset = false` and call `reset()` once per logical frame to avoid stats being cleared between passes.

## Related

- [WebGLRenderer](./WebGLRenderer.md)
- [Renderer](./Renderer.md)
