# MaterialLoader

Loads a `Material` from a Three.js JSON file. Internally uses `FileLoader`. Does not support node materials — use `NodeMaterialLoader` for those.

## Signature / Usage

```js
const loader = new THREE.MaterialLoader();
const material = await loader.loadAsync( 'material.json' );
```

## Properties

| Name | Type | Description |
|------|------|-------------|
| `textures` | Object\<string, Texture\> | Dictionary of textures to inject into the material (textures are not embedded in JSON) |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load a material from URL |
| `loadAsync(url, onProgress)` | Promise\<Material\> | Promise-based load |
| `parse(json)` | Material | Parse a serialised material JSON object |
| `setTextures(value)` | MaterialLoader | Inject a texture dictionary before parsing |
| `createMaterialFromType(type)` | Material | Create a blank material for the given type string |

## Notes

- Textures are not embedded in material JSON files. Inject them with `setTextures()` before loading.

## Related

- [Loader](./Loader.md)
- [ObjectLoader](./ObjectLoader.md)
