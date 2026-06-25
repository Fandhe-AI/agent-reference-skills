---
name: apple-distribution
description: >
  App Store Connect API (REST) リファレンス。JWT 認証、API キー作成・失効、
  Apps, Builds, Bundle IDs, Certificates, Devices, Provisioning Profiles, Users。
  TestFlight Beta Groups / Testers / App Review。In-App Purchases, Subscriptions,
  Subscription Groups, Promotional Offers, App Price Points, Sales Reports。アプリ配布。
user-invocable: false
---

本スキルは **App Store Connect API (REST)** を中心としたアプリ配布・収益化のリファレンスです。JWT 認証から TestFlight ベータ配布、In-App Purchases・Subscriptions の管理、売上レポートの取得まで網羅しています。

## ディレクトリ構成

```text
skills/apple-distribution/
  SKILL.md
  references/
    asc-api-core/
      README.md
      creating-api-keys.md
      generating-tokens.md
      revoking-api-keys.md
      rate-limits.md
      apps.md
      app-infos.md
      app-store-versions.md
      builds.md
      bundle-ids.md
      certificates.md
      devices.md
      profiles.md
      users.md
      pagination.md
      error-handling.md
    asc-testflight-iap/
      README.md
      beta-groups.md
      beta-testers.md
      beta-app-review.md
      builds-beta.md
      beta-build-localizations.md
      in-app-purchases.md
      subscriptions.md
      subscription-groups.md
      promotional-offers.md
      app-price-points.md
      sales-finance-reports.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| API キーの作成・失効、JWT トークン生成 | asc-api-core | [references/asc-api-core/README.md](references/asc-api-core/README.md) |
| Apps・App Infos・App Store Versions の取得・更新 | asc-api-core | [references/asc-api-core/README.md](references/asc-api-core/README.md) |
| Builds の一覧取得・管理、Bundle IDs / Certificates / Devices / Profiles の操作 | asc-api-core | [references/asc-api-core/README.md](references/asc-api-core/README.md) |
| Users のロール管理、ページネーション、エラー処理 | asc-api-core | [references/asc-api-core/README.md](references/asc-api-core/README.md) |
| Beta Groups / Testers の作成・招待、TestFlight ビルド配布 | asc-testflight-iap | [references/asc-testflight-iap/README.md](references/asc-testflight-iap/README.md) |
| Beta App Review の提出、Beta Build Localizations の管理 | asc-testflight-iap | [references/asc-testflight-iap/README.md](references/asc-testflight-iap/README.md) |
| In-App Purchases・Subscriptions・Subscription Groups の設定 | asc-testflight-iap | [references/asc-testflight-iap/README.md](references/asc-testflight-iap/README.md) |
| Promotional Offers・App Price Points の設定、Sales/Finance Reports の取得 | asc-testflight-iap | [references/asc-testflight-iap/README.md](references/asc-testflight-iap/README.md) |
