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
    "@msw/serve": "^0.11.0",
    "kubb": "catalog:",
    "msw": "^3.0.4"
  }
}
```

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@6.0.1/examples/msw — `examples/msw` of kubb-labs/plugins at tag `@kubb/plugin-client@6.0.1` (commit 8e70d907e7bb968e612990f1c8c31347257ac9ee, fetched 2026-11-14) (`kubb.config.js`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (the releases published with the pinned tags): `kubb` 5.20.0, `@kubb/adapter-oas` 5.20.0, `@kubb/plugin-ts` 5.5.1, `@kubb/plugin-faker` 5.4.1, `@kubb/plugin-msw` 6.2.1
- This config does not set `parser: 'faker'`, so handlers use the default `data` parser (see [../plugins/plugin-msw.md](../plugins/plugin-msw.md)). The package script `start:server` runs `bun ./src/server.ts` and declares `node >=22.22`
- Migration (5.11 → 5.20): `@kubb/plugin-msw` 6.0.0 generates handlers for MSW 3 and needs `msw@^3.0.0` (imports `http` / `HttpResponse` / `HttpResponseResolver` from `msw/http`). The example's dev server package changed from `@mswjs/http-middleware` to `@msw/serve` and `@types/express` was dropped
- Replaces the v3/v4 shape (`@kubb/core`, `pluginOas`, `input: { path }`)

## Related

- [../plugins/plugin-msw.md](../plugins/plugin-msw.md)
- [faker.md](./faker.md)
