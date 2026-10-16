# Fetch Client Example

OpenAPI 仕様から Fetch ベースのクライアントを `@kubb/plugin-fetch` で生成する設定例。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginTs } from '@kubb/plugin-ts'
import { defineConfig } from 'kubb/config'

export default defineConfig(() => {
  return {
    root: '.',
    input: './petStore.yaml',
    output: {
      path: './src/gen',
      postGenerate: ['npm run typecheck'],
      clean: true,
      barrel: { type: 'named' },
      format: false,
      lint: false,
    },
    adapter: adapterOas({ unknownType: 'unknown', server: { index: 0 } }),
    plugins: [
      pluginTs({
        output: { path: 'models', mode: 'directory', barrel: { type: 'named' } },
        group: { type: 'tag' },
        // deletePet's path/header params cover issue #875 (interface params reaching the
        // client's RequestConfig). Everything else keeps the default `type` alias.
        override: [{ type: 'operationId', pattern: 'deletePet', options: { syntaxType: 'interface' } }],
      }),
      pluginFetch({
        output: { path: './clients', mode: 'directory', barrel: { type: 'named' } },
        group: { type: 'tag' },
      }),
    ],
  }
})
```

## 依存関係

```json
{
  "dependencies": {
    "@kubb/adapter-oas": "catalog:",
    "@kubb/plugin-fetch": "workspace:*",
    "@kubb/plugin-ts": "workspace:*",
    "kubb": "catalog:"
  },
  "devDependencies": {
    "typescript": "catalog:"
  },
  "scripts": {
    "generate": "KUBB_DISABLE_TELEMETRY=1 kubb generate --config kubb.config.ts",
    "typecheck": "tsc"
  }
}
```

## Notes

- Source: `examples/fetch` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- The generated code calls the global `fetch`, so no HTTP client package is needed. The package declares `node >=22.12`
- Replaces the v3/v4 shape (`@kubb/core`, `pluginOas`, `pluginClient({ client: 'fetch' })`, `hooks.done`)

## Related

- [axios.md](./axios.md)
- [client.md](./client.md)
- [../plugins/plugin-fetch.md](../plugins/plugin-fetch.md)
