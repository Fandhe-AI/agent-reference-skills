---
name: apple-app-intents
description: >
  Apple App Intents (Swift, Siri / Shortcuts / Apple Intelligence 連携フレームワーク) の
  リファレンス。AppIntent, AppEntity, AppEnum, EntityQuery, IntentParameter, AppShortcutsProvider,
  App Schemas (AppIntent マクロ), IndexedEntity (Spotlight), SnippetIntent, Visual Intelligence,
  IntentValueQuery, App Intents Testing, SiriKit (INIntent) 移行。
user-invocable: false
---

# Apple App Intents

Apple の App Intents フレームワーク（アプリの機能とデータを Siri・Shortcuts・Spotlight・Apple Intelligence・Visual Intelligence 等のシステム体験へ公開する Swift API）のリファレンス・サンプル集。

## 対象バージョン

- 出典: developer.apple.com の DocC JSON（`/tutorials/data/documentation/<path>.json`）。URL に版がないため取得日 2026-10-16 で pin
- 対象 SDK: iOS / iPadOS / macOS / tvOS / visionOS / watchOS 27.0（Xcode 27.0）。`updates/appintents` の最新節は June 2026。取得した 1258 JSON に beta フラグは 0 件
- フレームワーク導入版
  - App Intents: iOS 16.0 / macOS 13.0 / watchOS 9.0 / visionOS 1.0
  - Visual Intelligence: iOS 26.0 / macOS 27.0
  - App Intents Testing: 全 OS 27.0
- 個別 API の導入版は各ページの記述を優先する

## ディレクトリ構成

```text
skills/apple-app-intents/
  SKILL.md
  references/
    intents/                    # AppIntent 本体・実行制御・依存管理
      README.md
      appintent.md
      appintentsextension.md
      appintentspackage.md
      appdependency.md
      intentmodes.md
      longrunningintent.md
      ...
    intent-types/               # システム定義の Intent 種別 (OpenIntent / DeleteIntent / URLRepresentableIntent 等)
      README.md
      openintent.md
      customintentmigratedappintent.md
      ...
    entities/                   # AppEntity / AppEnum / EntityProperty / DisplayRepresentation
      README.md
      appentity.md
      appenum.md
      entityproperty.md
      indexedentity.md
      ...
    queries/                    # EntityQuery 系・ソート・比較演算子
      README.md
      entityquery.md
      entitypropertyquery.md
      ...
    parameters-results/         # IntentParameter / ParameterSummary / IntentResult / IntentDialog
      README.md
      intentparameter.md
      parametersummary.md
      intentresult.md
      ...
    data-types/                 # IntentFile / IntentPerson / IntentItemCollection / IntentValue 系
      README.md
      intentfile.md
      ...
    app-shortcuts/              # AppShortcut / AppShortcutsProvider / SiriTipView
      README.md
      appshortcut.md
      appshortcutsprovider.md
      ...
    app-schemas/                # App Schemas (AppIntent(schema:)) と各ドメイン
      README.md
      appintent-schema-macro.md
      app-schema-base-types.md
      domain-*.md
      ...
    shortcuts-schema-domains/   # Shortcuts 向け schema ドメイン (Books / Browser / Files 等)
      README.md
      domain-*.md
    system-integration/         # Spotlight・donation・snippet・UIKit/AppKit・シーン連携
      README.md
      intentdonationmanager.md
      snippetintent.md
      targetcontentprovidingintent.md
      ...
    feature-integrations/       # Widget / Control / Live Activity / Focus Filter / Workout
      README.md
      widgetconfigurationintent.md
      setfocusfilterintent.md
      ...
    visual-intelligence/        # Visual Intelligence 検索連携
      README.md
      intentvaluequery.md
      semanticcontentdescriptor.md
      ...
    testing/                    # App Intents Testing フレームワーク
      README.md
      appintentstesting-overview.md
      intentdefinitions.md
      ...
  samples/
    README.md
    create-first-app-intent.md
    define-app-entities.md
    adopt-app-schemas.md
    ...（19 件、索引は samples/README.md）
```

`scripts/` は存在しない。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する
4. 典型的な実装手順は `samples/README.md` から該当サンプルを探す

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| AppIntent を宣言し perform() を実装する、実行モード・長時間実行・取り消し・Undo を設定する | intents | [references/intents/README.md](references/intents/README.md) |
| 依存の登録・注入 (AppDependency)、AppIntentsPackage でターゲット間共有する | intents | [references/intents/README.md](references/intents/README.md) |
| OpenIntent / DeleteIntent / URLRepresentableIntent 等システム定義の Intent 種別を使う | intent-types | [references/intent-types/README.md](references/intent-types/README.md) |
| SiriKit カスタム Intent から移行する | intent-types | [references/intent-types/README.md](references/intent-types/README.md) |
| アプリのデータを AppEntity / AppEnum としてモデル化する | entities | [references/entities/README.md](references/entities/README.md) |
| DisplayRepresentation、EntityProperty、ComputedProperty、Spotlight 用 IndexedEntity を定義する | entities | [references/entities/README.md](references/entities/README.md) |
| EntityQuery で Entity を検索・列挙する、ソートや比較演算子を指定する | queries | [references/queries/README.md](references/queries/README.md) |
| IntentParameter・ParameterSummary・IntentDialog・IntentResult を定義する | parameters-results | [references/parameters-results/README.md](references/parameters-results/README.md) |
| パラメーター解決 (Resolvers)、確認、ダイナミック選択肢を扱う | parameters-results | [references/parameters-results/README.md](references/parameters-results/README.md) |
| IntentFile・IntentPerson・IntentItemCollection 等の値型を使う | data-types | [references/data-types/README.md](references/data-types/README.md) |
| App Shortcuts (AppShortcutsProvider・発話フレーズ) を提供する、SiriTipView を表示する | app-shortcuts | [references/app-shortcuts/README.md](references/app-shortcuts/README.md) |
| App Schemas で Apple Intelligence・Siri にアプリの機能を公開する | app-schemas | [references/app-schemas/README.md](references/app-schemas/README.md) |
| メール・写真・メッセージ・メモ等のドメイン別 schema を確認する | app-schemas | [references/app-schemas/README.md](references/app-schemas/README.md) |
| ブラウザー・ドキュメント・表計算・ホワイトボード等 Shortcuts 向け schema ドメインを確認する | shortcuts-schema-domains | [references/shortcuts-schema-domains/README.md](references/shortcuts-schema-domains/README.md) |
| Intent の donation、関連 Intent の提案、画面上 Entity の共有、スニペット表示 | system-integration | [references/system-integration/README.md](references/system-integration/README.md) |
| Intent を特定のシーンへ誘導する、UIKit / AppKit のデータソースを連携する | system-integration | [references/system-integration/README.md](references/system-integration/README.md) |
| Widget / Control / Live Activity / Focus Filter / Workout の Intent を実装する | feature-integrations | [references/feature-integrations/README.md](references/feature-integrations/README.md) |
| Visual Intelligence の検索結果にアプリのコンテンツを表示する | visual-intelligence | [references/visual-intelligence/README.md](references/visual-intelligence/README.md) |
| App Intents・Entity・Query をテストする | testing | [references/testing/README.md](references/testing/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
