# Upgrade

React Router v7 から v8 へのアップグレード手順。

## 前提バージョン

React Router v8 は以下の最小バージョンを要求する。React Router 自体を v8 にする前に更新しておくこと。

- `node@22.22+`
- `react@19.2.7+` / `react-dom@19.2.7+`
- Framework Mode の場合は `vite@7+`（`future.v8_viteEnvironmentApi` に必要）

## v7 系を最新化

```sh
npm install react-router@7 @react-router/{dev,node,etc.}@7
```

Future Flags を有効化する前に、まず v7.x の最新マイナーバージョンへ更新する。`{dev,node,etc.}` は使用している `@react-router/*` パッケージ名に置き換える。

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
npm install react-router@latest @react-router/{dev,node,etc.}@latest
```
