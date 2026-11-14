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
    "@tanstack/react-query": "^5.107.1",
    "axios": "^1.21.1",
    "kubb": "catalog:",
    "react": "^19.3.1",
    "typescript": "catalog:",
    "zod": "^4.6.7"
  }
}
```

## 実行

```bash
npx kubb generate --config kubb.config.js
```

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@6.0.1/examples/simple-single — `examples/simple-single` of kubb-labs/plugins at tag `@kubb/plugin-client@6.0.1` (commit 8e70d907e7bb968e612990f1c8c31347257ac9ee, fetched 2026-11-14) (`kubb.config.js`, `package.json`). The official example is named `simple-single`. `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (the releases published with the pinned tags): `kubb` 5.20.0, `@kubb/adapter-oas` 5.20.0, `@kubb/plugin-ts` 5.5.1, `@kubb/plugin-fetch` 6.0.1, `@kubb/plugin-react-query` 5.10.1, `@kubb/plugin-redoc` 5.2.2, `@kubb/plugin-zod` 5.9.1; `@kubb/parser-ts` (no pinned version recorded) and `typescript`: use your project's version
- Replaces the earlier minimal v3/v4 shape (`@kubb/core`, `pluginOas()`, `input: { path }`)
- Single-file outputs (`mode: 'file'`) get no barrel of their own; the root barrel re-exports the file directly. The explicit `parsers` array replaces the default set

## Related

- [typescript.md](./typescript.md)
- [advanced.md](./advanced.md)
