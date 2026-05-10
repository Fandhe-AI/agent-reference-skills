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

## ディレクトリ構造

```
.claude/skills/kicad_10/
├── SKILL.md                                    ← このファイル（エントリーポイント）
└── references/
    ├── introduction/README.md                  ← Introduction（3 ページ）
    ├── getting-started/README.md               ← Getting Started in KiCad（8 ページ）
    ├── kicad/README.md                         ← KiCad Project Manager（10 ページ）
    ├── eeschema/README.md                      ← Schematic Editor（14 ページ）
    ├── pcbnew/README.md                        ← PCB Editor（15 ページ）
    ├── gerbview/README.md                      ← Gerber Viewer（4 ページ）
    ├── pl-editor/README.md                     ← Drawing Sheet Editor（10 ページ）
    ├── pcb-calculator/README.md                ← Calculator Tools（10 ページ）
    └── cli/README.md                           ← Command-Line Interface（7 ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| KiCad とは・スイート概要・ライセンス・コミュニティ | introduction | [references/introduction/README.md](./references/introduction/README.md) |
| 初めての KiCad・初期セットアップ・プロジェクト/回路図/PCB チュートリアル | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| プロジェクトマネージャ操作・ファイル拡張子・パス変数・ライブラリテーブル・Jobsets・テンプレート・PCM・環境設定・アクション一覧 | kicad | [references/kicad/README.md](./references/kicad/README.md) |
| 回路図作成・配線・階層シート・ERC・フットプリント割当・BOM/ネットリスト出力・デザインバリアント・シンボルライブラリ・シミュレータ | eeschema | [references/eeschema/README.md](./references/eeschema/README.md) |
| PCB 作成・ボード設定・配線/配置・DRC・ガーバー出力・フットプリントライブラリ・マルチチャンネル・3D ビュー | pcbnew | [references/pcbnew/README.md](./references/pcbnew/README.md) |
| ガーバーファイルの表示・検証・PCB エディタへのインポート・印刷 | gerbview | [references/gerbview/README.md](./references/gerbview/README.md) |
| 図枠 (タイトルブロック) の編集・テキスト/キーワード・制約・プロパティエディタ | pl-editor | [references/pl-editor/README.md](./references/pl-editor/README.md) |
| レギュレータ・RF アッテネータ・E シリーズ・カラーコード・伝送線路・ビアサイズ・トラック幅・電気的間隔・基板クラス | pcb-calculator | [references/pcb-calculator/README.md](./references/pcb-calculator/README.md) |
| kicad-cli コマンド: footprint/jobset/pcb/schematic/symbol/version 各サブコマンドのオプション一覧 | cli | [references/cli/README.md](./references/cli/README.md) |
