# Creating an Adapter

An adapter is a module exporting an object implementing the `NextAdapter` interface, importable from the `next` package.

## Signature / Usage

```typescript
import type { NextAdapter } from 'next'

/** @type {import('next').NextAdapter} */
const adapter: NextAdapter = {
  name: 'my-custom-adapter',
  async modifyConfig(config, { phase }) {
    if (phase === 'phase-production-build') {
      return { ...config }
    }
    return config
  },
  async onBuildComplete({ routing, outputs, buildId }) {
    console.log('Build completed with', outputs.pages.length, 'pages')
  },
}

module.exports = adapter
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| name | string | Adapter name. |
| modifyConfig | `(config, ctx) => Promise<NextConfigComplete> \| NextConfigComplete` | Optional. Modifies the Next.js config per build `phase`. |
| onBuildComplete | `(ctx) => Promise<void> \| void` | Optional. Receives `routing`, `outputs`, `projectDir`, `repoRoot`, `distDir`, `config`, `nextVersion`, `buildId` after build. |

## Notes

- The `NextAdapter` type can be imported directly from the `next` package.
- `onBuildComplete` context combines routing metadata (see Routing Information) with build outputs (see Output Types).

## Related

- [Adapters](./adapters.md)
- [Adapters API Reference](./adapters-api-reference.md)
- [Output Types](./adapters-output-types.md)
- [Routing Information](./adapters-routing-information.md)
