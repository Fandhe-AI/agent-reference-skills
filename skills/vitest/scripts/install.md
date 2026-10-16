# install

vitest および関連パッケージのインストール。

## 前提条件

Vitest requires Vite >=v6.4.0 and Node >=v22.12.0

`engines` フィールドは `^22.12.0 || ^24.0.0 || >=26.0.0`。

## vitest 本体のインストール

```sh
npm install -D vitest
```

```sh
yarn add -D vitest vite
```

```sh
pnpm add -D vitest
```

```sh
bun add -D vitest
```

```sh
deno add -D vitest
```

v5 で `vite` は直接依存ではなく必須 peer dependency になった。npm / pnpm / Bun / Deno は peer dependency を自動インストールするが、Yarn は自動インストールしないため `vite` を明示する。

Deno 2.8 未満では CLI でも `npm:` 接頭辞が必要（`deno add -D npm:vitest`）。Deno 2.8 以降は接頭辞なしのパッケージ名を npm パッケージとして扱う（出典: https://docs.deno.com/runtime/reference/cli/add/）。

インストールなしで直接実行する場合は `npx vitest` を使用する。

## カバレッジプロバイダーのインストール（v8）

```sh
npm install -D @vitest/coverage-v8
```

```sh
pnpm add -D @vitest/coverage-v8
```

## カバレッジプロバイダーのインストール（istanbul）

```sh
npm install -D @vitest/coverage-istanbul
```

```sh
pnpm add -D @vitest/coverage-istanbul
```

## Vitest UI のインストール

```sh
npm install -D @vitest/ui
```

```sh
pnpm add -D @vitest/ui
```

## ブラウザモード（Playwright プロバイダー）のインストール

```sh
npm install -D vitest @vitest/browser-playwright
```

```sh
yarn add -D vitest vite @vitest/browser-playwright
```

```sh
pnpm add -D vitest @vitest/browser-playwright
```

```sh
bun add -D vitest @vitest/browser-playwright
```

Yarn では `vite` の明示が必要。

## ブラウザモード（WebdriverIO プロバイダー）のインストール

```sh
npm install -D vitest @vitest/browser-webdriverio
```

```sh
yarn add -D vitest vite @vitest/browser-webdriverio
```

```sh
pnpm add -D vitest @vitest/browser-webdriverio
```

```sh
bun add -D vitest @vitest/browser-webdriverio
```

`@vitest/browser-webdriverio` は vitest-community organization（`vitest-community/vitest-webdriverio`）へ移管済み。コミュニティ管理のため、プロバイダー固有の問題は移管先リポジトリへ報告する。

## ブラウザモード（Preview プロバイダー）のインストール

CI 環境での使用は非推奨。

```sh
npm install -D vitest @vitest/browser-preview
```

```sh
yarn add -D vitest vite @vitest/browser-preview
```

```sh
pnpm add -D vitest @vitest/browser-preview
```
