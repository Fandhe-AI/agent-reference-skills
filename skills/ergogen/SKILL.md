---
name: ergogen
description: >
  Ergogen エルゴノミックキーボード設計ツールリファレンス。
  YAML/JSON 設定で points, outlines, cases, pcbs を宣言し
  SVG / DXF / JSCAD / KiCad を出力。
  Anchors, Zones, Adjustments, Preprocessing, Footprints, Traces 等。
user-invocable: false
model: sonnet
---

# Ergogen リファレンス

Ergogen — エルゴノミックキーボードの設計を YAML/JSON 設定から自動生成するツール。
Points / Outlines / Cases / PCBs を宣言的に記述し、SVG / DXF / JSCAD / KiCad 形式で出力する。
公式ドキュメント (docs.ergogen.xyz) 全 12 ページを構造化。

## ディレクトリ構造

```
.claude/skills/ergogen/
├── SKILL.md                                ← このファイル（エントリーポイント）
└── references/
    ├── guide/README.md                     ← 利用ワークフロー索引（3 ページ）
    ├── config/README.md                    ← 設定構造・前処理索引（2 ページ）
    ├── sections/README.md                  ← 6 トップレベルセクション索引（6 ページ）
    └── formats/README.md                   ← 出力ファイル形式索引（1 ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| Ergogen の概要・最初の設定例・推奨ワークフロー | guide | [references/guide/README.md](./references/guide/README.md) |
| CLI (`ergogen input.yaml -o out`) / Web アプリでの実行 | guide | [references/guide/README.md](./references/guide/README.md) |
| 発展的トピック・コミュニティ（Discord, GitHub）導線 | guide | [references/guide/README.md](./references/guide/README.md) |
| 6 トップレベルセクション（meta/units/points/outlines/cases/pcbs）の責務 | config | [references/config/README.md](./references/config/README.md) |
| Preprocessing: `$extends` / `$params` / `$args` / `$skip` / `$unset`, 数式評価 | config | [references/config/README.md](./references/config/README.md) |
| `meta` セクション: name / version / author / engine | sections | [references/sections/README.md](./references/sections/README.md) |
| `units` セクション: 組み込み単位（u, cx, cy）、数式記法、`$default_*` | sections | [references/sections/README.md](./references/sections/README.md) |
| `points` セクション: Anchors / Zones / Adjustments、column-stagger、mirror | sections | [references/sections/README.md](./references/sections/README.md) |
| `outlines` セクション: rectangle / circle / polygon / outline 参照、operations、exports | sections | [references/sections/README.md](./references/sections/README.md) |
| `cases` セクション: extrude、shift / rotate、3D ブーリアン合成 | sections | [references/sections/README.md](./references/sections/README.md) |
| `pcbs` セクション: footprints、nets、traces、KiCad 出力 | sections | [references/sections/README.md](./references/sections/README.md) |
| 出力ファイル形式（SVG / DXF / JSCAD / KiCad）と推奨ビューア | formats | [references/formats/README.md](./references/formats/README.md) |
