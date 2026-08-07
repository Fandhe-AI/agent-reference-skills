# WGSL Shaders

Rive lets scripts write custom WGSL programs that execute on the GPU and render to a GPU canvas within a Rive file, for effects and procedural graphics beyond standard vector rendering.

## Signature / Usage

1. Create a new script, select **Shader** as its type, name it (e.g. `BasicShader`)
2. Write WGSL vertex/fragment entry points
3. From a Node/Layout script: `context:shader()` to fetch a compiled shader asset by name, `context:gpuCanvas()` to create an offscreen `GPUCanvas` render target, build a `GPUPipeline` combining shader and render settings, execute in `drawCanvas`, and composite results in `draw`

## Notes

- File-level shader-language generation targets: Metal (MSL), GLSL ES 300, HLSL, SPIR-V — enable the ones matching your deployment runtimes.
- Shaders are Early Access; runtime support varies across experimental builds.
- This scripting-GPU surface (`GPUCanvas`, `GPUPipeline`, `Shader`) is a Rive-scripting-internal Luau API, distinct from platform GPU APIs covered in `apple-graphics`, `nvidia-cuda`, `windows-graphics-media`.

## Related

- [gpu-core.md](./gpu-core.md)
- [gpu-pipeline-state.md](./gpu-pipeline-state.md)
