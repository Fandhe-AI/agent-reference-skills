# SWR Example

OpenAPI 仕様から SWR hooks（`useSWR` / `useSWRMutation`）を生成する設定例。Fetch クライアント（`@kubb/plugin-fetch`）を `pluginSwr` が自動検出し、生成関数を呼ぶ。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginSwr } from '@kubb/plugin-swr'
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
      // The slim client. pluginSwr auto-detects it (no `client` option needed) and the hooks
      // call its generated functions, surfacing `ResponseError` from the bundled `.kubb/client.ts`.
      pluginFetch({
        output: { path: './clients', mode: 'directory', barrel: { type: 'named' } },
        group: { type: 'tag' },
      }),
      pluginSwr({
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
    "@kubb/plugin-swr": "workspace:*",
    "@kubb/plugin-ts": "workspace:*",
    "kubb": "catalog:",
    "react": "^19.3.0",
    "swr": "^2.5.1"
  },
  "devDependencies": {
    "@types/react": "catalog:",
    "typescript": "catalog:"
  }
}
```

## Notes

- Source: `examples/swr` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Replaces the v3/v4 shape (`client: { dataReturnType: 'full' }`, `pluginOas`). The package declares `node >=22.12`

## Related

- [../plugins/plugin-swr.md](../plugins/plugin-swr.md)
- [fetch.md](./fetch.md)
