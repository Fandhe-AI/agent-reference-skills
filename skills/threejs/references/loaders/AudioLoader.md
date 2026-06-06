# AudioLoader

Loads an `AudioBuffer` from an audio file. Internally uses `FileLoader`.

## Signature / Usage

```js
const audioListener = new THREE.AudioListener();
const sound = new THREE.Audio( audioListener );

const loader = new THREE.AudioLoader();
const buffer = await loader.loadAsync( 'audio/ambient.ogg' );
sound.setBuffer( buffer );
sound.play();
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load an audio file from URL |
| `loadAsync(url, onProgress)` | Promise\<AudioBuffer\> | Promise-based load |

## Related

- [Loader](./Loader.md)
- [FileLoader](./FileLoader.md)
