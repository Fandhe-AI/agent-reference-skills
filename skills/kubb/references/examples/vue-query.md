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
    "@tanstack/vue-query": "^5.104.2",
    "kubb": "catalog:",
    "vue": "^3.5.43"
  },
  "devDependencies": {
    "typescript": "catalog:"
  }
}
```

## Notes

- Source: `examples/vue-query` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- This config does not set `hooks: true`, so only the `queryOptions` factories and keys are generated (the v5 default). Replaces the v3/v4 shape (`client: { dataReturnType: 'full' }`, `pluginOas`). The package declares `node >=22.12`

## Related

- [../plugins/plugin-vue-query.md](../plugins/plugin-vue-query.md)
- [react-query.md](./react-query.md)
