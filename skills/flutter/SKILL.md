---
name: flutter
description: >
  Flutter (Google 製 Dart クロスプラットフォーム UI フレームワーク, 3.50) のリファレンス。
  StatelessWidget / StatefulWidget / BuildContext, Sliver, Material / Cupertino, Impeller,
  flutter CLI, pubspec.yaml, hot reload, flutter fix / dart fix, DevTools, Widget Previewer,
  MVVM, platform channels / dart:ffi, add-to-app, Flutter Web / Wasm (--web-content-hash), Native interop (FFIgen / JNIgen / Pigeon), GenUI SDK / AI Toolkit。
user-invocable: false
---

# Flutter

## 対象バージョン

- Flutter 3.50.0 stable / Dart 3.14.0
- ドキュメント原本: flutter/website（リリースタグなし）を commit [`acea4202cfbaa99aa520a154b34603cd420776ae`](https://github.com/flutter/website/tree/acea4202cfbaa99aa520a154b34603cd420776ae) に pin
- API リファレンス: [api.flutter.dev](https://api.flutter.dev/)（dartdoc HTML、URL に版なし）。一部ページは 3.47 stable 時点の取得で 3.50 では未再照合（各ページ `## Notes` に記載）
- `llms.txt` は版数の根拠にしない（更新が遅れる）
- samples / scripts: 公式 cookbook 由来の samples は DartPad 互換の `package:flutter/material.dart` import を原文どおり残している（3.50 で deprecated だが動作する。`material_ui` 版の経緯は一部サンプルの Notes と `release/material-ui-and-cupertino-ui.md`）。samples は 3.50 の cookbook へ一括再同期していない（未追従）。scripts は `--web-content-hash` を追記済みで、install 手順は 3.50 向けに再確認していない
- 「Not yet released to stable」の breaking changes は第一級に扱わない。例外は material_ui / cupertino_ui で、3.47 から opt-in 可能、3.50 で `package:flutter/material.dart` / `cupertino.dart` が正式 deprecated（移行は `dart fix --apply --code=migrate_design_widgets`）

## ディレクトリ構成

```text
skills/flutter/
  SKILL.md
  references/
    fundamentals/            # アーキテクチャ概観・ビルドモード・宣言的 UI・対応プラットフォーム（10 ページ）
      README.md
    layout/                  # 制約・スクロール・Sliver・アダプティブ/レスポンシブ設計（14 ページ）
      README.md
    interaction-navigation/  # ジェスチャー・フォーカス・ナビゲーション・ディープリンク・a11y・i18n（14 ページ）
      README.md
    widgets-api/             # 主要ウィジェット/クラス API（25 ページ）
      README.md
    design-animation/        # Material/Cupertino・テーマ・アニメーション・アセット・シェーダー（17 ページ）
      README.md
    architecture-data/       # アプリアーキテクチャ・状態管理・ネットワーク・永続化・Firebase（21 ページ）
      README.md
    platform-integration/    # プラットフォームチャネル・FFI・Native interop（FFIgen / JNIgen / Pigeon）・add-to-app・Android/iOS/macOS/Windows 統合（28 ページ）
      README.md
    packages-deployment/     # パッケージ・flavors・各プラットフォーム配布・難読化・SwiftPM（17 ページ）
      README.md
    testing-performance/     # テスト・デバッグ・Impeller・パフォーマンス・isolates（19 ページ）
      README.md
    tools/                   # flutter CLI・pubspec・hot reload・DevTools・Widget Previewer（24 ページ）
      README.md
    web/                     # Flutter Web・Wasm・初期化・埋め込み・デプロイ（11 ページ）
      README.md
    ai/                      # GenUI SDK・AI Toolkit・AI 開発ツール・AI best practices（14 ページ）
      README.md
    release/                 # リリースノート・breaking changes・移行ガイド（29 ページ）
      README.md
  samples/                   # 動く実例（23 件）
    README.md
    <use-case>.md
  scripts/                   # 実行可能コマンド集（8 件）
    README.md
    <category>.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 実装例は `samples/README.md`、コマンドは `scripts/README.md` から引く

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Flutter の仕組み・レイヤー構成・ビルドモード・対応プラットフォームを知りたい | fundamentals | [references/fundamentals/README.md](references/fundamentals/README.md) |
| 宣言的 UI・dot shorthands・ウィジェットカタログを調べたい | fundamentals | [references/fundamentals/README.md](references/fundamentals/README.md) |
| 制約（constraints）・サイズ決定・Row/Column レイアウトを理解したい | layout | [references/layout/README.md](references/layout/README.md) |
| スクロール・Sliver・SafeArea・MediaQuery を使いたい | layout | [references/layout/README.md](references/layout/README.md) |
| 大画面・折りたたみ・アダプティブ/レスポンシブ設計をしたい | layout | [references/layout/README.md](references/layout/README.md) |
| タップ・ドラッグ等のジェスチャー、フォーカス、Actions/Shortcuts を扱いたい | interaction-navigation | [references/interaction-navigation/README.md](references/interaction-navigation/README.md) |
| 画面遷移・ディープリンク・URL 戦略を設定したい | interaction-navigation | [references/interaction-navigation/README.md](references/interaction-navigation/README.md) |
| アクセシビリティ・国際化（i18n）に対応したい | interaction-navigation | [references/interaction-navigation/README.md](references/interaction-navigation/README.md) |
| Widget / State / BuildContext / Key / InheritedWidget の API を調べたい | widgets-api | [references/widgets-api/README.md](references/widgets-api/README.md) |
| ListView・Stack・Image・FutureBuilder・StreamBuilder 等の API を調べたい | widgets-api | [references/widgets-api/README.md](references/widgets-api/README.md) |
| MaterialApp・CupertinoApp・ThemeData・Scaffold を設定したい | design-animation | [references/design-animation/README.md](references/design-animation/README.md) |
| 暗黙的/明示的アニメーション・Hero・AnimationController を使いたい | design-animation | [references/design-animation/README.md](references/design-animation/README.md) |
| アセット・フォント・フラグメントシェーダーを扱いたい | design-animation | [references/design-animation/README.md](references/design-animation/README.md) |
| アプリアーキテクチャ（MVVM・Repository）・設計パターンを知りたい | architecture-data | [references/architecture-data/README.md](references/architecture-data/README.md) |
| 状態管理（ephemeral / app state・provider）を選びたい | architecture-data | [references/architecture-data/README.md](references/architecture-data/README.md) |
| HTTP 通信・JSON シリアライズ・SQL / key-value 永続化・オフラインファーストを実装したい | architecture-data | [references/architecture-data/README.md](references/architecture-data/README.md) |
| Firebase・データベース選定を調べたい | architecture-data | [references/architecture-data/README.md](references/architecture-data/README.md) |
| platform channels・dart:ffi・Native interop（FFIgen / JNIgen / Pigeon）でネイティブコードを呼びたい | platform-integration | [references/platform-integration/README.md](references/platform-integration/README.md) |
| 既存アプリへ Flutter を組み込みたい（add-to-app）・Platform Views を使いたい | platform-integration | [references/platform-integration/README.md](references/platform-integration/README.md) |
| Android（predictive back・スプラッシュ）/ iOS（拡張・起動画面）/ デスクトップ固有機能を扱いたい | platform-integration | [references/platform-integration/README.md](references/platform-integration/README.md) |
| パッケージ・プラグインを使う/開発する | packages-deployment | [references/packages-deployment/README.md](references/packages-deployment/README.md) |
| Android / iOS / macOS / Linux / Windows 向けにビルド・配布したい | packages-deployment | [references/packages-deployment/README.md](references/packages-deployment/README.md) |
| flavors・難読化・CD・SwiftPM を設定したい | packages-deployment | [references/packages-deployment/README.md](references/packages-deployment/README.md) |
| ユニット/ウィジェット/integration テストを書きたい | testing-performance | [references/testing-performance/README.md](references/testing-performance/README.md) |
| デバッグ・エラー処理・パフォーマンス計測・Impeller・isolates を調べたい | testing-performance | [references/testing-performance/README.md](references/testing-performance/README.md) |
| flutter CLI・pubspec・hot reload・flutter fix を使いたい | tools | [references/tools/README.md](references/tools/README.md) |
| DevTools（inspector・CPU・メモリ・ネットワーク）・Widget Previewer を使いたい | tools | [references/tools/README.md](references/tools/README.md) |
| Flutter Web のビルド・Wasm・content hashing・初期化・埋め込み・本番デプロイを行いたい | web | [references/web/README.md](references/web/README.md) |
| GenUI SDK・AI Toolkit（LlmChatView）・AI 開発ツール・Firebase AI Logic のベストプラクティスを使いたい | ai | [references/ai/README.md](references/ai/README.md) |
| 3.50 の breaking changes（7 件）・3.50 / 3.47 の新機能・移行ガイド（material_ui / cupertino_ui 移行含む）を確認したい | release | [references/release/README.md](references/release/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
