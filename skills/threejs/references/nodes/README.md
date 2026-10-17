# nodes

| Name | Description | Path |
|------|-------------|------|
| AONode | Contributes ambient occlusion to the scene. Used in NodeMaterial. | [AONode.md](./AONode.md) |
| AtomicFunctionNode | Functions operating on atomic variables. WebGPU only. | [AtomicFunctionNode.md](./AtomicFunctionNode.md) |
| AttributeNode | Base class for shader attributes (per-vertex geometry data). | [AttributeNode.md](./AttributeNode.md) |
| BarrierNode | GPU control barrier synchronizing compute operations. WebGPU only. | [BarrierNode.md](./BarrierNode.md) |
| BufferAttributeNode | Attribute data defined at node level, e.g. from compute shaders. | [BufferAttributeNode.md](./BufferAttributeNode.md) |
| BumpMapNode | Applies bump maps to materials. | [BumpMapNode.md](./BumpMapNode.md) |
| ColorSpaceNode | Converts a color value from one color space to another. | [ColorSpaceNode.md](./ColorSpaceNode.md) |
| ComputeBuiltinNode | Builtin compute values describing the dispatch and device. WebGPU only. | [ComputeBuiltinNode.md](./ComputeBuiltinNode.md) |
| ComputeNode | Compute shader node dispatched via renderer.compute(). | [ComputeNode.md](./ComputeNode.md) |
| ConditionalNode | Logical if/else node, an alternative to If()/Else() via select(). | [ConditionalNode.md](./ConditionalNode.md) |
| ContextNode | Modifies the build context of another node, e.g. overriding getUV(). | [ContextNode.md](./ContextNode.md) |
| CubeTextureNode | Uniform node representing a cube texture. Extends TextureNode. | [CubeTextureNode.md](./CubeTextureNode.md) |
| EnvironmentNode | Image-based lighting (IBL) model using environment maps. | [EnvironmentNode.md](./EnvironmentNode.md) |
| FunctionNode | Native WGSL/GLSL shader function wrapped as a node. | [FunctionNode.md](./FunctionNode.md) |
| LightingModel | Abstract base class for lighting models used by node materials. | [LightingModel.md](./LightingModel.md) |
| LightsNode | Manages scene lighting and the lighting model life cycle. | [LightsNode.md](./LightsNode.md) |
| LoopNode | Loops in TSL with count, range, nested, and while-like forms. | [LoopNode.md](./LoopNode.md) |
| MaterialNode | Node access to material properties, updated automatically. | [MaterialNode.md](./MaterialNode.md) |
| MaterialReferenceNode | Links a material property to a node value. | [MaterialReferenceNode.md](./MaterialReferenceNode.md) |
| MathNode | Shader math methods such as sin, dot, and mix. Extends TempNode. | [MathNode.md](./MathNode.md) |
| ModelNode | Object3DNode variant with an extended set of model metrics. | [ModelNode.md](./ModelNode.md) |
| MRTNode | Sets up a multiple render targets (MRT) context. | [MRTNode.md](./MRTNode.md) |
| Node | Base class for all nodes in the TSL node system. | [Node.md](./Node.md) |
| NodeBuilder | Abstract base for builders that generate shader programs. | [NodeBuilder.md](./NodeBuilder.md) |
| NormalMapNode | Applies normal maps to materials. | [NormalMapNode.md](./NormalMapNode.md) |
| Object3DNode | Accesses transform-related metrics of 3D objects as uniforms. | [Object3DNode.md](./Object3DNode.md) |
| OperatorNode | Basic math and logical operations such as add and compare. | [OperatorNode.md](./OperatorNode.md) |
| PassNode | Render pass for post-processing, with optional MRT outputs. | [PassNode.md](./PassNode.md) |
| PhysicalLightingModel | PBR lighting model for MeshPhysicalNodeMaterial. Extends LightingModel. | [PhysicalLightingModel.md](./PhysicalLightingModel.md) |
| PMREMNode | Preprocessed environment map (PMREM) for PBR materials. | [PMREMNode.md](./PMREMNode.md) |
| PointShadowNode | Shadow implementation for point light nodes. | [PointShadowNode.md](./PointShadowNode.md) |
| PropertyNode | Explicitly defines a shader property and assigns its value. | [PropertyNode.md](./PropertyNode.md) |
| ReferenceNode | Links a node value to a property of another object. | [ReferenceNode.md](./ReferenceNode.md) |
| ReflectorNode | Implements mirror-like flat reflective surfaces. | [ReflectorNode.md](./ReflectorNode.md) |
| RenderOutputNode | Applies tone mapping and color space conversion at any point in a post-processing chain. | [RenderOutputNode.md](./RenderOutputNode.md) |
| RTTNode | Renders a node into a texture using a QuadMesh (render to texture). | [RTTNode.md](./RTTNode.md) |
| ScreenNode | Screen metrics such as resolution, viewport, and coordinates. | [ScreenNode.md](./ScreenNode.md) |
| ShadowNode | Default shadow implementation for lighting nodes. | [ShadowNode.md](./ShadowNode.md) |
| StorageBufferNode | Storage buffers for compute shaders, convertible to attributes. Extends BufferNode. | [StorageBufferNode.md](./StorageBufferNode.md) |
| StorageTexture3DNode | Writes data into a 3D storage texture from a compute shader. | [StorageTexture3DNode.md](./StorageTexture3DNode.md) |
| StorageTextureNode | Writes data into a storage texture from a compute shader. | [StorageTextureNode.md](./StorageTextureNode.md) |
| StructNode | Creates custom structures with multiple members. | [StructNode.md](./StructNode.md) |
| SubgroupFunctionNode | Built-in subgroup (warp) functions that sync operations across invocations. | [SubgroupFunctionNode.md](./SubgroupFunctionNode.md) |
| Texture3DNode | Uniform node representing a 3D texture. | [Texture3DNode.md](./Texture3DNode.md) |
| TextureNode | Uniform node representing a 2D texture with sampling options. Extends UniformNode. | [TextureNode.md](./TextureNode.md) |
| ToneMappingNode | Represents a tone mapping operation. | [ToneMappingNode.md](./ToneMappingNode.md) |
| TSL (Three.js Shading Language) | Node-based shader system composing vertex, fragment, and compute shaders. | [TSL.md](./TSL.md) |
| UniformArrayNode | Array-like data as uniform buffers, with automatic padding. | [UniformArrayNode.md](./UniformArrayNode.md) |
| UniformNode | Represents a uniform value in the TSL node system. | [UniformNode.md](./UniformNode.md) |
| VarNode | Shader variables created from existing nodes. | [VarNode.md](./VarNode.md) |
| VaryingNode | Shader varying passed from the vertex to the fragment shader. | [VaryingNode.md](./VaryingNode.md) |
| ViewportDepthNode | Depth logic in the fragment shader, selected by scope. | [ViewportDepthNode.md](./ViewportDepthNode.md) |
| ViewportDepthTextureNode | Depth of the current viewport as a texture. | [ViewportDepthTextureNode.md](./ViewportDepthTextureNode.md) |
| ViewportSharedTextureNode | Viewport texture shared across all instances; preferred for screen data. | [ViewportSharedTextureNode.md](./ViewportSharedTextureNode.md) |
| ViewportTextureNode | Current viewport data as a texture, via a framebuffer copy. | [ViewportTextureNode.md](./ViewportTextureNode.md) |
| WorkgroupInfoNode | Workgroup-scoped buffer in compute shaders. WebGPU only. | [WorkgroupInfoNode.md](./WorkgroupInfoNode.md) |
