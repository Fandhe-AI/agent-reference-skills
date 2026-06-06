# Promote / Rollback

デプロイメントの昇格・ロールバック・再デプロイ

## デプロイメントを Production に昇格

> **警告**: Preview 環境向けビルドを昇格させる場合は確認プロンプトが表示される。本番環境に影響が生じる。

```sh
vercel promote [deployment-id-or-url]
```

確認をスキップして昇格（Preview ビルドの昇格にも有効）。

```sh
vercel promote [deployment-id-or-url] --yes
```

タイムアウトを指定して昇格（デフォルトは 3 分）。

```sh
vercel promote [deployment-id-or-url] --timeout=5m
```

昇格要求のみ発行して即時終了（タイムアウト 0）。

```sh
vercel promote [deployment-id-or-url] --timeout=0
```

昇格ステータスの確認。

```sh
vercel promote status
```

特定プロジェクトの昇格ステータスを確認。

```sh
vercel promote status [project]
```

タイムアウトを指定してステータスを確認。

```sh
vercel promote status --timeout 30s
```

## Production デプロイメントのロールバック

> **警告**: Hobby プランでは直前の Production デプロイメントにのみロールバック可能。さかのぼる場合は Pro プランへのアップグレードが必要。

直前のデプロイメントにロールバック（対話形式）。

```sh
vercel rollback
```

特定のデプロイメント URL または ID にロールバック。

```sh
vercel rollback [deployment-id-or-url]
```

タイムアウトを指定してロールバック。

```sh
vercel rollback [deployment-id-or-url] --timeout=5m
```

ロールバック要求のみ発行して即時終了。

```sh
vercel rollback [deployment-id-or-url] --timeout=0
```

ロールバックステータスの確認。

```sh
vercel rollback status
```

特定プロジェクトのロールバックステータスを確認。

```sh
vercel rollback status [project]
```

## ロールバックの取り消し

`vercel promote` で任意のデプロイメントに戻す。

```sh
vercel promote [deployment-id-or-url]
```
