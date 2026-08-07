# ComputeNode

Represents a compute shader node, dispatched via `renderer.compute()` / `renderer.computeAsync()`.

## Signature / Usage

```js
const computeInit = Fn( () => {
	// compute logic
} )().compute( particleCount );

renderer.computeAsync( computeInit );
```

```js
class ComputeNode extends Node {
	constructor( computeNode, workgroupSize ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `computeNode` | `Node` | — | The node defining the compute shader logic |
| `count` | `number \| Array<number>` | — | Total number of thread invocations; auto-generates bounds checks against `instanceIndex` when a number |
| `countNode` | `UniformNode` | — | Uniform holding the dispatch count, auto-created when `count` is a number |
| `dispatchSize` | `number \| Array<number>` | — | Workgroup dispatch size on X/Y/Z, used directly if `count` is omitted |
| `workgroupSize` | `Array<number>` | `[64]` | X, Y, Z workgroup dimensions |
| `isComputeNode` | `boolean` (readonly) | `true` | Type-testing flag |
| `onInitFunction` | `function` | — | Callback run once compute node initialization finishes |
| `updateBeforeType` | `string` | `'object'` | Executes once per object |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `onInit(callback)` | `ComputeNode` | Sets the init callback |
| `updateBefore(frame)` | `void` | Executes the compute for this node |
| `setName(name)` | `ComputeNode` | Sets the name |
| `dispose()` | `void` | Dispatches a dispose event |

## Related

- [StorageBufferNode](./StorageBufferNode.md)
