# Domains

ドメインの管理・購入・DNS 設定・エイリアス

## ドメイン一覧の表示

```sh
vercel domains ls
```

表示件数を指定（デフォルト 20、最大 100）。

```sh
vercel domains ls --limit 100
```

ページネーション（前のレスポンスのタイムスタンプを渡す）。

```sh
vercel domains ls --next 1584722256178
```

## ドメインの詳細確認

```sh
vercel domains inspect [domain]
```

## ドメインの追加

```sh
vercel domains add [domain] [project]
```

既存プロジェクトからドメインを強制移動して追加。

```sh
vercel domains add my-domain.com my-project --force
```

## ドメインの削除

> **警告**: 削除したドメインはプロジェクトから外れ、Vercel の管理下から削除される。

```sh
vercel domains rm [domain]
```

確認をスキップして削除。

```sh
vercel domains rm [domain] --yes
```

## ドメインの購入

```sh
vercel domains buy [domain]
```

## ドメインの価格確認

```sh
vercel domains price [domain]
```

複数ドメインの価格を一括確認。

```sh
vercel domains price [domain1] [domain2]
```

## ドメインの空き確認

```sh
vercel domains check [domain]
```

複数ドメインを一括確認。

```sh
vercel domains check [domain1] [domain2]
```

## ドメインの別スコープへの移動

```sh
vercel domains move [domain] [scope-name]
```

## ドメインの転入

```sh
vercel domains transfer-in [domain]
```

## デプロイメントへのエイリアス設定

```sh
vercel alias set [deployment-url] [custom-domain]
```

エイリアスの一覧表示。

```sh
vercel alias ls
```

エイリアスの削除。

> **警告**: エイリアスを削除すると、そのカスタムドメインへのルーティングが失われる。

```sh
vercel alias rm [custom-domain]
```

## DNS レコードの管理

ドメインの DNS レコード一覧表示。

```sh
vercel dns ls [domain]
```

DNS レコードの追加。

```sh
vercel dns add [domain] [name] [type] [value]
```

DNS レコードの削除。

> **警告**: DNS レコードを削除するとドメインのルーティングに影響が生じる。

```sh
vercel dns rm [record-id]
```

## SSL 証明書の管理

証明書の一覧表示。

```sh
vercel certs ls
```

証明書の発行。

```sh
vercel certs issue [domain]
```

証明書の削除。

```sh
vercel certs rm [certificate-id]
```
