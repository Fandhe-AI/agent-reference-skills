# Generate

データベーススキーマの生成とマイグレーション適用。

## スキーマ／マイグレーションファイルの生成

```sh
npx auth@latest generate
```

ORM に応じたスキーマファイルを生成する。Prisma: `prisma/schema.prisma`、Drizzle: `schema.ts`、Kysely: `schema.sql` がデフォルト出力先。

## 出力先を指定してスキーマを生成

```sh
npx auth@latest generate --output ./db/schema.ts
```

## 設定ファイルのパスを指定してスキーマを生成

```sh
npx auth@latest generate --config ./src/lib/auth.ts
```

デフォルトでは `./, ./utils, ./lib` およびそれらの `src/` 相当を検索する。

## 確認プロンプトをスキップしてスキーマを生成

```sh
npx auth@latest generate --yes
```

## マイグレーションの適用（Kysely アダプターのみ）

> **警告**: このコマンドはデータベースに直接スキーマを適用する。実行前にバックアップを取ること。

```sh
npx auth@latest migrate
```

Kysely アダプターを使用しているプロジェクト専用。PostgreSQL では `search_path` を自動検出し正しいスキーマへテーブルを作成する。

## 確認プロンプトをスキップしてマイグレーションを適用

> **警告**: 確認なしにスキーマ変更をデータベースへ適用する。

```sh
npx auth@latest migrate --yes
```

## pnpm での実行

```sh
pnpm auth@latest generate
pnpm auth@latest migrate
```

## yarn での実行

```sh
yarn auth@latest generate
yarn auth@latest migrate
```

## bun での実行

```sh
bun auth@latest generate
bun auth@latest migrate
```
