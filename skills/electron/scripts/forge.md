---
source: https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging
---

# Electron Forge

Electron Forge によるパッケージング・公開・自動更新。出典は tutorial-packaging と tutorial-publishing-updating（`https://www.electronjs.org/docs/latest/tutorial/tutorial-publishing-updating`）の v44.8.0 tag 原文。44-x-y ブランチでは Forge import 手順の文面が更新済み（未リリース）で、本ファイルは v44.8.0 tag の記述に従う。

## Forge CLI のインストールとプロジェクトの import

```sh
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

Yarn の場合は `yarn add --dev @electron-forge/cli` と `yarn electron-forge import`。import 後に `start` / `package` / `make` スクリプトと `forge.config.js` が追加される。

## 配布物の作成

```sh
npm run make
```

`electron-forge package` の後、設定済み maker ごとに配布物を `out/make` に生成する。

## GitHub Publisher の追加

```sh
npm install --save-dev @electron-forge/publisher-github
```

`forge.config.js` の `publishers` に設定する。認証トークンは既定で環境変数 `GITHUB_TOKEN` から読まれる。トークンは秘密にし、コマンドやファイルへ直書きしない。

## GitHub Releases への公開

> **警告**: 設定した maker の成果物を GitHub のリリースへ実際にアップロードする。公式の設定例は `draft: true`（下書き公開）。実リポジトリで試す前に使い捨てのリポジトリで確認すること。

```sh
npm run publish
```

`package.json` に `"publish": "electron-forge publish"` を追加しておく。既定ではホスト OS・アーキテクチャ向けのみ公開される。

## 自動更新モジュールのインストール

```sh
npm install update-electron-app
```

main プロセスで `require('update-electron-app')()` を呼ぶ。update.electronjs.org の条件は macOS または Windows・公開 GitHub リポジトリ・GitHub Releases への公開（macOS はコード署名必須）。
