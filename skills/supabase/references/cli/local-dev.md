# Supabase CLI: ローカル開発コマンド

## supabase init

プロジェクトを初期化し、`supabase/` ディレクトリと設定ファイルを生成する。

```bash
supabase init
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--with-intellij-settings` | IntelliJ IDEA 用の設定を生成 |
| `--with-vscode-settings` | VS Code 用の設定を生成 |

### 生成されるファイル

```
supabase/
├── config.toml          # プロジェクト設定
├── migrations/          # マイグレーションファイル
├── functions/           # Edge Functions
└── seed.sql             # シードデータ
```

### 使用例

```bash
# 新規プロジェクトで初期化
mkdir my-project && cd my-project
supabase init

# VS Code 設定付き
supabase init --with-vscode-settings
```

## supabase start

Docker を使用してローカル Supabase 環境を起動する。初回起動時はイメージのダウンロードに時間がかかる。

```bash
supabase start
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--exclude <services>` | 除外するサービス（カンマ区切り） |
| `--ignore-health-check` | ヘルスチェックを無視 |

### 除外可能なサービス

| サービス名 | 説明 |
|-----------|------|
| `auth` | GoTrue 認証サービス |
| `realtime` | Realtime サービス |
| `storage` | Storage サービス |
| `edge-runtime` | Edge Functions ランタイム |
| `pgadmin-schema-diff` | PgAdmin スキーマ差分 |
| `migra` | マイグレーションツール |
| `studio` | Supabase Studio |
| `imgproxy` | 画像変換プロキシ |
| `inbucket` | メールテスト用サーバー |
| `postgrest` | PostgREST API |
| `pgbouncer` | コネクションプーラー |

### 使用例

```bash
# 全サービス起動
supabase start

# Studio を除外して起動
supabase start --exclude studio

# 複数サービスを除外
supabase start --exclude studio,imgproxy,inbucket
```

### 起動後の出力

```
Started supabase local development setup.

         API URL: http://127.0.0.1:54321
     GraphQL URL: http://127.0.0.1:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
      Studio URL: http://127.0.0.1:54323
    Inbucket URL: http://127.0.0.1:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   S3 Access Key: ...
   S3 Secret Key: ...
       S3 Region: local
```

## supabase stop

ローカル Supabase 環境を停止する。

```bash
supabase stop
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--backup` | DB データをバックアップして停止 |
| `--no-backup` | バックアップなしで停止（デフォルト） |

### 使用例

```bash
# 通常停止
supabase stop

# データをバックアップして停止（次回 start 時に復元）
supabase stop --backup
```

## supabase status

ローカル環境の状態と接続情報を表示する。

```bash
supabase status
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `-o, --output <format>` | 出力形式（`pretty`, `env`, `json`, `toml`, `yaml`） |
| `--override-name <name>` | プロジェクト名を上書き |

### 使用例

```bash
# 通常表示
supabase status

# JSON 形式で出力
supabase status -o json

# 環境変数形式で出力（.env ファイル生成に便利）
supabase status -o env > .env.local

# YAML 形式
supabase status -o yaml
```

### 環境変数形式の出力例

```
API_URL=http://127.0.0.1:54321
GRAPHQL_URL=http://127.0.0.1:54321/graphql/v1
DB_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
STUDIO_URL=http://127.0.0.1:54323
INBUCKET_URL=http://127.0.0.1:54324
JWT_SECRET=super-secret-jwt-token-with-at-least-32-characters
ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## supabase link

ローカルプロジェクトをリモートの Supabase プロジェクトにリンクする。`db pull`, `db push`, `functions deploy` などのリモート操作に必要。

```bash
supabase link --project-ref <project-ref>
```

### フラグ

| フラグ | 説明 |
|-------|------|
| `--project-ref <ref>` | プロジェクト参照ID（必須） |
| `--password <password>` | DB パスワード |

### 使用例

```bash
# プロジェクトリンク
supabase link --project-ref abcdefghijklmnop

# パスワード付き
supabase link --project-ref abcdefghijklmnop --password your-db-password

# 環境変数でパスワード指定
export SUPABASE_DB_PASSWORD=your-db-password
supabase link --project-ref abcdefghijklmnop
```

### プロジェクト参照IDの確認方法

- Supabase Dashboard の URL: `https://supabase.com/dashboard/project/<project-ref>`
- または `supabase projects list` コマンドで確認

## ワークフロー例

```bash
# 1. プロジェクト初期化
supabase init

# 2. ローカル環境起動
supabase start

# 3. 開発作業...

# 4. リモートプロジェクトにリンク
supabase link --project-ref <ref>

# 5. リモートからスキーマ取得
supabase db pull

# 6. ローカルで開発・マイグレーション作成

# 7. リモートにマイグレーション適用
supabase db push

# 8. 作業終了時に停止
supabase stop
```

## 関連

- [ローカル開発概要](../local-dev/overview.md) — ローカル環境
- [db コマンド](./db-commands.md) — スキーマ管理
- [CLI 概要](./overview.md) — インストール・認証
