# Basic TypeScript Generation

OpenAPI 仕様から TypeScript 型を生成する最小構成のワークフロー。

```typescript
// kubb.config.ts
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  input: './petStore.yaml',
  output: {
    path: './src/gen',
    clean: true,
  },
  plugins: [
    pluginTs({
      output: { path: 'models' },
    }),
  ],
})
```

```bash
# インストール
npm install --save-dev kubb @kubb/plugin-ts

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

- v5 系では `@kubb/plugin-oas` は廃止され、OpenAPI のパース・バリデーションは `kubb` パッケージに同梱される `@kubb/adapter-oas` がデフォルトで担う。明示的にオプションを渡す必要がなければ `adapter` フィールド自体を省略できる
- `input` はパス・URL・スペック文字列・パース済みオブジェクトを直接受け取る。旧形式 `input: { path }` / `input: { data }` は `KUBB_LEGACY_INPUT` で失敗する
- `output.clean: true` で生成前に出力ディレクトリをクリーンアップする
- `input` にはローカルファイルパスだけでなく URL も指定可能
