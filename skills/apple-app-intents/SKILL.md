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

> 分割 PR の途中段階。現在収録済み: references/{app-schemas, app-shortcuts, data-types, entities, feature-integrations}。description に挙げた残りのカテゴリは後続 PR で追加し、最終 PR でこの行を削除する。

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
    entities/                   # AppEntity / AppEnum / EntityProperty / DisplayRepresentation
      README.md
      appentity.md
      appenum.md
      entityproperty.md
      indexedentity.md
    data-types/                 # IntentFile / IntentPerson / IntentItemCollection / IntentValue 系
      README.md
      intentfile.md
    app-shortcuts/              # AppShortcut / AppShortcutsProvider / SiriTipView
      README.md
      appshortcut.md
      appshortcutsprovider.md
    app-schemas/                # App Schemas (AppIntent(schema:)) と各ドメイン
      README.md
      appintent-schema-macro.md
      app-schema-base-types.md
      domain-*.md
    feature-integrations/       # Widget / Control / Live Activity / Focus Filter / Workout
      README.md
      widgetconfigurationintent.md
      setfocusfilterintent.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する。

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| アプリのデータを AppEntity / AppEnum としてモデル化する | entities | [references/entities/README.md](references/entities/README.md) |
| DisplayRepresentation、EntityProperty、ComputedProperty、Spotlight 用 IndexedEntity を定義する | entities | [references/entities/README.md](references/entities/README.md) |
| IntentFile・IntentPerson・IntentItemCollection 等の値型を使う | data-types | [references/data-types/README.md](references/data-types/README.md) |
| App Shortcuts (AppShortcutsProvider・発話フレーズ) を提供する、SiriTipView を表示する | app-shortcuts | [references/app-shortcuts/README.md](references/app-shortcuts/README.md) |
| App Schemas で Apple Intelligence・Siri にアプリの機能を公開する | app-schemas | [references/app-schemas/README.md](references/app-schemas/README.md) |
| メール・写真・メッセージ・メモ等のドメイン別 schema を確認する | app-schemas | [references/app-schemas/README.md](references/app-schemas/README.md) |
| Widget / Control / Live Activity / Focus Filter / Workout の Intent を実装する | feature-integrations | [references/feature-integrations/README.md](references/feature-integrations/README.md) |
