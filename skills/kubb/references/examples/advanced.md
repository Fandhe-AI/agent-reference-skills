# Advanced Configuration Example

複数プラグインを組み合わせた高度な設定例。Redoc、TypeScript 型、Zod スキーマ、React Query hooks、Axios クライアント、MCP サーバー、Faker モック、Cypress、MSW ハンドラーを同時に生成する。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { ast } from 'kubb/kit'
import { pluginAxios } from '@kubb/plugin-axios'
import { pluginCypress } from '@kubb/plugin-cypress'
import { pluginFaker, resolverFaker } from '@kubb/plugin-faker'
import { pluginMcp } from '@kubb/plugin-mcp'
import { pluginMsw } from '@kubb/plugin-msw'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginRedoc } from '@kubb/plugin-redoc'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'

import { defineConfig } from 'kubb/config'

export default defineConfig({
  name: 'gen',
  root: '.',
  input: './petStore.yaml',
  adapter: adapterOas({ unknownType: 'unknown', validate: true, discriminator: 'preserve', integerType: 'number', enums: 'root' }),
  output: {
    path: './src/gen',
    clean: true,
    barrel: { type: 'named' },
    defaultBanner: false,
    lint: false,
    format: 'oxfmt',
    postGenerate: ['npm run typecheck'],
  },
  plugins: [
    pluginRedoc(),
    pluginTs({
      output: {
        path: 'models/ts',
        mode: 'directory',
      },
      group: {
        type: 'tag',
      },
      arrayType: 'generic',
      enum: { type: 'asConst' },
      // Only schema types: consumers print operation types such as `AddPetOptions` inline.
      operations: 'inline',
      override: [
        {
          type: 'operationId',
          pattern: 'findPetsByStatus',
          options: {
            enum: { type: 'enum', constCasing: 'camelCase', typeSuffix: 'Key', keyCasing: 'none' },
          },
        },
      ],
    }),
    pluginZod({
      output: {
        path: './zod',
        mode: 'directory',
      },
      exclude: [
        {
          type: 'tag',
          pattern: 'store',
        },
      ],
      group: { type: 'tag' },
      inferred: true,
    }),
    pluginReactQuery({
      output: {
        path: './clients/hooks',
        mode: 'directory',
      },
      exclude: [
        {
          type: 'tag',
          pattern: 'store',
        },
        {
          type: 'tag',
          pattern: 'stream',
        },
      ],
      override: [
        {
          type: 'operationId',
          pattern: 'findPetsByTags',
          options: {
            infinite: {
              queryParam: 'pageSize',
              initialPageParam: 0,
            },
            mutation: {
              importPath: '@tanstack/react-query',
              methods: ['post', 'put', 'delete'],
            },
          },
        },
      ],
      // A custom name keeps one folder per tag. Without it the `payment` tag nests under its `parent` tag `store`, and the
      // relative `query.importPath` below fits one folder depth only.
      group: { type: 'tag', name: ({ group }) => group },
      query: {
        importPath: '../../../../tanstack-query-hook',
      },
      hooks: true,
      infinite: false,
      suspense: false,
    }),
    pluginAxios({
      output: {
        path: './clients/axios',
        mode: 'directory',
      },
      exclude: [
        {
          type: 'tag',
          pattern: 'store',
        },
      ],
      validator: 'zod',
      group: { type: 'tag', name: ({ group }) => `${group}Service` },
      baseURL: 'https://petstore3.swagger.io/api/v3',
      override: [
        {
          type: 'contentType',
          pattern: 'multipart/form-data',
          options: {
            validator: false,
          },
        },
        {
          type: 'contentType',
          pattern: 'application/octet-stream',
          options: {
            validator: false,
          },
        },
        {
          type: 'tag',
          pattern: 'stream',
          options: {
            validator: false,
          },
        },
      ],
    }),
    pluginMcp({
      output: {
        path: './mcp',
        mode: 'directory',
        barrel: false,
      },
      exclude: [
        {
          type: 'tag',
          pattern: 'store',
        },
        {
          type: 'tag',
          pattern: 'stream',
        },
      ],
      group: { type: 'tag' },
    }),
    pluginFaker({
      output: {
        path: 'mocks',
        mode: 'directory',
      },
      exclude: [
        {
          type: 'tag',
          pattern: 'store',
        },
      ],
      group: { type: 'tag' },
      macros: [
        {
          name: 'pet-status-values',
          schema(node) {
            if (node.name === 'Pet' && 'properties' in node) {
              return {
                ...node,
                properties: node.properties.map((property) =>
                  property.name === 'status'
                    ? { ...property, schema: ast.factory.createSchema({ type: 'enum', primitive: 'string', enumValues: ['available', 'pending'] }) }
                    : property,
                ),
              }
            }
            return node
          },
        },
      ],
      resolver: {
        name(name) {
          return `${resolverFaker.name(name)}Faker`
        },
        file: {
          baseName({ name, extname }) {
            return `${resolverFaker.name(name)}Faker${extname}`
          },
        },
      },
    }),
    pluginCypress({
      output: {
        path: 'cypress',
        mode: 'directory',
        barrel: false,
      },
      group: { type: 'tag' },
    }),
    pluginMsw({
      output: {
        path: 'msw',
        mode: 'directory',
      },
      handlers: true,
      exclude: [
        {
          type: 'tag',
          pattern: 'store',
        },
      ],
      group: { type: 'tag' },
    }),
  ],
})
```

## 依存関係

```json
{
  "dependencies": {
    "@faker-js/faker": "^10.6.0",
    "@kubb/plugin-axios": "workspace:*",
    "@kubb/plugin-cypress": "workspace:*",
    "@kubb/plugin-faker": "workspace:*",
    "@kubb/plugin-mcp": "workspace:*",
    "@kubb/plugin-msw": "workspace:*",
    "@kubb/plugin-react-query": "workspace:*",
    "@kubb/plugin-redoc": "workspace:*",
    "@kubb/plugin-zod": "workspace:*",
    "@modelcontextprotocol/server": "^2.4.0",
    "@tanstack/query-core": "^5.107.1",
    "@tanstack/react-query": "^5.107.1",
    "axios": "^1.21.1",
    "cypress": "^16.2.1",
    "msw": "^3.0.4",
    "react": "^19.3.1",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@kubb/adapter-oas": "catalog:",
    "@kubb/plugin-ts": "workspace:*",
    "kubb": "catalog:",
    "typescript": "catalog:"
  }
}
```

（`package.json` にはこのほか `@tanstack/vue-query` / `vue` / `solid-js` / `svelte` / `swr` / `@types/react` も列挙されているが、上の設定では使われない）

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@6.0.1/examples/advanced — `examples/advanced` of kubb-labs/plugins at tag `@kubb/plugin-client@6.0.1` (commit 8e70d907e7bb968e612990f1c8c31347257ac9ee, fetched 2026-11-14) (`configs/kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (the releases published with the pinned tags): `kubb` 5.20.0, `@kubb/adapter-oas` 5.20.0, `@kubb/plugin-ts` 5.5.1, `@kubb/plugin-axios` 6.0.1, `@kubb/plugin-cypress` 5.3.1, `@kubb/plugin-faker` 5.4.1, `@kubb/plugin-mcp` 5.5.1, `@kubb/plugin-msw` 6.2.1, `@kubb/plugin-react-query` 5.10.1, `@kubb/plugin-redoc` 5.2.2, `@kubb/plugin-zod` 5.9.1; `typescript`: use your project's version
- Migration (5.11 → 5.20): `@kubb/plugin-ts` 5.2.0 added `operations: 'inline'` (emit only schema types) and 5.5.0 nests a tag group in the folders of its OpenAPI 3.2 `parent` tags (a `payment` tag whose `parent` is `store` now writes to `store/payment/`); the example sets `operations: 'inline'` and `group: { type: 'tag', name: ({ group }) => group }` for `@kubb/plugin-react-query` to keep one folder per tag so the relative `query.importPath` still fits. See [../plugins/plugin-ts.md](../plugins/plugin-ts.md) and the `@kubb/plugin-ts` CHANGELOG
- Uses the v5 config shape (`kubb/config`, `adapterOas`, `output.postGenerate`, `barrel`). The `query.importPath` `'../../../../tanstack-query-hook'` and the `override` entries are specific to the example repository layout
- The `tanstack-query-hook` module referenced by that `importPath` is a local wrapper module that is not included here; set `importPath` to `'@tanstack/react-query'` or your own module so the example is self-contained
- `package.json` declares `node >=22.22`. Its scripts include `generate` (`KUBB_DISABLE_TELEMETRY=1 kubb generate`), `validate`, `mcp`, `studio`, and `typecheck` (`tsc`)

## Related

- [axios.md](./axios.md)
- [react-query.md](./react-query.md)
- [msw.md](./msw.md)
