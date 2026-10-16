# Upgrade

React Router v7 から v8 へのアップグレード手順。

## 前提バージョン

React Router v8 は以下の最小バージョンを要求する。React Router 自体を v8 にする前に更新しておくこと。

- `node@22.22+`
- `react@19.2.7+` / `react-dom@19.2.7+`
- Framework Mode の場合は `vite@7+`（`future.v8_viteEnvironmentApi` に必要）

## v7 系を最新化

```sh
npm install react-router@7 @react-router/dev@7 @react-router/node@7
```

Future Flags を有効化する前に、まず v7.x の最新マイナーバージョンへ更新する。例は `@react-router/dev` と `@react-router/node` の場合。使用している `@react-router/*` パッケージに合わせて増減する。

## Future Flags の有効化

`react-router.config.ts`（Framework Mode）または `createBrowserRouter` の `future` オプション（Data Mode）で、以下のフラグを個別に有効化してから動作確認する: `future.v8_middleware` / `future.v8_splitRouteModules` / `future.v8_viteEnvironmentApi` / `future.v8_passThroughRequests` / `future.v8_trailingSlashAwareDataRequests`。フラグごとにコミットしてから次に進むことが推奨されている。

## react-router-dom の削除

> **警告**: v8 は `react-router-dom` の re-export パッケージを削除する。`react-router-dom` からのインポートは全て `react-router`（DOM 系 API は `react-router/dom`）に書き換えたうえで実行すること。

```sh
npm uninstall react-router-dom
```

## v8 へアップグレード

> **警告**: メジャーバージョンアップグレードのため、事前に Future Flags を全て有効化し動作確認を済ませてから実行すること。

```sh
# Data Mode / Declarative Mode
npm install react-router@latest

# Framework Mode
npm install react-router@latest @react-router/dev@latest @react-router/node@latest
```

## v8 系を最新化

```sh
npm install react-router@8 @react-router/dev@8 @react-router/node@8
```

v9 向けの future flag や call-site opt-in を採用する前に、v8.x の最新マイナーバージョンへ更新する。更新中に非推奨警告が出る場合がある。例は `@react-router/dev` と `@react-router/node` の場合。使用している `@react-router/*` パッケージに合わせて増減する。

v9 は `node@24+` を要求する予定（公式 future.md の見積もりは 2027 年半ば、Node 22 の EOL 時期）。v8 のうちに Node を更新して備えられる。

## Unstable Future Flags（任意）

> **警告**: unstable フラグは本番利用が推奨されず、patch / minor リリースでも破壊的変更が入りうる。ベータテスト目的でのみ採用すること。

Framework Mode（`react-router.config.ts`）:

```ts
import type { Config } from "@react-router/dev/config";

export default {
  future: {
    // 全ランタイム（Node 含む）で renderToReadableStream を既定にする
    unstable_enableNodeReadableStream: true,
    // Vite の依存最適化にクライアントエントリとルートモジュールを渡す
    unstable_optimizeDeps: true,
  },
} satisfies Config;
```

`unstable_optimizeDeps` で依存最適化の問題が出た場合は、フラグを外して dev サーバーを再起動する。

Data Mode（`createBrowserRouter` の `future`）: `unstable_routePatternMatching`。ルーター作成前に `react-router/route-pattern` の `unstable_preloadRoutePattern()` を必ず呼ぶ（未初期化だとルーター作成が throw する）。

```ts
import { createBrowserRouter } from "react-router";
import { unstable_preloadRoutePattern } from "react-router/route-pattern";

unstable_preloadRoutePattern();

const router = createBrowserRouter(routes, {
  future: {
    unstable_routePatternMatching: true,
  },
});
```

- ランキングが従来と異なる場合がある。位置ごとの specificity で判定するため、`/products/*` は `/:first/:second/:third/:fourth` より優先される（従来のマッチャーは後者を選ぶ）
- 単独の `matchPath` / `matchRoutes` / `useMatch` は従来のマッチャーのままで、ルーターと異なる結果を返しうる
- case-sensitive なルートは未対応
