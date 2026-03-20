# SQLite

SQLite は軽量でサーバーレスの SQL データベースエンジンで、ローカルデータストレージに最適。Better Auth は複数の SQLite ドライバーをサポートし、環境のニーズに応じた選択が可能。

## インストールオプション

### Better-SQLite3（推奨）

最も安定した人気の Node.js SQLite ドライバー:

```typescript
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("database.sqlite"),
});
```

### Node.js 組み込み SQLite（実験的）

Node.js 22.5.0+ で利用可能:

```typescript
import { betterAuth } from "better-auth";
import { DatabaseSync } from "node:sqlite";

export const auth = betterAuth({
  database: new DatabaseSync("database.sqlite"),
});
```

実行: `node your-app.js`

### Bun 組み込み SQLite

CLI コマンドでは型エラーを避けるため `bunx --bun` フラグを使用:

```typescript
import { betterAuth } from "better-auth";
import { Database } from "bun:sqlite";

export const auth = betterAuth({
  database: new Database("database.sqlite"),
});
```

## 主要機能

### スキーマ生成 & マイグレーション

Better Auth CLI は生成とマイグレーションの両方をサポート:

```bash
npx auth@latest generate
npx auth@latest migrate
```

### Joins（実験的）

関連データクエリのパフォーマンス改善のためデータベース Joins を有効化。`/get-session`, `/get-full-organization` などのエンドポイントで、データベースレイテンシに応じて 2-3 倍のパフォーマンス改善。

```typescript
export const auth = betterAuth({
  experimental: { joins: true },
});
```

### データベースサポート

SQLite 統合は Kysely アダプターを通じて動作し、Kysely の SqliteDialect（v1.4.0+）との互換性を維持。

## 注意点

- `node:sqlite` モジュールは実験的であり、変更される可能性がある
- 本番デプロイメントにはパフォーマンス最適化ガイドを参照
- 追加の Kysely 設定詳細は公式ドキュメントの SqliteDialect を参照
