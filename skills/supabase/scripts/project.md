# Project

プロジェクト・組織・シークレット・Storage の管理コマンド。

## ログイン（ブラウザ経由）

```sh
supabase login
```

## ログイン（アクセストークン直接指定）

```sh
supabase login --token <access-token>
```

## 環境変数でアクセストークンを設定

```sh
export SUPABASE_ACCESS_TOKEN=<access-token>
```

## プロジェクト一覧の表示

```sh
supabase projects list
```

## プロジェクトの作成

```sh
supabase projects create "<project-name>" \
  --org-id <org-id> \
  --region <region> \
  --db-password <db-password>
```

## プロジェクトの API キー確認

```sh
supabase projects api-keys --project-ref <project-ref>
```

## プロジェクトの削除

```sh
supabase projects delete --ref <project-ref>
```

> **警告**: プロジェクトが完全に削除される。この操作は元に戻せない。

## 組織一覧の表示

```sh
supabase orgs list
```

## 組織の作成

```sh
supabase orgs create "<org-name>"
```

## シークレットの一覧表示

```sh
supabase secrets list
```

## シークレットの設定

```sh
supabase secrets set <NAME>=<VALUE>
```

## 複数シークレットの設定

```sh
supabase secrets set STRIPE_KEY=sk_live_... SENDGRID_KEY=SG....
```

## .env ファイルからシークレットを読み込んで設定

```sh
supabase secrets set --env-file .env.production
```

## シークレットの削除

```sh
supabase secrets unset <NAME>
```

## Storage ファイル一覧の表示

```sh
supabase storage ls ss:///<bucket-name>/
```

## Storage へのファイルアップロード

```sh
supabase storage cp ./local-file.png ss:///<bucket-name>/path/file.png
```

## Storage ディレクトリの再帰的アップロード

```sh
supabase storage cp -r ./local-dir ss:///<bucket-name>/path/
```

## Storage からのファイルダウンロード

```sh
supabase storage cp ss:///<bucket-name>/path/file.png ./local-file.png
```

## Storage ファイルの移動/リネーム

```sh
supabase storage mv ss:///<bucket>/old-path.png ss:///<bucket>/new-path.png
```

## Storage ファイルの削除

```sh
supabase storage rm ss:///<bucket-name>/path/file.png
```

> **警告**: Storage オブジェクトが即時削除される。この操作は元に戻せない。

## Storage ディレクトリの再帰的削除

```sh
supabase storage rm -r ss:///<bucket-name>/path/
```

> **警告**: 指定ディレクトリ以下の全オブジェクトが削除される。この操作は元に戻せない。
