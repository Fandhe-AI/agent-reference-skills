# Domains

ドメインの管理・購入・更新・DNS 設定・エイリアス

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

## ドメイン候補の検索

キーワードやドメインの断片から候補を探す。認証なしで実行できる（購入・管理には認証が必要）。

```sh
vercel domains search [query]
```

登録可能な候補のみ表示。

```sh
vercel domains search acme --available
```

並び順を指定（`relevance`（デフォルト）/ `alphabetical` / `length`）。

```sh
vercel domains search acme --order alphabetical
```

TLD で絞り込み（複数指定可）。

```sh
vercel domains search acme --tld com --tld dev
```

1 ページあたりの候補数（デフォルト 20、最大 200）とページネーション。

```sh
vercel domains search acme --limit 200
vercel domains search acme --next [cursor]
```

JSON 出力。

```sh
vercel domains search acme --format=json
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

> **警告**: 購入は課金を伴う。ドメイン登録は原則返金不可。

```sh
vercel domains buy [domain]
```

## ドメインの更新

> **警告**: 更新は課金を伴い、返金不可。コマンドは更新価格と期間を表示し、課金の確認を求める。

有効期限前に登録済みドメインを更新。

```sh
vercel domains renew [domain]
```

プロンプトなし（スクリプト・エージェント向け）では、`--amount` を省略すると課金せず現在価格を JSON で返す。

```sh
vercel domains renew example.com --scope my-team --json
```

人が承認した価格（USD）を `--amount` に指定して課金を実行（金額は現在価格と一致する必要がある）。

```sh
vercel domains renew example.com --scope my-team --amount 20.00 --json
```

## 自動更新の切り替え

ドメインと `on|off` の両方が必須。

```sh
vercel domains auto-renew [domain] [on|off]
```

```sh
vercel domains auto-renew my-domain.com on --format=json
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
