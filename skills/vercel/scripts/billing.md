# Billing

チームの請求まわり（billing overview / invoices / budgets / contract / usage）の確認・Spend Management 予算の管理

`vercel billing` をサブコマンドなしで実行するとサブコマンド一覧を表示する。オプションはサブコマンドの前後どちらにも置ける（例: `vercel billing --json budgets alerts`）。

## プラン・残高の概要（overview）

プラン・請求ステータス・請求サイクル・未払い残高・期限超過の請求書を表示（`vercel@65.15.0` 以降）。請求書へのアクセス権がない場合は `Balance Due` / `Overdue` が出ず警告のみ表示される（終了コードは 0）。

```sh
vercel billing overview
```

JSON 形式で出力（アクセス権がない場合は `billing.balance` が `null`）。

```sh
vercel billing overview --json
```

## 請求書の確認（invoices）

新しい順に一覧表示（サブコマンドなしの `vercel billing invoices` も同じ）。デフォルトのステータスは `open` / `paid` / `uncollectible`、表示件数は 20（最大 100）。

```sh
vercel billing invoices list --limit 3
```

ステータスで絞り込み（繰り返し指定可: `draft` / `open` / `paid` / `uncollectible` / `void`）。

```sh
vercel billing invoices list --status open --status uncollectible
```

次のページを取得（`<NEXT_CURSOR>` は前ページの出力のカーソルに置き換える。`--status` との併用は不可）。

```sh
vercel billing invoices list --limit 3 --next <NEXT_CURSOR>
```

請求書の詳細・明細を表示。`<INVOICE_ID>` は `list` で表示された完全な請求書 ID に置き換える。

```sh
vercel billing invoices inspect <INVOICE_ID>
```

次回請求書の見積もりを表示（`vercel@65.10.0` 以降。金額は請求期間の終了まで変動する。表示は最大 5 明細で、全件は `--json`）。

```sh
vercel billing invoices upcoming
```

請求書を PDF で保存（既存ファイルは上書きされない。`-o -` で標準出力へ出力）。

```sh
vercel billing invoices download <INVOICE_ID> --output invoice.pdf
```

## 使用量・コスト（usage）

Vercel CLI 65.11.0 以降。旧名 `vercel usage` は動作するが非推奨警告が出る。

```sh
vercel billing usage
```

期間を指定（`--since` は `YYYY-MM-DD`・ISO 8601・相対期間、`--until` には `--since` が必要）。

```sh
vercel billing usage --since 2025-01-01 --until 2025-01-31
```

日別・週別・月別の内訳（`daily` / `weekly` / `monthly`。最大 1 年）。

```sh
vercel billing usage --since 2025-01-01 --until 2025-01-31 --breakdown weekly
```

プロジェクトまたはリージョン別に集計（`project` / `region`。`--breakdown` とは併用不可）。

```sh
vercel billing usage --group-by project
```

JSON 形式で出力（旧 `--format json` は非推奨）。

```sh
vercel billing usage --json
```

## 契約コミットメントの確認（contract）

Enterprise 契約のコミットメントを契約 ID ごとの表で表示する（他のプランでは表示するコミットメントがない）。

```sh
vercel billing contract
```

JSON 形式で出力（`context` / `commitments` / `totalCommitments`）。

```sh
vercel billing contract --json
```

## Spend Management 予算（budgets）

詳細は [budgets のページ](https://vercel.com/docs/cli/budgets) を参照。予算の変更には Owner または Billing ロールが必要。対象は無指定でチーム、`--project <name or ID>`（`-p`）でプロジェクト、`--product <name or ID>` でプロダクト、`--organization <slug or ID>` で組織。

予算の一覧（サブコマンドなしの `vercel billing budgets` も同じ）。

```sh
vercel billing budgets list
```

今サイクルの支出を予算と照らして表示。

```sh
vercel billing budgets inspect --project my-app
```

予算を作成・更新（作成時は `--amount`（ドル）が必須。`--pause` で上限到達時に本番デプロイを一時停止、`--webhook <url>` でしきい値到達時に HTTPS POST）。

```sh
vercel billing budgets set --amount 200 --pause --webhook https://example.com/spend
```

プロジェクト・プロダクト・組織の予算を設定（プロダクト・組織の予算は一時停止できず、通知と webhook のみ）。

```sh
vercel billing budgets set --project my-app --amount 100 --pause
vercel billing budgets set --product "Fast Data Transfer" --amount 50
vercel billing budgets set --organization my-org --amount 10000
```

> **注記**: webhook を追加した `set` は webhook のシークレットを一度だけ表示する。表示時に保管し、ログや CI 出力に残さない。

予算の削除（スクリプトでは確認を省略する `--yes` が必要）。

> **警告**: 削除した予算の通知・一時停止は設定されなくなる。削除済み予算のアラート履歴は `alerts` に残る。

```sh
vercel billing budgets remove --project my-app --yes
```

アラート履歴を新しい順に表示（`--since` / `--until` は ISO 8601 または `7d` 等の相対時間、`--limit` は 1〜100）。

```sh
vercel billing budgets alerts --since 7d --limit 20
```

## Notes

- Source: https://vercel.com/docs/cli/billing , https://vercel.com/docs/cli/usage , https://vercel.com/docs/cli/contract , https://vercel.com/docs/cli/budgets (fetched 2026-11-14)
