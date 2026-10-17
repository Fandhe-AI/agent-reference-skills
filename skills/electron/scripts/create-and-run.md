---
source: https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app
---

# Create and Run

最小アプリの作成と開発モード実行。出典は tutorial-first-app と tutorial/installation。

## npm プロジェクトの初期化

```sh
mkdir my-electron-app && cd my-electron-app
npm init
```

entry point は `main.js` にする。author / license / description はパッケージング時に必要。Yarn Berry は `nodeLinker: node-modules`、pnpm は `nodeLinker: hoisted` の設定が必要（`node_modules` を実体として配置するため）。

## Electron のインストール

```sh
npm install electron --save-dev
```

## start スクリプトの追加

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

`package.json` の `scripts` に追記する。

## 開発モードでの実行

```sh
npm run start
```

`main` に指定したスクリプトを開発モードで実行する。

## npx による直接実行

```sh
npx electron .
```

プロジェクトへ `npm install` せずカレントディレクトリを実行する（依存関係は入らない）。出典は tutorial/installation。
