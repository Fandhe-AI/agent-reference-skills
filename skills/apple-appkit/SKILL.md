---
name: apple-appkit
description: >
  AppKit macOS UI リファレンス。Liquid Glass (NSGlassEffectView)、
  NSApplication, NSWindow, NSViewController, NSView, NSMenu, NSToolbar,
  NSTableView, NSOutlineView, NSCollectionView, NSSplitViewController, NSTabView,
  NSPopover, NSOpenPanel / NSSavePanel, NSSearchField, NSControl, NSStackView,
  NSScrollView, Diffable Data Source, target-action, responder chain。
user-invocable: false
---

対象は macOS 27 SDK のドキュメント（developer.apple.com の JSON を 2026-10-16 に取得）。プラットフォーム版数は各ページに記載。

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
      nsopenpanel.md
      nspanel.md
      nspopover.md
      nsresponder.md
      nssavepanel.md
      nssearchtoolbaritem.md
      nssplitviewcontroller.md
      nssplitviewitem.md
      nssplitviewitemaccessoryviewcontroller.md
      nstabviewcontroller.md
      nstoolbar.md
      nstoolbaritem.md
      nsviewcontroller.md
      nswindow.md
      nswindowcontroller.md
    views-controls/
      README.md
      nsbackgroundextensionview.md
      nsbutton.md
      nscolorwell.md
      nscombobox.md
      nscontrol.md
      nsdatepicker.md
      nsglasseffectcontainerview.md
      nsglasseffectview.md
      nsimageview.md
      nspopupbutton.md
      nsprogressindicator.md
      nsrefreshcontroller.md
      nsscrollview.md
      nssearchfield.md
      nssegmentedcontrol.md
      nsslider.md
      nssplitview.md
      nsstackview.md
      nsswitch.md
      nstabview.md
      nstabviewitem.md
      nstextfield.md
      nstextview.md
      nsview.md
      observation-tracking.md
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
| ポップオーバー（NSPopover）や開く・保存ファイルパネル（NSOpenPanel / NSSavePanel）を使いたい | app-windows | [references/app-windows/README.md](references/app-windows/README.md) |
| サイドバー・インスペクター用スプリットビュー（NSSplitViewController / NSSplitViewItem / アクセサリ）を構築したい | app-windows / views-controls | [references/app-windows/README.md](references/app-windows/README.md) / [references/views-controls/README.md](references/views-controls/README.md) |
| タブ UI（NSTabViewController / NSTabView / NSTabViewItem）を実装したい | app-windows / views-controls | [references/app-windows/README.md](references/app-windows/README.md) / [references/views-controls/README.md](references/views-controls/README.md) |
| 検索フィールド・ツールバー検索（NSSearchField / NSSearchToolbarItem）を追加したい | views-controls / app-windows | [references/views-controls/README.md](references/views-controls/README.md) / [references/app-windows/README.md](references/app-windows/README.md) |
| レスポンダーチェーンでイベントを処理したい | app-windows | [references/app-windows/README.md](references/app-windows/README.md) |
| Liquid Glass（NSGlassEffectView / .glass ベゼル / NSBackgroundExtensionView）を適用したい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| カスタムビューを描画・レイアウトしたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| テキストフィールド・ボタン・スライダー等のコントロールを使いたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| スタックビュー・スクロールビューでレイアウトしたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| プルトゥリフレッシュ・タッチスクロール（NSScrollView / NSRefreshController）を扱いたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| target-action パターンで操作を受け取りたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| NSControl.Events によるイベントベースの target-action を使いたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| Observation による自動ビュー更新（observation tracking）を使いたい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| テキスト入力・リッチテキスト編集を実装したい | views-controls | [references/views-controls/README.md](references/views-controls/README.md) |
| 行と列のテーブルビューを実装したい | tables-collections | [references/tables-collections/README.md](references/tables-collections/README.md) |
| ツリー構造をアウトラインビューで表示したい | tables-collections | [references/tables-collections/README.md](references/tables-collections/README.md) |
| コレクションビューでグリッド・カスタムレイアウトを構築したい | tables-collections | [references/tables-collections/README.md](references/tables-collections/README.md) |
| Diffable Data Source でアニメーション付き差分更新を行いたい | tables-collections | [references/tables-collections/README.md](references/tables-collections/README.md) |
