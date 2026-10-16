# LoaderUtils

A class with loader utility functions.

## Signature / Usage

```js
LoaderUtils.extractUrlBase( url ) // string
LoaderUtils.resolveURL( url, path ) // string
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `LoaderUtils.extractUrlBase(url)` | string | Extracts the base URL from the given URL. `url`: the URL to extract the base URL from. |
| `LoaderUtils.resolveURL(url, path)` | string | Resolves relative URLs against the given path. `url`: the URL to resolve. `path`: the base path for relative URLs to be resolved against. |

## Notes

- Both methods are static; the constructor `new LoaderUtils()` takes no arguments.
- `resolveURL()`: absolute paths, data URLs, and blob URLs are returned as is. Invalid URLs return an empty string.
- Source: https://threejs.org/docs/pages/LoaderUtils.html (three.js r186, `src/loaders/LoaderUtils.js`)

## Related

- [Loader](./Loader.md)
