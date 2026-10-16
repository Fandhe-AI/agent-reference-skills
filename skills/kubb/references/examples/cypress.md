# Cypress Example

OpenAPI 仕様から Cypress リクエスト定義を生成する設定例。1 つ目の config は型を `models.ts` の単一ファイルに、Cypress ヘルパーを tag ごとのフォルダーに出力し、2 つ目は group なしで別ディレクトリへ出力する。

## kubb.config.js

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginCypress } from '@kubb/plugin-cypress'
import { pluginTs } from '@kubb/plugin-ts'
import { defineConfig } from 'kubb/config'

const input = './petStore.yaml'
export default defineConfig([
  {
    root: '.',
    input,
    adapter: adapterOas({ unknownType: 'unknown' }),
    output: {
      path: './src/gen',
      clean: true,
      lint: false,
      format: false,
      barrel: { type: 'named' },
    },
    plugins: [
      pluginTs({
        output: {
          path: 'models.ts',
          mode: 'file',
        },
      }),
      pluginCypress({
        output: {
          path: 'cypress',
          mode: 'directory',
        },
        group: {
          type: 'tag',
          name({ group }) {
            return `${group}Requests`
          },
        },
        baseURL: 'http://localhost:3000',
      }),
    ],
  },
  {
    root: '.',
    input,
    adapter: adapterOas({ unknownType: 'unknown' }),
    output: { path: './src/gen-v4', clean: true },
    plugins: [
      pluginTs({
        output: { path: 'models.ts', mode: 'file' },
      }),
      pluginCypress({
        output: { path: 'cypress', mode: 'directory' },
        baseURL: 'http://localhost:3000',
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
    "@kubb/plugin-cypress": "workspace:*",
    "@kubb/plugin-ts": "workspace:*",
    "kubb": "catalog:",
    "react": "^19.3.0"
  },
  "devDependencies": {
    "cypress": "^16.1.1",
    "typescript": "catalog:"
  }
}
```

## Notes

- Source: `examples/cypress` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.js`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- The package declares `node >=22.12`. `generate` runs `KUBB_DISABLE_TELEMETRY=1 kubb generate`
- Replaces the v3/v4 shape (`@kubb/core`, `pluginOas`, `input: { path }`)

## Related

- [../plugins/plugin-cypress.md](../plugins/plugin-cypress.md)
