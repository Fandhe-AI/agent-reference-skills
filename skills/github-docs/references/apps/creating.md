# GitHub App 作成

## 前提条件

- 個人アカウントまたは自分が Owner の Organization に登録できる
- App 管理権限が付与された Organization にも登録可能
- 1 ユーザー/Organization あたり最大 **100 個** の GitHub App を登録可能

## 登録手順

### 1. Developer Settings にアクセス

- **個人アカウント**: Settings > Developer settings > GitHub Apps
- **Organization**: Organization Settings > Developer settings > GitHub Apps

### 2. 「New GitHub App」をクリック

## 基本情報

| フィールド | 必須 | 説明 |
|-----------|------|------|
| **App name** | Yes | 一意な名前（最大 34 文字）。GitHub 全体で重複不可。小文字変換、スペースはハイフンに置換 |
| **Description** | No | ユーザーに表示される説明文 |
| **Homepage URL** | Yes | App の Web サイト URL。リポジトリやアカウント URL でも可 |

## 認証設定

| フィールド | 必須 | 説明 |
|-----------|------|------|
| **Callback URL** | No | OAuth ベースのユーザー認証フローで使用するリダイレクト URL（最大 10 個）。ユーザー代理で動作しない場合は不要 |
| **Token expiration** | 推奨 | ユーザーアクセストークンの有効期限設定。GitHub は有効化を強く推奨 |
| **Request user authorization during installation** | No | インストール時に OAuth 認証を要求するかどうか |
| **Enable Device Flow** | No | デバイスフロー認証のサポート |

## インストール・セットアップ

| フィールド | 必須 | 説明 |
|-----------|------|------|
| **Setup URL** | No | App インストール後にユーザーをリダイレクトする URL |
| **Redirect on update** | No | インストール変更時にセットアップ URL へリダイレクトするかどうか |

## Webhook 設定

| フィールド | 必須 | 説明 |
|-----------|------|------|
| **Active** | No | Webhook イベントの受信を有効にするかどうか |
| **Webhook URL** | Active 時は Yes | イベントペイロードの配信先 URL |
| **Webhook secret** | No（推奨） | Webhook 配信の検証用シークレット。GitHub は設定を強く推奨 |
| **SSL verification** | No（推奨） | SSL 証明書の検証。有効化を強く推奨 |

## 権限とイベント

### 権限の設定

- App に必要な**最小限の権限**を選択する
- 各権限は **No access**、**Read-only**、**Read & write** から選択
- 権限を設定すると、関連する Webhook イベントのサブスクライブが可能になる

### イベントの選択

- 権限設定後に利用可能なイベントが表示される
- 必要なイベントのみをサブスクライブする

## インストール範囲

| オプション | 説明 |
|-----------|------|
| **Only on this account** | 自分のアカウントにのみインストール可能 |
| **Any account** | 任意のアカウントにインストール可能 |

## 登録完了後

1. **Create GitHub App** をクリックして登録完了
2. App ID とクライアント ID が発行される
3. 秘密鍵（Private Key）を生成してダウンロードする
4. 必要に応じて App をインストールする

## 秘密鍵の管理

- App の設定画面から秘密鍵を生成する
- PEM 形式でダウンロードされる
- JWT の署名に使用する
- 安全に保管し、ソースコードにコミットしないこと

## 公式ドキュメント

- [Registering a GitHub App](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app)
