---
name: react-native
description: >
  React Native (Meta 製クロスプラットフォームネイティブアプリフレームワーク, react-native 0.87 / 0.88) の
  Text, FlatList, Pressable, TextInput, Animated, StyleSheet, Flexbox, Platform, Linking,
  New Architecture (Fabric, TurboModules, Codegen), Hermes, Metro, React Native DevTools。
user-invocable: false
---

# React Native

> 分割 PR の途中段階。現在収録済み: references/{apis, architecture, components, debugging-performance, getting-started, globals, legacy, native-development, platform-guides}。冒頭説明に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

## 対象バージョン

React Native 0.87 docs（`react/react-native-website` の `website/versioned_docs/version-0.87`、commit `1ec3a68e4c80a97d05fdd5134d42c03597a46b93`、2026-10-16 時点。サイトリポジトリにリリースタグは無い。取得日 2026-10-17）。出典 URL は `https://reactnative.dev/docs/0.87/<id>` に pin している（`/docs/next` 相当の root `docs/` は使用しない）。

npm の latest は 0.88.0（2026-10-15）だが 0.88 の docs は未 cut（`versions.json` の先頭は 0.87）。0.88 の差分は [0.88 リリースブログ](https://reactnative.dev/blog/2026/10/19/react-native-0.88)（ユーザー向け breaking change なし）のみを根拠とし、各ページ `## Notes` に `0.88: ...` 形式で記載する。

## ディレクトリ構成

```text
skills/react-native/
  SKILL.md
  references/
    components/            # Core Components 26 ページ
      README.md
      view.md, text.md, textinput.md, flatlist.md, pressable.md, ...
    apis/                  # Core APIs
      README.md
      stylesheet.md, platform.md, linking.md, appstate.md, dimensions.md, ...
    globals/               # ランタイムグローバル
      README.md
      runtime-globals.md, console.md, timer-globals.md, network-globals.md, ...
    architecture/          # New Architecture・Fabric・スレッドモデル・Bundled Hermes
      README.md
      overview.md, fabric-renderer.md, render-pipeline.md, threading-model.md, ...
    native-development/    # TurboModules・Fabric Native Components・Codegen
      README.md
      turbo-native-modules-introduction.md, using-codegen.md, codegen-cli.md, ...
    platform-guides/       # Android / iOS 固有ガイド（署名・Gradle plugin・App Store 等）
      README.md
      signed-apk-android.md, react-native-gradle-plugin.md, publishing-to-app-store.md, ...
    getting-started/       # 環境構築・既存アプリ統合・トラブルシュート
      README.md
      set-up-your-environment.md, integration-with-existing-apps.md, troubleshooting.md, ...
    debugging-performance/ # DevTools・デバッグ・プロファイル・パフォーマンス・テスト
      README.md
      react-native-devtools.md, debugging.md, performance.md, testing-overview.md, ...
    legacy/                # 旧 Native Modules / Native Components・削除済み API
      README.md
      native-modules-intro.md, removed-apis.md, ...
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| View / Text / TextInput / FlatList / Pressable 等のコンポーネント props を調べたい | components | [references/components/README.md](references/components/README.md) |
| StyleSheet / Platform / Linking / AppState / Dimensions 等の API を使いたい | apis | [references/apis/README.md](references/apis/README.md) |
| console / timers / fetch / performance 等のグローバルを確認したい | globals | [references/globals/README.md](references/globals/README.md) |
| New Architecture・Fabric・レンダーパイプライン・スレッドモデル・Bundled Hermes を理解したい | architecture | [references/architecture/README.md](references/architecture/README.md) |
| TurboModules・Fabric Native Components・Codegen でネイティブ連携を書きたい | native-development | [references/native-development/README.md](references/native-development/README.md) |
| Android 署名・Gradle plugin・iOS App Store 公開・ネイティブとの通信を調べたい | platform-guides | [references/platform-guides/README.md](references/platform-guides/README.md) |
| 環境構築・既存アプリへの統合・トラブルシュートをしたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| DevTools デバッグ・プロファイル・パフォーマンス改善・テスト方針を知りたい | debugging-performance | [references/debugging-performance/README.md](references/debugging-performance/README.md) |
| 旧 Native Modules / 削除済み API / Legacy Architecture を確認したい | legacy | [references/legacy/README.md](references/legacy/README.md) |
