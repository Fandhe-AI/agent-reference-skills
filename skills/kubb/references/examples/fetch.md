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
    "typecheck": "tsc && tsc -p tsconfig.strict.json"
  }
}
```

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@6.0.1/examples/fetch — `examples/fetch` of kubb-labs/plugins at tag `@kubb/plugin-client@6.0.1` (commit 8e70d907e7bb968e612990f1c8c31347257ac9ee, fetched 2026-11-14) (`kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (the releases published with the pinned tags): `kubb` 5.20.0, `@kubb/adapter-oas` 5.20.0, `@kubb/plugin-ts` 5.5.1, `@kubb/plugin-fetch` 6.0.1; `typescript`: use your project's version
- The generated code calls the global `fetch`, so no HTTP client package is needed. The package declares `node >=22.22`. Its `typecheck` script also runs `tsc -p tsconfig.strict.json`, a strict tsconfig (`exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `isolatedDeclarations`, ...) that includes `./src/gen/.kubb/**/*` to check the generated client runtime
- Replaces the v3/v4 shape (`@kubb/core`, `pluginOas`, `pluginClient({ client: 'fetch' })`, `hooks.done`)

## Related

- [axios.md](./axios.md)
- [client.md](./client.md)
- [../plugins/plugin-fetch.md](../plugins/plugin-fetch.md)
