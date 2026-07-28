---
name: windows-packaging-publish
description: >
  Windows アプリ開発 (MSIX / Microsoft Store) のパッケージング・配置・公開リファレンス。
  MSIX, AppxManifest, MakeAppx, MSIX Packaging Tool, Package Bundles, App Attach,
  Package Support Framework, Package Identity, PackageFamilyName, PackageManager,
  スパースパッケージ, App Installer, サイドローディング, Windows App SDK Bootstrapper,
  自己完結型デプロイ, SignTool, Azure Trusted Signing, 証明書, CI/CD 署名,
  Partner Center, アプリ送信, 年齢レーティング, ストアリスティング, 段階的ロールアウト,
  StoreContext, msstore CLI, 認定プロセス, 分析レポート。
user-invocable: false
---

# Windows パッケージング・公開 リファレンス

Windows アプリを MSIX 化して配布・デプロイし、Microsoft Store に公開するための公式ドキュメントを蒸留したリファレンス。
パッケージ作成、パッケージ ID、配置アーキテクチャ、コード署名、ストア送信・審査・分析までを網羅する。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/windows-packaging-publish/
  SKILL.md
  references/
    msix-packaging/
      README.md
      msix-overview.md
      package-structure.md
      package-manifest-schema.md
      vs-packaging-project.md
      msix-packaging-tool.md
      makeappx-cli.md
      package-bundles-architecture.md
      msix-app-attach.md
      modification-packages.md
      optional-packages.md
      package-asset-requirements.md
      package-support-framework.md
    package-identity/
      README.md
      package-identity-overview.md
      apis-requiring-package-identity.md
      package-class.md
      package-id-class.md
      package-manager.md
      sparse-packages-external-location.md
      detect-package-identity.md
      packaged-vs-unpackaged-behavior.md
      package-uninstall-update.md
    deployment/
      README.md
      choose-distribution-path.md
      app-installer-file-overview.md
      app-installer-update-settings.md
      sideloading-prerequisites.md
      app-installer-troubleshooting.md
      windows-app-sdk-deployment-architecture.md
      windows-app-sdk-deploy-packaged-apps.md
      windows-app-sdk-deploy-unpackaged-apps.md
      windows-app-sdk-bootstrapper-api.md
      windows-app-sdk-self-contained-deploy.md
      dotnet-deployment-models.md
      gradual-package-rollout.md
      enterprise-deployment-intune.md
    code-signing/
      README.md
      msix-signing-requirements.md
      certificate-types.md
      self-signed-certificate.md
      signtool-sign.md
      signtool-timestamp.md
      signtool-verify.md
      azure-trusted-signing.md
      cicd-signing.md
      device-guard-signing.md
      signing-troubleshooting.md
    store-publish/
      README.md
      developer-account.md
      reserve-app-name.md
      create-app-submission.md
      pricing-and-availability.md
      market-selection.md
      visibility-options.md
      app-properties.md
      age-ratings.md
      app-package-requirements.md
      upload-app-packages.md
      store-listings.md
      screenshots-and-images.md
      additional-information.md
      app-certification-process.md
      resolve-submission-errors.md
      package-flights.md
      gradual-package-rollout.md
      msi-exe-publishing.md
      store-context.md
      store-product.md
      submission-api-msix.md
      submission-api-msi.md
      msstore-cli.md
      analytics-overview.md
      acquisitions-report.md
      usage-report.md
      health-report.md
      store-policies.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| MSIX パッケージの構造・AppxManifest スキーマを理解したい | msix-packaging | [references/msix-packaging/README.md](references/msix-packaging/README.md) |
| MakeAppx / MSIX Packaging Tool / Visual Studio でパッケージを作成したい | msix-packaging | [references/msix-packaging/README.md](references/msix-packaging/README.md) |
| パッケージバンドル・App Attach・Package Support Framework を扱いたい | msix-packaging | [references/msix-packaging/README.md](references/msix-packaging/README.md) |
| パッケージ ID の5要素・PackageFamilyName・PackageFullName を理解したい | package-identity | [references/package-identity/README.md](references/package-identity/README.md) |
| Package / PackageId / PackageManager クラスで実行時にパッケージ情報を取得・操作したい | package-identity | [references/package-identity/README.md](references/package-identity/README.md) |
| スパースパッケージで非パッケージアプリにパッケージ ID を付与したい | package-identity | [references/package-identity/README.md](references/package-identity/README.md) |
| Microsoft Store / サイドロード / 非パッケージ配布のどれを選ぶか判断したい | deployment | [references/deployment/README.md](references/deployment/README.md) |
| App Installer ファイルで自動更新付きサイドローディングを構成したい | deployment | [references/deployment/README.md](references/deployment/README.md) |
| Windows App SDK の Bootstrapper API・自己完結型デプロイ・Intune 配布を構成したい | deployment | [references/deployment/README.md](references/deployment/README.md) |
| SignTool でパッケージに署名・タイムスタンプ・検証したい | code-signing | [references/code-signing/README.md](references/code-signing/README.md) |
| 証明書の種類（自己署名 / OV / EV / Azure Trusted Signing）を選定したい | code-signing | [references/code-signing/README.md](references/code-signing/README.md) |
| CI/CD パイプラインで自動署名を組み込みたい | code-signing | [references/code-signing/README.md](references/code-signing/README.md) |
| Partner Center でアプリを送信・審査に出したい | store-publish | [references/store-publish/README.md](references/store-publish/README.md) |
| 価格・市場・年齢レーティング・ストアリスティングを設定したい | store-publish | [references/store-publish/README.md](references/store-publish/README.md) |
| StoreContext / 送信 API / msstore CLI で購入・公開を自動化し、段階的ロールアウト・分析レポート（利用状況・クラッシュ率）を確認したい | store-publish | [references/store-publish/README.md](references/store-publish/README.md) |

このスキルは MSIX パッケージング・パッケージ ID・配置アーキテクチャ（Windows App SDK の Bootstrapper API・自己完結型デプロイを含む）・コード署名・Microsoft Store 公開フローを扱う。UI コントロール (windows-winui-controls)、レイアウト・スタイル (windows-winui-ui / windows-design)、Windows App SDK のライフサイクル・ウィンドウ・通知等のランタイム API (windows-app-sdk)、データ保存・相互運用・テストなど他の関心事は他の windows-* スキルが担当する。
