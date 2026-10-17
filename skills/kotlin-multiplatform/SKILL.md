---
name: kotlin-multiplatform
description: >
  Kotlin Multiplatform (KMP) / Compose Multiplatform (JetBrains, Kotlin) の公式リファレンス。
  expect/actual, source set hierarchy, Multiplatform Gradle DSL, org.jetbrains.compose, Compose Resources (Res),
  Compose for iOS / Compose Desktop (Window, Tray, MenuBar, nativeDistributions), iOS 統合 (SwiftPM export, CocoaPods),
  Navigation / ViewModel / Lifecycle, Compose Hot Reload, Maven Central / npm 公開, AGP 9 移行, 互換性表。
user-invocable: false
---

# Kotlin Multiplatform / Compose Multiplatform

> 分割 PR の途中段階。現在収録済み: references/{build-test-publish, compatibility, compose-architecture, compose-desktop, compose-ios, compose-resources, compose-ui, getting-started, gradle-dsl, ios-integration}。冒頭説明に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

JetBrains の `kotlin-multiplatform-dev-docs`（`kotlinlang.org/docs/multiplatform/**` と Compose Multiplatform ドキュメント）を蒸留したリファレンススキル。`kotlinlang.org/docs/**` のうち `multiplatform/` 以外は kotlin スキルの担当。

## 対象バージョン

- 原本: `JetBrains/kotlin-multiplatform-dev-docs` @ `3ad4b025b32d3d42ded178df50f1cc0964ac64cf`（2026-10-15、コミット "Compose Multiplatform 1.12.2 (#796)"）。タグ・リリースは存在せず、`master` 直参照は禁止。公開サイトと `llms.txt` は 2026-10-16 に取得
- Kotlin 2.4.21 / Compose Multiplatform 1.12.2 / Kotlin Toolchain 0.13（Alpha）/ lifecycle 2.11.0
- navigation 2.10.0-rc01 と material3 1.12.0-alpha03 は公式ドキュメント自身が pin するプレリリース（stable ではない）
- Gradle 7.6.3-9.7.0 / AGP 8.5.2-9.3.1 / Xcode 26.4（`v.list` 記載の対応範囲）

## ディレクトリ構成

```text
skills/kotlin-multiplatform/
  SKILL.md
  references/
    getting-started/
      README.md
      kmp-overview.md
      supported-platforms.md
      compose-and-jetpack-compose.md
      jetpack-libraries.md
      platform-differences.md
    gradle-dsl/
      README.md
      dsl-overview.md
      dsl-targets.md
      dsl-source-sets.md
      dsl-compilations.md
      dsl-compiler-options.md
      dsl-dependencies.md
      dsl-language-settings.md
      compose-compiler.md
    build-test-publish/
      README.md
      configure-compilations.md
      native-binaries.md
      run-tests.md
      publish-apps.md
      publish-lib-setup.md
      publish-to-maven.md
      publish-to-npm.md
    compose-ui/
      README.md
      entry-points.md
      layout-basics.md
      layout-modifiers.md
      adaptive-layouts.md
      popups.md
      drag-and-drop.md
      accessibility.md
      previews.md
      testing.md
      android-only-components.md
      web-css-styles.md
    compose-architecture/
      README.md
      lifecycle.md
      viewmodel.md
      navigation.md
      navigation-routing.md
      navigation-deep-links.md
      navigation-3.md
    compose-resources/
      README.md
      resources-setup.md
      resources-usage.md
      localize-strings.md
      regional-format.md
      resource-environment.md
      rtl-languages.md
      localization-tests.md
      web-resources.md
    compose-ios/
      README.md
      swiftui-integration.md
      uikit-integration.md
      touch-with-native-ui.md
      ios-accessibility.md
      ios-migration.md
      liquid-glass.md
    compose-desktop/
      README.md
      windows-management.md
      menu-bar.md
      tray.md
      context-menus.md
      tooltips.md
      scrollbars.md
      images.md
      keyboard.md
      mouse-events.md
      tab-navigation.md
      swing-interoperability.md
      desktop-accessibility.md
      ui-testing-junit.md
      native-distribution.md
    ios-integration/
      README.md
      integration-overview.md
      spm-export.md
      spm-import.md
      spm-local-integration.md
      direct-integration.md
      privacy-manifest.md
      cocoapods-overview.md
      cocoapods-libraries.md
      cocoapods-xcode.md
      cocoapods-dsl-reference.md
      cocoapods-to-spm-migration.md
    compatibility/
      README.md
      version-compatibility.md
      compose-compatibility-and-versioning.md
      whats-new-compose-1-12.md
      plugin-releases.md
      agp-9-migration.md
      android-source-set-layout.md
      changes-kotlin-1-7-1-8.md
      changes-kotlin-1-9.md
      changes-kotlin-2-0-and-later.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

他スキルとの棲み分け:

- Android 共通の `androidx.compose.*` API（Material3 コンポーネント・アニメーション・Navigation・ViewModel・テスト・AGP/Gradle）は android-* スキルの担当。本スキルは `org.jetbrains.compose` アーティファクトとマルチプラットフォーム固有の差分を扱う
- iOS 側のネイティブ API（SwiftUI / UIKit / SwiftPM / App Store 配布）は apple-* スキルの担当。本スキルは Compose との相互運用と Kotlin 側の統合設定を扱う
- Kotlin 言語本体（expect/actual の言語仕様・コンパイラオプション・Kotlin/Native バイナリ）は kotlin スキルの担当。本スキルは KMP プロジェクト構成の文脈で扱う

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| KMP の概要・対応プラットフォームの安定度・Jetpack Compose との関係を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| `kotlin { }` ブロックの targets / sourceSets / compilations / compilerOptions を書きたい | gradle-dsl | [references/gradle-dsl/README.md](references/gradle-dsl/README.md) |
| Compose compiler プラグインの更新方法を知りたい | gradle-dsl | [references/gradle-dsl/README.md](references/gradle-dsl/README.md) |
| compilation 設定・ネイティブバイナリ・テスト実行・ライブラリ / アプリ公開 | build-test-publish | [references/build-test-publish/README.md](references/build-test-publish/README.md) |
| 共通 UI の entry point・レイアウト・modifier・popup・drag-and-drop・preview・テスト | compose-ui | [references/compose-ui/README.md](references/compose-ui/README.md) |
| Web（ComposeViewport）の viewport / CSS、Android 専用コンポーネントの扱い | compose-ui | [references/compose-ui/README.md](references/compose-ui/README.md) |
| lifecycle・ViewModel・Navigation・deep link・Navigation 3 を使いたい | compose-architecture | [references/compose-architecture/README.md](references/compose-architecture/README.md) |
| 画像・文字列・フォントなどの multiplatform resources とローカライズ | compose-resources | [references/compose-resources/README.md](references/compose-resources/README.md) |
| Compose と SwiftUI / UIKit の相互運用、iOS のタッチ・アクセシビリティ・Liquid Glass | compose-ios | [references/compose-ios/README.md](references/compose-ios/README.md) |
| desktop のウィンドウ・メニューバー・トレイ・キーボード・マウス・パッケージング | compose-desktop | [references/compose-desktop/README.md](references/compose-desktop/README.md) |
| 共有モジュールを iOS アプリへ統合（SwiftPM / CocoaPods / direct integration）、privacy manifest | ios-integration | [references/ios-integration/README.md](references/ios-integration/README.md) |
| Kotlin / Compose / Gradle / AGP の対応版、AGP 9 移行、リリース内容、非互換変更 | compatibility | [references/compatibility/README.md](references/compatibility/README.md) |
