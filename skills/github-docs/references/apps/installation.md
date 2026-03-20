# GitHub App インストールフロー

## インストール方法

### GitHub Marketplace からのインストール

1. GitHub Marketplace（https://github.com/marketplace）にアクセス
2. 対象の App を検索・選択
3. プランを選択（無料または有料）
4. インストール先アカウント（個人または Organization）を選択
5. リポジトリアクセス範囲を選択
6. 権限を確認して承認

### インストール URL による直接インストール

App の所有者が提供するインストール URL を使用する。

```
https://github.com/apps/{app-slug}/installations/new
```

### インストール URL のパラメータ

| パラメータ | 説明 |
|-----------|------|
| `target_id` | インストール先 Organization/ユーザーの ID を事前指定 |
| `repository_id` | インストール先リポジトリの ID を事前指定 |

## リポジトリアクセスの選択

インストール時に、App がアクセスできるリポジトリを選択する。

| オプション | 説明 |
|-----------|------|
| **All repositories** | アカウントの全リポジトリにアクセスを許可（将来作成されるものも含む） |
| **Only select repositories** | 特定のリポジトリのみアクセスを許可 |

## 権限の確認

インストール時に App が要求する権限が表示される。ユーザーはこれらの権限を確認した上でインストールを承認する。

## インストール後の処理

### Setup URL へのリダイレクト

App に Setup URL が設定されている場合、インストール完了後にユーザーがその URL にリダイレクトされる。App はこの時点で追加のセットアップ処理を行える。

### installation イベント

App がインストールされると、以下の Webhook イベントが発生する。

| action | 説明 |
|--------|------|
| `created` | App が新規インストールされた |
| `deleted` | App がアンインストールされた |
| `suspend` | App が一時停止された |
| `unsuspend` | App の一時停止が解除された |
| `new_permissions_accepted` | 新しい権限が承認された |

### installation_repositories イベント

App のリポジトリアクセスが変更されると発生する。

| action | 説明 |
|--------|------|
| `added` | リポジトリが追加された |
| `removed` | リポジトリが削除された |

## インストール情報の取得

### 全インストール一覧

```
GET /app/installations
Authorization: Bearer JWT_TOKEN
```

### 特定のインストール情報

```
GET /app/installations/{installation_id}
Authorization: Bearer JWT_TOKEN
```

### インストール先リポジトリ一覧

```
GET /installation/repositories
Authorization: token INSTALLATION_ACCESS_TOKEN
```

## アクセス管理

### Organization による管理

Organization の Owner は以下の操作が可能:

- App のインストール・アンインストール
- リポジトリアクセスの変更
- App の一時停止・再開
- App のリクエスト承認/拒否ポリシーの設定

### ユーザーによる管理

インストールしたユーザーは以下の操作が可能:

- リポジトリアクセスの変更
- App のアンインストール

## アンインストール

App をアンインストールすると:

- App のすべてのアクセスが即座に無効になる
- インストールアクセストークンが無効になる
- Webhook の配信が停止する
- `installation` イベント（action: `deleted`）が送信される

## 公式ドキュメント

- [Installing GitHub Apps](https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party)
