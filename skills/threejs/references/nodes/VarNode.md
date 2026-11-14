# VarNode

Represents shader variables as nodes. Variables are created from existing nodes.

## Signature / Usage

```js
const depth = sampleDepth( uvNode ).toVar( 'depth' );
```

```js
class VarNode extends Node {
	constructor( node, name = null, readOnly = false ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `node` | `Node` | — | The node for which a variable should be created |
| `name` | `string` | `null` | Variable name in the shader; auto-generated if not defined |
| `readOnly` | `boolean` | `false` | The read-only flag |
| `global` | `boolean` | `true` | Overrides `Node#global` |
| `assignable` | `boolean` | `false` | Whether this node can be generated as an expression until it is assigned, at which point it is declared as a variable |
| `parents` | `boolean` | `true` | Indicates this node requires parents (overrides `Node#parents`) |
| `isVarNode` | `boolean` (readonly) | `true` | Type-testing flag |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getAssignable()` | `boolean` | Returns the assignable flag |
| `setAssignable(value)` | `VarNode` | Sets the assignable flag: an assignable node is generated as an expression until it is assigned, then declared as a variable |

## Notes

- Source: https://threejs.org/docs/pages/VarNode.html (three.js r187, `src/nodes/core/VarNode.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): `intent` / `getIntent()` / `isIntent()` / `setIntent()`, the `VarIntent()` TSL function and the `toVarIntent()` chaining method were removed; use `assignable` / `getAssignable()` / `setAssignable()` (https://github.com/mrdoob/three.js/pull/34815).

## Related

- [PropertyNode](./PropertyNode.md)
- [VaryingNode](./VaryingNode.md)
