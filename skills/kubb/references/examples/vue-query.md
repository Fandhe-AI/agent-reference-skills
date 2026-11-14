# Vue Query Example

OpenAPI 仕様から Vue Query（TanStack Query）のヘルパーを生成する設定例。Fetch クライアント（`@kubb/plugin-fetch`）を `pluginVueQuery` が自動検出し、composables が生成関数を呼ぶ。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginVueQuery } from '@kubb/plugin-vue-query'
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
      }),
      // The slim client. pluginVueQuery auto-detects it (no `client` option needed) and the composables
      // call its generated functions, surfacing `ResponseError` from the bundled `.kubb/client.ts`.
      pluginFetch({
        output: { path: './clients', mode: 'directory', barrel: { type: 'named' } },
        group: { type: 'tag' },
      }),
      pluginVueQuery({
        output: { path: './hooks', mode: 'directory', barrel: { type: 'named' } },
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
    "@kubb/plugin-vue-query": "workspace:*",
    "@tanstack/vue-query": "^5.107.1",
    "kubb": "catalog:",
    "vue": "^3.5.45"
  },
  "devDependencies": {
    "typescript": "catalog:"
  }
}
```

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@6.0.1/examples/vue-query — `examples/vue-query` of kubb-labs/plugins at tag `@kubb/plugin-client@6.0.1` (commit 8e70d907e7bb968e612990f1c8c31347257ac9ee, fetched 2026-11-14) (`kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (the releases published with the pinned tags): `kubb` 5.20.0, `@kubb/adapter-oas` 5.20.0, `@kubb/plugin-ts` 5.5.1, `@kubb/plugin-fetch` 6.0.1, `@kubb/plugin-vue-query` 5.10.1; `typescript`: use your project's version
- This config does not set `hooks: true`, so only the `queryOptions` factories and keys are generated (the v5 default). Replaces the v3/v4 shape (`client: { dataReturnType: 'full' }`, `pluginOas`). The package declares `node >=22.22`

## Related

- [../plugins/plugin-vue-query.md](../plugins/plugin-vue-query.md)
- [react-query.md](./react-query.md)
