---
name: driverjs
description: >
  Driver.js (プロダクトツアー・要素ハイライト) リファレンス。
  driver(), highlight, tour steps, popover, overlay, hints (beacon), onboarding checklist,
  DestroyReason, advanceOnClick, waitForElement, skipMissingElement,
  theming, configuration, コールバック, 1.5〜1.10 変更点。
user-invocable: false
model: sonnet
---

# Driver.js API リファレンス

Driver.js 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

対象バージョン: Driver.js v1.10.1（npm latest、GitHub nilbuild/driver.js タグ `1.10.1`、docs https://driverjs.com/docs/、取得日 2026-10-17）。リポジトリは kamranahmedse/driver.js から nilbuild/driver.js へ移管済み。

## ディレクトリ構成

```text
skills/driverjs/
  SKILL.md
  references/
    getting-started/
      README.md
      installation.md
      basic-usage.md
    api/
      README.md
      configuration.md
      methods.md
      theming.md
    examples/
      README.md
      async-and-lifecycle.md
      highlight-and-popover.md
      styling.md
      tours.md
      interactive-tours.md
    hints/
      README.md
      overview.md
      configuration.md
      methods.md
      styling.md
    checklists/
      README.md
      overview.md
      configuration.md
      methods.md
      customizing.md
      themes.md
    migration/
      README.md
      migrate-to-1x.md
      version-changes.md
  samples/
    README.md
    basic-tour.md
    single-element-highlight.md
    async-tour.md
    confirm-on-exit.md
    custom-popover-buttons.md
    custom-theme.md
    feature-hints.md
    onboarding-checklist.md
    finished-or-closed.md
    advance-on-click-wait.md
    multi-page-tour.md
    skip-missing-element.md
  scripts/
    README.md
    install.md
    setup.md
    api.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| npm install、CDN、import、driver() 初期化、ツアー開始 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| インストール方法・パッケージマネージャーを確認したい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Config オプション、DriveStep 型、コールバック/フックを調べたい | api | [references/api/README.md](references/api/README.md) |
| drive(), moveNext(), destroy(), getState(), setConfig() などメソッドを調べたい | api | [references/api/README.md](references/api/README.md) |
| CSS クラス、popoverClass、onPopoverRender、テーマカスタマイズ | api | [references/api/README.md](references/api/README.md) |
| 非同期ステップ、終了確認、ライフサイクル制御のパターンを知りたい | examples | [references/examples/README.md](references/examples/README.md) |
| ポップオーバー配置、ボタン設定、単一要素ハイライトのパターンを知りたい | examples | [references/examples/README.md](references/examples/README.md) |
| オーバーレイ・ポップオーバーの外観カスタマイズ方法を知りたい | examples | [references/examples/README.md](references/examples/README.md) |
| マルチステップツアーの構成例を見たい | examples | [references/examples/README.md](references/examples/README.md) |
| advanceOnClick、waitForElement、複数ページにまたがるインタラクティブツアーを作りたい | examples | [references/examples/README.md](references/examples/README.md) |
| ツアー終了理由 (DestroyReason)、finished / closed の判別を知りたい | examples / api | [references/examples/README.md](references/examples/README.md)、[references/api/README.md](references/api/README.md) |
| `driver.js/hints`、hints() ビーコン、dismiss / restore、オーバーレイ、Hints のスタイリング | hints | [references/hints/README.md](references/hints/README.md) |
| `driver.js/checklist`、checklist() オンボーディングウィジェット、items / tour / href / action、completeWhen、進捗永続化、onEvent 分析、テーマ | checklists | [references/checklists/README.md](references/checklists/README.md) |
| 0.x → 1.x 移行、破壊的変更、API リネームを確認したい | migration | [references/migration/README.md](references/migration/README.md) |
| 1.5 → 1.10 の変更点（1.6.0 の footer-btn クラス変更、1.7〜1.10 の新オプションなど）を確認したい | migration | [references/migration/README.md](references/migration/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・初期化・API 実行のコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
