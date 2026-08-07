# Connect

Vercel Connect コネクタの作成・接続・トークン取得（beta）

## コネクタの作成

サービス名（`slack`, `github` 等）または MCP サービス URL を指定して作成。

```sh
vercel connect create slack
```

名前・webhook トリガー転送を指定して作成。

```sh
vercel connect create slack --name my-bot --triggers
```

## コネクタの一覧表示

リンク中のプロジェクトに紐づくコネクタのみ表示。

```sh
vercel connect list
```

チーム内の全コネクタを表示。

```sh
vercel connect list --all-projects
```

種別・サービス名で絞り込み。

```sh
vercel connect list --type slack --service mcp.linear.app
```

## ランタイムトークンの取得

ユーザートークンを取得（デフォルト）。

```sh
vercel connect token scl_abc123
```

アプリトークンを取得。

```sh
vercel connect token scl_abc123 --subject app
```

## プロジェクトへの接続（アタッチ）

デフォルトで production / preview / development の全環境にアタッチ。

```sh
vercel connect attach scl_abc123
```

環境を指定してアタッチ。

```sh
vercel connect attach scl_abc123 -e production -e preview
```

webhook トリガー転送先としても登録。

```sh
vercel connect attach scl_abc123 --triggers
```

## プロジェクトの切断（デタッチ）

```sh
vercel connect detach scl_abc123
```

## コネクタのブランディング更新

```sh
vercel connect update scl_abc123 --icon ./logo.png --background-color '#1A2B3C'
```

## コネクタの削除

> **警告**: `remove` は取り消しできない。プロジェクトが接続中の場合は `--disconnect-all` で先に全プロジェクトを切断する必要がある。

```sh
vercel connect remove scl_abc123
```

接続中の全プロジェクトを切断してから確認なしで削除。

```sh
vercel connect remove scl_abc123 --disconnect-all --yes
```

## ダッシュボードで開く

```sh
vercel connect open scl_abc123
```
