# Simple Example

OpenAPI 仕様から基本的なコードを単一ファイル出力で生成する設定例。Redoc ドキュメント、型、Fetch クライアント、React Query、Zod を 1 つの config にまとめる。

## kubb.config.js

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { parserTs, parserTsx } from '@kubb/parser-ts'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginRedoc } from '@kubb/plugin-redoc'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { defineConfig } from 'kubb/config'

export default defineConfig([
  {
    name: 'petStore',
    root: '.',
    input: './petStore.yaml',
    output: {
      path: './src/gen',
      clean: true,
      barrel: { type: 'named' },
      lint: false,
      format: 'auto',
      postGenerate: ['npm run typecheck'],
    },
    adapter: adapterOas({ unknownType: 'unknown', enums: 'root' }),
    parsers: [parserTs({ extension: { '.ts': '' } }), parserTsx()],
    plugins: [
      pluginRedoc({
        output: {
          path: './docs/index.html',
        },
      }),
      pluginTs({
        output: { path: 'models.ts', mode: 'file' },
      }),
      pluginFetch({
        output: { path: './clients', mode: 'directory', barrel: { type: 'named' } },
      }),
      pluginReactQuery({
        output: {
          path: './hooks.ts',
          mode: 'file',
        },
      }),
      pluginZod({
        output: {
          path: './zod.ts',
          mode: 'file',
        },
      }),
    ],
  },
])
```

## 依存関係

```json
{
  "dependencies": {
    "@kubb/adapter-oas": "catalog:",
    "@kubb/parser-ts": "catalog:",
    "@kubb/plugin-fetch": "workspace:*",
    "@kubb/plugin-react-query": "workspace:*",
    "@kubb/plugin-redoc": "workspace:*",
    "@kubb/plugin-ts": "workspace:*",
    "@kubb/plugin-zod": "workspace:*",
    "@tanstack/react-query": "^5.104.2",
    "axios": "^1.20.0",
    "kubb": "catalog:",
    "react": "^19.3.0",
    "typescript": "catalog:",
    "zod": "^4.6.6"
  }
}
```

## 実行

```bash
npx kubb generate --config kubb.config.js
```

## Notes

- Source: `examples/simple-single` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.js`, `package.json`). The official example is named `simple-single`. `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (npm latest): `kubb` 5.11.0, `@kubb/adapter-oas` 5.11.0, `@kubb/plugin-ts` 5.0.14, `@kubb/plugin-fetch` 5.6.5, `@kubb/plugin-react-query` 5.5.3, `@kubb/plugin-redoc` 5.0.12, `@kubb/plugin-zod` 5.4.12; `@kubb/parser-ts` (no pinned version recorded) and `typescript`: use your project's version
- Replaces the earlier minimal v3/v4 shape (`@kubb/core`, `pluginOas()`, `input: { path }`)
- Single-file outputs (`mode: 'file'`) get no barrel of their own; the root barrel re-exports the file directly. The explicit `parsers` array replaces the default set

## Related

- [typescript.md](./typescript.md)
- [advanced.md](./advanced.md)
