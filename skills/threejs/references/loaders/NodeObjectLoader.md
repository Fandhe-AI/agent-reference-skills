# NodeObjectLoader

A special type of object loader for loading 3D objects using node materials. Extends `ObjectLoader` (inheritance: `Loader` → `ObjectLoader` → `NodeObjectLoader`).

## Signature / Usage

```js
const loader = new NodeObjectLoader( manager );
const object = loader.parse( json, onLoad );
```

## Properties

| Name | Type | Description |
|------|------|-------------|
| `nodeMaterials` | Object\<string, NodeMaterial.constructor\> | Dictionary of node material types |
| `nodes` | Object\<string, Node.constructor\> | Dictionary of node types |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `new NodeObjectLoader(manager)` | NodeObjectLoader | Constructs a new node object loader. `manager`: a reference to a loading manager |
| `parse(json, onLoad)` | Object3D | Parses the node objects from the given JSON; `onLoad` is the onLoad callback (overrides `ObjectLoader#parse`) |
| `parseAsync(json)` | Promise\<Object3D\> | Async version of `parse()` (overrides `ObjectLoader#parseAsync`) |
| `parseMaterials(json, textures)` | Object\<string, NodeMaterial\> | Parses the node materials from the given JSON and texture library |
| `parseNodes(json, textures)` | Object\<string, Node\> | Parses the nodes from the given JSON (Array\<Object\>) and texture library |
| `setNodeMaterials(value)` | NodeObjectLoader | Defines the dictionary of node material types, defined as `<classname,class>` |
| `setNodes(value)` | NodeObjectLoader | Defines the dictionary of node types, defined as `<classname,class>` |

## Notes

- Source: `src/loaders/nodes/NodeObjectLoader.js`.

## Related

- [ObjectLoader](./ObjectLoader.md)
- [NodeLoader](./NodeLoader.md)
- [NodeMaterialLoader](./NodeMaterialLoader.md)
