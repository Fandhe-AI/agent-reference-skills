# 認証方法

GitHub REST API で使用できる認証方法の一覧と推奨事項。

## 認証ヘッダー

すべての認証方法で共通のヘッダー形式:

```
Authorization: Bearer TOKEN
```

> **注意**: `token TOKEN` 形式も使用可能だが、`Bearer TOKEN` が推奨される。

## 認証方法一覧

| 方法 | 推奨度 | 用途 | 有効期限 |
|------|--------|------|----------|
| Fine-grained PAT | **推奨** | 個人利用、スクリプト | 設定可能（必須） |
| GitHub App トークン | **推奨** | アプリケーション、インテグレーション | 1時間 |
| `GITHUB_TOKEN` | 適切 | GitHub Actions ワークフロー内 | ジョブ終了まで |
| Classic PAT | 非推奨 | レガシー対応 | 設定可能（無期限も可） |
| OAuth App トークン | 限定的 | OAuth フロー | 設定による |

## Fine-grained Personal Access Token（推奨）

最も推奨される認証方法。きめ細かい権限制御が可能。

### 特徴

- リポジトリ単位でアクセス制御可能
- 必要最小限の権限スコープを設定可能
- 有効期限の設定が必須
- Organization がポリシーで制御可能

### 作成手順

1. Settings > Developer settings > Personal access tokens > Fine-grained tokens
2. Token name、有効期限を設定
3. Resource owner（個人または Organization）を選択
4. リポジトリアクセス範囲を選択（All / Selected）
5. 必要な権限を選択

```bash
curl -H "Authorization: Bearer github_pat_xxxx" \
  https://api.github.com/user
```

## GitHub App トークン

Organization やリポジトリに対する操作をアプリケーションとして行う場合に使用。

### インストールアクセストークンの取得フロー

1. GitHub App の秘密鍵でJWTを生成（有効期間: 最大10分）
2. JWTを使ってインストールアクセストークンを取得（有効期間: 1時間）
3. インストールアクセストークンでAPIを呼び出す

```bash
# JWTでインストールアクセストークンを取得
curl -X POST \
  -H "Authorization: Bearer JWT" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/app/installations/{installation_id}/access_tokens

# インストールアクセストークンでAPIを呼び出す
curl -H "Authorization: Bearer ghs_xxxx" \
  https://api.github.com/repos/OWNER/REPO
```

## GITHUB_TOKEN（GitHub Actions）

GitHub Actions ワークフロー内で自動的に利用可能なトークン。

### 特徴

- ワークフロー実行時に自動生成
- ジョブ終了時に失効
- デフォルト権限はリポジトリ設定に依存
- `permissions` キーで権限を制限可能

```yaml
# ワークフローでの使用例
jobs:
  example:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      issues: write
    steps:
      - name: Create issue
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.GITHUB_TOKEN }}" \
            -H "Accept: application/vnd.github+json" \
            https://api.github.com/repos/${{ github.repository }}/issues \
            -d '{"title":"Auto-created issue"}'
```

### レート制限

- `GITHUB_TOKEN` のレート制限: **1,000リクエスト/時間**（通常の認証済みユーザーの5,000より低い）

## Classic Personal Access Token（非推奨）

従来型のPAT。Fine-grained PAT への移行が推奨される。

### 特徴

- スコープベースの権限制御（`repo`, `admin:org` 等）
- リポジトリ単位の制御不可（全リポジトリまたはなし）
- 有効期限を無期限に設定可能（セキュリティリスク）

### 主なスコープ

| スコープ | 説明 |
|---------|------|
| `repo` | プライベートリポジトリへのフルアクセス |
| `public_repo` | パブリックリポジトリのみ |
| `admin:org` | Organization の管理 |
| `write:packages` | パッケージの書き込み |
| `delete:packages` | パッケージの削除 |
| `admin:repo_hook` | Webhook の管理 |
| `workflow` | GitHub Actions ワークフローの更新 |

## OAuth App トークン

OAuth フローでユーザー認証を行う場合に使用。

### Web アプリケーションフロー

1. ユーザーを `https://github.com/login/oauth/authorize` にリダイレクト
2. GitHub がコールバックURLに `code` を付与してリダイレクト
3. `code` を `https://github.com/login/oauth/access_token` に送信してトークン取得

## セキュリティ上の注意事項

- **ユーザー名/パスワードによる認証は廃止済み** — トークンベースの認証を使用すること
- **プライベートリソースへのアクセス権がない場合、`404 Not Found` が返される**（`403` ではない）— これはリソースの存在自体を秘匿するための仕様
- トークンはソースコードにハードコードしない — 環境変数やシークレット管理ツールを使用
- 最小権限の原則に従い、必要最小限の権限のみを付与する
- 定期的にトークンをローテーションする
- 不要になったトークンは速やかに取り消す
