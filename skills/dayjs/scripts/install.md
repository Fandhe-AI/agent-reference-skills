# Install

Day.js のインストールと初期セットアップ。

## npm でのインストール

```sh
npm install dayjs
```

## yarn でのインストール

```sh
yarn add dayjs
```

## pnpm でのインストール

```sh
pnpm add dayjs
```

## CommonJS での読み込み

```sh
node -e "const dayjs = require('dayjs'); console.log(dayjs().format())"
```

前提: Node.js 環境。`npm install dayjs` 済み。

## ES Modules での読み込み（TypeScript / ESM）

```sh
# tsconfig.json に esModuleInterop: true が必要
import dayjs from 'dayjs'
dayjs().format()
```

## TypeScript 向け tsconfig.json の設定

```sh
# tsconfig.json に以下を追加
# {
#   "compilerOptions": {
#     "esModuleInterop": true,
#     "allowSyntheticDefaultImports": true
#   }
# }
```

TypeScript では `@types/dayjs` は不要。Day.js 本体に型定義が同梱されている。

## TypeScript でのネームスペースインポート（esModuleInterop 不要）

```sh
import * as dayjs from 'dayjs'
dayjs().format()
```

## ブラウザ — CDN（jsDelivr）

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
<script>dayjs().format()</script>
```

## ブラウザ — ローカルファイル

```html
<script src="path/to/dayjs/dayjs.min.js"></script>
<script>
  dayjs().format()
</script>
```
