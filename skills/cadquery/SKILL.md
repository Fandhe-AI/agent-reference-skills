---
name: cadquery
description: >
  CadQuery (Python 製 3D CAD スクリプティングライブラリ) リファレンス。
  Workplane API (lineTo / extrude / revolve / sweep / loft / fillet / chamfer / shell)、
  Sketch API、Assemblies (Constraint solver, 9 種制約)、Free Function API、
  Selectors、Class hierarchy (Shape / Vertex / Edge / Wire / Face / Shell / Solid)、
  Import / Export (STEP / DXF / STL / glTF / SVG)、Visualization (VTK, Jupyter)、CQGI。
user-invocable: false
model: sonnet
---

# CadQuery リファレンス

CadQuery — OpenCascade ベースの Python 製パラメトリック 3D CAD モデリングライブラリ。
スクリプトとして CAD モデルを記述でき、Workplane / Sketch / Assembly といった抽象レイヤー上で
制約ベースの設計を可能にする。STEP / DXF / STL / glTF など多様な業界標準フォーマットの入出力に対応。

## ディレクトリ構成

```text
skills/cadquery/
  SKILL.md
  references/
    getting-started/
      README.md
      concepts.md
      design-principles.md
      installation.md
      introduction.md
      quickstart.md
    workplane/
      README.md
      2d-construction.md
      3d-construction.md
      chaining.md
      construction-geometry.md
      context-solid.md
      iteration.md
      overview.md
      selectors.md
      stack.md
    sketch/
      README.md
      tutorial.md
      workplane-integration.md
    assemblies/
      README.md
      colors.md
      constraints.md
      locations.md
      tutorial.md
    free-function/
      README.md
      adding-features.md
      boolean-operations.md
      operations.md
      parametric-mapping.md
      placement.md
      primitives.md
      shape-construction.md
      text.md
      tutorial.md
    visualization/
      README.md
      control-points.md
      jupyter.md
      pure-python.md
      screenshots.md
      styling.md
    file-io/
      README.md
      exporting-amf-3mf.md
      exporting-assemblies.md
      exporting-dxf.md
      exporting-gltf.md
      exporting-other.md
      exporting-stl.md
      exporting-step.md
      exporting-svg.md
      exporting-tjs.md
      exporting-vrml.md
      importing-assemblies.md
      importing-dxf.md
      importing-step.md
      introduction.md
      scripts-and-output.md
    examples/
      README.md
      advanced-techniques.md
      basic-shapes.md
      construction-geometry.md
      full-projects.md
      holes-and-fillets.md
      mirroring.md
      moving-points.md
      shells-lofts-extrusion.md
      workplanes.md
    api/
      README.md
      assemblies-api.md
      cheatsheet.md
      file-management.md
      iteration-methods.md
      selectors-api.md
      sketch-edges-constraints.md
      sketch-faces.md
      sketch-initialization.md
      sketch-selection.md
      stack-selector-methods.md
      workplane-2d-operations.md
      workplane-3d-non-2d.md
      workplane-3d-operations.md
      workplane-initialization.md
    selectors/
      README.md
      combining.md
      filtering-edges.md
      filtering-faces.md
      filtering-vertices.md
      shape-and-sketch.md
      special-methods.md
      topological.md
      user-directions.md
    classes/
      README.md
      core.md
      geometry.md
      selectors.md
      topological.md
    cqgi/
      README.md
      complete-api.md
      execution-environment.md
      important-methods.md
      overview.md
      script-side.md
      script-variables.md
      stl-automation.md
    extending/
      README.md
      coordinate-systems.md
      example-plugins.md
      helper-methods.md
      linking.md
      opencascade-methods.md
      plugin-example.md
      plugins.md
      preserving-chain.md
      special-methods.md
      stack.md
    misc/
      README.md
      citing.md
  samples/
    README.md
    assembly-with-constraints.md
    basic-box.md
    export-step-stl.md
    extruded-profile.md
    mirroring.md
    parametric-pillow-block.md
    rectangular-array.md
    shell-loft.md
    sketch-api.md
    tagging-and-splitting.md
    workplane-operations.md
  scripts/
    README.md
    cqgi.md
    export.md
    import.md
    install.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| インストール・設計原則・BREP/Workplane/Selectors の概念理解・最初の一歩 | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| 2D ワイヤ作成 (lineTo, polyline, threePointArc)、3D 押し出し (extrude, revolve, sweep, loft)、ブール演算 (cut, union)、フィレット・シェル、チェイン・スタック | workplane | [references/workplane/README.md](references/workplane/README.md) |
| 制約付きスケッチ (segment, arc, spline, constrain, solve)、フェース構築 (rect, circle, polygon, slot)、Workplane との統合 | sketch | [references/sketch/README.md](references/sketch/README.md) |
| 部品組立、Assembly tutorial、オブジェクト配置 (Location)、9 種制約 (Point/Axis/Plane/Fixed 等)、アセンブリカラー | assemblies | [references/assemblies/README.md](references/assemblies/README.md) |
| Workplane を使わない関数型 API (box/sphere/cylinder、fuse/cut、fillet/chamfer、extrude/revolve/sweep/loft、text) | free-function | [references/free-function/README.md](references/free-function/README.md) |
| 可視化 (show 関数、VTK 統合、スクリーンショット、Control Points、スタイリング、Jupyter インライン表示) | visualization | [references/visualization/README.md](references/visualization/README.md) |
| ファイル入出力 (STEP/DXF/STL/glTF/SVG/AMF/3MF/TJS/VRML)、Assembly export/import、show_object 規約 | file-io | [references/file-io/README.md](references/file-io/README.md) |
| モデリング例 (Plate, Mirroring, Workplanes, Lofts, Holes, Bottle, Lego, Bearing, Enclosure, Braille, Cycloidal Gear 等) | examples | [references/examples/README.md](references/examples/README.md) |
| API 一覧 (Sketch / Workplane 2D/3D / File / Iteration / Stack / Selectors / Assemblies のメソッドシグネチャ)、Cheatsheet | api | [references/api/README.md](references/api/README.md) |
| Selector 文字列構文 (">Z", "<<Y", "+Z", "\|X" 等)、組合せ演算子、Topological (ancestors/siblings) | selectors | [references/selectors/README.md](references/selectors/README.md) |
| クラス階層 (Shape / Vertex / Edge / Wire / Face / Shell / Solid / Compound、Vector / Matrix / Plane / Location / BoundBox、Selector 階層) | classes | [references/classes/README.md](references/classes/README.md) |
| スクリプト実行環境、パラメータ駆動モデリング、show_object/debug、BuildResult、CQModel | cqgi | [references/cqgi/README.md](references/cqgi/README.md) |
| Plugin 開発、CadQuery 拡張、OpenCascade 直接呼び出し、Stack 操作、newObject/findSolid、map/apply/invoke | extending | [references/extending/README.md](references/extending/README.md) |
| 引用情報 (学術用途、Zenodo DOI) | misc | [references/misc/README.md](references/misc/README.md) |
| 典型的な使い方を実働コードで確認したい | samples | [samples/README.md](samples/README.md) |
| インストール・エクスポート・インポート・CQGI 実行コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
