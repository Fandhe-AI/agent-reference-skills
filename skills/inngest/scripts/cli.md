# CLI

Inngest CLI による Cloud の run 調査・trace 取得・function 起動と認証操作。

## CLI のインストール

> **警告**: インストーラースクリプトはリモートのシェルスクリプトを実行する。内容を確認できる環境・使い捨て環境で実行する。

```sh
curl -sfL -o install.sh https://cli.inngest.com/install.sh
# install.sh の内容を確認してから実行する
sh install.sh
```

```sh
brew install inngest/tap/inngest
```

Homebrew が untrusted な tap を警告した場合は、次を実行してから再度インストールする。

```sh
brew trust --cask inngest/tap/inngest
```

```sh
npm install -g inngest-cli
```

## OAuth ログイン

```sh
inngest login
```

ブラウザで承認し、必要なアクセス権を選択する。以降の例は `production` 環境を対象とする（slug は自身の環境に置き換える）。

## ログイン状態の確認とログアウト

```sh
inngest auth status
inngest logout
```

`auth status` は現在のログインを表示し、`logout` はセッションを失効させてローカルの認証情報を削除する。

## 別の権限で再ログイン

```sh
inngest login --force
```

承認 URL を手動で開く場合は `inngest login --no-browser` を使う。

## OS 資格情報ストアが無い環境でのログイン

> **警告**: OS の資格情報ストアが使えない場合に、ユーザーのみ読み取り可能な平文ファイルへ認証情報を保存する。信頼できる環境でのみ使用すること。

```sh
inngest login --insecure-storage
```

## function run の取得

```sh
inngest api --prod --env production get-function-run 01KTCTWT8XDEGWDMVX3Q9M69ND
```

`--prod` で Inngest Cloud を対象にし、`--env <slug>` で環境を選択する。

## event が起動した run の一覧取得

```sh
inngest api --prod --env production get-event-runs 01KTCTWSZJEKAFEDA4F9GYHFQW --include-output --limit 5
```

## function trace の取得

```sh
inngest api --prod --env production get-function-trace 01KTCTWT8XDEGWDMVX3Q9M69ND --include-output
```

## function の起動

```sh
inngest api invoke-function my-app my-function --data '{"message": "hello"}'
```

`--prod` を付けない場合はローカル Dev Server が対象になる。

## 接続先の切り替え

```sh
# Local dev server (default)
inngest api get-function-run 01ABC123

# Inngest Cloud
inngest api --prod --env production get-function-run 01ABC123

# Custom API host
inngest api --api-host http://localhost:8288 get-function-run 01ABC123
```

接続先の解決順は `--api-host` / `--api-port`、`--prod`、デフォルト（ローカル Dev Server）。ログインしても接続先は変わらないため、Cloud には `--prod` が必要。全環境にアクセス可能なセッション・キーでは `--env <slug>` または `INNGEST_ENV` で環境を選ぶ。単一環境に紐づくセッション・キーは他の環境にアクセスできない。

## コマンド一覧の確認

```sh
inngest api --help
inngest api get-function-run --help
```

CLI は Inngest v2 REST API からコマンドを自動生成する。主なコマンドは `get-function-run <run_id>` / `get-function-trace <run_id>` / `get-event-runs <event_id>` / `rerun <run_id>` / `invoke-function <app_id> <function_id>`。共通フラグは `--include-output` / `--limit N` / `--prod` / `--env <slug>`。

## API キーによる認証（CI・非対話）

> **警告**: API キーは秘密情報。リポジトリへコミットせず、CI のシークレットで管理する。

```sh
read -rs INNGEST_API_KEY
export INNGEST_API_KEY
```

キーは `sk-inn-api-` で始まる形式。値はコマンドに直接書かず、プロンプトへの入力または CI のシークレットから注入する。API キーは保存済みの OAuth ログインより優先される。OAuth に戻す場合は `INNGEST_API_KEY` を unset し、明示的なキーフラグも外す。

## Credential precedence

API コマンドの認証情報は次の順で解決される。

1. `--api-key` フラグ（明示的な上書き）
2. `INNGEST_API_KEY` 環境変数
3. `--signing-key` フラグ
4. 対象 API ホスト向けに保存された OAuth ログイン
5. `INNGEST_SIGNING_KEY` 環境変数（フォールバック）

ローカル Dev Server は認証不要。

## Output format

```sh
# Get just the status
inngest api --prod --env production get-function-run 01ABC123 | jq '.data.status'

# Pretty print
inngest api --prod --env production get-function-run 01ABC123 | jq .
```

出力はデフォルトで compact JSON。jq 等へパイプして整形・抽出する。
