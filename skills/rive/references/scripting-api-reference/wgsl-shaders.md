# WGSL Shaders

Rive lets scripts write custom WGSL programs that execute on the GPU and render to a GPU canvas within a Rive file, for effects and procedural graphics beyond standard vector rendering.

## Signature / Usage

1. Create a new script, select **Shader** as its type, name it (e.g. `BasicShader`)
2. Write WGSL vertex/fragment entry points
3. From a Node/Layout script: `context:shader()` to fetch a compiled shader asset by name, `context:gpuCanvas()` to create an offscreen `GPUCanvas` render target, build a `GPUPipeline` combining shader and render settings, execute in `drawCanvas`, and composite results in `draw`

### Textures

Define a texture and sampler in WGSL, sample with `textureSample`, and on the script side add a `GPUTextureView` and `GPUSampler` to a `GPUBindGroup` whose slots match the declared `@binding` values (UVs run `0` to `1` on each axis):

```wgsl
@group(0) @binding(1)
var srcTexture: texture_2d<f32>;

@group(0) @binding(2)
var srcSampler: sampler;

let color = textureSample(srcTexture, srcSampler, in.uv);
```

### Using an Artboard as a texture

Shaders sample textures, not artboards directly. Render the artboard to an offscreen canvas, then call `srcCanvas.image:view()` to obtain a `GPUTextureView` and add it to the shader's `GPUBindGroup`. Redraw the artboard to the canvas as it changes to keep the texture up to date.

```lua
local srcRenderer = srcCanvas:beginFrame({
  clearColor = Color.rgba(0, 0, 0, 0),
})

instance:draw(srcRenderer)
srcCanvas:endFrame()
```

### Shader targets

Shaders are authored in WGSL. On export, Rive compiles each shader for the selected targets and includes those variants in the `.riv`; the original WGSL source is not included. With nothing selected in the editor, the Inspector shows file-level **Shader Targets**: Metal (MSL), GLSL ES 300, WGSL, HLSL, SPIR-V. The WebGPU backend uses WGSL directly. If a target is not selected, the shader is not included for that backend and will not load when the file runs on it.

### WGSL support

Standard WGSL with restrictions so shaders work across backends. Vertex and fragment shaders are supported, with up to four bind groups (`@group` / `@binding` with `GPUBindGroup`, `GPUBuffer`, `GPUSampler`, `GPUTextureView`). Compute shaders and `override` declarations are not supported. Also unavailable: 64-bit float and integer types, push constants, subgroup operations, and non-uniform resource indexing.

## Notes

- File-level shader-language generation targets: Metal (MSL), GLSL ES 300, HLSL, SPIR-V — enable the ones matching your deployment runtimes.
- Shaders are Early Access; runtime support varies across experimental builds.
- This scripting-GPU surface (`GPUCanvas`, `GPUPipeline`, `Shader`) is a Rive-scripting-internal Luau API, distinct from platform GPU APIs covered in `apple-graphics`, `nvidia-cuda`, `windows-graphics-media`.

## Related

- [gpu-core.md](./gpu-core.md)
- [gpu-pipeline-state.md](./gpu-pipeline-state.md)
