# Zod Example

OpenAPI 仕様から Zod バリデーションスキーマを生成する設定例。通常の Zod、Zod Mini（`mini: true`）、ユニオン + readOnly の 3 つの生成を配列形式で定義する。

## kubb.config.js

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { defineConfig } from 'kubb/config'
import { pluginZodOperations } from './operationsPlugin.ts'

export default defineConfig([
  {
    name: 'zod',
    root: '.',
    input: './petStore.yaml',
    adapter: adapterOas({ unknownType: 'unknown' }),
    output: {
      path: './src/zod',
      clean: true,
    },
    plugins: [
      pluginTs({
        output: {
          path: './ts',
          mode: 'directory',
        },
      }),
      pluginZod({
        output: {
          path: './zod',
          mode: 'directory',
        },
        importPath: '../../zod.ts',
        inferred: true,
      }),
      pluginZodOperations(),
    ],
  },
  {
    name: 'zod-mini',
    root: '.',
    input: './petStore.yaml',
    adapter: adapterOas({ unknownType: 'unknown' }),
    output: {
      path: './src/mini',
      clean: true,
    },
    plugins: [
      pluginZod({
        output: {
          path: './zod',
          mode: 'directory',
        },
        mini: true,
      }),
    ],
  },
  {
    name: 'zod-union',
    root: '.',
    input: './unionWithReadOnly.yaml',
    adapter: adapterOas({ unknownType: 'unknown' }),
    output: {
      path: './src/gen3',
      clean: true,
    },
    plugins: [
      pluginZod({
        output: {
          path: './zod',
          mode: 'directory',
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
    "@kubb/plugin-ts": "workspace:*",
    "@kubb/plugin-zod": "workspace:*",
    "axios": "^1.21.1",
    "kubb": "catalog:",
    "react": "^19.3.1",
    "typescript": "catalog:",
    "zod": "^4.6.7"
  }
}
```

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@6.0.1/examples/zod — `examples/zod` of kubb-labs/plugins at tag `@kubb/plugin-client@6.0.1` (commit 8e70d907e7bb968e612990f1c8c31347257ac9ee, fetched 2026-11-14) (`kubb.config.js`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (the releases published with the pinned tags): `kubb` 5.20.0, `@kubb/adapter-oas` 5.20.0, `@kubb/plugin-ts` 5.5.1, `@kubb/plugin-zod` 5.9.1; `typescript`: use your project's version
- The config imports a local `pluginZodOperations` from `./operationsPlugin.ts`, which is a custom plugin in the example repository and is not included here. In v5 the `operations` option of `@kubb/plugin-zod` is removed, so rebuilding operation/path maps needs a custom plugin
- `importPath: '../../zod.ts'` points to a local re-export module in the example repository that is not included here; replace it with `'zod'` or your own wrapper module. `pluginZodOperations` (and its import) must also be removed or replaced, otherwise the config cannot be resolved
- The package declares `node >=22.22`; its `generate` script runs `KUBB_DISABLE_TELEMETRY=1 kubb --config kubb.config.js`
- Replaces the v3/v4 shape (`typed: true`, `dateType` on the plugin, `pluginOas`). Use `inferred: true` (see [../plugins/plugin-zod.md](../plugins/plugin-zod.md))

## Related

- [../plugins/plugin-zod.md](../plugins/plugin-zod.md)
- [typescript.md](./typescript.md)
