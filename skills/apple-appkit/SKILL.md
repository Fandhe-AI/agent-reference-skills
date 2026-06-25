---
name: apple-appkit
description: >
  AppKit macOS ネイティブ UI フレームワークリファレンス。
  NSApplication, NSWindow, NSViewController, NSView, NSMenu, NSToolbar,
  NSTableView, NSOutlineView, NSCollectionView, NSControl, NSStackView,
  NSScrollView, Diffable Data Source, target-action, responder chain。
user-invocable: false
---

## ディレクトリ構成

```text
skills/apple-appkit/
  SKILL.md
  references/
    app-windows/
      README.md
      nsalert.md
      nsapplication.md
      nsapplicationdelegate.md
      nsmenu.md
      nsmenuitem.md
      nspanel.md
      nsresponder.md
      nstoolbar.md
      nstoolbaritem.md
      nsviewcontroller.md
      nswindow.md
      nswindowcontroller.md
    views-controls/
      README.md
      nsbutton.md
      nscolorwell.md
      nscombobox.md
      nscontrol.md
      nsdatepicker.md
      nsimageview.md
      nsprogressindicator.md
      nsscrollview.md
      nssegmentedcontrol.md
      nsslider.md
      nsstackview.md
      nsswitch.md
      nstextfield.md
      nstextview.md
      nsview.md
      nspopupbutton.md
    tables-collections/
      README.md
      nscollectionview.md
      nscollectionviewdatasource.md
      nscollectionviewdiffabledatasource.md
      nscollectionviewitem.md
      nscollectionviewlayout.md
      nsoutlineview.md
      nsoutlineviewdatasource.md
      nstablecellview.md
      nstablecolumn.md
      nstableview.md
      nstableviewdatasource.md
      nstableviewdelegate.md
      nstableviewdiffabledatasource.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| アプリのライフサイクル・イベントループを制御したい | app-windows | [references/app-windows/README.md](references/app-windows/README.md) |
| ウィンドウの作成・設定・表示を行いたい | app-windows | [references/app-windows/README.md](references/app-windows/README.md) |
| ViewController でビュー階層を管理したい | app-windows | [references/app-windows/README.md](references/app-windows/README.md) |
| メニューバー・コンテキストメニューを構築したい | app-windows | [references/app-windows/README.md](references/app-windows/README.md) |
| ツールバーにボタンやカスタム項目を追加したい | app-windows | [references/app-windows/README.md](references/app-windows/README.md) |
| パネル・アラートダイアログを表示したい | app-windows | [references/app-windows/README.md](references/app-windows/README.md) |
| レスポンダーチェーンでイベントを処理したい | app-windows | [references/app-windows/README.md](references/app-windows/README.md) |
| カスタムビューを描画・レイアウトしたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| テキストフィールド・ボタン・スライダー等のコントロールを使いたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| スタックビュー・スクロールビューでレイアウトしたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| target-action パターンで操作を受け取りたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| テキスト入力・リッチテキスト編集を実装したい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| 行と列のテーブルビューを実装したい | tables-collections | [references/tables-collections/README.md](references/tables-collections/README.md) |
| ツリー構造をアウトラインビューで表示したい | tables-collections | [references/tables-collections/README.md](references/tables-collections/README.md) |
| コレクションビューでグリッド・カスタムレイアウトを構築したい | tables-collections | [references/tables-collections/README.md](references/tables-collections/README.md) |
| Diffable Data Source でアニメーション付き差分更新を行いたい | tables-collections | [references/tables-collections/README.md](references/tables-collections/README.md) |
