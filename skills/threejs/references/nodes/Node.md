# Node

Base class for all nodes in the Three.js TSL node system. Every TSL primitive (attributes, uniforms, math operators, textures, etc.) extends `Node`.

## Signature / Usage

```js
class Node extends EventDispatcher {
	constructor( nodeType = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `nodeType` | `string` | `null` | The node's result type (e.g. `float`, `vec3`) |
| `global` | `boolean` | `false` | Whether the node is global; relevant for internal node caching |
| `id` | `number` (readonly) | — | Unique ID of the node |
| `isNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `name` | `string` | `''` | The node's name |
| `needsUpdate` | `boolean` | `false` | Set to `true` to force node regeneration |
| `updateType` / `updateBeforeType` / `updateAfterType` | `string` | `'none'` | Controls when `update()` / `updateBefore()` / `updateAfter()` run |
| `uuid` | `string` (readonly) | — | Node UUID |
| `version` | `number` (readonly) | `0` | Increases whenever `needsUpdate` is set |

## Methods

| Method | Description |
|--------|-------------|
| `build(builder, output)` | Runs the full build: setup → analyze → generate |
| `setup(builder)` | First build stage; prepares the node |
| `analyze(builder, output)` | Second build stage; analyzes the node hierarchy |
| `generate(builder, output)` | Third build stage; generates shader code |
| `update(frame)` / `updateBefore(frame)` / `updateAfter(frame)` | Update node state around rendering |
| `onUpdate(callback, updateType)` / `onFrameUpdate(callback)` / `onObjectUpdate(callback)` / `onRenderUpdate(callback)` | Register update callbacks |
| `traverse(callback)` / `getChildren()` | Traverse the node hierarchy |
| `getHash(builder)` / `getCacheKey(force, ignores)` | Identity/cache keys for the node |
| `serialize(json)` / `deserialize(json)` | JSON (de)serialization |
| `dispose()` | Dispatches a dispose event for cleanup |

## Notes

- `Node` is abstract in practice — TSL code rarely instantiates it directly, instead using TSL helper functions (`float()`, `texture()`, etc.) that return concrete `Node` subclasses.

## Related

- [TSL](./TSL.md)
- [NodeBuilder](./NodeBuilder.md)
- [OperatorNode](./OperatorNode.md)
