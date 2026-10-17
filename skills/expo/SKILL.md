---
name: expo
description: >
  Expo (React Native フレームワーク, Expo SDK 58 / EAS) のリファレンス。
  Expo Router (file-based routing, expo-server, data loaders, +api.ts), app.json / app.config, config plugins,
  Expo Modules API, expo-* SDK, Expo UI, EAS Build / Update / Submit / Workflows, eas.json, expo-updates (OTA),
  CNG / prebuild, development build (dev-client), expo-notifications push。
user-invocable: false
---

# Expo

Expo SDK 58 と EAS のリファレンススキル。references は公式ドキュメント英語原文の蒸留、samples は公式チュートリアル・ガイド由来の実例、scripts は CLI コマンド集。

## 対象バージョン

- Expo SDK 58（npm `expo` latest 58.0.12、2026-10-16）。`bundledNativeModules.json`（タグ `expo@58.0.12`、commit `1fe7733a076cc7448f2728a764436307fe440cfa`）基準で expo-router 58.0.21 / @expo/cli 58.1.10 / expo-updates 58.0.17 / React Native 0.88.0 / React 19.3.0
- SDK / config ページは URL `/versions/v58.0.0/` で pin（本文は `/versions/latest/` と同一、camera で差分確認済み）
- バージョン無し URL のガイドページ（router / eas / build / eas-update / modules / config-plugins）は取得日 2026-10-17 で pin（2026-10-16 の policy run 内）。各ソースに `modificationDate` frontmatter あり
- eas-cli 25.0.0（Expo SDK とは別バージョニング、npm latest 2026-10-15）
- GitHub 照合ソースは https://github.com/expo/expo/tree/expo@58.0.12/docs/pages（タグ pin。raw パスは `raw.githubusercontent.com/expo/expo/expo@58.0.12/docs/pages/**.mdx`、`main` は使用不可）
- npm 版: https://www.npmjs.com/package/expo/v/58.0.12
- canary / next dist-tag と v55〜v57 のバージョン別ドキュメントは対象外

## ディレクトリ構成

