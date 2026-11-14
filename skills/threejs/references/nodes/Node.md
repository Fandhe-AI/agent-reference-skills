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
| `assignable` | `boolean` | `false` | Whether this node can be assigned: it is generated as an expression until it is assigned, then it is declared as a variable where it was created |
| `uuid` | `string` (readonly) | — | Node UUID |
| `version` | `number` (readonly) | `0` | Increases whenever `needsUpdate` is set |

## Methods

| Method | Description |
|--------|-------------|
| `build(builder, output)` | Performs the build of a node; behavior and return value depend on the current build stage: setup (prepares the node and its children, may create new nodes; returns the node itself or a variant), analyze (analyzes the node hierarchy for optimizations in code generation; returns `null`), generate (generates the shader code; returns the shader string) |
| `getShared(builder)` | Used during the build; ensures equal nodes are not built multiple times but just once. Also handles node overrides if an override context is set. Returns the shared node if possible, otherwise `this` |
| `setup(builder)` | First build stage; prepares the node |
| `analyze(builder, output)` | Second build stage; analyzes the node hierarchy |
| `generate(builder, output)` | Third build stage; generates shader code |
| `update(frame)` / `updateBefore(frame)` / `updateAfter(frame)` | Update node state around rendering |
| `getUpdateType(frame: NodeFrame)` / `getUpdateBeforeType(frame: NodeFrame)` / `getUpdateAfterType(frame: NodeFrame)` | Return the `NodeUpdateType` of `update()` / `updateBefore()` / `updateAfter()` for the given `NodeFrame` |
| `onUpdate(callback, updateType)` / `onFrameUpdate(callback)` / `onObjectUpdate(callback)` / `onRenderUpdate(callback)` | Register update callbacks |
| `traverse(callback)` / `getChildren()` | Traverse the node hierarchy; `getChildren()` returns an array of child nodes (r186: a generator) |
| `isCacheable(builder)` | Whether this node allows caching its result in a temporary variable (default `true`); override to disable it |
| `toAssignable()` | Makes this node assignable and adds it to the current stack; only use it with nodes that are not shared |
| `isAssignable(builder)` / `isAssign(builder)` | Whether the node is assignable without a forced declaration / is the target of an assignment |
| `getHash(builder)` / `getCacheKey(force, ignores)` | Identity/cache keys for the node |
| `serialize(json)` / `deserialize(json)` | JSON (de)serialization |
| `dispose()` | Dispatches a dispose event for cleanup |

## Notes

- `Node` is abstract in practice — TSL code rarely instantiates it directly, instead using TSL helper functions (`float()`, `texture()`, etc.) that return concrete `Node` subclasses.
- Source: https://threejs.org/docs/pages/Node.html (three.js r187, `src/nodes/core/Node.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): nodes are their own variable intents. `VarNode#intent` / `setIntent()` / `isIntent()`, `VarIntent()`, `toVarIntent()` and `nodeProxyIntent()` / `nodeObjectIntent()` were replaced by `assignable` / `setAssignable()` / `toAssignable()`, `nodeProxyAssignable()` and `nodeObjectAssignable()` (https://github.com/mrdoob/three.js/pull/34815). `TempNode` is deprecated in r187 (extend `Node` instead).

## Related

- [TSL](./TSL.md)
- [NodeBuilder](./NodeBuilder.md)
- [OperatorNode](./OperatorNode.md)
