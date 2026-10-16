# NodeLoader

A loader for loading node objects in the three.js JSON Object/Scene format. Extends `Loader`.

## Signature / Usage

```js
const loader = new NodeLoader( manager );
loader.load( url, onLoad, onProgress, onError );
```

## Properties

| Name | Type | Description |
|------|------|-------------|
| `nodes` | Object\<string, Node.constructor\> | Dictionary of node types |
| `textures` | Object\<string, Texture\> | Dictionary of textures |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `new NodeLoader(manager)` | NodeLoader | Constructs a new node loader. `manager`: a reference to a loading manager |
| `load(url, onLoad, onProgress, onError)` | — | Loads the node definitions from the given URL (overrides `Loader#load`) |
| `parse(json)` | Node | Parses the node from the given JSON; `json` has `type`, `uuid`, `nodes` (node dependencies), `meta` (overrides `Loader#parse`) |
| `parseNodes(json)` | Object\<string, Node\> | Parses the node dependencies for the loaded node. `json`: Array\<Object\> |
| `createNodeFromType(type)` | Node | Creates a node object from the given type string |
| `setNodes(value)` | NodeLoader | Defines the dictionary of node types, defined as `<classname,class>` |
| `setTextures(value)` | NodeLoader | Defines the dictionary of textures, defined as `<uuid,texture>` |

## Notes

- Source: `src/loaders/nodes/NodeLoader.js`.

## Related

- [Loader](./Loader.md)
- [LoadingManager](./LoadingManager.md)
- [NodeMaterialLoader](./NodeMaterialLoader.md)
- [NodeObjectLoader](./NodeObjectLoader.md)
