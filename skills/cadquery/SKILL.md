---
name: cadquery
description: >
  CadQuery API リファレンス。
  Workplane API（2D/3D 操作, lineTo/extrude/revolve/sweep/loft/fillet/chamfer/shell）,
  Sketch API（face/edge based, 制約ベース solver）, Assemblies（Constraint solver, 9 種制約, glTF/STEP 出力）,
  Free Function API, Visualization（VTK, Jupyter）, Selectors（文字列構文, クラス階層, Nth 系）,
  Class hierarchy（Shape/Vertex/Edge/Wire/Face/Shell/Solid/Compound, Vector/Plane/Location）,
  Import/Export（STEP, DXF, STL, glTF, SVG, AMF/3MF, TJS, VRML）,
  CQGI（CadQuery Gateway Interface, スクリプト実行環境）,
  Plugin extension（OpenCascade 直接呼び出し, monkey-patching, 関数型 API）,
  公式 32+1 examples（Plate, Bottle, Lego, Bearing, Enclosure, Cycloidal Gear 等）,
  API Cheatsheet。
user-invocable: false
model: sonnet
---

# CadQuery リファレンス

CadQuery — OpenCascade ベースの Python 製パラメトリック 3D CAD モデリングライブラリ。
スクリプトとして CAD モデルを記述でき、Workplane / Sketch / Assembly といった抽象レイヤー上で
制約ベースの設計を可能にする。STEP / DXF / STL / glTF など多様な業界標準フォーマットの入出力に対応。
公式ドキュメント (cadquery.readthedocs.io) の全 20 ページを 14 カテゴリに構造化。

## ディレクトリ構造

```
.claude/skills/cadquery/
├── SKILL.md                                  ← このファイル（エントリーポイント）
└── references/
    ├── getting-started/README.md             ← 入門索引（5 ページ）
    ├── workplane/README.md                   ← Workplane page 索引（9 ページ）
    ├── sketch/README.md                      ← Sketch page 索引（2 ページ）
    ├── assemblies/README.md                  ← Assemblies page 索引（4 ページ）
    ├── free-function/README.md               ← Free Function API 索引（9 ページ）
    ├── visualization/README.md               ← Visualization 索引（5 ページ）
    ├── file-io/README.md                     ← File I/O 索引（15 ページ）
    ├── examples/README.md                    ← Examples 索引（9 ページ / 33 例カバー）
    ├── api/README.md                         ← API Reference + Cheatsheet 索引（14 ページ）
    ├── selectors/README.md                   ← Selectors Reference 索引（8 ページ）
    ├── classes/README.md                     ← Class Summary 索引（4 ページ）
    ├── cqgi/README.md                        ← CQGI 索引（7 ページ）
    ├── extending/README.md                   ← Plugin/拡張ガイド索引（10 ページ）
    └── misc/README.md                        ← Citing 索引（1 ページ）
```

## 探索手順

1. ユーザーのタスクに最も関連するカテゴリを特定する
2. そのカテゴリの `README.md` を読む
3. README.md 内の一覧から必要な個別ファイルを選んで読む
4. 必要に応じて関連ページのリンクを辿る

## カテゴリ → README.md マッピング

| タスク例 | カテゴリ | README パス |
|---------|---------|------------|
| インストール、最初の一歩、設計原則、BREP/Workplane/Selectors の概念理解 | getting-started | [references/getting-started/README.md](./references/getting-started/README.md) |
| 2D ワイヤ作成（lineTo, polyline, threePointArc 等）、3D 押し出し（extrude, revolve, sweep, loft）、ブール演算（cut, union）、フィレット・シェル、Workplane chain と Stack | workplane | [references/workplane/README.md](./references/workplane/README.md) |
| 制約付きスケッチ（segment, arc, spline, constrain, solve）、フェース構築（rect, circle, polygon, slot）、Workplane との統合 | sketch | [references/sketch/README.md](./references/sketch/README.md) |
| 部品組立、Assembly tutorial、Object locations、9 種制約（Point/Axis/Plane/PointInPlane/Fixed 等）、Assembly colors | assemblies | [references/assemblies/README.md](./references/assemblies/README.md) |
| Workplane を使わない関数型 API（box/sphere/cylinder, fuse/cut, fillet/chamfer/shell, extrude/revolve/sweep/loft, text 等） | free-function | [references/free-function/README.md](./references/free-function/README.md) |
| 可視化（show 関数、VTK 統合、スクリーンショット、Control points、Styling、Jupyter インライン表示） | visualization | [references/visualization/README.md](./references/visualization/README.md) |
| ファイル入出力（STEP/DXF/STL/glTF/SVG/AMF/3MF/TJS/VRML）、Assembly export, CQ-editor の show_object 規約 | file-io | [references/file-io/README.md](./references/file-io/README.md) |
| 33 個のモデリング例（Plate, Mirroring, Workplanes, Lofts, Holes, Bottle, Lego, Bearing, Enclosure, Braille, Cycloidal Gear 等） | examples | [references/examples/README.md](./references/examples/README.md) |
| API 一覧（Sketch / Workplane 2D/3D / File / Iteration / Stack / Selectors / Assemblies のメソッドシグネチャ）、API Cheatsheet | api | [references/api/README.md](./references/api/README.md) |
| Selector 文字列構文（"%face", ">Z", "<<Y", "+Z", "|X", "#X" 等）、組合せ演算子、Nth 系、Topological（ancestors/siblings） | selectors | [references/selectors/README.md](./references/selectors/README.md) |
| クラス階層（Shape, Vertex, Edge, Wire, Face, Shell, Solid, Compound, CompSolid, Mixin1D/3D, Vector, Matrix, Plane, Location, BoundBox, Color, Material, Selector 階層） | classes | [references/classes/README.md](./references/classes/README.md) |
| スクリプト実行環境、パラメータ駆動モデリング、show_object/debug、BuildResult、CQModel | cqgi | [references/cqgi/README.md](./references/cqgi/README.md) |
| Plugin 開発、CadQuery 拡張、OpenCascade 直接呼び出し、Stack 操作、newObject/findSolid、map/apply/invoke | extending | [references/extending/README.md](./references/extending/README.md) |
| 引用情報（学術用途、Zenodo DOI） | misc | [references/misc/README.md](./references/misc/README.md) |
