# install

Kubb および関連パッケージのインストール（kubb 5.11.0 基準）。

## インタラクティブセットアップ（推奨）

```sh
npx kubb init
```

ウィザードが `package.json` の検出または作成、OpenAPI 仕様のパス・出力ディレクトリの確認、プラグイン選択（Kubb registry の一覧）、依存パッケージのインストール、`kubb.config.ts` の生成を行う。`kubb` は実行中の CLI と同一バージョンでインストールされる。

## kubb パッケージのインストール（npm）

```sh
npm install -D kubb @kubb/plugin-ts typescript
```

`kubb` は CLI・core ランタイム・OpenAPI adapter・TypeScript / TSX / Markdown parser を同梱する。出力ごとに別プラグインパッケージが必要。前提は Node.js 22.12 以上。

## kubb パッケージのインストール（pnpm）

```sh
pnpm add -D kubb @kubb/plugin-ts typescript
```

## kubb パッケージのインストール（yarn）

```sh
yarn add -D kubb @kubb/plugin-ts typescript
```

## kubb パッケージのインストール（bun）

```sh
bun add -d kubb @kubb/plugin-ts typescript
```

## レジストリからのプラグイン追加

```sh
npx kubb add plugin-zod
```

Kubb registry が pin したバージョンでインストールし、プラグインは `kubb.config.ts` にも追記する。詳細は `cli.md` の `kubb add` を参照。

## プラグインのインストール: TypeScript 型生成

```sh
npm install --save-dev @kubb/plugin-ts
```

## プラグインのインストール: HTTP クライアント生成

```sh
npm install --save-dev @kubb/plugin-axios
npm install --save-dev @kubb/plugin-fetch
```

> v5 では `@kubb/plugin-client` は Axios / Fetch に置き換えられ、`@kubb/plugin-oas` は adapter に置き換えられた（公式 migration ガイド）。

## プラグインのインストール: データフェッチ系

```sh
npm install --save-dev @kubb/plugin-react-query
npm install --save-dev @kubb/plugin-vue-query
npm install --save-dev @kubb/plugin-swr
```

> `@kubb/plugin-solid-query` と `@kubb/plugin-svelte-query` は v5 で削除済みで、後継は無い（公式 migration ガイド。最終版は 4.39.3）。`@kubb/plugin-swr` は v5 でも提供される（plugin-swr 5.4.3）。

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

## ビルドツール統合（unplugin-kubb）

`unplugin-kubb` は `kubb` に同梱され、`kubb/vite` 等のサブパスから import する。

```ts
// vite.config.ts
import kubb from 'kubb/vite'
```

```ts
// webpack.config.ts
import kubb from 'kubb/webpack'
```

> 単体パッケージ `unplugin-kubb`（README のインストール例は `unplugin-kubb @kubb/core`、import は `unplugin-kubb/vite` 形式）も引き続き存在する。docs 5.x の integrations は `kubb/vite` / `kubb/webpack` / `kubb/rollup` / `kubb/rolldown` / `kubb/rspack` / `kubb/esbuild` / `kubb/farm` / `kubb/nuxt` / `kubb/astro` を使う。
