# Installation

Set up a three.js project using either npm + a build tool (recommended) or a CDN with import maps.

## Signature / Usage

### Option 1: npm + Build Tool (Recommended)

```bash
npm install --save three
npm install --save-dev vite
npx vite          # start dev server at http://localhost:5173
npx vite build    # production build to dist/
```

```js
// main.js
import * as THREE from 'three';
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My first three.js app</title>
    <style>body { margin: 0; }</style>
  </head>
  <body>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

### Option 2: CDN with Import Maps

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@<version>/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@<version>/examples/jsm/"
  }
}
</script>
```

Serve files with a local server (required due to browser security restrictions):

```bash
npx serve .        # http://localhost:3000
npx http-server    # alternative
python -m http.server   # Python 3.x
```

### Addons

Addons (controls, loaders, effects) must be imported separately:

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
```

## Notes

- A build tool (Vite) is the recommended approach for better DX and tree-shaking.
- CDN usage requires no separate install step; push source files directly to hosting for production.
- When using CDN, import all dependencies from the same three.js version and CDN to avoid duplicate code or breakage.
- Files cannot be loaded directly from the hard drive due to WebGL security restrictions—always use a web server.
- For TypeScript / editor auto-completion with CDN, add `jsconfig.json` or `tsconfig.json` with path mappings.

## Related

- [Creating a scene](./creating-a-scene.md)
- [WebGL Compatibility Check](./webgl-compatibility-check.md)
