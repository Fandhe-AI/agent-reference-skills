---
source:
  - https://orm.drizzle.team/docs/drizzle-kit-studio
  - https://man.openbsd.org/ssh#L
---

# studio

Start Drizzle Studio (a hosted database browser at `local.drizzle.studio`) for local development.

## 起動（デフォルト 127.0.0.1:4983）

```sh
npx drizzle-kit studio
```

## host / port の指定

```sh
npx drizzle-kit studio --port=3000
npx drizzle-kit studio --host=127.0.0.1 --port=3000
```

## リモートからの閲覧（SSH トンネル経由）

> **警告**: Drizzle Studio には認証機構が無い。`--host=0.0.0.0` で全インターフェースへバインドすると、ネットワーク上の誰でもデータベースを閲覧・操作できる状態になる。隔離済み/使い捨て環境内でのみ使用し、リモートから閲覧したい場合は以下のように SSH トンネル経由でアクセスすること（`--host=0.0.0.0` 自体は使わない）。

```sh
# ローカル側でトンネルを張り、リモートホストの Studio に 127.0.0.1 経由でアクセスする
ssh -L 4983:127.0.0.1:4983 user@remote-host
# トンネル確立後、ブラウザから https://local.drizzle.studio へアクセス
```

（上記 `ssh` コマンドは Drizzle 公式ドキュメント外。出典: OpenSSH `ssh(1)` の `-L` オプション https://man.openbsd.org/ssh#L ）

## 全 SQL 文のログ出力

```sh
npx drizzle-kit studio --verbose
```

## Notes

- 接続情報は `drizzle.config.ts` の `dbCredentials` から取得する（CLI オプションでは指定しない）
- Safari / Brave は localhost アクセスをデフォルトでブロックするため、`mkcert -install` で自己署名証明書を発行してから再起動する
- Drizzle Studio 自体はオープンソースではない（drizzle-orm / drizzle-kit はオープンソース）。VPS 等リモート環境で使う場合は Drizzle Gateway（別製品）を使う
