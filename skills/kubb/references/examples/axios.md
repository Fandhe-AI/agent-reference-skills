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

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@5.5.15/examples/axios — `examples/axios` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (kubb.config.ts, package.json). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo.
- Versions outside the monorepo (npm latest): `kubb` 5.11.0, `@kubb/adapter-oas` 5.11.0, `@kubb/plugin-ts` 5.0.14, `@kubb/plugin-axios` 5.6.5
- Same v5 config shape as `fetch.md` (`kubb/config`, `adapterOas`, `barrel`); the difference is `@kubb/plugin-axios` instead of `@kubb/plugin-fetch`.
- The package declares `node >=22.12`.

## Related

- [fetch.md](./fetch.md)
- [client.md](./client.md)
