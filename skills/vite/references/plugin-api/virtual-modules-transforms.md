---
source: https://vite.dev/guide/api-plugin#simple-examples
---

# Transforming Custom File Types / Virtual Modules

Simple plugin examples: a `transform` hook for custom file types and a virtual module via `resolveId` / `load`.

## Signature / Usage

Transforming custom file types:

```js
const fileRegex = /\.(my-file-ext)$/

export default function myPlugin() {
  return {
    name: 'transform-file',

    transform: {
      filter: {
        id: fileRegex,
      },
      handler(src, id) {
        return {
          code: compileFileToJS(src),
          map: null, // provide source map if available
        }
      },
    },
  }
}
```

Importing a virtual file:

```js
import { exactRegex } from '@rolldown/pluginutils'

export default function myPlugin() {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'my-plugin', // required, will show up in warnings and errors
    resolveId: {
      filter: { id: exactRegex(virtualModuleId) },
      handler() {
        return resolvedVirtualModuleId
      },
    },
    load: {
      filter: { id: exactRegex(resolvedVirtualModuleId) },
      handler() {
        return `export const msg = "from virtual module"`
      },
    },
  }
}
```

Importing it in JavaScript:

```js
import { msg } from 'virtual:my-module'

console.log(msg)
```

## Notes

- It is common convention to author a Vite/Rolldown/Rollup plugin as a factory function that returns the plugin object; the function can accept options to customize behavior.
- Virtual modules pass build time information to source files using normal ESM import syntax. See Rolldown's Virtual Modules Convention for the full convention.
- In Vite, `\0` is not a permitted char in import URLs, so a `\0{id}` virtual id is encoded as `/@id/__x00__{id}` during dev in the browser. The id is decoded back before entering the plugins pipeline, so plugin hooks do not see this.

## Related

- [Hook Filters](./path-normalization-filters.md)
- [Rolldown Hooks](./rolldown-hooks.md)
