# SDK (class-based client) Example

OpenAPI 仕様からタグ単位でまとまった SDK クラス（`petStoreSDK`）を `@kubb/plugin-fetch` の `sdk` オプションで生成する設定例。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginTs } from '@kubb/plugin-ts'
import { defineConfig } from 'kubb/config'

export default defineConfig({
  root: '.',
  input: './petStore.yaml',
  output: {
    path: './src/gen',
    postGenerate: ['npm run typecheck'],
    clean: true,
    format: false,
    lint: false,
  },
  adapter: adapterOas({ unknownType: 'unknown', enums: 'root' }),
  plugins: [
    pluginTs({
      output: { path: 'models', mode: 'directory' },
      group: { type: 'tag' },
    }),
    pluginFetch({
      output: {
        path: './sdk',
        mode: 'directory',
        barrel: { type: 'all', nested: true },
      },
      group: { type: 'tag' },
      sdk: { name: 'petStoreSDK' },
    }),
  ],
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
  "scripts": {
    "generate": "KUBB_DISABLE_TELEMETRY=1 kubb generate --config kubb.config.ts",
    "typecheck": "tsc"
  }
}
```

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@5.5.15/examples/sdk — `examples/sdk` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (kubb.config.ts, package.json). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo.
- Versions outside the monorepo (npm latest): `kubb` 5.11.0, `@kubb/adapter-oas` 5.11.0, `@kubb/plugin-ts` 5.0.14, `@kubb/plugin-fetch` 5.6.5
- The package.json description reads "SDK PetStore example using clientType: 'class'", but kubb.config.ts in this tag enables the class-style SDK through `sdk: { name: 'petStoreSDK' }` on `pluginFetch`; no `clientType` option appears in the config.
- `barrel: { type: 'all', nested: true }` is set on the SDK output; `adapterOas` uses `enums: 'root'`.

## Related

- [fetch.md](./fetch.md)
- [axios.md](./axios.md)
