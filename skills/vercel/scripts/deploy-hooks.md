# Deploy Hooks

Deploy Hook URL の一覧・作成・削除（CMS 等外部システムからの再デプロイ用）

## Deploy Hook の一覧表示

```sh
vercel deploy-hooks ls
```

JSON 形式・別プロジェクト指定で出力。

```sh
vercel deploy-hooks ls --format json --project my-app
```

## Deploy Hook の作成

指定した Git ブランチをデプロイする Hook を作成。作成時に Hook URL が返される。

```sh
vercel deploy-hooks create cms-rebuild --ref main
```

作成した URL を CMS の publish webhook に設定すると、コンテンツ更新時に本番再デプロイをトリガーできる。

## Deploy Hook の削除

> **警告**: 削除した Hook URL は無効になり、それを呼び出していた外部システムからの再デプロイが失敗するようになる。事前に `vercel deploy-hooks ls` で ID を確認する。

```sh
vercel deploy-hooks rm hook_abc123 --yes
```
