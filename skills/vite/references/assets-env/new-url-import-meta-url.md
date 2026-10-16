---
source: https://vite.dev/guide/assets#new-url-url-import-meta-url
---

# new URL(url, import.meta.url)

Combines native ESM `import.meta.url` with the `URL` constructor to obtain the resolved URL of a static asset from a relative path.

## Signature / Usage

```js
const imgUrl = new URL('./img.png', import.meta.url).href

document.getElementById('hero-img').src = imgUrl
```

Dynamic URLs via template literals are supported:

```js
function getImageUrl(name) {
  // note that this does not include files in subdirectories
  return new URL(`./dir/${name}.png`, import.meta.url).href
}
```

The URL string must be static so it can be analyzed; otherwise Vite will not transform it:

```js
// Vite will not transform this
const imgUrl = new URL(imagePath, import.meta.url).href
```

## Notes

- Works natively in modern browsers; Vite does not need to process this code during development.
- During the production build, Vite transforms the code so URLs still point to the correct location after bundling and asset hashing. If the URL is not static, the code is left as is, which can cause runtime errors if `build.target` does not support `import.meta.url`.
- How it works: Vite transforms `getImageUrl` into

```js
import __img0png from './dir/img0.png'
import __img1png from './dir/img1.png'

function getImageUrl(name) {
  const modules = {
    './dir/img0.png': __img0png,
    './dir/img1.png': __img1png,
  }
  return new URL(modules[`./dir/${name}.png`], import.meta.url).href
}
```

- Does not work with SSR: `import.meta.url` has different semantics in browsers vs. Node.js, and the server bundle cannot determine the client host URL ahead of time.

## Related

- [asset-url-imports.md](./asset-url-imports.md)
- [../config-build/build-target.md](../config-build/build-target.md)
