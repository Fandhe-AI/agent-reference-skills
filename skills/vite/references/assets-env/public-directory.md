---
source: https://vite.dev/guide/assets#the-public-directory
---

# The public Directory

A special `public` directory under the project root holds assets that are served at `/` during dev and copied as-is to the root of the dist directory.

## Signature / Usage

Place the asset in `<root>/public` and reference it by root absolute path. For example, `public/icon.png` is referenced in source code as `/icon.png`.

```js
// public/icon.png
document.getElementById('icon').src = '/icon.png'
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `publicDir` | config option | Directory location; defaults to `<root>/public` |

## Notes

- Use `public` when assets are never referenced in source code (e.g. `robots.txt`), must retain the exact same file name (without hashing), or you do not want to import an asset first just to get its URL.
- Always reference `public` assets using the root absolute path.
- In general, prefer importing assets unless you specifically need the guarantees provided by the `public` directory.

## Related

- [asset-url-imports.md](./asset-url-imports.md)
- [../config-shared/plugins-public-cache-dir.md](../config-shared/plugins-public-cache-dir.md)
- [../build-deploy/public-base-path.md](../build-deploy/public-base-path.md)
