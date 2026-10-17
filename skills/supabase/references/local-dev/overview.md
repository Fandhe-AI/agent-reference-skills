# ローカル開発概要

## Signature / Usage

Supabase CLI を使用して、Docker 上で全サービスをローカルに実行できる。リモートプロジェクトに依存せずに開発が可能。

## 前提条件

- Docker API 互換のコンテナマネージャーがインストールされていること
  - OrbStack (macOS) - macOS で推奨
  - Docker Desktop (macOS, Windows, Linux) - Windows / Linux で推奨
  - Rancher Desktop (macOS, Windows, Linux)
  - Podman (macOS, Windows, Linux)
- Supabase CLI がインストールされていること

```bash
# npm（プロジェクトの dev dependency）
npm install supabase --save-dev

# yarn
NODE_OPTIONS=--no-experimental-fetch yarn add supabase --dev

# pnpm（pnpm 10 以降は --allow-build=supabase が必須。旧版は省略）
pnpm add supabase --save-dev --allow-build=supabase

# Homebrew
brew install supabase/tap/supabase
```

npm / yarn / pnpm はプロジェクトに dev dependency として入れるため、`npx supabase` / `yarn supabase` / `pnpm supabase` 経由で実行する。Homebrew はグローバルの `supabase` コマンドになる。

### 信頼できないネットワークでの注意

信頼できない公開ネットワークに接続している場合は、起動前に専用の Docker network を作り 127.0.0.1 にバインドする。ローカルスタックを公開してはならない。

```bash
docker network create -o 'com.docker.network.bridge.host_binding_ipv4=127.0.0.1' local-network
npx supabase start --network-id local-network
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

## Notes

- 既定のポートでは `supabase start` はマシンあたり 1 プロジェクトのみ。実験的な `supabase stack` コマンドで複数のローカルプロジェクトを同時に実行できる（[複数ローカルプロジェクトの同時実行](./running-multiple-local-projects.md)）
- Linux と Apple silicon の macOS では、`supabase stack` により Docker なしで（プロセスとして）実行できる（[Docker とネイティブランタイム](./docker-and-native-runtimes.md)）

## Related

- [CLI ローカル開発](../cli/local-dev.md) — supabase start/stop コマンド
- [シードデータ](./seeding.md) — テストデータ管理
- [テスト](./testing.md) — pgTAP テスト
