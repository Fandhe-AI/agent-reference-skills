# Docs

ZMK 公式ドキュメントのローカル実行・検証コマンド。

## 依存パッケージのインストール

```sh
cd docs
npm ci
```

`docs/` ディレクトリ内で実行する。初回または依存関係変更時に実行する。

## ローカル開発サーバーの起動

```sh
npm start
```

`http://localhost:3000` でドキュメントが確認できる。

## フォーマットの適用

```sh
npm run prettier:format
```

## フォーマットの検証

```sh
npm run prettier:check
```

## Lint の実行

```sh
npm run lint
```

## ドキュメントのビルド

```sh
npm run build
```

PR 提出前に `prettier:format` / `prettier:check` / `lint` の実行が必要。これらは PR の検証プロセスでも自動実行される。
