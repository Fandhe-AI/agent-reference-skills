# AnimationLoader

Loads animation clips from JSON files. Internally uses `FileLoader`. Returns an array of `AnimationClip` instances.

## Signature / Usage

```js
const loader = new THREE.AnimationLoader();
const animations = await loader.loadAsync( 'animations/walk.json' );
// animations: AnimationClip[]
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load animation clips from URL |
| `loadAsync(url, onProgress)` | Promise\<AnimationClip[]\> | Promise-based load |
| `parse(json)` | AnimationClip[] | Parse a JSON object into AnimationClip instances |

## Notes

- `onLoad` callback receives an `Array<AnimationClip>`.

## Related

- [Loader](./Loader.md)
- [FileLoader](./FileLoader.md)
