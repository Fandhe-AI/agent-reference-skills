# MSW Example

OpenAPI 仕様から MSW（Mock Service Worker）ハンドラーと Faker モックを生成する設定例。

## kubb.config.js

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginFaker } from '@kubb/plugin-faker'
import { pluginMsw } from '@kubb/plugin-msw'
import { pluginTs } from '@kubb/plugin-ts'
import { defineConfig } from 'kubb/config'

export default defineConfig(() => {
  return {
    root: '.',
    input: './petStore.yaml',
    output: {
      path: './src/gen',
      clean: true,
      lint: false,
      format: false,
      postGenerate: ['npm run typecheck'],
    },
    adapter: adapterOas({ unknownType: 'unknown', enums: 'root' }),
    plugins: [
      pluginTs({
        output: {
          path: 'models',
          mode: 'directory',
        },
      }),
      pluginFaker({
        output: {
          path: './mocks',
          mode: 'directory',
        },
        group: {
          type: 'tag',
          name({ group }) {
            return `${group}Mocks`
          },
        },
        seed: [220],
      }),
      pluginMsw({
        output: {
          path: './msw',
          mode: 'directory',
        },
        handlers: true,
        group: {
          type: 'tag',
          name({ group }) {
            return `${group}/Handlers`
          },
        },
        baseURL: 'http://localhost:3000',
      }),
    ],
  }
})
```

## 依存関係

```json
{
  "dependencies": {
    "@faker-js/faker": "^10.6.0",
    "@kubb/adapter-oas": "catalog:",
    "@kubb/plugin-faker": "workspace:*",
    "@kubb/plugin-msw": "workspace:*",
    "@kubb/plugin-ts": "workspace:*",
    "@mswjs/http-middleware": "^0.10.3",
    "kubb": "catalog:",
    "msw": "^2.15.0"
  }
}
```

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@5.5.15/examples/msw — `examples/msw` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.js`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (npm latest): `kubb` 5.11.0, `@kubb/adapter-oas` 5.11.0, `@kubb/plugin-ts` 5.0.14, `@kubb/plugin-faker` 5.1.9, `@kubb/plugin-msw` 5.1.3
- This config does not set `parser: 'faker'`, so handlers use the default `data` parser (see [../plugins/plugin-msw.md](../plugins/plugin-msw.md)). The package script `start:server` runs `bun ./src/server.ts` and declares `node >=22.12`
- Replaces the v3/v4 shape (`@kubb/core`, `pluginOas`, `input: { path }`)

## Related

- [../plugins/plugin-msw.md](../plugins/plugin-msw.md)
- [faker.md](./faker.md)
