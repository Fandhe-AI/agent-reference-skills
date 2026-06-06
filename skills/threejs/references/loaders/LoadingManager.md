# LoadingManager

Tracks multiple concurrent loading operations and fires callbacks when all assets are loaded. A default global instance (`THREE.DefaultLoadingManager`) is used automatically by all loaders.

## Signature / Usage

```js
const manager = new THREE.LoadingManager();
manager.onLoad = () => console.log( 'All assets loaded!' );

const loader = new OBJLoader( manager );
loader.load( 'model.obj', onLoad );
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onLoad` | function | undefined | Fires when all items are loaded |
| `onProgress` | function | undefined | Fires each time an item finishes loading |
| `onError` | function | undefined | Fires when an item fails to load |
| `onStart` | function | undefined | Fires when the first item begins loading |
| `abortController` | AbortController | — | Used to abort ongoing requests |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `abort()` | LoadingManager | Abort all ongoing requests |
| `addHandler(regex, loader)` | LoadingManager | Register a loader for files matching a regex |
| `removeHandler(regex)` | LoadingManager | Unregister a previously added handler |
| `getHandler(file)` | Loader \| null | Get the registered loader for a given file path |
| `setURLModifier(fn)` | LoadingManager | Set a callback to rewrite resource URLs before fetching |
| `resolveURL(url)` | string | Get the resolved URL after applying the URL modifier |
| `itemStart(url)` | void | Notify the manager that an item has started loading |
| `itemEnd(url)` | void | Notify the manager that an item has finished loading |
| `itemError(url)` | void | Notify the manager that an item failed to load |

## Notes

- Use separate `LoadingManager` instances to maintain independent loading queues (e.g., separate progress bars for geometry vs. textures).
- `addHandler` is useful for delegating specific file extensions to specialised loaders (e.g., `.tga` → `TGALoader`).

## Related

- [Loader](./Loader.md)
