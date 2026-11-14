---
name: react-native
description: >
  React Native (Meta 製クロスプラットフォームネイティブアプリフレームワーク, react-native 0.88 / 0.87) の
  リファレンス。View, Text, FlatList, Pressable, TextInput, Animated, StyleSheet, Flexbox, Platform,
  New Architecture (Fabric, TurboModules, Codegen), Hermes, Metro, Fast Refresh, TypeScript,
  React Native DevTools, Android / iOS 統合、upgrade (Upgrade Helper)・0.84〜0.88 差分。
user-invocable: false
---

# React Native

## 対象バージョン

React Native 0.88 docs（`react/react-native-website` の `website/versioned_docs/version-0.88`、commit `a459a29833dd0cdd103ed96b3e58dc78aa94a7f1`、取得日 2026-11-14。サイトリポジトリにリリースタグは無い）。出典 URL は `https://reactnative.dev/docs/0.88/<id>` に pin している（`/docs/next` 相当の root `docs/` は使用しない）。0.87 docs（commit `1ec3a68`）との差分は 14 ファイルのみで、全ページを 0.88 に追従済み。

npm の latest は 0.88.1（0.88.0 は 2026-10-15）。0.88 docs は 0.87 から iOS SceneDelegate 対応（`integration-with-existing-apps` 6 節・`linking`・`network`・`release-levels` 等）、`fontVariationSettings`・`backgroundSize` / `backgroundPosition` / `backgroundRepeat`（`experimental_` 接頭辞なし）、`FlatList` の `ListItemComponent`、`InputAccessoryView` 非推奨表示、`LayoutAnimation` の Legacy Architecture 限定の注記が加わった。0.88 のユーザー向け breaking change は無く、[0.88 リリースブログ](https://reactnative.dev/blog/2026/10/19/react-native-0.88)由来の内容は各ページ `## Notes` に `0.88: ...` 形式で記載する。`samples/` と `scripts/` は 0.87 前提の記述（`RN_CORE_BRANCH` 等）を 0.88 に更新済みで、SceneDelegate 前提の samples は未追加。

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
    ui-interaction/        # スタイル・レイアウト・アニメーション・タッチ・アクセシビリティ
      README.md
      style.md, flexbox.md, animated.md, layoutanimation.md, navigation.md, ...
    props-types/           # Style props・イベント型・ノード型
      README.md
      view-style-props.md, text-style-props.md, layout-props.md, pressevent.md, ...
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
    workflow/              # Metro・Fast Refresh・Hermes・TypeScript・アップグレード
      README.md
      metro.md, fast-refresh.md, hermes.md, typescript.md, upgrading.md, ...
    debugging-performance/ # DevTools・デバッグ・プロファイル・パフォーマンス・テスト
      README.md
      react-native-devtools.md, debugging.md, performance.md, testing-overview.md, ...
    versions/              # バージョニング方針・リリース別 (0.84〜0.88) 変更点
      README.md
      versioning-policy.md, react-native-0.88.md, react-native-0.87.md, ...
    legacy/                # 旧 Native Modules / Native Components・削除済み API
      README.md
      native-modules-intro.md, removed-apis.md, ...
  samples/
    README.md
    learn-the-basics.md, react-fundamentals.md, props-and-state.md, handling-text-input.md,
    scrollview-and-lists.md, networking-fetch.md, animations-basics.md,
    turbo-native-module-walkthrough.md, fabric-native-component-walkthrough.md, ...
  scripts/
    README.md
    create-project.md, run-and-dev.md, build-release.md, codegen.md,
    debugging-profiling.md, testing.md, upgrade.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 実装例は `samples/README.md`、実行コマンドは `scripts/README.md` を引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| View / Text / TextInput / FlatList / Pressable 等のコンポーネント props を調べたい | components | [references/components/README.md](references/components/README.md) |
| StyleSheet / Platform / Linking / AppState / Dimensions 等の API を使いたい | apis | [references/apis/README.md](references/apis/README.md) |
| Flexbox レイアウト・スタイル・Animated・タッチ処理・アクセシビリティを実装したい | ui-interaction | [references/ui-interaction/README.md](references/ui-interaction/README.md) |
| View / Text / Image の style props、PressEvent 等のイベント型を確認したい | props-types | [references/props-types/README.md](references/props-types/README.md) |
| console / timers / fetch / performance 等のグローバルを確認したい | globals | [references/globals/README.md](references/globals/README.md) |
| New Architecture・Fabric・レンダーパイプライン・スレッドモデル・Bundled Hermes を理解したい | architecture | [references/architecture/README.md](references/architecture/README.md) |
| TurboModules・Fabric Native Components・Codegen でネイティブ連携を書きたい | native-development | [references/native-development/README.md](references/native-development/README.md) |
| Android 署名・Gradle plugin・iOS App Store 公開・ネイティブとの通信を調べたい | platform-guides | [references/platform-guides/README.md](references/platform-guides/README.md) |
| 環境構築・既存アプリへの統合・トラブルシュートをしたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Metro / Fast Refresh / Hermes / TypeScript 設定・アップグレードを扱いたい | workflow | [references/workflow/README.md](references/workflow/README.md) |
| DevTools デバッグ・プロファイル・パフォーマンス改善・テスト方針を知りたい | debugging-performance | [references/debugging-performance/README.md](references/debugging-performance/README.md) |
| 0.84〜0.88 の変更点・バージョニング方針・リリース状況を確認したい | versions | [references/versions/README.md](references/versions/README.md) |
| 旧 Native Modules / 削除済み API / Legacy Architecture を確認したい | legacy | [references/legacy/README.md](references/legacy/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
