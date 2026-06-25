---
name: apple-spatial
description: >
  visionOS / iOS 空間コンピューティングリファレンス。RealityKit、ARKit、visionOS SwiftUI API。
  Entity, ModelEntity, AnchorEntity, Component, RealityView, MeshResource, Material, System,
  ImmersiveSpace, ImmersionStyle, Model3D, WindowGroup, VolumetricWindowStyle,
  ARSession, ARWorldTrackingConfiguration, ARKitSession,
  WorldTrackingProvider, HandTrackingProvider, SceneReconstructionProvider。
user-invocable: false
---

## ディレクトリ構成

```text
skills/apple-spatial/
  SKILL.md
  references/
    realitykit/
      README.md
      entity.md
      modelentity.md
      anchorentity.md
      component.md
      componentset.md
      modelcomponent.md
      scene.md
      realityview.md
      meshresource.md
      material.md
      simplematerial.md
      physicallybasedmaterial.md
      transform.md
      system.md
      bodytrackingcomponent.md
      collisioncomponent.md
      physicsbodycomponent.md
    arkit/
      README.md
      arsession.md
      arconfiguration.md
      arworldtrackingconfiguration.md
      aranchor.md
      arframe.md
      arplaneanchor.md
      arscnview.md
      arraycastquery.md
      arcamera.md
      arkitsession.md
      worldtrackingprovider.md
      handtrackingprovider.md
      scenereconstructionprovider.md
      planedetectionprovider.md
      deviceanchor.md
    visionos/
      README.md
      immersivespace.md
      immersivespacecontent.md
      immersionstyle.md
      openimmersivespace.md
      dismissimmersivespace.md
      windowgroup.md
      volumetricwindowstyle.md
      realityview.md
      model3d.md
      ornament.md
      glassbackgroundeffect.md
      hovereffect.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Entity・ModelEntity・AnchorEntity の作成・操作 | realitykit | [references/realitykit/README.md](references/realitykit/README.md) |
| Component・System による ECS 設計 | realitykit | [references/realitykit/README.md](references/realitykit/README.md) |
| MeshResource・Material・マテリアル設定 | realitykit | [references/realitykit/README.md](references/realitykit/README.md) |
| 物理シミュレーション・コリジョン設定 | realitykit | [references/realitykit/README.md](references/realitykit/README.md) |
| iOS ARSession・ARWorldTrackingConfiguration の設定 | arkit | [references/arkit/README.md](references/arkit/README.md) |
| ARAnchor・ARPlaneAnchor・ARFrame の取得 | arkit | [references/arkit/README.md](references/arkit/README.md) |
| visionOS ARKitSession・WorldTrackingProvider の利用 | arkit | [references/arkit/README.md](references/arkit/README.md) |
| HandTrackingProvider・SceneReconstructionProvider | arkit | [references/arkit/README.md](references/arkit/README.md) |
| ImmersiveSpace・ImmersionStyle の構築 | visionos | [references/visionos/README.md](references/visionos/README.md) |
| WindowGroup・VolumetricWindowStyle による 3D ウィンドウ | visionos | [references/visionos/README.md](references/visionos/README.md) |
| Model3D・RealityView による 3D コンテンツ表示 | visionos | [references/visionos/README.md](references/visionos/README.md) |
| ornament・glassBackgroundEffect・hoverEffect の適用 | visionos | [references/visionos/README.md](references/visionos/README.md) |
