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
    "@modelcontextprotocol/server": "^2.3.1",
    "axios": "^1.20.0",
    "kubb": "catalog:",
    "zod": "^4.6.6"
  },
  "devDependencies": {
    "typescript": "catalog:"
  }
}
```

## Notes

- Source: `examples/mcp` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- The example passes `parsers: [parserTs(), parserTsx()]` explicitly (a custom `parsers` array replaces the default set) and registers `pluginAxios` instead of the v4 `pluginClient({ client: 'fetch' })`. `baseURL` is set on the client plugin, not on `pluginMcp`
- The package declares `node >=22.12`

## Related

- [../plugins/plugin-mcp.md](../plugins/plugin-mcp.md)
- [axios.md](./axios.md)
