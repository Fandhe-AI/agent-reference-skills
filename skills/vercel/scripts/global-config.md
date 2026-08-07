# Global Config

Global Config（旧 Edge Config）ストアの作成・アイテム管理・トークン・バックアップ

`vercel edge-config` は `vercel global-config` のエイリアスとして引き続き動作する。

## ストアの一覧表示

デフォルトサブコマンド（`vercel global-config` のみでも同じ）。

```sh
vercel global-config ls
```

## ストアの作成

初期アイテムを指定して作成。

```sh
vercel global-config add flags --items '{"betaUiEnabled":true,"region":"sfo1"}'
```

## ストアの詳細確認

ID またはスラッグで指定。

```sh
vercel global-config get flags
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
vercel global-config remove flags --yes
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
