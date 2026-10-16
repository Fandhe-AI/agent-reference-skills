---
source: https://r3f.docs.pmnd.rs/getting-started/installation
---

# Install

`@react-three/fiber` のインストールと、Vite.js / Next.js 向けのセットアップコマンド。

## パッケージのインストール

```sh
npm install three @types/three @react-three/fiber
```

TypeScript 利用時は `@types/three` を含める（introduction.mdx 記載）。JavaScript のみなら `npm install three @react-three/fiber`（installation.mdx 記載）。React との版対応は `@react-three/fiber@9` が `react@19`、`@react-three/fiber@8` が `react@18`。

## Vite.js プロジェクトの作成

```sh
# Create app
npm create vite my-app

# Select react as framework

# Install dependencies
cd my-app
npm install three @react-three/fiber

# Start development server
npm run dev
```

`npm create vite` の対話プロンプトで framework に react を選択する。

## Next.js 13.1 以降の設定

```js
transpilePackages: ['three'],
```

`next.config.js` に追記する（コマンドではなく設定。three.js エコシステムの未トランスパイル add-on 対策）。

## Next.js 13.0 以前の設定

```sh
npm install next-transpile-modules --save-dev
```

```js
const withTM = require('next-transpile-modules')(['three'])
module.exports = withTM()
```

`next-transpile-modules` は Next.js 13.0 以前のみで使う。13.1 以降は上記の `transpilePackages` を使う。
