# Supabase CLI 概要

## インストール

### npm

```bash
npm install -g supabase
```

### Homebrew (macOS / Linux)

```bash
brew install supabase/tap/supabase
```

### Scoop (Windows)

```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### バージョン確認

```bash
supabase --version
```

### アップデート

```bash
# npm
npm update -g supabase

# Homebrew
brew upgrade supabase

# Scoop
scoop update supabase
```

## 認証

### ログイン

```bash
supabase login
```

ブラウザが開き、Personal Access Token の入力を求められる。トークンは Supabase Dashboard > Account > Access Tokens で生成。

### トークン直接指定

```bash
supabase login --token <access_token>
```

### 環境変数によるトークン設定

```bash
export SUPABASE_ACCESS_TOKEN=<access_token>
```

## グローバルフラグ

全てのコマンドで使用可能なフラグ。

| フラグ | 短縮 | 説明 |
|-------|------|------|
| `--debug` | | デバッグ出力を有効化 |
| `--workdir <path>` | | 作業ディレクトリを指定（デフォルト: カレントディレクトリ） |
| `--experimental` | | 実験的機能を有効化 |
| `--project-id <ref>` | `-p` | プロジェクト参照IDを指定 |
| `--dns-resolver <resolver>` | | DNS リゾルバを指定（`native`, `https`） |
| `--help` | `-h` | ヘルプを表示 |

### `--debug` の使い方

```bash
supabase start --debug
```

Docker コマンドの詳細や HTTP リクエストの内容が表示される。トラブルシューティングに有用。

### `--workdir` の使い方

```bash
supabase start --workdir /path/to/project
```

`supabase` ディレクトリが存在するプロジェクトルートを指定する。

### `--dns-resolver` の使い方

```bash
supabase db push --dns-resolver https
```

DNS 解決に問題がある場合（VPN 環境など）に `https` を指定すると、HTTPS over DNS を使用。

## コマンド一覧

### ローカル開発

| コマンド | 説明 |
|---------|------|
| `supabase init` | プロジェクト初期化 |
| `supabase start` | ローカル環境起動 |
| `supabase stop` | ローカル環境停止 |
| `supabase status` | 状態確認 |
| `supabase link` | リモートプロジェクトリンク |

### データベース

| コマンド | 説明 |
|---------|------|
| `supabase db diff` | スキーマ差分 |
| `supabase db dump` | スキーマダンプ |
| `supabase db lint` | リンティング |
| `supabase db pull` | リモートスキーマ取得 |
| `supabase db push` | マイグレーション適用 |
| `supabase db reset` | リセット |

### マイグレーション

| コマンド | 説明 |
|---------|------|
| `supabase migration new` | 新規作成 |
| `supabase migration up` | 適用 |
| `supabase migration down` | ロールバック |
| `supabase migration list` | 一覧 |
| `supabase migration repair` | 修復 |
| `supabase migration squash` | 統合 |

### Edge Functions

| コマンド | 説明 |
|---------|------|
| `supabase functions new` | 関数作成 |
| `supabase functions serve` | ローカル実行 |
| `supabase functions deploy` | デプロイ |
| `supabase functions delete` | 削除 |
| `supabase functions download` | ダウンロード |

### 型生成

| コマンド | 説明 |
|---------|------|
| `supabase gen types typescript` | TypeScript 型生成 |

### 検査

| コマンド | 説明 |
|---------|------|
| `supabase inspect db` | DB 検査 |
| `supabase inspect report` | 総合レポート |

### プロジェクト管理

| コマンド | 説明 |
|---------|------|
| `supabase projects` | プロジェクト管理 |
| `supabase orgs` | 組織管理 |
| `supabase secrets` | シークレット管理 |
| `supabase storage` | Storage 管理 |

### その他

| コマンド | 説明 |
|---------|------|
| `supabase test db` | DB テスト実行 |
| `supabase sso` | SSO 設定 |
| `supabase network-bans` | ネットワークバン管理 |
| `supabase network-restrictions` | ネットワーク制限 |
| `supabase ssl-enforcement` | SSL 強制設定 |
| `supabase vanity-subdomains` | Vanity Subdomain 管理 |
| `supabase snippets` | SQL スニペット |

## 設定ファイル

`supabase init` で生成される `supabase/config.toml` がプロジェクトの設定ファイル。

```toml
[project]
id = "your-project-ref"

[api]
port = 54321
schemas = ["public", "graphql_public"]
extra_search_path = ["public", "extensions"]
max_rows = 1000

[db]
port = 54322
major_version = 15

[studio]
port = 54323

[auth]
site_url = "http://localhost:3000"
additional_redirect_urls = ["https://localhost:3000"]

[auth.email]
enable_signup = true
double_confirm_changes = true
enable_confirmations = false
```

## 関連

- [ローカル開発](./local-dev.md) — supabase init / start / stop
- [project コマンド](./project-commands.md) — プロジェクト管理
