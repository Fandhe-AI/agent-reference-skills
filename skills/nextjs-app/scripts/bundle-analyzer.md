# Bundle Analyzer

App Router アプリケーションのバンドルサイズを解析するコマンド集（Turbopack 版 / `@next/bundle-analyzer` Webpack プラグイン版）。

## Turbopack Bundle Analyzer を起動する（experimental, v16.1+）

```sh
npx next experimental-analyze
```

ブラウザでインタラクティブなモジュールグラフを開く。ルート・環境（client/server）・種別（JavaScript/CSS/JSON）でフィルタし、モジュールの import chain を辿れる。ビルド成果物は生成しない。

## 解析結果をファイルに書き出す（サーバー起動なし）

```sh
npx next experimental-analyze --output
```

`.next/diagnostics/analyze` に静的ファイルとして出力される。チームで共有したり、リファクタ前後の比較に使う。

## 解析結果を比較用に別ディレクトリへコピーする

```sh
cp -r .next/diagnostics/analyze ./analyze-before-refactor
```

## ポートを指定して解析サーバーを起動する

```sh
npx next experimental-analyze --port 5000
```

default ポートは 4000（環境変数 `PORT` でも指定可能）。

## mangling を無効化して解析する（デバッグ用）

```sh
npx next experimental-analyze --no-mangling
```

パフォーマンスに影響するためデバッグ目的でのみ使用する。

## @next/bundle-analyzer（Webpack）をインストールする

```sh
npm install @next/bundle-analyzer
```

インストール後、`next.config.js` に以下を追加する。

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

## Webpack バンドルを解析する

```sh
ANALYZE=true npm run build
```

ブラウザに解析レポートが3タブ開く。`yarn build` / `pnpm build` でも `ANALYZE=true` を先頭に付ければ同様に動作する。

Source: https://nextjs.org/docs/app/guides/package-bundling
