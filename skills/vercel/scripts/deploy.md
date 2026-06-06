# Deploy

デプロイメントの作成・ビルド・ローカル開発サーバー

## Preview デプロイ（デフォルト）

プロジェクトのルートディレクトリで実行する。

```sh
vercel
```

または明示的に指定。

```sh
vercel deploy
```

## Production デプロイ

```sh
vercel --prod
```

## ローカルでビルドしてからデプロイ（ソースコード非送信）

`vercel pull` を事前に実行して最新の設定を取得しておくことを推奨。

```sh
vercel build
vercel deploy --prebuilt
```

アーカイブ圧縮してデプロイ（ファイル数が多い場合に推奨）。

```sh
vercel build
vercel deploy --prebuilt --archive=tgz
```

## Production 環境変数でローカルビルド

```sh
vercel build --prod
```

## カスタム環境にデプロイ

```sh
vercel deploy --target=staging
```

## ビルドキャッシュを使わずに強制デプロイ

```sh
vercel --force
```

ビルドキャッシュを無効にしつつキャッシュ結果は保持する。

```sh
vercel --force --with-cache
```

## ビルドログを表示しながらデプロイ

```sh
vercel deploy --logs
```

## ドメイン自動割り当てをスキップして Production デプロイ

> **警告**: プロジェクト設定の「Auto-assign Custom Production Domains」を上書きする。後で `vercel promote` でドメイン割り当てを完了できる。

```sh
vercel --prod --skip-domain
```

## ビルド時に環境変数を渡してデプロイ

```sh
vercel --build-env KEY1=value1 --build-env KEY2=value2
```

## ランタイム環境変数を渡してデプロイ

```sh
vercel --env KEY1=value1 --env KEY2=value2
```

## デプロイ完了を待たずに終了

```sh
vercel --no-wait
```

## ローカル開発サーバーの起動

```sh
vercel dev
```

ポートを指定して起動。

```sh
vercel dev --listen 5005
```

## 既存デプロイメントの再ビルド・再デプロイ

```sh
vercel redeploy [deployment-id-or-url]
```

## デプロイメント一覧の確認

```sh
vercel list
```

プロジェクト名を指定して確認。

```sh
vercel list [project-name]
```

## デプロイメントの詳細確認

```sh
vercel inspect [deployment-id-or-url]
```

ビルドログも含めて確認。

```sh
vercel inspect [deployment-id-or-url] --logs
```

## デプロイメントの削除

> **警告**: 削除したデプロイメントは元に戻せない。

```sh
vercel remove [deployment-url]
```

プロジェクト名を指定してデプロイメントを削除。

```sh
vercel remove [project-name]
```
