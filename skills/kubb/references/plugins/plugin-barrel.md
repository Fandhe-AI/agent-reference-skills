# @kubb/plugin-barrel

Kubb が生成したコードの `index.ts` バレルファイルを書き出すプラグイン。Kubb に標準同梱され、`output.barrel` を設定した場合のみ出力を行う。

## インストール

```bash
npm install --save-dev @kubb/plugin-barrel@beta
```

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output.barrel`（ルートレベル） | `{ type: 'named' \| 'all', nested?: boolean } \| false` | 未設定（無効） | バレル生成の有無・方式を制御。`'named'` は named export、`'all'` はワイルドカード export、`nested` はサブディレクトリ毎にもバレルを生成 |

各プラグインは自身の `output.barrel` でルート設定を上書きできる。

## 設定例

```typescript
import { defineConfig } from 'kubb'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', barrel: { type: 'named' } },
  plugins: [],
})
```

```typescript
// src/gen/index.ts
export { getUser, User } from './api/user'
export { getPost, Post } from './api/post'
```

## Notes

- プラグイン出力ディレクトリ毎に 1 つのバレルと、`output.path/index.ts` にルートバレルを生成し、`import { Pet, usePetByIdQuery, petMock } from './gen'` のような集約 import を可能にする
- 執筆時点（v3.x 系）で `@beta` タグでの配布

## Related

- [@kubb/plugin-axios](./plugin-axios.md)
- [@kubb/plugin-fetch](./plugin-fetch.md)
- [@kubb/plugin-client](./plugin-client.md)
