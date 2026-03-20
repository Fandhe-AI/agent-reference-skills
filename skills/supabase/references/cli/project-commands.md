# Supabase CLI: プロジェクト・その他コマンド

## プロジェクト管理

### supabase projects list

プロジェクト一覧を表示する。

```bash
supabase projects list
```

#### 出力例

```
    ORG ID      │     REF      │       NAME        │   REGION    │  CREATED AT (UTC)
────────────────┼──────────────┼───────────────────┼─────────────┼──────────────────────
 org-id-uuid    │ abcdefghijkl │ My Production App │ ap-northeast-1 │ 2024-01-01 00:00:00
 org-id-uuid    │ mnopqrstuvwx │ Staging App       │ ap-northeast-1 │ 2024-02-01 00:00:00
```

### supabase projects create

新しいプロジェクトを作成する。

```bash
supabase projects create <name>
```

#### フラグ

| フラグ | 説明 |
|-------|------|
| `--org-id <id>` | 組織ID（必須） |
| `--region <region>` | リージョン（必須） |
| `--db-password <password>` | DB パスワード |
| `--plan <plan>` | プラン（`free`, `pro`） |

#### 使用例

```bash
supabase projects create "My New App" \
  --org-id org-id-uuid \
  --region ap-northeast-1 \
  --db-password secure-password
```

### supabase projects delete

プロジェクトを削除する。

```bash
supabase projects delete --ref <project-ref>
```

### supabase projects api-keys

プロジェクトの API キーを表示する。

```bash
supabase projects api-keys --project-ref <ref>
```

#### 出力例

```
   NAME    │                          API KEY
───────────┼──────────────────────────────────────────────────
 anon      │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 service_role │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 組織管理

### supabase orgs list

組織一覧を表示する。

```bash
supabase orgs list
```

### supabase orgs create

新しい組織を作成する。

```bash
supabase orgs create <name>
```

## シークレット管理

### supabase secrets list

プロジェクトのシークレット一覧を表示する。

```bash
supabase secrets list
```

#### フラグ

| フラグ | 説明 |
|-------|------|
| `--project-ref <ref>` | プロジェクト参照ID |

### supabase secrets set

シークレットを設定する。

```bash
supabase secrets set <NAME>=<VALUE> [NAME2=VALUE2 ...]
```

#### 使用例

```bash
# 単一シークレット設定
supabase secrets set MY_API_KEY=sk-1234567890

# 複数シークレット設定
supabase secrets set STRIPE_KEY=sk_live_... SENDGRID_KEY=SG....

# .env ファイルから読み込み
supabase secrets set --env-file .env.production
```

#### フラグ

| フラグ | 説明 |
|-------|------|
| `--env-file <path>` | .env ファイルからシークレットを読み込み |
| `--project-ref <ref>` | プロジェクト参照ID |

### supabase secrets unset

シークレットを削除する。

```bash
supabase secrets unset <NAME> [NAME2 ...]
```

#### 使用例

```bash
supabase secrets unset MY_API_KEY OLD_SECRET
```

## ログイン

### supabase login

Supabase にログインする。

```bash
supabase login
```

#### フラグ

| フラグ | 説明 |
|-------|------|
| `--token <token>` | アクセストークンを直接指定 |
| `--name <name>` | トークン名（新規生成時） |

#### 使用例

```bash
# ブラウザ経由でログイン
supabase login

# トークン直接指定
supabase login --token sbp_1234567890abcdef
```

## Storage 管理

### supabase storage cp

ファイルをコピー（アップロード/ダウンロード）する。

```bash
supabase storage cp <source> <destination>
```

#### 使用例

```bash
# ローカルからリモートにアップロード
supabase storage cp ./local-file.png ss:///bucket-name/path/file.png

# リモートからローカルにダウンロード
supabase storage cp ss:///bucket-name/path/file.png ./local-file.png

