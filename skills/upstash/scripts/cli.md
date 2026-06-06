# CLI

Upstash CLI（`@upstash/cli`）による各リソースの管理コマンド。

## インストール

```sh
npm i -g @upstash/cli
```

## 認証（ログイン）

```sh
upstash login
```

認証情報は `~/.config/upstash/config.json` に保存される。

## 環境変数による認証

```sh
export UPSTASH_EMAIL=you@example.com
export UPSTASH_API_KEY=your_api_key
```

カレントディレクトリの `.env` ファイルからも自動読み込みされる。

## コマンドフラグによる認証（1コマンド限定）

```sh
upstash --email you@example.com --api-key your_api_key redis list
```

## Redis データベース一覧の取得

```sh
upstash redis list
```

## Redis データベースの作成

```sh
upstash redis create --name <DB_NAME> --region <REGION>
```

例:

```sh
upstash redis create --name=cli-powered-db --region=eu-central-1
```

## Redis コマンドの実行（REST API 経由）

```sh
upstash redis exec --db-url <DB_URL> --db-token <DB_TOKEN> GET <KEY>
```

`DB_URL` と `DB_TOKEN` は Upstash Console の Details タブで確認できる。

## Vector インデックス一覧の取得

```sh
upstash vector list
```

## Vector インデックスの作成

```sh
upstash vector create --name <INDEX_NAME> --region <REGION> --similarity-function COSINE --dimension-count 1536
```

## Search インデックス一覧の取得

```sh
upstash search list
```

## Search インデックスの作成

```sh
upstash search create --name <INDEX_NAME> --region <REGION> --type DENSE
```

## QStash インスタンス一覧の取得

```sh
upstash qstash list
```

## QStash 統計の取得

```sh
upstash qstash stats --qstash-id <QSTASH_ID> --period 7d
```

## チーム一覧の取得

```sh
upstash team list
```

## チームメンバーの追加

```sh
upstash team add-member --team-id <TEAM_ID> --member-email <EMAIL> --role dev
```

## ヘルプの表示

```sh
upstash --help
upstash redis --help
upstash vector --help
```

任意のコマンド・サブコマンドに `--help` を付けると利用可能なオプションが確認できる。

## ドライラン（破壊的操作のプレビュー）

```sh
upstash --dry-run redis delete --db-id <DB_ID>
```

> **警告**: `--dry-run` なしで削除コマンドを実行するとリソースが即時削除される。本番環境では必ず `--dry-run` で動作を確認してから実行すること。

すべての出力は JSON 形式で返るため `jq` と組み合わせて利用できる。
