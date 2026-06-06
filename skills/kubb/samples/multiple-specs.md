# Multiple OpenAPI Specs

複数の OpenAPI 仕様ファイルを1つの設定で並列処理するワークフロー。

```typescript
// kubb.config.ts
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig([
  {
    name: 'petStore',
    input: { path: './specs/petStore.yaml' },
    output: { path: './src/gen/petStore', clean: true },
    plugins: [
      pluginOas({ generators: [] }),
      pluginTs({ output: { path: 'models' } }),
    ],
  },
  {
    name: 'userApi',
    input: { path: './specs/userApi.yaml' },
    output: { path: './src/gen/userApi', clean: true },
    plugins: [
      pluginOas({ generators: [] }),
      pluginTs({ output: { path: 'models' } }),
    ],
  },
])
```

URL からリモートの仕様を直接参照する場合:

```typescript
export default defineConfig([
  {
    name: 'externalApi',
    input: { path: 'https://api.example.com/openapi.json' },
    output: { path: './src/gen/external' },
    plugins: [pluginOas(), pluginTs()],
  },
])
```

## Notes

- 配列形式でエクスポートすると各設定が並列実行される
- `name` フィールドを指定すると CLI 出力で設定を識別しやすくなる
- リモート URL 参照時はネットワーク到達性とスキーマの安定性に注意する
- 各設定は独立した `output.path` を持つ必要がある
