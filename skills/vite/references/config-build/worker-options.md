---
source: https://vite.dev/config/worker-options
---

# worker.* Options

Options for worker bundles. Unless noted, applied to all dev, build, and preview.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  worker: {
    format: 'iife',
    plugins: () => [],
    rolldownOptions: {},
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `worker.format` | `'es' \| 'iife'` | `'iife'` | Output format for worker bundle |
| `worker.plugins` | `() => (Plugin \| Plugin[])[]` | — | Vite plugins applied to worker bundles |
| `worker.rolldownOptions` | `RolldownOptions` | — | Rolldown options to build worker bundle |
| `worker.rollupOptions` | `RolldownOptions` | — | Deprecated alias of `worker.rolldownOptions` |

## Notes

- `config.plugins` only applies to workers in dev; configure `worker.plugins` for build.
- The `worker.plugins` function must return new plugin instances, as they are used in parallel rolldown worker builds. Modifying `config.worker` options in the `config` hook is ignored.
- `worker.rollupOptions` is deprecated.
- Migration (v7 → v8): `worker.rollupOptions` renamed to `worker.rolldownOptions`.
- These are browser Web Worker bundle options, not job workers such as the bullmq skill's.

## Related

- [build-rolldown-options.md](./build-rolldown-options.md)
