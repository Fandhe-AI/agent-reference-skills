# FileLoader

Low-level loader that fetches a file over the network using the Fetch API. Used internally by most other loaders. Can load any file type when no dedicated loader exists.

## Signature / Usage

```js
const loader = new THREE.FileLoader();
loader.setResponseType( 'json' );
const data = await loader.loadAsync( 'config.json' );
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mimeType` | string | — | Expected MIME type of the response |
| `responseType` | string | `''` | Expected response type: `'arraybuffer'`, `'blob'`, `'document'`, `'json'`, or `''` (text) |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Fetch the file from URL |
| `loadAsync(url, onProgress)` | Promise | Promise-based fetch |
| `setMimeType(value)` | FileLoader | Set expected MIME type |
| `setResponseType(value)` | FileLoader | Set expected response type |
| `abort()` | FileLoader | Abort ongoing fetch requests |

## Notes

- Enable `THREE.Cache.enabled = true` to cache responses and avoid duplicate requests.
- Supports data URIs.

## Related

- [Loader](./Loader.md)
- [Cache](./Cache.md)
