# Axios Client Example

OpenAPI 仕様から Axios ベースのクライアントを `@kubb/plugin-axios` で生成する設定例。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginAxios } from '@kubb/plugin-axios'
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
    adapter: adapterOas({
      unknownType: 'unknown',
      server: {
        index: 0,
      },
    }),
    plugins: [
      pluginTs({
        output: { path: 'models', mode: 'directory', barrel: { type: 'named' } },
        group: { type: 'tag' },
        // deletePet's path/header params cover issue #875 (interface params reaching the
        // client's RequestConfig). Everything else keeps the default `type` alias.
        override: [{ type: 'operationId', pattern: 'deletePet', options: { syntaxType: 'interface' } }],
      }),
      pluginAxios({
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
    "@kubb/plugin-axios": "workspace:*",
    "@kubb/plugin-ts": "workspace:*",
    "axios": "^1.20.0",
    "kubb": "catalog:"
  },
  "scripts": {
    "generate": "KUBB_DISABLE_TELEMETRY=1 kubb generate --config kubb.config.ts",
    "typecheck": "tsc"
  }
}
```

## Notes

- Source: `examples/axios` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (kubb.config.ts, package.json). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo.
- This example uses the newer config shape (`kubb/config`, `adapterOas`, `postGenerate`, `barrel`, `@kubb/plugin-axios`), which differs from the older `@kubb/core` + `pluginOas` + `pluginClient` shape shown in `fetch.md`.
- The package declares `node >=22.12`.

## Related

- [fetch.md](./fetch.md)
- [client.md](./client.md)
