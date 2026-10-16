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
    "axios": "^1.20.0",
    "kubb": "catalog:",
    "react": "^19.3.0",
    "typescript": "catalog:",
    "zod": "^4.6.6"
  }
}
```

## Notes

- Source: `examples/zod` of kubb-labs/plugins at tag `@kubb/plugin-client@5.5.15` (`kubb.config.js`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- The config imports a local `pluginZodOperations` from `./operationsPlugin.ts`, which is a custom plugin in the example repository and is not included here. In v5 the `operations` option of `@kubb/plugin-zod` is removed, so rebuilding operation/path maps needs a custom plugin
- The package declares `node >=22.12`; its `generate` script runs `KUBB_DISABLE_TELEMETRY=1 kubb --config kubb.config.js`
- Replaces the v3/v4 shape (`typed: true`, `dateType` on the plugin, `pluginOas`). Use `inferred: true` (see [../plugins/plugin-zod.md](../plugins/plugin-zod.md))

## Related

- [../plugins/plugin-zod.md](../plugins/plugin-zod.md)
- [typescript.md](./typescript.md)
