---
source: https://vite.dev/guide/build#load-error-handling
---

# Load Error Handling (vite:preloadError)

Vite emits a `vite:preloadError` event when it fails to load a dynamic import.

## Signature / Usage

```js
window.addEventListener('vite:preloadError', (event) => {
  window.location.reload() // for example, refresh the page
})
```

## Notes

- `event.payload` contains the original import error. Calling `event.preventDefault()` stops the error from being thrown.
- After a new deployment, the hosting service may delete assets from previous deployments. A user who visited before the deployment may then hit an import error, because the code running on their device tries to import an old, deleted chunk. This event is useful for that situation.
- In that case, set `Cache-Control: no-cache` on the HTML file, otherwise the old assets will still be referenced.

## Related

- [Customizing the Build](./customizing-build.md)
