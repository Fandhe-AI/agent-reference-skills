# install

TypeDoc のインストールコマンド集。

## ローカルへのインストール（推奨）

```sh
npm install typedoc --save-dev
```

プロジェクトの devDependencies にインストールする推奨方法。プラグイン・テーマの解決が確実に動作する。

## グローバルへのインストール

```sh
npm install -g typedoc
```

> **警告**: グローバルインストールではプラグイン・テーマの解決に問題が生じる場合がある。`--legacy-peer-deps` が必要になるケースがある。ローカルインストールを優先すること。

## バージョン確認

```sh
npx typedoc --version
```

インストール済みの TypeDoc バージョンを表示する。
