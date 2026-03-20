# CLI

Better Auth には、データベーススキーマの管理、プロジェクトの初期化、シークレットキーの生成、認証セットアップの診断情報収集のための組み込み CLI が含まれている。

## コマンド一覧

| Command | Purpose | Key Flags |
|---------|---------|-----------|
| `generate` | DB スキーマの生成 | `--output`, `--config`, `--yes` |
| `migrate` | DB へのスキーマ適用（Kysely アダプターのみ） | `--config`, `--yes` |
| `init` | プロジェクトの初期化 | `--name`, `--framework`, `--plugins`, `--database`, `--package-manager` |
| `info` | 環境診断情報の表示 | `--config`, `--json` |
| `secret` | 秘密鍵の生成 | なし |

## コマンド詳細

### generate コマンド

```bash
npx auth@latest generate
```

**オプション:**
- `--output`: 生成されたスキーマの保存先を指定。デフォルトは ORM タイプに依存（Prisma: `prisma/schema.prisma`、Drizzle: `schema.ts`、Kysely: `schema.sql`）
- `--config`: Better Auth 設定ファイルのパス。デフォルトでは `./, ./utils, ./lib` またはそれらの `src/` 相当を検索
- `--yes`: 確認プロンプトをスキップし、直接スキーマを生成

### migrate コマンド

```bash
npx auth@latest migrate
```

**オプション:**
- `--config`: Better Auth 設定ファイルのパス
- `--yes`: 確認をスキップし、直接スキーマを適用

**特別機能:** PostgreSQL で設定された `search_path` を自動検出し、正しいスキーマにテーブルを作成する。

### init コマンド

```bash
npx auth@latest init
```

**オプション:**
- `--name`: アプリケーション名（デフォルト: `package.json` の `name`）
- `--framework`: 使用フレームワーク（現在: Next.js のみ）
- `--plugins`: インストールするプラグインのカンマ区切りリスト
- `--database`: データベース選択（現在: SQLite のみ）
- `--package-manager`: npm, pnpm, yarn, または bun（デフォルト: 検出されたマネージャー）

### info コマンド

```bash
npx auth@latest info
```

**出力内容:**
- システム詳細（OS、CPU、メモリ、Node.js バージョン）
- パッケージマネージャー情報
- Better Auth バージョンと設定（機密データは自動マスク）
- 検出されたフレームワーク（Next.js, React, Vue など）
- データベースクライアントと ORM（Prisma, Drizzle など）

**オプション:**
- `--config`: カスタム設定ファイルパス
- `--json`: JSON 形式で結果を出力（共有やプログラム処理用）

```bash
npx auth@latest info --json > auth-info.json
```

### secret コマンド

```bash
npx auth@latest secret
```

Better Auth インスタンス用の暗号化秘密鍵を生成する。

## セキュリティ・トラブルシューティング

- **データ保護:** `info` コマンドでは、シークレット、API キー、データベース URL などの機密データは自動的に `[REDACTED]` に置換される
- **モジュール解決エラー:** 「Cannot find module X」エラーが発生した場合、設定ファイルのインポートエイリアスを一時的に削除し、相対パスを使用する。CLI 実行後にエイリアスに戻す
- **PostgreSQL 非デフォルトスキーマ:** migrate コマンドは PostgreSQL のカスタム検索パスを自動的に処理する
