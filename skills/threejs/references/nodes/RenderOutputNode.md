# RenderOutputNode

Applies tone mapping and color space conversion at an arbitrary point in a post-processing effect chain. Normally these happen just before writing to the default framebuffer, which is too late for effects such as FXAA that require e.g. sRGB input.

## Signature / Usage

```js
const postProcessing = new RenderPipeline( renderer );
postProcessing.outputColorTransform = false;
const scenePass = pass( scene, camera );
const outputPass = renderOutput( scenePass );
postProcessing.outputNode = outputPass;
```

```js
class RenderOutputNode extends Node {
	constructor( colorNode, toneMapping, outputColorSpace ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `colorNode` | `Node` | The color node to process |
| `toneMapping` | `number` | The tone mapping type |
| `outputColorSpace` | `string` | The output color space |
| `premultipliedAlpha` | `boolean` | Whether the color node uses premultiplied alpha; the output uses the same alpha mode. Default `true` |
| `isRenderOutputNode` | `boolean` (readonly) | Type-testing flag, `true` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getToneMapping()` | `number` | Gets the tone mapping type |
| `setToneMapping(value)` | `ToneMappingNode` | Sets the tone mapping type (documented return type) |

## Notes

- When applying tone mapping and color space conversion manually with this node, set `RenderPipeline#outputColorTransform` to `false`.
- Source: https://threejs.org/docs/pages/RenderOutputNode.html (three.js r187, `src/nodes/display/RenderOutputNode.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): extends `Node` instead of `TempNode`; `TempNode` is deprecated in r187 ("Extend Node instead").
- Migration (r186 → r187): `premultipliedAlpha` is optional (default `true`); set it to `false` if the color node holds non-premultiplied alpha (https://github.com/mrdoob/three.js/pull/34948).

## Related

- [ToneMappingNode](./ToneMappingNode.md)
- [ColorSpaceNode](./ColorSpaceNode.md)
- [PassNode](./PassNode.md)
