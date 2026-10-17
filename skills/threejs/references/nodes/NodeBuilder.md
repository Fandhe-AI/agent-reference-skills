# NodeBuilder

Abstract base class for builders that generate a shader program (WGSL/GLSL) from a 3D object and its node material definition. Manages the build stages, code generation, and stage-specific state.

## Signature / Usage

```js
class NodeBuilder {
	constructor( object, renderer, parser ) {}
}
```

Not instantiated directly — platform-specific subclasses (e.g. `WebGLNodeBuilder`, `WebGPUNodeBuilder`) are used internally by the renderer.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `object` | `Object3D` | The 3D object being built |
| `renderer` | `Renderer` | The current renderer |
| `material` | `Material` | The object's material |
| `geometry` | `BufferGeometry` | The object's geometry |
| `camera` / `scene` | `Camera` / `Scene` | Default `null` |
| `buildStage` | `'setup' \| 'analyze' \| 'generate'` | Current build stage |
| `shaderStage` | `'vertex' \| 'fragment' \| 'compute' \| 'any'` | Current shader stage |
| `vertexShader` / `fragmentShader` / `computeShader` | `string` | Generated shader source |
| `nodes` / `sequentialNodes` | `Set<Node>` | Nodes being processed |
| `attributes` / `bufferAttributes` | `Array<NodeAttribute>` | Node attributes |
| `uniforms` | `Object` | Node uniforms per shader stage |
| `varyings` | `Array<NodeVarying>` | Node varyings |
| `stack` / `stacks` / `activeStacks` | `StackNode` / `Array<StackNode>` | Current code-block hierarchy |
| `environmentNode` / `fogNode` / `lightsNode` | `Node` | Default `null` |
| `compute` | `ComputeNode` | The compute node, if building for compute. Default `null` |
| `hardwareClipping` | `boolean` | Whether the built material uses hardware clipping. Default `false` |
| `renderPipeline` | `RenderPipeline` | A reference to the render pipeline |

## Methods

| Method | Description |
|--------|-------------|
| `build()` / `buildAsync()` | Run the build process |
| `setShaderStage()` / `getShaderStage()` / `setBuildStage()` / `getBuildStage()` | Stage management |
| `flowNode(node)` / `flowChildNode(node, output)` / `flowStagesNode(node, output)` | Flow a node through the build |
| `addFlowCode(code)` / `addLineFlowCode(code, node)` | Append generated code |
| `addNode(node)` / `addChain(node)` / `removeChain(node)` / `includes(node)` | Node bookkeeping |
| `addStack()` / `removeStack()` / `getActiveStack()` / `getBaseStack()` | Stack (code block) management |
| `getType(type)` / `getTypeLength(type)` / `isVector(type)` / `isMatrix(type)` / `isInteger(type)` | Type system helpers |
| `getAttributes/Uniforms/Varyings/Codes/Vars(shaderStage)` | Abstract; implemented by renderer-specific subclasses |
| `format(snippet, fromType, toType)` | Type-cast a code snippet |
| `generateTextureSize(texture, textureProperty, levelSnippet)` | Abstract. Generates a texture size shader string for the given texture data |
| `getOutputType(index)` | Returns the type of the color output based on the renderer's render target |
| `hasWriteUsage(node)` | Returns whether the given node has been written to in any shader stage |
| `isContextAssign()` | Returns whether the builder is currently in an assignment context |
| `isReservedKeyword(name)` | Returns whether the name is a reserved keyword of the backend's shading language; backends override it |
| `getBufferAttributeFromNode(node, type, name)` | Returns the buffer attribute for the given `BufferAttributeNode` (r186 adds the `name` parameter) |

## Notes

- Abstract class; do not instantiate directly.
- Build proceeds through three sequential stages: `setup` (node discovery), `analyze` (dependency analysis), `generate` (final code emission).
- `NodeCache` is used internally to avoid rebuilding equivalent nodes.

## Related

- [Node](./Node.md)
- [FunctionNode](./FunctionNode.md)
