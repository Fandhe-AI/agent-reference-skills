# Faker Example

OpenAPI 仕様から Faker.js モックデータのファクトリを生成する設定例（CommonJS の `kubb.config.cjs`、配列形式で 2 つの生成を定義）。

## kubb.config.cjs

```javascript
const { defineConfig } = require('kubb')

const { adapterOas } = require('@kubb/adapter-oas')
const { pluginFaker } = require('@kubb/plugin-faker')
const { pluginTs } = require('@kubb/plugin-ts')

module.exports = defineConfig(() => {
  return [
    {
      root: '.',
      input: './petStore.yaml',
      output: {
        path: './src/gen',
        lint: false,
        format: false,
        clean: true,
        postGenerate: ['npm run typecheck'],
      },
      adapter: adapterOas({ unknownType: 'unknown' }),
      plugins: [
        pluginTs({
          output: {
            path: 'models',
            mode: 'directory',
          },
        }),
        pluginFaker({
          output: {
            path: './tag',
            mode: 'directory',
          },
          include: [
            {
              type: 'tag',
              pattern: 'store',
            },
          ],
          typeMode: 'schema',
        }),
      ],
    },
    {
      root: '.',
      input: './petStore.yaml',
      output: {
        path: './src/gen',
        lint: false,
        format: false,
        postGenerate: ['npm run typecheck'],
      },
      adapter: adapterOas({ unknownType: 'unknown', dateType: 'string' }),
      plugins: [
        pluginTs({
          output: {
            path: 'models',
            mode: 'directory',
          },
        }),
        pluginFaker({
          output: {
            path: './faker',
            mode: 'directory',
          },
          include: [
            {
              type: 'operationId',
              pattern: 'updatePet',
            },
          ],
          exclude: [
            {
              type: 'tag',
              pattern: 'store',
            },
          ],
          override: [
            {
              type: 'schemaName',
              pattern: /Order/i,
              options: {
                dateParser: 'dayjs',
              },
            },
          ],
        }),
      ],
    },
  ]
})
```

## 依存関係

```json
{
  "dependencies": {
    "@faker-js/faker": "^10.6.0",
    "@kubb/adapter-oas": "catalog:",
    "@kubb/plugin-faker": "workspace:*",
    "@kubb/plugin-ts": "workspace:*",
    "dayjs": "^1.11.23",
    "kubb": "catalog:",
    "react": "^19.3.1"
  },
  "devDependencies": {
    "typescript": "catalog:"
  }
}
```

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@6.0.1/examples/faker — `examples/faker` of kubb-labs/plugins at tag `@kubb/plugin-client@6.0.1` (commit 8e70d907e7bb968e612990f1c8c31347257ac9ee, fetched 2026-11-14) (`kubb.config.cjs`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (the releases published with the pinned tags): `kubb` 5.20.0, `@kubb/adapter-oas` 5.20.0, `@kubb/plugin-ts` 5.5.1, `@kubb/plugin-faker` 5.4.1; `typescript`: use your project's version
- The package is `"type": "commonjs"` and declares `node >=22.22`. The config shows `typeMode: 'schema'`, a per-schema `override` of `dateParser: 'dayjs'`, and `include` / `exclude` filters
- This example uses `resolverFaker` only in the advanced example; the v5 plugin no longer accepts `paramsCasing` / `mapper` (see [../plugins/plugin-faker.md](../plugins/plugin-faker.md))

## Related

- [../plugins/plugin-faker.md](../plugins/plugin-faker.md)
- [msw.md](./msw.md)
