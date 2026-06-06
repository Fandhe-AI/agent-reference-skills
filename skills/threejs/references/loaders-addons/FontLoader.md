# FontLoader

Loads a `Font` from a typeface JSON file for use with `TextGeometry`. Fonts must be converted to the required format using [facetype.js](https://gero3.github.io/facetype.js/).

## Signature / Usage

```js
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const loader = new FontLoader();
const font = await loader.loadAsync( 'fonts/helvetiker_regular.typeface.json' );

const geometry = new TextGeometry( 'Hello!', { font, size: 80, depth: 5 } );
scene.add( new THREE.Mesh( geometry ) );
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Load a font from URL |
| `loadAsync(url, onProgress)` | Promise\<Font\> | Promise-based load |
| `parse(json)` | Font | Parse a raw typeface JSON object |

## Notes

- Pre-converted fonts are available in `three/examples/fonts/`.

## Related

- [Loader](../loaders/Loader.md)
