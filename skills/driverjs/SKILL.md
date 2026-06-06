---
name: driverjs
description: >
  Driver.js (JavaScript プロダクトツアー・要素ハイライト・オンボーディングライブラリ) リファレンス。
  driver(), highlight, tour steps, popover, overlay, theming、
  configuration、ホットキー、コールバック、アニメーション、ステップナビゲーション。
user-invocable: false
model: sonnet
---

# Driver.js API リファレンス

Driver.js 公式ドキュメントの全 API を網羅したスキル。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

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
    migration/
      README.md
      migrate-to-1x.md
  samples/
    README.md
    basic-tour.md
    single-element-highlight.md
    async-tour.md
    confirm-on-exit.md
    custom-popover-buttons.md
    custom-theme.md
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
| 0.x → 1.x 移行、破壊的変更、API リネームを確認したい | migration | [references/migration/README.md](references/migration/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・初期化・API 実行のコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
