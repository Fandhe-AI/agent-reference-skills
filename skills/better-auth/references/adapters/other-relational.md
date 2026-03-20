# Other Relational Databases

Better Auth は Kysely のおかげで幅広いデータベースダイアレクトを標準でサポートしている。Kysely がサポートする任意のダイアレクトが Better Auth で利用可能で、CLI を通じたデータベーススキーマの生成とマイグレーション機能も含まれる。

## コアダイアレクト

フレームワークが組み込みサポートする 4 つの主要データベースシステム:

- MySQL
- SQLite
- PostgreSQL
- MS SQL

## 拡張ダイアレクトサポート

### Kysely 公式ダイアレクト

- Postgres.js
- SingleStore Data API
- Supabase

### Kysely コミュニティダイアレクト

Better Auth は多数のコミュニティ維持ダイアレクトをサポート:

- PlanetScale Serverless Driver
- Cloudflare D1
- AWS RDS Data API
- Prisma Postgres
- SurrealDB
- Neon
- Xata
- AWS S3 Select
- libSQL/sqld
- Fetch driver
- SQLite WASM
- Deno SQLite
- TiDB Cloud Serverless Driver
- Capacitor SQLite Kysely
- BigQuery
- Clickhouse
- PGLite

## コミュニティアダプター

| Adapter | Database | Author |
|---------|----------|--------|
| convex-better-auth | Convex Database | erquhart |
| surreal-better-auth | SurrealDB | Oskar Gmerek |
| surrealdb-better-auth | SurrealDB | Necmttn |
| better-auth-surrealdb | SurrealDB | msanchezdev |
| @payload-auth/better-auth-plugin | Payload CMS | forrestdevs |
| better-auth-instantdb | InstantDB | daveycodez |
| @nerdfolio/remult-better-auth | Remult | Tai Vo |
| pocketbase-better-auth | PocketBase | LightInn |
| better-auth-firestore | Firebase Firestore | yultyyev |
| @zenstackhq/better-auth | ZenStack | zenstackhq |
| @strapi-community/plugin-better-auth | Strapi CMS | boazpoolman |

## セットアップ

CLI ドキュメントを参照してデータベーススキーマの生成とマイグレーションを行い、個別のアダプターガイドで具体的なデータベース設定を参照。

サポートされている Kysely ダイアレクトの完全なリストは Kysely 公式ドキュメントサイトで確認できる。

## 注意点

- Kysely がサポートする任意のダイアレクトが Better Auth で利用可能
- コミュニティアダプターは各 GitHub リポジトリにリンクされており、実装の詳細とインストール要件を確認できる
- サポートされていないデータベース用のアダプター作成が推奨されている
