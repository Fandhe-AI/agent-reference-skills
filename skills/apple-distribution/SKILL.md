---
name: apple-distribution
description: >
  App Store Connect API (REST) リファレンス。JWT 認証、API キー作成・失効、
  Apps, Builds, Bundle IDs, Certificates, Devices, Provisioning Profiles, Users。
  TestFlight Beta Groups / Testers / App Review。In-App Purchases, Subscriptions,
  Subscription Groups, Promotional Offers, App Price Points, Sales Reports。アプリ配布。
  Sandbox Testers, User Invitations, Merchant IDs, Pass Type IDs, Bundle ID Capabilities。
  Webhooks / Webhook Events / Deliveries、Xcode Cloud (Workflows, Build Runs, Artifacts)、
  Alternative Distribution (EU マーケットプレイス / Web Distribution)、
  Game Center (Achievements, Leaderboards, Challenges)、Analytics / 診断レポート。
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
      release-notes.md
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
      uploading-assets.md
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
    asc-users-access-extra/
      README.md
      sandbox-testers.md
      user-invitations.md
    asc-provisioning-extra/
      README.md
      bundle-id-capabilities.md
      merchant-ids.md
      pass-type-ids.md
    asc-webhooks/
      README.md
      configuring-webhook-notifications.md
      webhook-deliveries.md
      webhook-events.md
      webhook-pings.md
      webhooks.md
    asc-xcode-cloud/
      README.md
      artifacts.md
      build-actions.md
      build-runs.md
      issues.md
      macos-versions.md
      products.md
      test-results.md
      workflows.md
      xcode-versions.md
    asc-alternative-distribution/
      README.md
      alternative-distribution-domains.md
      alternative-distribution-keys.md
      alternative-distribution-packages.md
      configuring-alternative-marketplaces.md
      configuring-web-distribution.md
      marketplace-search-configurations.md
      notifications.md
    asc-game-center/
      README.md
      game-center-activities.md
      game-center-achievements.md
      game-center-app-versions.md
      game-center-challenges.md
      game-center-details.md
      game-center-groups.md
      game-center-leaderboard-sets.md
      game-center-leaderboards.md
      game-center-matchmaking-rules.md
    asc-reporting-extra/
      analytics-report-requests.md
      analytics-reports-instances-segments.md
      diagnostic-signatures-logs.md
      power-performance-metrics.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| API キーの作成・失効、JWT トークン生成、レート制限、リリースノート | asc-api-core | [references/asc-api-core/README.md](references/asc-api-core/README.md) |
| Apps・App Infos・App Store Versions の取得・更新 | asc-api-core | [references/asc-api-core/README.md](references/asc-api-core/README.md) |
| Builds の一覧取得・管理、Bundle IDs / Certificates / Devices / Profiles の操作 | asc-api-core | [references/asc-api-core/README.md](references/asc-api-core/README.md) |
| Users のロール管理、ページネーション、エラー処理、アセットのアップロード | asc-api-core | [references/asc-api-core/README.md](references/asc-api-core/README.md) |
| Beta Groups / Testers の作成・招待、TestFlight ビルド配布 | asc-testflight-iap | [references/asc-testflight-iap/README.md](references/asc-testflight-iap/README.md) |
| Beta App Review の提出、Beta Build Localizations の管理 | asc-testflight-iap | [references/asc-testflight-iap/README.md](references/asc-testflight-iap/README.md) |
| In-App Purchases・Subscriptions・Subscription Groups の設定 | asc-testflight-iap | [references/asc-testflight-iap/README.md](references/asc-testflight-iap/README.md) |
| Promotional Offers・App Price Points の設定、Sales/Finance Reports の取得 | asc-testflight-iap | [references/asc-testflight-iap/README.md](references/asc-testflight-iap/README.md) |
| Sandbox Testers での IAP テスト、チームへの User Invitations 送付 | asc-users-access-extra | [references/asc-users-access-extra/README.md](references/asc-users-access-extra/README.md) |
| Bundle ID Capabilities の有効化、Merchant ID (Apple Pay)、Pass Type IDs (Wallet) の管理 | asc-provisioning-extra | [references/asc-provisioning-extra/README.md](references/asc-provisioning-extra/README.md) |
| Webhook の設定・購読イベント確認、配信履歴の確認、テスト ping の送信 | asc-webhooks | [references/asc-webhooks/README.md](references/asc-webhooks/README.md) |
| Xcode Cloud の Workflows / Build Runs / Build Actions の管理、Artifacts / Test Results / Issues の取得 | asc-xcode-cloud | [references/asc-xcode-cloud/README.md](references/asc-xcode-cloud/README.md) |
| EU の Alternative Marketplace / Web Distribution の設定、配布パッケージ・検索設定の管理 | asc-alternative-distribution | [references/asc-alternative-distribution/README.md](references/asc-alternative-distribution/README.md) |
| Game Center の Achievements / Leaderboards / Challenges / Matchmaking Rules の設定 | asc-game-center | [references/asc-game-center/README.md](references/asc-game-center/README.md) |
| Analytics レポートリクエスト、診断ログ・電力/パフォーマンス指標の取得 | asc-reporting-extra | references/asc-reporting-extra/（README.md 未整備、readme-indexer による生成が必要） |
