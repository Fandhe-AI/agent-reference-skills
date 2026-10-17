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

## 対象バージョン

- Expo SDK 58（npm `expo` latest 58.0.12、2026-10-16）。`bundledNativeModules.json`（タグ `expo@58.0.12`、commit `1fe7733a076cc7448f2728a764436307fe440cfa`）基準で expo-router 58.0.21 / @expo/cli 58.1.10 / expo-updates 58.0.17 / React Native 0.88.0 / React 19.3.0
- SDK / config ページは URL `/versions/v58.0.0/` で pin（本文は `/versions/latest/` と同一、camera で差分確認済み）
- バージョン無し URL のガイドページ（router / eas / build / eas-update / modules / config-plugins）は取得日 2026-10-17 で pin（2026-10-16 の policy run 内）。各ソースに `modificationDate` frontmatter あり
- eas-cli 25.0.0（Expo SDK とは別バージョニング、npm latest 2026-10-15）
- GitHub 照合ソースは `raw.githubusercontent.com/expo/expo/expo@58.0.12/docs/pages/**.mdx`（`main` は使用不可）
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
