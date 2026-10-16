# Bundle Analyzer

App Router アプリケーションのバンドルサイズを解析するコマンド集（Turbopack 版 `next analyze` / `@next/bundle-analyzer` Webpack プラグイン版）。対象 Next.js v16.4.2。

## Turbopack Bundle Analyzer を起動する

```sh
npx next analyze
```

ブラウザでインタラクティブなモジュールグラフを開く。ルート・client/server ビューで絞り込み、モジュールの import chain を辿れる。アプリケーションビルドは生成しない。`next experimental-analyze`（v16.1.0 で追加）は `next analyze` に置き換わった（v16.4.2 の CLI リファレンスには `next analyze` のみ記載）。

## 解析結果をファイルに書き出す（サーバー起動なし）

```sh
npx next analyze --output
```

`<distDir>/diagnostics/analyze`（通常 `.next/diagnostics/analyze`）にバイナリ解析データと UI ファイルを書き出す。チームで共有したり、リファクタ前後の比較に使う。

## 名前付きスナップショットを保存する

```sh
npx next analyze --output --snapshot audit-1
```

同名のスナップショットが既にある場合は置き換えられる。

## 保存済みスナップショットを JSON Lines で書き出す（v16.4.0）

```sh
npx next analyze export --snapshot audit-1 > graph.jsonl
```

再ビルドせず、保存済みグラフを 1 行 1 JSON オブジェクトで出力する。`--snapshot` 省略時は最新のスナップショットを使う。`export` は解析自体も Web UI の起動も行わない。

## 特定ルートのみ書き出す

```sh
npx next analyze export --snapshot audit-1 --route <route>
```

モジュールグラフ全体は含まれたまま、書き出しが指定ルートに限定される。ほかに `[directory]` と `--dist-dir <directory>`（`next.config` を読まずにビルドディレクトリを指定）が使える。

## 解析結果を比較用に別ディレクトリへコピーする

```sh
cp -r .next/diagnostics/analyze ./analyze-before-refactor
```

## Turbopack ビルド時に解析データを生成する

```sh
npx next build --analyze
```

Turbopack ビルド中にインタラクティブアナライザー用の解析データを生成する。

## ポートを指定して解析サーバーを起動する

```sh
npx next analyze --port 5000
```

default ポートは 4000（環境変数 `PORT` でも指定可能）。

## mangling を無効化して解析する（デバッグ用）

```sh
npx next analyze --no-mangling
```

パフォーマンスに影響するためデバッグ目的でのみ使用する。

## React Profiler 用に解析する

```sh
npx next analyze --profile
```

production profiling for React を有効にする。パフォーマンスに影響する場合がある。

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

Source: https://nextjs.org/docs/app/api-reference/cli/next, https://nextjs.org/docs/app/guides/package-bundling