# ディレクトリごとアップロード（再帰的）
supabase storage cp -r ./local-dir ss:///bucket-name/path/
```

#### フラグ

| フラグ | 説明 |
|-------|------|
| `-r, --recursive` | ディレクトリを再帰的にコピー |

### supabase storage ls

Storage のファイル一覧を表示する。

```bash
supabase storage ls ss:///bucket-name/path/
```

#### 使用例

```bash
# バケット一覧
supabase storage ls

# バケット内のファイル一覧
supabase storage ls ss:///avatars/

# サブディレクトリの一覧
supabase storage ls ss:///avatars/public/
```

### supabase storage mv

ファイルを移動/リネームする。

```bash
supabase storage mv ss:///bucket/old-path.png ss:///bucket/new-path.png
```

### supabase storage rm

ファイルを削除する。

```bash
supabase storage rm ss:///bucket-name/path/file.png
```

#### フラグ

| フラグ | 説明 |
|-------|------|
| `-r, --recursive` | ディレクトリを再帰的に削除 |

#### 使用例

```bash
# 単一ファイル削除
supabase storage rm ss:///avatars/old-avatar.png

# ディレクトリごと削除
supabase storage rm -r ss:///avatars/temp/
```

## テスト

### supabase test db

pgTAP を使用してデータベーステストを実行する。

```bash
supabase test db
```

テストファイルは `supabase/tests/` ディレクトリに配置する。

#### テストファイル例

```sql
-- supabase/tests/users_test.sql
BEGIN;
SELECT plan(2);

SELECT has_table('public', 'users', 'users table exists');
SELECT has_column('public', 'users', 'email', 'email column exists');

SELECT * FROM finish();
ROLLBACK;
```

## SSO

### supabase sso

SAML SSO プロバイダの管理。

```bash
# SSO プロバイダ一覧
supabase sso list

# SSO プロバイダ追加
supabase sso add --type saml --metadata-url <url> --domains <domain>

# SSO プロバイダ更新
supabase sso update <provider-id> --domains <domain>

# SSO プロバイダ削除
supabase sso remove <provider-id>

# SSO プロバイダ情報表示
supabase sso show <provider-id>
```

## ネットワーク管理

### supabase network-bans

```bash
# バンされた IP 一覧
supabase network-bans get

# IP バン解除
supabase network-bans remove --db-unban-ip <ip>
```

### supabase network-restrictions

```bash
# ネットワーク制限取得
supabase network-restrictions get

# ネットワーク制限更新
supabase network-restrictions update --db-allow-cidr <cidr> [--db-allow-cidr <cidr2>]
```

#### 使用例

```bash
# 特定 IP のみ許可
supabase network-restrictions update \
  --db-allow-cidr 203.0.113.0/24 \
  --db-allow-cidr 198.51.100.10/32

# 全 IP 許可（制限解除）
supabase network-restrictions update --db-allow-cidr 0.0.0.0/0
```

### supabase ssl-enforcement

```bash
# SSL 強制設定取得
supabase ssl-enforcement get

# SSL 強制有効化
supabase ssl-enforcement update --enable-db-ssl-enforcement

# SSL 強制無効化
supabase ssl-enforcement update --disable-db-ssl-enforcement
```

## Vanity Subdomain

### supabase vanity-subdomains

```bash
# 現在の Vanity Subdomain 取得
supabase vanity-subdomains get

# 利用可能性チェック
supabase vanity-subdomains check-availability --desired-subdomain <name>

# Vanity Subdomain 有効化
supabase vanity-subdomains activate --desired-subdomain <name>

# Vanity Subdomain 削除
supabase vanity-subdomains delete
```

## SQL スニペット

### supabase snippets

Dashboard で保存した SQL スニペットを管理する。

```bash
# スニペット一覧
supabase snippets list

# スニペット詳細表示
supabase snippets download <snippet-id>
```

## 関連

- [Management API プロジェクト](../management-api/projects.md) — API でのプロジェクト管理
- [Management API シークレット](../management-api/secrets.md) — API でのシークレット管理
- [CLI 概要](./overview.md) — CLI 基本設定
