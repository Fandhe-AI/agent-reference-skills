# MRTNode

Sets up a MRT (multiple render targets) context for rendering. The MRT output is defined as a dictionary of output name to node.

## Signature / Usage

```js
const mrtNode = mrt( {
  output: output,
  normal: normalView
} ) ;
```

```js
class MRTNode extends OutputStructNode {
	constructor( outputNodes ) {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `outputNodes` | `Object<string, Node>` | The MRT outputs; key is the output name, value the node producing the result |
| `blendModes` | `Object<string, BlendMode>` | Blend modes for each output |
| `clearColors` | `Object<string, Color4>` | Clear colors for each output |
| `isMRTNode` | `boolean` (readonly) | Type-testing flag, `true` |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `get(name)` | `Node` | Output node for the given name |
| `has(name)` | `boolean` | Whether the MRT node has an output with the given name (documented return type is `NodeBuilder`) |
| `getBlendMode(name)` | `BlendMode` | Blend mode for the output name |
| `setBlendMode(name, blend)` | `MRTNode` | Sets the blend mode for the output name |
| `getClearColor(name)` | `Color4` | Clear color; `null` means the renderer's default clear policy applies |
| `setClearColor(name, color, alpha = 1)` | `MRTNode` | Sets the clear color for the output name |
| `merge(mrtNode)` | `MRTNode` | Returns a new MRT node with merged outputs |

## Notes

- Source: `src/nodes/core/MRTNode.js` (three.js r186 docs).
- Inheritance: EventDispatcher > Node > OutputStructNode > MRTNode.

## Related

- [PassNode](./PassNode.md)
