# Cache

A simple in-memory cache used internally by `FileLoader`. When enabled, prevents duplicate network requests for the same URL across all loaders that use `FileLoader`.

## Signature / Usage

```js
THREE.Cache.enabled = true; // enable before any load calls

const loader = new THREE.FileLoader();
await loader.loadAsync( 'data.json' ); // cached after first load
```

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | boolean | `false` | Whether caching is active |
| `files` | Object | `{}` | Dictionary of cached entries keyed by URL |

## Methods

| Method | Description |
|--------|-------------|
| `add(key, file)` | Add or overwrite a cache entry |
| `get(key)` | Return cached entry, or `undefined` if not found |
| `remove(key)` | Remove a specific cache entry |
| `clear()` | Remove all entries from the cache |

## Notes

- Cache is a static/global object — there is only one shared instance.
- `ImageBitmapLoader` only avoids duplicate requests when Cache is enabled.

## Related

- [FileLoader](./FileLoader.md)
