# NodeMaterialLoader

A special type of material loader for loading node materials. Extends `MaterialLoader` (inheritance: `Loader` → `MaterialLoader` → `NodeMaterialLoader`).

## Signature / Usage

```js
const loader = new NodeMaterialLoader( manager );
```

## Properties

| Name | Type | Description |
|------|------|-------------|
| `nodeMaterials` | Object\<string, NodeMaterial.constructor\> | Dictionary of node material types |
| `nodes` | Object\<string, Node.constructor\> | Dictionary of node types |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `new NodeMaterialLoader(manager)` | NodeMaterialLoader | Constructs a new node material loader. `manager`: a reference to a loading manager |
| `createMaterialFromType(type)` | Node | Creates a node material from the given type (overrides `MaterialLoader#createMaterialFromType`) |
| `parse(json)` | NodeMaterial | Parses the node material from the given JSON (overrides `MaterialLoader#parse`) |
| `setNodeMaterials(value)` | NodeLoader | Defines the dictionary of node material types, defined as `<classname,class>` |
| `setNodes(value)` | NodeLoader | Defines the dictionary of node types, defined as `<classname,class>` |

## Notes

- The generated docs list the return type of `createMaterialFromType()` as `Node` and of `setNodeMaterials()` / `setNodes()` as `NodeLoader`; the description says each returns "A reference to this loader".
- Source: https://threejs.org/docs/pages/NodeMaterialLoader.html (three.js r186, `src/loaders/nodes/NodeMaterialLoader.js`)

## Related

- [MaterialLoader](./MaterialLoader.md)
- [NodeLoader](./NodeLoader.md)
- [NodeObjectLoader](./NodeObjectLoader.md)
