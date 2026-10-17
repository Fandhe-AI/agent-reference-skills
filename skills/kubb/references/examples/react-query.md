# React Query Example

OpenAPI 仕様から React Query（TanStack Query）のヘルパーを生成する設定例。Fetch クライアント（`@kubb/plugin-fetch`）を `pluginReactQuery` が自動検出し、生成関数を呼ぶ。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
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
      }),
      // The slim client. pluginReactQuery auto-detects it (no `client` option needed) and the hooks
      // call its generated functions, surfacing `ResponseError` from the bundled `.kubb/client.ts`.
      pluginFetch({
        output: { path: './clients', mode: 'directory', barrel: { type: 'named' } },
        group: { type: 'tag' },
      }),
      pluginReactQuery({
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
    "@kubb/plugin-react-query": "workspace:*",
    "@kubb/plugin-ts": "workspace:*",
    "@tanstack/react-query": "^5.104.2",
    "kubb": "catalog:",
    "react": "^19.3.0"
  },
  "devDependencies": {
    "@types/react": "catalog:",
    "typescript": "catalog:"
  }
}
```

## Notes

- Source: `examples/react-query` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (npm latest): `kubb` 5.11.0, `@kubb/adapter-oas` 5.11.0, `@kubb/plugin-ts` 5.0.14, `@kubb/plugin-fetch` 5.6.5, `@kubb/plugin-react-query` 5.5.3; `@types/react` and `typescript`: use your project's version
- This config does not set `hooks: true`, so only the `queryOptions` / `mutationOptions` factories and keys are generated (the v5 default `hooks: false`). Set `hooks: true` to also get `use*` hooks (see [../plugins/plugin-react-query.md](../plugins/plugin-react-query.md))
- Replaces the v3/v4 shape (`client: { bundle: true }`, `paramsType`, `transformers.name`, `QueryKey.getTransformer`). The package declares `node >=22.12`

## Related

- [../plugins/plugin-react-query.md](../plugins/plugin-react-query.md)
- [fetch.md](./fetch.md)
