# Global Config

Global Config（旧 Edge Config）ストアの作成・アイテム管理・トークン・バックアップ

> **注記**: `vercel edge-config` エイリアスは現行の公式ページでは未確認。`add` / `get` は互換エイリアスとして動作するが非推奨警告が出る（新規には `create` / `inspect` を使う）。

## ストアの一覧表示

デフォルトサブコマンド（`vercel global-config` のみでも同じ）。

```sh
vercel global-config list
```

## ストアの作成

スラッグと初期アイテム（任意）を指定して作成。

```sh
vercel global-config create flags --items '{"betaUiEnabled":true,"region":"sfo1"}'
```

## ストアの詳細確認

ID またはスラッグで指定。

```sh
vercel global-config inspect flags
```

## ストアの更新

スラッグの変更。

```sh
vercel global-config update flags --slug feature-flags
```

アイテムをバッチでパッチ（`operation` は `create` / `update` / `upsert` / `delete`）。

```sh
vercel global-config update flags --patch '{"items":[{"operation":"upsert","key":"betaUiEnabled","value":true}]}'
```

## ストアの削除

> **警告**: ストアを削除するとアイテムも含めて完全に削除される。

```sh
vercel global-config delete flags --yes
```

## アイテムの参照

全アイテムを一覧表示。

```sh
vercel global-config items flags
```

キー指定で単一アイテムを取得。

```sh
vercel global-config items flags --key betaUiEnabled
```

## 読み取りトークンの管理

トークンの一覧表示。

```sh
vercel global-config tokens flags
```

トークンの発行。

```sh
vercel global-config tokens flags --add "Production read"
```

トークンの失効。

> **警告**: 失効させたトークンはランタイムからの読み取りに使用できなくなる。

```sh
vercel global-config tokens flags --remove tok_abc123 --yes
```

## バックアップの管理

バックアップ一覧の表示。

```sh
vercel global-config backups flags
```

特定バージョンのバックアップを確認。

```sh
vercel global-config backups flags --backup-version backup_version_abc123
```

バックアップから復元。

> **警告**: 復元は本番の Global Config アイテムを即座に上書きする。

```sh
vercel global-config backups flags --restore backup_version_abc123 --yes
```
