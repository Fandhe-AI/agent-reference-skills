# ローカル開発概要

## 概要

Supabase CLI を使用して、Docker 上で全サービスをローカルに実行できる。リモートプロジェクトに依存せずに開発が可能。

## 前提条件

- Docker Desktop がインストールされていること
- Supabase CLI がインストールされていること

```bash
# CLI のインストール（npm）
npm install -g supabase

# CLI のインストール（Homebrew）
brew install supabase/tap/supabase
```

## 初期セットアップ

```bash
# プロジェクトの初期化
supabase init

# ローカルサービスの起動
supabase start
```

`supabase init` により `supabase/` ディレクトリが作成される。

```
supabase/
  config.toml          # ローカル設定ファイル
  migrations/          # マイグレーションファイル
  seed.sql             # シードデータ
  functions/           # Edge Functions
```

## 起動と停止

```bash
# 起動（全サービス）
supabase start

# 停止（データは保持）
supabase stop

# 停止（データを削除してクリーン）
supabase stop --no-backup
```

## ローカル URL / API キー

`supabase start` 実行後、以下の情報が表示される。

| サービス | URL |
|---------|-----|
| API URL | http://localhost:54321 |
| GraphQL URL | http://localhost:54321/graphql/v1 |
| DB URL | postgresql://postgres:postgres@localhost:54322/postgres |
| Studio URL | http://localhost:54323 |
| Inbucket URL | http://localhost:54324 |

| キー | 用途 |
|------|------|
| anon key | クライアント側（RLS で保護） |
| service_role key | サーバー側（RLS バイパス） |
| JWT secret | JWT の署名/検証 |

### 情報の再表示

```bash
supabase status
```

## Studio UI

ローカルの Studio UI（http://localhost:54323）で以下の操作が可能:

- テーブルの作成・編集
- データの閲覧・編集
- SQL エディタ
- RLS ポリシーの管理
- Auth ユーザーの管理
- Storage バケットの管理

## ローカル開発ワークフロー

### 1. ローカルで変更

Studio UI または SQL でスキーマを変更。

### 2. マイグレーション生成

```bash
supabase db diff -f <migration-name>
```

### 3. リセットしてテスト

```bash
supabase db reset
```

### 4. コミット & プッシュ

マイグレーションファイルをバージョン管理に追加。

### 5. リモートに適用

```bash
supabase link --project-ref <project-ref>
supabase db push
```

## リモートプロジェクトとのリンク

```bash
# プロジェクトをリンク
supabase link --project-ref <project-ref>

# リモートのマイグレーション状態を確認
supabase migration list

# リモートのスキーマをプル
supabase db pull
```

## 設定ファイル（config.toml）

主要な設定項目:

```toml
[project]
id = "<project-ref>"

[api]
enabled = true
port = 54321

[db]
port = 54322
major_version = 15

[studio]
enabled = true
port = 54323

[auth]
enabled = true
site_url = "http://localhost:3000"

[storage]
enabled = true
file_size_limit = "50MiB"
```

## トラブルシューティング

### Docker が起動しない

- Docker Desktop が実行中であることを確認
- Docker のリソース割り当てを確認（最低 2GB RAM 推奨）

### ポートの競合

`config.toml` でポートを変更する。

```toml
[api]
port = 54331

[db]
port = 54332
```

### データのリセット

```bash
supabase db reset
```

## 関連

- [CLI ローカル開発](../cli/local-dev.md) — supabase start/stop コマンド
- [シードデータ](./seeding.md) — テストデータ管理
- [テスト](./testing.md) — pgTAP テスト
