---
name: blender
description: >
  Blender Python API リファレンス。bpy / bmesh / mathutils / gpu / bpy_extras モジュール、
  bpy.data / bpy.context / bpy.ops / bpy.types / bpy.props コア API。
  Mesh / Modifier / Geometry Nodes / Armature / Keyframe / Driver / Shape Key / NLA、
  Cycles / EEVEE / Shader Nodes / Rigid Body / Cloth / Fluid / Compositor Nodes / AOV、
  headless CLI レンダリング、add-on 開発、Extensions システム、MCP Server (Model Context Protocol)。
user-invocable: false
---

## ディレクトリ構成

```text
skills/blender/
  SKILL.md
  references/
    python-api-core/
      README.md
      bpy-data.md
      bpy-context.md
      bpy-ops.md
      bpy-types.md
      bpy-props.md
      bpy-utils.md
      bpy-app.md
      bpy-info.md
    python-api-modules/
      README.md
      bmesh.md
      mathutils.md
      gpu.md
      bpy-extras.md
      other-modules.md
    modeling/
      README.md
      mesh-basics.md
      modifiers.md
      geometry-nodes.md
      curves-surfaces.md
      sculpting.md
    scripting/
      README.md
      headless-cli.md
      addon-development.md
      text-editor.md
      extending.md
      mcp-server.md
    animation-rigging/
      README.md
      keyframes.md
      drivers.md
      constraints.md
      armatures.md
      shape-keys.md
      actions-nla.md
    rendering-shading/
      README.md
      cycles.md
      eevee.md
      materials-nodes.md
      lighting.md
      render-output.md
      freestyle.md
    physics/
      README.md
      rigid-body.md
      cloth.md
      soft-body.md
      particles.md
      fluid.md
      collision-forces.md
    compositing/
      README.md
      compositor-nodes.md
      render-passes.md
      common-setups.md
    scene-objects/
      README.md
      objects-transform.md
      collections.md
      empties-cameras-lights.md
      data-system.md
      world-scene.md
  samples/
    README.md
    object-creation.md
    bmesh-editing.md
    modifier-workflow.md
    material-shading.md
    headless-render.md
    scene-management.md
    addon-template.md
    animation-keyframes.md
    rigging-armature.md
    physics-simulation.md
    rendering-setup.md
    compositing-nodes.md
    mcp-server-workflow.md
  scripts/
    README.md
    cli-commands.md
    addon-lifecycle.md
    python-environment.md
    mcp-server.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの README.md を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| bpy.data でデータブロックを操作したい | python-api-core | [references/python-api-core/README.md](references/python-api-core/README.md) |
| bpy.context でアクティブオブジェクト・選択状態を取得したい | python-api-core | [references/python-api-core/README.md](references/python-api-core/README.md) |
| bpy.ops でオペレーターを呼び出したい | python-api-core | [references/python-api-core/README.md](references/python-api-core/README.md) |
| bpy.types / bpy.props でカスタム型・プロパティを定義したい | python-api-core | [references/python-api-core/README.md](references/python-api-core/README.md) |
| bmesh で低レベルメッシュ編集をしたい | python-api-modules | [references/python-api-modules/README.md](references/python-api-modules/README.md) |
| mathutils の Vector / Matrix / Quaternion を使いたい | python-api-modules | [references/python-api-modules/README.md](references/python-api-modules/README.md) |
| GPU シェーダー・ビューポートオーバーレイを描画したい | python-api-modules | [references/python-api-modules/README.md](references/python-api-modules/README.md) |
| bpy_extras の I/O ヘルパーを使いたい | python-api-modules | [references/python-api-modules/README.md](references/python-api-modules/README.md) |
| メッシュ編集・モディファイアー操作をしたい | modeling | [references/modeling/README.md](references/modeling/README.md) |
| Geometry Nodes をスクリプトから操作したい | modeling | [references/modeling/README.md](references/modeling/README.md) |
| カーブ・サーフェス・メタボールを扱いたい | modeling | [references/modeling/README.md](references/modeling/README.md) |
| スカルプトモードの設定を Python から変更したい | modeling | [references/modeling/README.md](references/modeling/README.md) |
| headless CLI でバックグラウンドレンダリングしたい | scripting | [references/scripting/README.md](references/scripting/README.md) |
| add-on / Extension を開発したい | scripting | [references/scripting/README.md](references/scripting/README.md) |
| テキストエディター・Python コンソールを使いたい | scripting | [references/scripting/README.md](references/scripting/README.md) |
| 内蔵 Python に外部パッケージを追加したい | scripting | [references/scripting/README.md](references/scripting/README.md) |
| MCP 経由で LLM から Blender を操作したい / MCP サーバーを設定したい | scripting | [references/scripting/README.md](references/scripting/README.md) |
| キーフレームを Python から挿入・削除・補間モードを変更したい | animation-rigging | [references/animation-rigging/README.md](references/animation-rigging/README.md) |
| ドライバーで他プロパティや Python 式を使って値を制御したい | animation-rigging | [references/animation-rigging/README.md](references/animation-rigging/README.md) |
| アーマチュア・ボーン・IK をスクリプトでセットアップしたい | animation-rigging | [references/animation-rigging/README.md](references/animation-rigging/README.md) |
| Shape Key・NLA・Action をスクリプトから操作したい | animation-rigging | [references/animation-rigging/README.md](references/animation-rigging/README.md) |
| Cycles / EEVEE のレンダー設定をスクリプトから変更したい | rendering-shading | [references/rendering-shading/README.md](references/rendering-shading/README.md) |
| マテリアル・シェーダーノードを Python で構築したい | rendering-shading | [references/rendering-shading/README.md](references/rendering-shading/README.md) |
| ライト・ワールド HDRI を設定したい | rendering-shading | [references/rendering-shading/README.md](references/rendering-shading/README.md) |
| レンダー出力フォーマット・解像度・カラーマネジメントを制御したい | rendering-shading | [references/rendering-shading/README.md](references/rendering-shading/README.md) |
| リジッドボディ・布・ソフトボディのシミュレーションを設定したい | physics | [references/physics/README.md](references/physics/README.md) |
| パーティクル・流体 (Mantaflow) をスクリプトから操作したい | physics | [references/physics/README.md](references/physics/README.md) |
| フォースフィールド・コリジョンを Python で制御したい | physics | [references/physics/README.md](references/physics/README.md) |
| コンポジターノードツリーを Python で構築したい | compositing | [references/compositing/README.md](references/compositing/README.md) |
| レンダーパス・AOV・Cryptomatte を設定したい | compositing | [references/compositing/README.md](references/compositing/README.md) |
| DOF・グレア・カラーグレーディングの典型ノード構成を知りたい | compositing | [references/compositing/README.md](references/compositing/README.md) |
| オブジェクトの位置・回転・スケール・行列を操作したい | scene-objects | [references/scene-objects/README.md](references/scene-objects/README.md) |
| コレクション階層・ビューレイヤー表示を Python で管理したい | scene-objects | [references/scene-objects/README.md](references/scene-objects/README.md) |
| カメラ・ライト・エンプティをスクリプトから作成・設定したい | scene-objects | [references/scene-objects/README.md](references/scene-objects/README.md) |
| データブロックのリンク・追記・孤立データ削除をしたい | scene-objects | [references/scene-objects/README.md](references/scene-objects/README.md) |
| 典型的な使い方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・CLI コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
