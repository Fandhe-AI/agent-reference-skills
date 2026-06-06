---
name: ergogen
description: >
  Ergogen (エルゴノミック自作キーボード設計ツール) リファレンス。
  YAML / JSON 設定で points, outlines, cases, pcbs を宣言し
  SVG / DXF / JSCAD / KiCad を出力。
  Anchors, Zones, Adjustments, Preprocessing, Footprints, Traces。
  キーレイアウト、ケース設計、PCB 生成。
user-invocable: false
model: sonnet
---

# Ergogen リファレンス

Ergogen — エルゴノミックキーボードの設計を YAML/JSON 設定から自動生成するツール。
Points / Outlines / Cases / PCBs を宣言的に記述し、SVG / DXF / JSCAD / KiCad 形式で出力する。
公式ドキュメント (docs.ergogen.xyz) 全 12 ページを構造化。

## ディレクトリ構成

```text
skills/ergogen/
  SKILL.md
  references/
    guide/
      README.md
      getting-started.md
      next-steps.md
      usage.md
    config/
      README.md
      overview.md
      preprocessing.md
    sections/
      README.md
      metadata.md
      units.md
      points.md
      outlines.md
      cases.md
      pcbs.md
    formats/
      README.md
      file-formats.md
  samples/
    README.md
    basic-layout.md
    board-outline.md
    case-3d.md
    custom-units.md
    pcb-footprints.md
    preprocessing-inheritance.md
    split-mirror.md
    thumb-cluster.md
  scripts/
    README.md
    install.md
    cli.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Ergogen の概要・最初の設定例を知りたい | guide | [references/guide/README.md](references/guide/README.md) |
| CLI・Web アプリでの実行方法を知りたい | guide | [references/guide/README.md](references/guide/README.md) |
| コミュニティ・実例リポジトリの導線を知りたい | guide | [references/guide/README.md](references/guide/README.md) |
| 6 トップレベルセクションの責務・設定ファイル構造を知りたい | config | [references/config/README.md](references/config/README.md) |
| `$extends` / `$params` / `$args` / `$skip` / `$unset` などの前処理を知りたい | config | [references/config/README.md](references/config/README.md) |
| `meta` / `units` / `points` / `outlines` / `cases` / `pcbs` セクションを知りたい | sections | [references/sections/README.md](references/sections/README.md) |
| Anchors / Zones / Adjustments / mirror などキー配置の詳細を知りたい | sections | [references/sections/README.md](references/sections/README.md) |
| footprints / nets / traces / KiCad 出力を知りたい | sections | [references/sections/README.md](references/sections/README.md) |
| 出力ファイル形式（SVG / DXF / JSCAD / KiCad）を知りたい | formats | [references/formats/README.md](references/formats/README.md) |
| 典型的なレイアウト・ケース・PCB の設定例を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
