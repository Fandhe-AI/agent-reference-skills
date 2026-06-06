# ObjectLoader

Loads a Three.js scene or object graph from the [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4). Internally uses `FileLoader`.

## Signature / Usage

```js
const loader = new THREE.ObjectLoader();
const obj = await loader.loadAsync( 'models/json/example.json' );
scene.add( obj );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load an object/scene from URL |
| `loadAsync(url, onProgress)` | Promise\<Object3D\> | Promise-based load |
| `parse(json, onLoad)` | Object3D | Parse a pre-loaded JSON object |
| `parseAsync(json)` | Promise\<Object3D\> | Async version of `parse()` |
| `registerGeometry(type, class)` | — | Register a custom geometry class at the internal library |

## Notes

- Can be used to load individual objects or full scenes including lights, cameras, and materials.

## Related

- [Loader](./Loader.md)
- [MaterialLoader](./MaterialLoader.md)
- [BufferGeometryLoader](./BufferGeometryLoader.md)
