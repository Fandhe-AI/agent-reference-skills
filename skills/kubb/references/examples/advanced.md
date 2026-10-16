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
      group: { type: 'tag' },
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
    "@modelcontextprotocol/server": "^2.3.1",
    "@tanstack/query-core": "^5.104.2",
    "@tanstack/react-query": "^5.104.2",
    "axios": "^1.20.0",
    "cypress": "^16.1.1",
    "msw": "^2.15.0",
    "react": "^19.3.0",
    "zod": "^4.6.6"
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

- Source: `examples/advanced` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`configs/kubb.config.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Uses the v5 config shape (`kubb/config`, `adapterOas`, `output.postGenerate`, `barrel`). The `query.importPath` `'../../../../tanstack-query-hook'` and the `override` entries are specific to the example repository layout
- `package.json` declares `node >=22.12`. Its scripts include `generate` (`KUBB_DISABLE_TELEMETRY=1 kubb generate`), `validate`, `mcp`, `studio`, and `typecheck` (`tsc`)

## Related

- [axios.md](./axios.md)
- [react-query.md](./react-query.md)
- [msw.md](./msw.md)
