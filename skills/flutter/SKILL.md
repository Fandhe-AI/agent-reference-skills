---
name: flutter
description: >
  Flutter (Google 製 Dart クロスプラットフォーム UI フレームワーク, 3.47) のリファレンス。
  StatelessWidget / StatefulWidget / BuildContext, Sliver, Material / Cupertino, Impeller,
  flutter CLI, pubspec.yaml, hot reload, flutter fix / dart fix, DevTools, Widget Previewer,
  MVVM, platform channels / dart:ffi, add-to-app, Flutter Web / Wasm, GenUI SDK / AI Toolkit。
user-invocable: false
---

# Flutter

> 分割 PR の途中段階。現在収録済み: references/{ai, architecture-data, design-animation, fundamentals, interaction-navigation, layout, packages-deployment, platform-integration, release, testing-performance, tools, web, widgets-api}、samples。冒頭説明に挙げた残りの範囲は後続 PR で追加し、最終 PR でこの行を削除する。

## 対象バージョン

- Flutter 3.47.7 stable / Dart 3.13.5（[`releases_macos.json`](https://storage.googleapis.com/flutter_infra_release/releases/releases_macos.json) の `current_release.stable` = `abaf9c523780a608bd46686fd5e53740a07077f8` = flutter/flutter tag [`3.47.7`](https://github.com/flutter/flutter/releases/tag/3.47.7)、2026-10-08 リリース）
- ドキュメント原本: flutter/website（リリースタグなし）を main HEAD [`ed9d404eab2ebb9c0e230bdbac0a1a0fc837021c`](https://github.com/flutter/website/tree/ed9d404eab2ebb9c0e230bdbac0a1a0fc837021c)（2026-10-15T18:05:42Z）に pin、2026-10-16 取得
- API リファレンス: [api.flutter.dev](https://api.flutter.dev/)（dartdoc HTML、URL に版なし）を 2026-10-16 取得
- `llms.txt` は 3.44 のままのため版数の根拠にしない
- 「Not yet released to stable」の breaking changes は第一級に扱わない。例外は material_ui / cupertino_ui で、3.47 から opt-in 可能（opt-in として記載）

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
    platform-integration/    # プラットフォームチャネル・FFI・add-to-app・Android/iOS/macOS/Windows 統合（23 ページ）
      README.md
    packages-deployment/     # パッケージ・flavors・各プラットフォーム配布・難読化・SwiftPM（17 ページ）
      README.md
    testing-performance/     # テスト・デバッグ・Impeller・パフォーマンス・isolates（19 ページ）
      README.md
    tools/                   # flutter CLI・pubspec・hot reload・DevTools・Widget Previewer（24 ページ）
      README.md
    web/                     # Flutter Web・Wasm・初期化・埋め込み・デプロイ（11 ページ）
      README.md
    ai/                      # GenUI SDK・AI Toolkit・AI 開発ツール（10 ページ）
      README.md
    release/                 # リリースノート・breaking changes・移行ガイド（21 ページ）
      README.md
  samples/                   # 動く実例（23 件）
    README.md
    <use-case>.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

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
| platform channels・dart:ffi でネイティブコードを呼びたい | platform-integration | [references/platform-integration/README.md](references/platform-integration/README.md) |
| 既存アプリへ Flutter を組み込みたい（add-to-app）・Platform Views を使いたい | platform-integration | [references/platform-integration/README.md](references/platform-integration/README.md) |
| Android（predictive back・スプラッシュ）/ iOS（拡張・起動画面）/ デスクトップ固有機能を扱いたい | platform-integration | [references/platform-integration/README.md](references/platform-integration/README.md) |
| パッケージ・プラグインを使う/開発する | packages-deployment | [references/packages-deployment/README.md](references/packages-deployment/README.md) |
| Android / iOS / macOS / Linux / Windows 向けにビルド・配布したい | packages-deployment | [references/packages-deployment/README.md](references/packages-deployment/README.md) |
| flavors・難読化・CD・SwiftPM を設定したい | packages-deployment | [references/packages-deployment/README.md](references/packages-deployment/README.md) |
| ユニット/ウィジェット/integration テストを書きたい | testing-performance | [references/testing-performance/README.md](references/testing-performance/README.md) |
| デバッグ・エラー処理・パフォーマンス計測・Impeller・isolates を調べたい | testing-performance | [references/testing-performance/README.md](references/testing-performance/README.md) |
| flutter CLI・pubspec・hot reload・flutter fix を使いたい | tools | [references/tools/README.md](references/tools/README.md) |
| DevTools（inspector・CPU・メモリ・ネットワーク）・Widget Previewer を使いたい | tools | [references/tools/README.md](references/tools/README.md) |
| Flutter Web のビルド・Wasm・初期化・埋め込み・デプロイを行いたい | web | [references/web/README.md](references/web/README.md) |
| GenUI SDK・AI Toolkit（LlmChatView）・AI 開発ツールを使いたい | ai | [references/ai/README.md](references/ai/README.md) |
| 3.47 の新機能・breaking changes・移行ガイド（material_ui opt-in 含む）を確認したい | release | [references/release/README.md](references/release/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
