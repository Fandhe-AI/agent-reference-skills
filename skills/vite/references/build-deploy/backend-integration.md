---
source: https://vite.dev/guide/backend-integration
---

# Backend Integration (manifest.json)

Serve HTML from a traditional backend (e.g. Rails, Laravel) while using Vite for assets: configure the entry, inject dev scripts in development, and render tags from `.vite/manifest.json` in production.

## Signature / Usage

1. Vite config: set the entry and enable the build manifest.

```js
// vite.config.js
export default defineConfig({
  // overwrite default .html entry
  input: '/path/to/main.js',
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: 'http://my-backend.example.com',
    },
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
  },
})
```

If the module preload polyfill is not disabled, import it in your entry:

```js
// add the beginning of your app entry
import 'vite/modulepreload-polyfill'
```

2. Development: inject into the server's HTML template (substitute `http://localhost:5173` with the local URL Vite runs at):

```html
<!-- if development -->
<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module" src="http://localhost:5173/main.js"></script>
```

With React and `@vitejs/plugin-react`, add this before the above scripts:

```html
<script type="module">
  import RefreshRuntime from 'http://localhost:5173/@react-refresh'
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
</script>
```

3. Production: after `vite build`, `.vite/manifest.json` is generated alongside other assets. Example:

```json
{
  "_shared-B7PI925R.js": {
    "file": "assets/shared-B7PI925R.js",
    "name": "shared",
    "css": ["assets/shared-ChJ_j-JJ.css"]
  },
  "_shared-ChJ_j-JJ.css": {
    "file": "assets/shared-ChJ_j-JJ.css",
    "src": "_shared-ChJ_j-JJ.css"
  },
  "logo.svg": {
    "file": "assets/logo-BuPIv-2h.svg",
    "src": "logo.svg"
  },
  "baz.js": {
    "file": "assets/baz-B2H3sXNv.js",
    "name": "baz",
    "src": "baz.js",
    "isDynamicEntry": true
  },
  "views/bar.js": {
    "file": "assets/bar-gkvgaI9m.js",
    "name": "bar",
    "src": "views/bar.js",
    "isEntry": true,
    "imports": ["_shared-B7PI925R.js"],
    "dynamicImports": ["baz.js"]
  },
  "views/foo.js": {
    "file": "assets/foo-BRBmoGS9.js",
    "name": "foo",
    "src": "views/foo.js",
    "isEntry": true,
    "imports": ["_shared-B7PI925R.js"],
    "css": ["assets/foo-5UjPuW-k.css"]
  }
}
```

The manifest is `Record<name, chunk>`; each chunk follows `ManifestChunk`:

```ts
interface ManifestChunk {
  /** The input file name of this chunk / asset if known */
  src?: string
  /** The output file name of this chunk / asset */
  file: string
  /** The list of CSS files imported by this chunk */
  css?: string[]
  /** The list of asset files imported by this chunk, excluding CSS files */
  assets?: string[]
  /** Whether this chunk or asset is an entry point */
  isEntry?: boolean
  /** The name of this chunk / asset if known */
  name?: string
  /**
   * Whether this chunk is a dynamic entry point
   * This field is only present in JS chunks.
   */
  isDynamicEntry?: boolean
  /**
   * The list of statically imported chunks by this chunk
   * The values are the keys of the manifest. This field is only present in JS chunks.
   */
  imports?: string[]
  /**
   * The list of dynamically imported chunks by this chunk
   * The values are the keys of the manifest. This field is only present in JS chunks.
   */
  dynamicImports?: string[]
}
```

4. Render links / preload directives with hashed filenames (syntax is for explanation only; `importedChunks` is illustrative and not provided by Vite):

```html
<!-- if production -->

<!-- for cssFile of manifest[name].css -->
<link rel="stylesheet" href="/{{ cssFile }}" />

<!-- for chunk of importedChunks(manifest, name) -->
<!-- for cssFile of chunk.css -->
<link rel="stylesheet" href="/{{ cssFile }}" />

<script type="module" src="/{{ manifest[name].file }}"></script>

<!-- for chunk of importedChunks(manifest, name) -->
<link rel="modulepreload" href="/{{ chunk.file }}" />
```

For entry `views/foo.js`:

```html
<link rel="stylesheet" href="assets/foo-5UjPuW-k.css" />
<link rel="stylesheet" href="assets/shared-ChJ_j-JJ.css" />
<script type="module" src="assets/foo-BRBmoGS9.js"></script>
<!-- optional -->
<link rel="modulepreload" href="assets/shared-B7PI925R.js" />
```

For entry `views/bar.js`:

```html
<link rel="stylesheet" href="assets/shared-ChJ_j-JJ.css" />
<script type="module" src="assets/bar-gkvgaI9m.js"></script>
<!-- optional -->
<link rel="modulepreload" href="assets/shared-B7PI925R.js" />
```

Pseudo implementation of `importedChunks` (adapt to your language and templating):

```ts
import type { Manifest, ManifestChunk } from 'vite'

export default function importedChunks(
  manifest: Manifest,
  name: string,
): ManifestChunk[] {
  const seen = new Set<string>()

  function getImportedChunks(chunk: ManifestChunk): ManifestChunk[] {
    const chunks: ManifestChunk[] = []
    for (const file of chunk.imports ?? []) {
      const importee = manifest[file]
      if (seen.has(file)) {
        continue
      }
      seen.add(file)

      chunks.push(...getImportedChunks(importee))
      chunks.push(importee)
    }

    return chunks
  }

  return getImportedChunks(manifest[name])
}
```

## Notes

- For existing integrations with backends (Rails, Laravel, etc.), the page points to Awesome Vite (https://github.com/vitejs/awesome-vite#integrations-with-backends); this guide is for custom integrations.
- Serving assets in development: either proxy static asset requests to the Vite server, or set `server.origin` so generated asset URLs resolve against the back-end server URL instead of a relative path. Needed for assets such as images to load properly.
- The React preamble is needed because `@vitejs/plugin-react` cannot modify the HTML you serve.
- Manifest entry kinds: entry chunks (from files in `build.rolldownOptions.input`, `isEntry: true`, key is relative src path from project root); dynamic entry chunks (from dynamic imports, `isDynamicEntry: true`, key is relative src path); non-entry chunks (key is the base name of the generated file prefixed with `_`); asset chunks (images, fonts; key is relative src path); CSS files (when `build.cssCodeSplit` is `false`, a single CSS file keyed `style.css`; otherwise keyed like JS chunks, with `_` prefix for non-entry).
- JS chunks list static and dynamic imports (keys mapping to other manifest chunks) and their CSS and asset files.
- Recommended tag order for a backend generating HTML from an entry: (1) `<link rel="stylesheet">` for each file in the entry chunk's `css` list; (2) recursively follow the entry's `imports` and include a stylesheet link for each imported chunk's `css`; (3) a tag for the entry chunk's `file` (`<script type="module">` for JS, `<link rel="stylesheet">` for CSS); (4) optionally `<link rel="modulepreload">` for each imported JS chunk's `file`, recursively.
- Experimental `build.chunkImportMap`: the import map is output to `importmap.json` in the output directory; inject the `<script type="importmap">` tag before any `<script type="module">` or `<link rel="modulepreload">` tags.
- This is the Vite side of the integration. HTTP server frameworks that render the HTML (fastify, hono, go-echo, fandhe-backend) are covered by their own skills.

## Related

- [Deploying a Static Site](./static-deploy-overview.md)
- [Public Base Path](./public-base-path.md)
