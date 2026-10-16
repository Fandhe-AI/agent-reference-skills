# Local Development

ローカル Supabase 環境の起動・停止・管理。

## プロジェクトの初期化

```sh
supabase init
```

`supabase/` ディレクトリと `config.toml` を生成する。

## VS Code 設定付きで初期化

```sh
supabase init --with-vscode-settings
```

## IntelliJ IDEA 設定付きで初期化

```sh
supabase init --with-intellij-settings
```

## ローカル環境の起動

```sh
supabase start
```

Docker を使用して全サービスを起動する。初回はイメージのダウンロードに時間がかかる。

## 信頼できないネットワークでの起動

```sh
docker network create -o 'com.docker.network.bridge.host_binding_ipv4=127.0.0.1' local-network
npx supabase start --network-id local-network
```

公共ネットワーク等に接続している場合、127.0.0.1 にバインドした Docker ネットワークを作成してから起動する。ローカル環境を外部へ公開しないこと。

## 特定サービスを除外して起動

```sh
supabase start --exclude studio,imgproxy,inbucket
```

除外可能なサービス: `auth`, `realtime`, `storage`, `edge-runtime`, `studio`, `imgproxy`, `inbucket`, `postgrest`, `pgbouncer`

## 実験的 stack コマンドの有効化（config.toml）

```toml
[experimental]
stack = true
```

`supabase/config.toml` の既存 `[experimental]` テーブルに追記する（テーブルを重複させない）。stack コマンドは experimental でフラグ・出力が変わり得る（CLI v2.119.0 以降）。

## 実験的 stack コマンドの有効化（環境変数）

```sh
export SUPABASE_EXPERIMENTAL_STACK=1
```

`config.toml` が無いディレクトリではこちらを使う。環境変数が config より優先される。`SUPABASE_EXPERIMENTAL_STACK=0` で 1 セッションのみ無効化できる。

## stack コマンドの確認

```sh
supabase stack --help
```

## 名前付きローカルプロジェクトの停止

```sh
supabase stop --stack test
```

stack 有効時のみ。`--stack <name>` で起動したローカルプロジェクトを対象にする。

## 全ローカルプロジェクトの停止

```sh
supabase stack stop --all
```

## ローカルプロジェクトの破棄

> **警告**: `supabase stack destroy` はバックアップを取らず、データを完全に削除する。復旧不可。

```sh
supabase stack destroy --stack test --yes
```

`--yes` で確認プロンプトを省略する。

## ローカル環境の停止

```sh
supabase stop
```

## データをバックアップして停止

```sh
supabase stop --backup
```

次回 `supabase start` 時にデータが復元される。stack 有効時は `--no-backup` / `--project-id` が使えず、データ削除は `supabase stack destroy` を使う。

## 状態と接続情報の確認

```sh
supabase status
```

## 環境変数形式で接続情報を出力

```sh
supabase status -o env > .env.local
```

## JSON 形式で接続情報を出力

```sh
supabase status -o json
```

## リモートプロジェクトへのリンク

```sh
supabase link --project-ref <project-ref>
```

`<project-ref>` は Supabase Dashboard の URL または `supabase projects list` で確認できる。

## パスワード付きでリンク

```sh
supabase link --project-ref <project-ref> --password <db-password>
```

## 環境変数でパスワードを指定してリンク

```sh
export SUPABASE_DB_PASSWORD=<db-password>
supabase link --project-ref <project-ref>
```

## テレメトリの無効化

```sh
supabase telemetry disable
```

## テレメトリの状態確認

```sh
supabase telemetry status
```
