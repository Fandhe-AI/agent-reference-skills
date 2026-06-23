---
name: stripe
description: >
  Stripe 決済プラットフォーム全商品のリファレンス。
  PaymentIntents, Checkout, Payment Links, Elements, Subscriptions, Invoices,
  Connect, Radar, Terminal, Tax, Issuing, Treasury, Capital,
  Identity, Financial Connections, Webhooks, Stripe CLI, idempotency,
  API versioning, pagination, error handling。
user-invocable: false
---

## ディレクトリ構成

```text
skills/stripe/
  SKILL.md
  references/
    payments/
      README.md
      payment-intents.md
      payment-methods.md
      charges.md
      refunds.md
      disputes.md
    managed-payments/
      README.md
      overview.md
      eligibility.md
      tax-compliance.md
      set-up-checkout.md
      payment-links.md
    terminal/
      README.md
      readers.md
      locations.md
      connection-tokens.md
      in-person-payment.md
    connect/
      README.md
      accounts.md
      account-links.md
      transfers-payouts.md
      charge-types.md
    radar/
      README.md
      rules.md
      reviews.md
      early-fraud-warnings.md
    climate/
      README.md
      climate-orders.md
      climate-products.md
      climate-suppliers.md
    identity/
      README.md
      verification-sessions.md
      verification-reports.md
    financial-connections/
      README.md
      fc-accounts.md
      fc-sessions.md
    crypto/
      README.md
      onramp-sessions.md
    billing/
      README.md
      subscriptions.md
      invoices.md
      products-prices.md
      customer-portal.md
    tax/
      README.md
      tax-calculations.md
      tax-transactions.md
      registrations.md
    revenue-recognition/
      README.md
      revenue-recognition-overview.md
    sigma/
      README.md
      sigma-queries.md
    data-pipeline/
      README.md
      data-pipeline-overview.md
    atlas/
      README.md
      atlas-overview.md
      atlas-company-types.md
      atlas-83b-election.md
      atlas-post-incorporation.md
    issuing/
      README.md
      cardholders.md
      cards.md
      authorizations.md
    treasury/
      README.md
      financial-accounts.md
      transactions.md
      money-movement.md
    capital/
      README.md
      financing-offers.md
      financing-transactions.md
      financing-summary.md
    payment-links/
      README.md
      payment-links.md
    checkout/
      README.md
      checkout-sessions.md
    elements/
      README.md
      stripe-elements.md
    api-core/
      README.md
      authentication.md
      idempotency.md
      pagination.md
      error-handling.md
      api-versioning.md
    webhooks-events/
      README.md
      webhook-endpoints.md
      event-types.md
      signature-verification.md
    cli-tooling/
      README.md
      stripe-cli.md
      testing.md
  samples/
    README.md
    payment-flow.md
    subscription-flow.md
    webhook-handling.md
  scripts/
    README.md
    installation.md
    cli-commands.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

### グローバル決済

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| PaymentIntent を作成・確認・キャンセルしたい | payments | [references/payments/README.md](references/payments/README.md) |
| 支払い方法（カード、銀行口座等）を登録・管理したい | payments | [references/payments/README.md](references/payments/README.md) |
| 返金・チャージバック・異議申し立てを処理したい | payments | [references/payments/README.md](references/payments/README.md) |
| Stripe が Merchant of Record となる Managed Payments を使いたい | managed-payments | [references/managed-payments/README.md](references/managed-payments/README.md) |
| デジタル商品の税コンプライアンスを自動化したい | managed-payments | [references/managed-payments/README.md](references/managed-payments/README.md) |
| 対面決済（カードリーダー）を実装したい | terminal | [references/terminal/README.md](references/terminal/README.md) |
| Terminal リーダーの登録・管理・接続トークンを取得したい | terminal | [references/terminal/README.md](references/terminal/README.md) |
| マルチパーティ決済・プラットフォーム構築をしたい | connect | [references/connect/README.md](references/connect/README.md) |
| Connect サブアカウントのオンボーディング・送金・支払いを管理したい | connect | [references/connect/README.md](references/connect/README.md) |
| 不正検知ルール・レビューキュー・早期詐欺警告を管理したい | radar | [references/radar/README.md](references/radar/README.md) |
| カスタム Radar ルールを作成・更新したい | radar | [references/radar/README.md](references/radar/README.md) |
| カーボンリムーバル（気候変動対策）の注文を購入したい | climate | [references/climate/README.md](references/climate/README.md) |
| 本人確認（KYC/IDV）のセッションを作成・管理したい | identity | [references/identity/README.md](references/identity/README.md) |
| 銀行口座リンク（Financial Connections）を実装したい | financial-connections | [references/financial-connections/README.md](references/financial-connections/README.md) |
| フィアット→暗号資産オンランプを実装したい | crypto | [references/crypto/README.md](references/crypto/README.md) |

### 収益・財務管理

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| サブスクリプション・請求書を作成・管理したい | billing | [references/billing/README.md](references/billing/README.md) |
| 料金プラン（従量課金・段階課金等）を定義したい | billing | [references/billing/README.md](references/billing/README.md) |
| 顧客ポータル（自己管理 UI）を設定したい | billing | [references/billing/README.md](references/billing/README.md) |
| 消費税・VAT・GST を自動計算・収集したい | tax | [references/tax/README.md](references/tax/README.md) |
| 税登録（Tax Registration）を国ごとに管理したい | tax | [references/tax/README.md](references/tax/README.md) |
| ASC 606 / IFRS 15 に準拠した収益認識を自動化したい | revenue-recognition | [references/revenue-recognition/README.md](references/revenue-recognition/README.md) |
| SQL でカスタムレポートを作成したい | sigma | [references/sigma/README.md](references/sigma/README.md) |
| Stripe データを Snowflake / Redshift / Databricks にエクスポートしたい | data-pipeline | [references/data-pipeline/README.md](references/data-pipeline/README.md) |
| Delaware C Corp / LLC を設立したい | atlas | [references/atlas/README.md](references/atlas/README.md) |
| Section 83(b) 選択・法人設立後の手続きを知りたい | atlas | [references/atlas/README.md](references/atlas/README.md) |

### バンキング・アズ・サービス

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| カード発行（仮想・物理）・カードホルダー管理をしたい | issuing | [references/issuing/README.md](references/issuing/README.md) |
| リアルタイムの与信承認をカスタム制御したい | issuing | [references/issuing/README.md](references/issuing/README.md) |
| Treasury FinancialAccount を作成・資金移動したい | treasury | [references/treasury/README.md](references/treasury/README.md) |
| InboundTransfer / OutboundPayment / ReceivedCredit を管理したい | treasury | [references/treasury/README.md](references/treasury/README.md) |
| Connect サブアカウントへの Capital ファイナンシングオファーを管理したい | capital | [references/capital/README.md](references/capital/README.md) |
| ファイナンシング取引・残高サマリーを取得したい | capital | [references/capital/README.md](references/capital/README.md) |

### 構築済みコンポーネント

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| コード不要の決済リンクを作成・共有したい | payment-links | [references/payment-links/README.md](references/payment-links/README.md) |
| Stripe ホスト型またはエンベッド型の決済ページを使いたい | checkout | [references/checkout/README.md](references/checkout/README.md) |
| Checkout Session の作成・管理・設定オプションを知りたい | checkout | [references/checkout/README.md](references/checkout/README.md) |
| カスタム UI に Stripe Elements を組み込みたい | elements | [references/elements/README.md](references/elements/README.md) |
| Payment Element / Card Element の使い方を知りたい | elements | [references/elements/README.md](references/elements/README.md) |

### 開発者ツール（横断）

| タスク | カテゴリ | 参照 README |
| --- | --- | --- |
| API キー認証・Bearer トークンの使い方を知りたい | api-core | [references/api-core/README.md](references/api-core/README.md) |
| 冪等性キー・安全なリトライを実装したい | api-core | [references/api-core/README.md](references/api-core/README.md) |
| カーソルページネーション・リスト取得を実装したい | api-core | [references/api-core/README.md](references/api-core/README.md) |
| エラーハンドリング・HTTP ステータスコードを把握したい | api-core | [references/api-core/README.md](references/api-core/README.md) |
| API バージョンの確認・アップグレードをしたい | api-core | [references/api-core/README.md](references/api-core/README.md) |
| Webhook エンドポイントを登録・管理したい | webhooks-events | [references/webhooks-events/README.md](references/webhooks-events/README.md) |
| Webhook の署名検証（constructEvent）を実装したい | webhooks-events | [references/webhooks-events/README.md](references/webhooks-events/README.md) |
| イベント種別・イベントオブジェクト構造を知りたい | webhooks-events | [references/webhooks-events/README.md](references/webhooks-events/README.md) |
| Stripe CLI のインストール・ログイン・ローカルリスナーを使いたい | cli-tooling | [references/cli-tooling/README.md](references/cli-tooling/README.md) |
| テストカード・テストクロック・Webhook トリガーを使いたい | cli-tooling | [references/cli-tooling/README.md](references/cli-tooling/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
