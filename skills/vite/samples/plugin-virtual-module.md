---
source: https://vite.dev/guide/api-plugin#importing-a-virtual-file
---

# Plugin: Virtual Module

Expose build-time data to source files through a `virtual:` import using `resolveId` and `load`.

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

```js
import { msg } from 'virtual:my-module'

console.log(msg)
```

## Notes

- The resolved id is prefixed with `\0`; in dev the browser sees it as `/@id/__x00__{id}`, decoded again before reaching plugin hooks.
- Author a plugin as a factory function returning the plugin object so users can pass options. The `name` is required.
- `@rolldown/pluginutils` provides `exactRegex` / `prefixRegex`, also re-exported from `rolldown/filter`.
- This is a Vite/Rolldown build plugin, not a fastify encapsulation plugin or a storybook addon.
