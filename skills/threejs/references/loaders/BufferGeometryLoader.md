# BufferGeometryLoader

Loads a `BufferGeometry` from a JSON file. Internally uses `FileLoader`.

## Signature / Usage

```js
const loader = new THREE.BufferGeometryLoader();
const geometry = await loader.loadAsync( 'models/json/pressure.json' );
const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } ) );
scene.add( mesh );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load geometry from URL |
| `loadAsync(url, onProgress)` | Promise\<BufferGeometry\> | Promise-based load |
| `parse(json)` | BufferGeometry | Parse a serialised geometry JSON object |

## Related

- [Loader](./Loader.md)
- [ObjectLoader](./ObjectLoader.md)
