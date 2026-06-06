# Lint

steiger を使ったアーキテクチャ準拠チェックのコマンド集。

## FSD 準拠チェックの実行

```sh
npx steiger ./src
```

`./src` 配下のファイル構造を FSD ルールで検証する。

## ウォッチモードでの継続チェック

```sh
npx steiger ./src --watch
```

```sh
npx steiger ./src -w
```

ファイルシステムの変更を監視し、変更のたびに自動で再チェックする。

## steiger 設定ファイルの作成（TypeScript）

```sh
# steiger.config.ts を手動で作成する
```

```ts
import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
])
```

設定ファイル不要の場合はゼロコンフィグで動作する。

## 特定レイヤーのルールを無効化

```ts
import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ['./src/shared/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
])
```

`files` でファイルグロブを指定し、`rules` でルールを `'off'` にする。

## 特定ファイルをチェック対象から除外

```ts
import { defineConfig } from 'steiger'

export default defineConfig([
  { ignores: ['**/__mocks__/**'] },
])
```
