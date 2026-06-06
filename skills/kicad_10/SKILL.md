---
name: kicad_10
description: >
  KiCad 10.0 (オープンソース EDA スイート) リファレンス。
  Project Manager、Schematic Editor (Eeschema)、PCB Editor (PCBnew)、
  Gerber Viewer (GerbView)、Drawing Sheet Editor (pl_editor)、
  PCB Calculator、Command-Line Interface (kicad-cli)。
  回路図設計、基板設計、ガーバー出力、フットプリント、シンボル、3D ビューア。
user-invocable: false
model: sonnet
---

# KiCad 10.0 リファレンス

KiCad — クロスプラットフォームのオープンソース EDA (Electronic Design Automation) スイート。回路図エディタ・PCB エディタ・Gerber ビューア・各種計算ツール・CLI などから構成される。
公式ドキュメント (docs.kicad.org/10.0/en/) の 9 マニュアルを構造化。回路設計・PCB 設計・各エディタ操作・CLI 操作時に参照する。

## ディレクトリ構成

```text
skills/kicad_10/
  SKILL.md
  references/
    introduction/
      README.md
      welcome.md
      installing-and-upgrading-kicad.md
      kicad-workflow.md
    getting-started/
      README.md
      01-introduction-to-kicad.md
      02-basic-concepts-and-workflow.md
      03-first-time-setup.md
      04-tutorial-part-1-project.md
      05-tutorial-part-2-schematic.md
      06-tutorial-part-3-circuit-board.md
      07-tutorial-part-4-custom-symbols-and-footprints.md
      08-where-to-go-from-here.md
    kicad/
      README.md
      01-introduction.md
      02-installing-and-upgrading-kicad.md
      03-using-the-kicad-project-manager.md
      04-kicad-files-and-folders.md
      05-paths-and-libraries-configuration.md
      06-jobsets.md
      07-project-templates.md
      08-plugin-and-content-manager.md
      09-kicad-preferences.md
      10-actions-reference.md
    eeschema/
      README.md
      01-introduction.md
      02-schematic-creation-and-editing.md
      03-multiple-sheets-and-hierarchical-schematics.md
      04-inspecting-a-schematic.md
      05-assigning-footprints.md
      06-forward-and-back-annotation.md
      07-generating-outputs.md
      08-design-variants.md
      09-symbols-and-symbol-libraries.md
      10-creating-and-editing-symbols.md
      11-importing-schematics-from-other-applications.md
      12-design-blocks.md
      13-simulator.md
      14-advanced-topics.md
    pcbnew/
      README.md
      01-introduction.md
      02-display-and-selection-controls.md
      03-creating-a-pcb.md
      04-board-setup.md
      05-editing-a-board.md
      06-forward-and-back-annotation.md
      07-inspecting-a-board.md
      08-importing-boards-from-other-eda-tools.md
      09-generating-outputs.md
      10-design-variants.md
      11-footprints-and-footprint-libraries.md
      12-creating-and-editing-footprints.md
      13-multichannel-layout.md
      14-design-blocks.md
      15-advanced-topics.md
    gerbview/
      README.md
      01-introduction.md
      02-interface.md
      03-commands-in-menu-bar.md
      04-printing.md
    pl-editor/
      README.md
      01-introduction.md
      02-drawing-sheet-editor-files.md
      03-theory-of-operations.md
      04-text-and-keywords.md
      05-constraints.md
      06-invoking-the-drawing-sheet-editor.md
      07-drawing-sheet-editor-commands.md
      08-properties-editor.md
      09-design-inspector-window.md
      10-interactive-editing.md
    pcb-calculator/
      README.md
      01-introduction.md
      02-regulators.md
      03-rf-attenuators.md
      04-e-series.md
      05-color-code.md
      06-transline.md
      07-via-size.md
      08-track-width.md
      09-electrical-spacing.md
      10-board-classes.md
    cli/
      README.md
      01-introduction.md
      02-footprint-commands.md
      03-jobset-commands.md
      04-pcb-commands.md
      05-schematic-commands.md
      06-symbol-commands.md
      07-version-commands.md
  samples/
    README.md
    new-project.md
    schematic-entry.md
    pcb-layout-and-routing.md
    custom-symbol-and-footprint.md
    gerber-and-drill-output.md
    cli-automation.md
    design-variants.md
    hierarchical-schematics.md
  scripts/
    README.md
    install.md
    cli.md
    validate.md
    export-pcb.md
    export-schematic.md
    library.md
    jobset.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| KiCad とは・スイート概要・ライセンス・ワークフロー概説 | introduction | [references/introduction/README.md](references/introduction/README.md) |
| インストール・初期セットアップ・初回チュートリアル（プロジェクト/回路図/PCB） | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| プロジェクトマネージャ操作・ファイル拡張子・パス変数・Jobsets・テンプレート・PCM・環境設定 | kicad | [references/kicad/README.md](references/kicad/README.md) |
| 回路図作成・シンボル配置・配線・ERC・階層シート・フットプリント割当・BOM/ネットリスト出力・SPICE シミュレータ | eeschema | [references/eeschema/README.md](references/eeschema/README.md) |
| PCB 作成・ボード設定・配置/配線・DRC・ガーバー出力・フットプリントライブラリ・マルチチャンネル・3D ビュー | pcbnew | [references/pcbnew/README.md](references/pcbnew/README.md) |
| ガーバーファイル・Excellon ドリルファイルの表示・検証・印刷 | gerbview | [references/gerbview/README.md](references/gerbview/README.md) |
| 図枠 (タイトルブロック) 編集・テキスト/キーワード・制約・プロパティエディタ | pl-editor | [references/pl-editor/README.md](references/pl-editor/README.md) |
| レギュレータ・RF アッテネータ・E シリーズ・カラーコード・伝送線路・ビアサイズ・トラック幅・電気的間隔・基板クラス | pcb-calculator | [references/pcb-calculator/README.md](references/pcb-calculator/README.md) |
| kicad-cli コマンド (fp/jobset/pcb/sch/sym/version) のオプション一覧・CLI 自動化 | cli | [references/cli/README.md](references/cli/README.md) |
| 典型的なワークフロー例・プロジェクト作成から製造データ出力までの手順 | samples | [samples/README.md](samples/README.md) |
| インストールコマンド・CLI 操作・DRC/ERC 検証・製造データ出力・ライブラリ変換コマンド | scripts | [scripts/README.md](scripts/README.md) |
