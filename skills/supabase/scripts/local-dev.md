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

## 特定サービスを除外して起動

```sh
supabase start --exclude studio,imgproxy,inbucket
```

除外可能なサービス: `auth`, `realtime`, `storage`, `edge-runtime`, `studio`, `imgproxy`, `inbucket`, `postgrest`, `pgbouncer`

## ローカル環境の停止

```sh
supabase stop
```

## データをバックアップして停止

```sh
supabase stop --backup
```

次回 `supabase start` 時にデータが復元される。

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
