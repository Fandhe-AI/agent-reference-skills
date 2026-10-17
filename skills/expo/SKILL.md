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

> 分割 PR の途中段階。現在収録済み: references/{configuration, eas-build, eas-submit-workflows, eas-update}。冒頭説明・description に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

## 対象バージョン

- Expo SDK 58（npm `expo` latest 58.0.12、2026-10-16）。`bundledNativeModules.json`（タグ `expo@58.0.12`、commit `1fe7733a076cc7448f2728a764436307fe440cfa`）基準で expo-router 58.0.21 / @expo/cli 58.1.10 / expo-updates 58.0.17 / React Native 0.88.0 / React 19.3.0
- SDK / config ページは URL `/versions/v58.0.0/` で pin（本文は `/versions/latest/` と同一、camera で差分確認済み）
- eas-cli 25.0.0（Expo SDK とは別バージョニング、npm latest 2026-10-15）
- GitHub 照合ソースは https://github.com/expo/expo/tree/expo@58.0.12/docs/pages（タグ pin。raw パスは `raw.githubusercontent.com/expo/expo/expo@58.0.12/docs/pages/**.mdx`、`main` は使用不可）
- npm 版: https://www.npmjs.com/package/expo/v/58.0.12
- canary / next dist-tag と v55〜v57 のバージョン別ドキュメントは対象外

## ディレクトリ構成

```text
skills/expo/
  SKILL.md
  references/
    configuration/             # app config・config plugins・Metro・Babel
      README.md
      app-config.md
      config-plugins.md
      mods.md
      metro-config.md
      environment-variables.md
      new-architecture.md
    eas-build/                 # EAS Build・eas.json・credentials
      README.md
      build-introduction.md
      eas-json.md
      app-credentials.md
      internal-distribution.md
    eas-update/                # EAS Update・expo-updates・runtime version
      README.md
      introduction.md
      updates.md
      runtime-versions.md
      rollbacks.md
    eas-submit-workflows/      # EAS Submit・Metadata・環境変数・Workflows
      README.md
      eas-cli.md
      submit-ios.md
      submit-android.md
      workflows-syntax.md
      workflows-pre-packaged-jobs.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| app.json / app.config・環境変数・Metro・Babel・TypeScript を設定したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| config plugin・mods を作りたい、モノレポ・New Architecture・React Compiler を設定したい | configuration | [references/configuration/README.md](references/configuration/README.md) |
| EAS Build の設定 (eas.json)・credentials・内部配布・CI ビルドをしたい | eas-build | [references/eas-build/README.md](references/eas-build/README.md) |
| シミュレーター / APK ビルド・ローカルビルド・キャッシュ・カスタムビルドを知りたい | eas-build | [references/eas-build/README.md](references/eas-build/README.md) |
| OTA アップデート (EAS Update / expo-updates)・runtime version・ロールバックを扱いたい | eas-update | [references/eas-update/README.md](references/eas-update/README.md) |
| コード署名・ロールアウト・bundle diffing・アップデートのデバッグをしたい | eas-update | [references/eas-update/README.md](references/eas-update/README.md) |
| ストア提出 (EAS Submit)・TestFlight・EAS Metadata を設定したい | eas-submit-workflows | [references/eas-submit-workflows/README.md](references/eas-submit-workflows/README.md) |
| EAS Workflows の YAML・pre-packaged jobs・EAS 環境変数・webhooks を使いたい | eas-submit-workflows | [references/eas-submit-workflows/README.md](references/eas-submit-workflows/README.md) |
