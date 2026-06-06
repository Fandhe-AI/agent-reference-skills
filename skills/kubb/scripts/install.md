# install

Kubb および関連パッケージのインストール。

## インタラクティブセットアップ（推奨）

```sh
npx kubb init
```

ウィザードが以下を自動実行する: `package.json` の検出または作成、OpenAPI 仕様ファイルのパス確認、出力ディレクトリの指定、プラグイン選択、依存パッケージのインストール、`kubb.config.ts` の生成。

## コアパッケージのインストール（npm）

```sh
npm install --save-dev @kubb/cli @kubb/core
```

## コアパッケージのインストール（pnpm）

```sh
pnpm add -D @kubb/cli @kubb/core
```

## コアパッケージのインストール（yarn）

```sh
yarn add -D @kubb/cli @kubb/core
```

## コアパッケージのインストール（bun）

```sh
bun add -d @kubb/cli @kubb/core
```

## プラグインのインストール: TypeScript 型生成

```sh
npm install --save-dev @kubb/plugin-ts
```

## プラグインのインストール: HTTP クライアント生成

```sh
npm install --save-dev @kubb/plugin-client
```

## プラグインのインストール: データフェッチ系

```sh
npm install --save-dev @kubb/plugin-react-query
npm install --save-dev @kubb/plugin-swr
npm install --save-dev @kubb/plugin-vue-query
npm install --save-dev @kubb/plugin-solid-query
npm install --save-dev @kubb/plugin-svelte-query
```

## プラグインのインストール: バリデーション・テスト系

```sh
npm install --save-dev @kubb/plugin-zod     # ランタイムバリデーション
npm install --save-dev @kubb/plugin-faker   # モックデータ生成
npm install --save-dev @kubb/plugin-msw     # Mock Service Worker ハンドラー生成
npm install --save-dev @kubb/plugin-cypress # E2E テストユーティリティ生成
```

## インストール確認

```sh
npx kubb --version
```

## unplugin-kubb のインストール（ビルドツール統合用）

```sh
npm install --save-dev unplugin-kubb @kubb/core
```

Vite、webpack、Rollup、esbuild、Nuxt、Astro、Rspack に対応。
