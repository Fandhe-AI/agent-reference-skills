---
source: https://orm.drizzle.team/docs/drizzle-kit-studio
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
npx drizzle-kit studio --host=0.0.0.0
npx drizzle-kit studio --host=0.0.0.0 --port=3000
```

## 全 SQL 文のログ出力

```sh
npx drizzle-kit studio --verbose
```

## Notes

- 接続情報は `drizzle.config.ts` の `dbCredentials` から取得する（CLI オプションでは指定しない）
- Safari / Brave は localhost アクセスをデフォルトでブロックするため、`mkcert -install` で自己署名証明書を発行してから再起動する
- Drizzle Studio 自体はオープンソースではない（drizzle-orm / drizzle-kit はオープンソース）。VPS 等リモート環境で使う場合は Drizzle Gateway（別製品）を使う