```text
skills/expo/
  SKILL.md
  references/
    router/                    # Expo Router 基礎（22 ページ）
      README.md
      introduction.md
      core-concepts.md
      navigation.md
      stack.md
      tabs.md
      native-tabs.md
      authentication.md
      protected-routes.md
      ...
    router-reference/          # Router API・移行・型付きルート
      README.md
      router-api.md
      router-link.md
      router-stack.md
      router-native-tabs.md
      typed-routes.md
      url-parameters.md
      migrate-sdk-57-to-58.md
      ...
    router-web/                # Web・サーバー・API Routes・DOM components
      README.md
      web.md
      server.md
      api-routes.md
      middleware.md
      data-loaders.md
      static-rendering.md
      server-rendering.md
      dom-components.md
      ...
    configuration/             # app config・config plugins・Metro・Babel
      README.md
      app-config.md
      config-plugins.md
      mods.md
      metro-config.md
      environment-variables.md
      new-architecture.md
      ...
    workflow/                  # 開発ワークフロー・Expo CLI・CNG・dev build
      README.md
      workflow-overview.md
      expo-cli.md
      continuous-native-generation.md
      development-builds.md
      upgrading-expo-sdk.md
      ...
    modules-api/               # Expo Modules API（Swift / Kotlin）
      README.md
      overview.md
      get-started.md
      module-api.md
      module-config.md
      autolinking.md
      ...
    sdk-app/                   # アプリ基盤系 SDK（Constants・Linking・Font 等）
      README.md
      expo.md
      constants.md
      linking.md
      securestore.md
      splash-screen.md
      ...
    sdk-device-data/           # デバイス・データ系 SDK（Location・SQLite・FileSystem 等）
      README.md
      filesystem.md
      sqlite.md
      location.md
      auth-session.md
      ...
    sdk-media-ui/              # メディア・UI 系 SDK（Camera・Image・Video・Expo UI 等）
      README.md
      camera.md
      image.md
      video.md
      audio.md
      expo-ui.md
      ...
    notifications/             # expo-notifications・push・background task
      README.md
      notifications.md
      push-overview.md
      push-notifications-setup.md
      sending-notifications.md
      ...
    eas-build/                 # EAS Build・eas.json・credentials
      README.md
      build-introduction.md
      eas-json.md
      app-credentials.md
      internal-distribution.md
      ...
    eas-update/                # EAS Update・expo-updates・runtime version
      README.md
      introduction.md
      updates.md
      runtime-versions.md
      rollbacks.md
      ...
    eas-submit-workflows/      # EAS Submit・Metadata・環境変数・Workflows
      README.md
      eas-cli.md
      submit-ios.md
      submit-android.md
      workflows-syntax.md
      workflows-pre-packaged-jobs.md
      ...
  samples/
    README.md
    eas-development-build-setup.md
    eas-production-build-submit.md
    workflow-pr-preview-update.md
    module-native-settings.md
    jest-expo-unit-testing.md
    tutorial-image-picker.md
    ...
  scripts/
    README.md
    install.md
    expo-cli.md
    eas-cli.md
    create-expo-module.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 使い方の実例は `samples/README.md`、コマンドは `scripts/README.md` を引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| ファイルベースルーティング・レイアウト・ナビゲーション・認証ルートを理解したい | router | [references/router/README.md](references/router/README.md) |
| Stack / Tabs / NativeTabs / Drawer / Modal を構成したい | router | [references/router/README.md](references/router/README.md) |
| Link / useRouter / Stack 等の API・型付きルート・URL パラメータを調べたい | router-reference | [references/router-reference/README.md](references/router-reference/README.md) |
| React Navigation や SDK 57 からの移行・テスト・リダイレクトを知りたい | router-reference | [references/router-reference/README.md](references/router-reference/README.md) |
| Web 出力・SSR・静的レンダリング・サーバー実行基盤を設定したい | router-web | [references/router-web/README.md](references/router-web/README.md) |
| API Routes・サーバーミドルウェア・データローダー・DOM components を使いたい | router-web | [references/router-web/README.md](references/router-web/README.md) |
| app.json / app.config・環境変数・Metro・Babel・TypeScript を設定したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| config plugin・mods を作りたい、モノレポ・New Architecture・React Compiler を設定したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| 開発フロー・Expo CLI・CNG / prebuild・development build・SDK アップグレードを知りたい | workflow | [references/workflow/README.md](references/workflow/README.md) |
| Swift / Kotlin でネイティブモジュールを書きたい (Expo Modules API) | modules-api | [references/modules-api/README.md](references/modules-api/README.md) |
| 既存ライブラリへの Expo Modules API 統合・autolinking・モック化を知りたい | modules-api | [references/modules-api/README.md](references/modules-api/README.md) |
| Constants / Linking / Font / SecureStore / SplashScreen / StatusBar を使いたい | sdk-app | [references/sdk-app/README.md](references/sdk-app/README.md) |
| deep link・Universal Links・App Links を設定したい | sdk-app | [references/sdk-app/README.md](references/sdk-app/README.md) |
| FileSystem / SQLite / Location / Contacts / Calendar / Sensors を使いたい | sdk-device-data | [references/sdk-device-data/README.md](references/sdk-device-data/README.md) |
| 認証 (AuthSession / AppleAuthentication / LocalAuthentication)・Clipboard・Sharing を使いたい | sdk-device-data | [references/sdk-device-data/README.md](references/sdk-device-data/README.md) |
| Camera / Image / ImagePicker / Video / Audio / MediaLibrary を使いたい | sdk-media-ui | [references/sdk-media-ui/README.md](references/sdk-media-ui/README.md) |
| Expo UI・BlurView・LinearGradient・Symbols・Maps・Widgets を使いたい | sdk-media-ui | [references/sdk-media-ui/README.md](references/sdk-media-ui/README.md) |
| push 通知の設定・送信・受信ハンドリングをしたい | notifications | [references/notifications/README.md](references/notifications/README.md) |
| FCM / APNs 資格情報・バックグラウンドタスク (TaskManager / BackgroundTask) を設定したい | notifications | [references/notifications/README.md](references/notifications/README.md) |
| EAS Build の設定 (eas.json)・credentials・内部配布・CI ビルドをしたい | eas-build | [references/eas-build/README.md](references/eas-build/README.md) |
| シミュレーター / APK ビルド・ローカルビルド・キャッシュ・カスタムビルドを知りたい | eas-build | [references/eas-build/README.md](references/eas-build/README.md) |
| OTA アップデート (EAS Update / expo-updates)・runtime version・ロールバックを扱いたい | eas-update | [references/eas-update/README.md](references/eas-update/README.md) |
| コード署名・ロールアウト・bundle diffing・アップデートのデバッグをしたい | eas-update | [references/eas-update/README.md](references/eas-update/README.md) |
| ストア提出 (EAS Submit)・TestFlight・EAS Metadata を設定したい | eas-submit-workflows | [references/eas-submit-workflows/README.md](references/eas-submit-workflows/README.md) |
| EAS Workflows の YAML・pre-packaged jobs・EAS 環境変数・webhooks を使いたい | eas-submit-workflows | [references/eas-submit-workflows/README.md](references/eas-submit-workflows/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
