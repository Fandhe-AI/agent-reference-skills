# Basic TypeScript Generation

OpenAPI 仕様から TypeScript 型を生成する最小構成のワークフロー。

```typescript
// kubb.config.ts
import { defineConfig } from '@kubb/core'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  root: '.',
  input: {
    path: './petStore.yaml',
  },
  output: {
    path: './src/gen',
    clean: true,
  },
  plugins: [
    pluginOas({ validate: true, generators: [] }),
    pluginTs({
      output: { path: 'models' },
    }),
  ],
})
```

```bash
# インストール
npm install --save-dev @kubb/cli @kubb/core @kubb/plugin-oas @kubb/plugin-ts

# 生成実行
npx kubb generate
```

生成結果（`src/gen/models/Pet.ts`）:

```typescript
export type Pet = {
  /** @type integer, int64 */
  id: number
  /** @type string */
  name: string
  /** @type string | undefined */
  tag?: string
}
```

## Notes

- `pluginOas` は必ず最初に配置する（他プラグインのベースとなる）
- `generators: []` を指定すると JSON スキーマファイルの生成をスキップできる
- `output.clean: true` で生成前に出力ディレクトリをクリーンアップする
- `input.path` にはローカルファイルパスだけでなく URL も指定可能
