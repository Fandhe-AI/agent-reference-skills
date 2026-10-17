# CLI

Upstash CLI（`upstash`）による各リソースの管理・エージェント連携コマンド。Node.js 20 以上が必要。

## インストール

```sh
npm i -g upstash
```

インストールせずに `npx upstash redis list` のように実行することもできる。同一ビルドが `@upstash/cli` 名でも同じ版数で公開されている（既存インストールは動作継続）。

## AI エージェント連携のセットアップ

```sh
npx upstash
```

端末で引数なしに実行すると `upstash setup` が起動する。エージェントやスクリプトからは裸の `upstash` がヘルプ表示のみになるため、`upstash setup` を明示的に呼ぶ。

## セットアップのオプション指定

```sh
upstash setup --claude --cursor -y   # エージェントを指定、プロンプトなし
upstash setup --project              # ユーザー設定ではなくこのリポジトリに導入
upstash setup --mode mcp             # プラグインなし、MCP + skill のみ
upstash setup --dry-run              # 変更内容のプレビュー
```

setup は API キーをエージェント設定に書き込まない。再実行すると導入済みの内容が更新される。

## アカウント不要の無料 Redis 作成

```sh
upstash start-redis
```

Upstash アカウントに触れるコマンドはすべて認証が必要で、例外は `start-redis` と認証情報ヘルパーの `login` / `logout` のみ。72 時間で失効する一時 DB を作成し、認証情報とクイックスタートを markdown で出力する。Upstash アカウントで claim すると保持できる。

## 作成済み一時 DB の認証情報の再取得

```sh
upstash start-redis --id "${DB_ID}"
```

## エージェント識別付きの一時 DB 作成

```sh
upstash start-redis --user-agent claude-code
```

エージェントから呼ぶ場合は、どのエージェントかを `--user-agent` で明示する（`cursor` / `codex` / `opencode` 等）。

## 認証（ログイン）

```sh
upstash login
```

認証情報は `~/.config/upstash/config.json` に保存される。Developer API key は Upstash Console の Account → API Keys で取得する。

## 環境変数による認証

```sh
export UPSTASH_EMAIL=you@example.com
export UPSTASH_API_KEY=your_api_key
```

カレントディレクトリの `.env` ファイルからも自動読み込みされる。別ファイルは `--env-path` で指定する。

```sh
upstash --env-path .dev.vars redis list
```

## コマンドフラグによる認証（1コマンド限定）

```sh
upstash --email you@example.com --api-key your_api_key redis list
```

認証情報の優先順位は `flags` > 環境変数 > `.env` > 保存済み設定ファイル。

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

`DB_URL` と `DB_TOKEN` は Upstash Console の Details タブ、または `upstash redis get --db-id "${DB_ID}"` で確認できる。`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` を環境変数または `.env` に設定すれば `--db-url` / `--db-token` は省略可能。

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
upstash redis create --help
```

任意のコマンド・サブコマンドに `--help` を付けると利用可能なオプションが確認できる。

## ドライラン（破壊的操作のプレビュー）

```sh
upstash redis delete --db-id <DB_ID> --dry-run
```

> **警告**: `--dry-run` なしで削除コマンドを実行するとリソースが即時削除される。本番環境では必ず `--dry-run` で動作を確認してから実行すること（`delete` / `remove-member` が対象）。

成功時の出力は JSON（`start-redis` は markdown、`login` / `logout` は平文）。JSON は `jq` と組み合わせて利用できる。

```sh
upstash redis list | jq '.[].database_id'
```
