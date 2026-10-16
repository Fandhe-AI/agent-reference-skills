# AONode

A generic class for nodes that contribute ambient occlusion to the scene, e.g. an ambient occlusion map node can be used as its input. Used in `NodeMaterial`.

## Signature / Usage

```js
class AONode extends LightingNode {
	constructor( aoNode = null ) {}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aoNode` | `Node<float>` | `null` | The ambient occlusion node |

## Notes

- Source: `src/nodes/lighting/AONode.js` (three.js r186 docs).
- Inheritance: EventDispatcher > Node > LightingNode > AONode.

## Related

- [EnvironmentNode](./EnvironmentNode.md)
- [LightsNode](./LightsNode.md)
