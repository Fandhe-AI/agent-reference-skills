# MCP Example

OpenAPI 仕様から MCP（Model Context Protocol）サーバーを生成する設定例。登録済みの Axios クライアントを `pluginMcp` が検出し、ハンドラーが生成済みの `<op>` 関数を呼ぶ。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { parserTs, parserTsx } from '@kubb/parser-ts'
import { pluginAxios } from '@kubb/plugin-axios'
import { pluginMcp } from '@kubb/plugin-mcp'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { defineConfig } from 'kubb/config'

export default defineConfig(() => {
  return {
    root: '.',
    input: './petStore.yaml',
    adapter: adapterOas({ unknownType: 'unknown', validate: false, integerType: 'number', enums: 'root' }),
    output: {
      path: './src/gen',
      postGenerate: ['npm run typecheck', 'oxfmt ./', 'oxlint --fix ./src'],
      clean: true,
      barrel: { type: 'all' },
      format: false,
      lint: false,
    },
    parsers: [parserTs(), parserTsx()],
    plugins: [
      pluginTs({
        output: { path: 'models/ts', mode: 'directory', barrel: { type: 'named' } },
      }),
      pluginZod({ output: { path: 'zod', mode: 'directory' } }),
      // A registered contract client. pluginMcp detects it and its handlers import and call its
      // generated `<op>` functions, which return the shared `RequestResult` shape.
      pluginAxios({
        output: { path: './clients', mode: 'directory', barrel: { type: 'named' } },
        baseURL: 'https://petstore.swagger.io/v2',
      }),
      pluginMcp({ output: { path: 'mcp', mode: 'directory' } }),
    ],
  }
})
```

## 依存関係

```json
{
  "dependencies": {
    "@kubb/adapter-oas": "catalog:",
    "@kubb/parser-ts": "catalog:",
    "@kubb/plugin-axios": "workspace:*",
    "@kubb/plugin-mcp": "workspace:*",
    "@kubb/plugin-ts": "workspace:*",
    "@kubb/plugin-zod": "workspace:*",
    "@modelcontextprotocol/server": "^2.4.0",
    "axios": "^1.21.1",
    "kubb": "catalog:",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "typescript": "catalog:"
  }
}
```

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@6.0.1/examples/mcp — `examples/mcp` of kubb-labs/plugins at tag `@kubb/plugin-client@6.0.1` (commit 8e70d907e7bb968e612990f1c8c31347257ac9ee, fetched 2026-11-14) (`kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (the releases published with the pinned tags): `kubb` 5.20.0, `@kubb/adapter-oas` 5.20.0, `@kubb/plugin-ts` 5.5.1, `@kubb/plugin-axios` 6.0.1, `@kubb/plugin-mcp` 5.5.1, `@kubb/plugin-zod` 5.9.1; `@kubb/parser-ts` (no pinned version recorded) and `typescript`: use your project's version
- The example passes `parsers: [parserTs(), parserTsx()]` explicitly (a custom `parsers` array replaces the default set) and registers `pluginAxios` instead of the v4 `pluginClient({ client: 'fetch' })`. `baseURL` is set on the client plugin, not on `pluginMcp`
- The package declares `node >=22.22`

## Related

- [../plugins/plugin-mcp.md](../plugins/plugin-mcp.md)
- [axios.md](./axios.md)
