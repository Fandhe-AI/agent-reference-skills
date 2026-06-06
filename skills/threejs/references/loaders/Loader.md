# Loader

Abstract base class for all loaders in Three.js. Provides common configuration and loading utilities inherited by every concrete loader.

## Signature / Usage

```js
const loader = new THREE.SomeConcreteLoader( manager );
loader.setPath( '/assets/' ).load( 'model.glb', onLoad, onProgress, onError );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `crossOrigin` | string | `'anonymous'` | CORS string used for cross-origin requests |
| `manager` | LoadingManager | `DefaultLoadingManager` | Loading manager used to handle the loading process |
| `path` | string | — | Base path prepended to asset URLs |
| `resourcePath` | string | — | Base path for dependent resources (e.g., textures referenced by a model) |
| `requestHeader` | Object | — | HTTP headers sent with fetch requests |
| `withCredentials` | boolean | `false` | Whether XMLHttpRequest sends credentials |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `load(url, onLoad, onProgress, onError)` | — | Abstract. Start loading from URL |
| `loadAsync(url, onProgress)` | Promise | Promise-based wrapper around `load()` |
| `parse(data)` | — | Abstract. Parse raw data into Three.js objects |
| `abort()` | Loader | Abort ongoing requests (optional implementation) |
| `setPath(path)` | Loader | Set base path for assets |
| `setResourcePath(path)` | Loader | Set base path for dependent resources |
| `setCrossOrigin(value)` | Loader | Set CORS string |
| `setRequestHeader(headers)` | Loader | Set HTTP request headers |
| `setWithCredentials(value)` | Loader | Set credentials flag |

## Notes

- All setter methods return the loader instance for chaining.
- `withCredentials` has no effect on local files or same-domain requests.
- `load()` and `parse()` are abstract and must be implemented by subclasses.

## Related

- [LoadingManager](./LoadingManager.md)
- [FileLoader](./FileLoader.md)
