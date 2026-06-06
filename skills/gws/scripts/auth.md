# Auth

gws の認証・認可コマンド集。

## インタラクティブセットアップ（gcloud CLI 使用）

```sh
gws auth setup
```

Google Cloud プロジェクトの作成・設定を自動で行う。`gcloud` CLI が必要。

## OAuth ログイン

```sh
gws auth login
```

## OAuth ログイン（スコープ指定）

```sh
gws auth login -s drive,gmail,sheets
```

利用するサービスのスコープをカンマ区切りで指定する。

## 認証情報のエクスポート（CI / ヘッドレス環境向け）

> **警告**: `--unmasked` はシークレット情報をそのまま出力する。出力ファイルの取り扱いに注意し、バージョン管理に含めないこと。

```sh
gws auth export --unmasked > credentials.json
```

## サービスアカウント認証

```sh
export GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/sa.json
```

サービスアカウントのキーファイルパスを環境変数で指定する。

## 事前取得済みトークンを使用する

```sh
export GOOGLE_WORKSPACE_CLI_TOKEN=<access_token>
```

## OAuth クライアント ID / シークレットの手動指定

```sh
export GOOGLE_WORKSPACE_CLI_CLIENT_ID=<client_id>
export GOOGLE_WORKSPACE_CLI_CLIENT_SECRET=<client_secret>
```

## 手動セットアップ（gcloud なし）

```sh
# OAuth 認証情報を Google Cloud Console からダウンロードし、以下のパスに配置する
cp client_secret.json ~/.config/gws/client_secret.json
```

## 設定ディレクトリの変更

```sh
export GOOGLE_WORKSPACE_CLI_CONFIG_DIR=/path/to/config
```

デフォルトは `~/.config/gws`。

## キーリングバックエンドの変更（OS キーリングを使わない場合）

```sh
export GOOGLE_WORKSPACE_CLI_KEYRING_BACKEND=file
```

`~/.config/gws/.encryption_key` を使ったファイルベースの暗号化に切り替わる。

## ログレベルの設定

```sh
export GOOGLE_WORKSPACE_CLI_LOG=gws=debug
```

## ログファイルの出力先指定

```sh
export GOOGLE_WORKSPACE_CLI_LOG_FILE=/path/to/log/dir
```

日次ローテーションで JSON ログを保存する。

## .env ファイルへの記述

```sh
# .env ファイルに記述することで環境変数を自動ロードできる
GOOGLE_WORKSPACE_CLI_TOKEN=<access_token>
GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE=/path/to/sa.json
```
