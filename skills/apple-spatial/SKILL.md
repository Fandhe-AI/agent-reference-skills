---
name: apple-spatial
description: >
  visionOS / iOS 空間コンピューティング。RealityKit、ARKit、visionOS SwiftUI、USDKit、Spatial Preview。
  Entity, ModelEntity, AnchorEntity, Component, System, RealityView, MeshResource, Material,
  EntityAction, MeshDeformerComponent, GaussianSplatComponent, ComputeGraphComponent,
  ComputeNodeGraph, PhysicsJointsComponent, ForceEffectComponent, ClothBodyComponent,
  NavigationComponent, NavigationMeshComponent, NavigationController,
  USDStage, SpatialPreviewSession, ImmersiveSpace, ImmersionStyle, WindowGroup,
  VolumetricWindowStyle, Model3D, ARKitSession, ARSession, ARWorldTrackingConfiguration,
  WorldTrackingProvider, HandTrackingProvider, ImageTrackingProvider, AccessoryTrackingProvider,
  CameraFrameProvider, ObjectTrackingProvider, RoomTrackingProvider, SceneReconstructionProvider。
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
      entityaction.md
      gaussiansplatcomponent.md
      computegraphcomponent.md
      computegraphresource.md
      computegraphshareduniforms.md
      computegraphoutputcomponent.md
      computegraphruntimecomponent.md
      computegraphviewpointcomponent.md
      gaussiansplatresource.md
      gaussiansplatevents.md
      mesh-deformation/
        README.md
        meshdeformercomponent.md
        meshdeformer.md
        meshdeformationstack.md
        meshdeformeroptions.md
        skinningdeformer.md
        blendshapedeformer.md
        renormalizingdeformer.md
        subdivisionsurfacedeformer.md
        boundingboxcalculator.md
        lowleveldeformation.md
      physics-advanced/
        README.md
        physicsjointscomponent.md
        forceeffectcomponent.md
        clothbodycomponent.md
      navigation/
        README.md
        navigationcomponent.md
        navigationmeshcomponent.md
        navigationcontroller.md
        navigationmeshresource.md
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
      dataprovider.md
      imagetrackingprovider.md
      accessorytrackingprovider.md
      cameraframeprovider.md
      barcodedetectionprovider.md
      environmentlightestimationprovider.md
      sharedcoordinatespaceprovider.md
      stereopropertiesprovider.md
      cameraregionprovider.md
      visualfidelityprovider.md
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
      object-tracking.md
      room-tracking.md
    compute-graph/
      README.md
      computenodegraph.md
      computenodegraph-library.md
      computenodegraph-pipelines.md
      computenodegraph-pipelinesdescriptor.md
      computegraphsimulation.md
      elementspawnparameters.md
      elementgrouping.md
      simulation-options.md
      simulation-stage-nodes.md
    usdkit/
      README.md
      usdstage.md
      usdprim.md
      usdlayer.md
      usdvalue.md
      usdtoken.md
      usdtransformoperation.md
      usdstagecomponent.md
      usdplayer.md
      usdrendererror.md
    spatial-preview/
      README.md
      overview.md
      spatialpreviewsession.md
      documentpreviewsession.md
      usdpreviewsession.md
      spatialpreviewendpoint.md
      spatialpreviewdevicepicker.md
      connectedspatialendpointobserver.md
      spatialpreviewsessionstate.md
```

対象: visionOS 27 / iOS 27 SDK（developer.apple.com JSON、取得日 2026-10-16）。

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Entity・ModelEntity・AnchorEntity の作成・操作 | realitykit | [references/realitykit/README.md](references/realitykit/README.md) |
| Component・System による ECS 設計、EntityAction | realitykit | [references/realitykit/README.md](references/realitykit/README.md) |
| MeshResource・Material・マテリアル設定、GaussianSplatComponent | realitykit | [references/realitykit/README.md](references/realitykit/README.md) |
| ComputeGraphComponent によるパーティクルシミュレーション | realitykit / compute-graph | [references/realitykit/README.md](references/realitykit/README.md)、[references/compute-graph/README.md](references/compute-graph/README.md) |
| ComputeNodeGraph によるノードグラフ定義、ComputeGraphSimulation によるシミュレーション実行 | compute-graph | [references/compute-graph/README.md](references/compute-graph/README.md) |
| GaussianSplatResource・GaussianSplatEvents（描画スロットリング） | realitykit | [references/realitykit/README.md](references/realitykit/README.md) |
| メッシュ変形（MeshDeformerComponent / SkinningDeformer / BlendShapeDeformer / SubdivisionSurfaceDeformer / LowLevelDeformation） | realitykit/mesh-deformation | [references/realitykit/mesh-deformation/README.md](references/realitykit/mesh-deformation/README.md) |
| USDStage・USDPrim・USDLayer による USD の作成・編集、USDStageComponent・USDPlayer による描画 | usdkit | [references/usdkit/README.md](references/usdkit/README.md) |
| Mac アプリから visionOS 実機へのプレビュー（SpatialPreviewSession / USDPreviewSession / DocumentPreviewSession） | spatial-preview | [references/spatial-preview/README.md](references/spatial-preview/README.md) |
| 物理シミュレーション・コリジョン設定 | realitykit | [references/realitykit/README.md](references/realitykit/README.md) |
| PhysicsJointsComponent・ForceEffectComponent・ClothBodyComponent による高度な物理 | realitykit/physics-advanced | [references/realitykit/physics-advanced/README.md](references/realitykit/physics-advanced/README.md) |
| NavigationComponent・NavigationMeshComponent によるパスファインディング | realitykit/navigation | [references/realitykit/navigation/README.md](references/realitykit/navigation/README.md) |
| iOS ARSession・ARWorldTrackingConfiguration の設定 | arkit | [references/arkit/README.md](references/arkit/README.md) |
| ARAnchor・ARPlaneAnchor・ARFrame の取得 | arkit | [references/arkit/README.md](references/arkit/README.md) |
| visionOS ARKitSession・WorldTrackingProvider の利用 | arkit | [references/arkit/README.md](references/arkit/README.md) |
| HandTrackingProvider・SceneReconstructionProvider | arkit | [references/arkit/README.md](references/arkit/README.md) |
| ImageTrackingProvider・AccessoryTrackingProvider・CameraFrameProvider・BarcodeDetectionProvider の利用 | arkit | [references/arkit/README.md](references/arkit/README.md) |
| EnvironmentLightEstimationProvider・SharedCoordinateSpaceProvider・StereoPropertiesProvider・CameraRegionProvider（enterprise）・VisualFidelityProvider | arkit | [references/arkit/README.md](references/arkit/README.md) |
| ImmersiveSpace・ImmersionStyle の構築 | visionos | [references/visionos/README.md](references/visionos/README.md) |
| WindowGroup・VolumetricWindowStyle による 3D ウィンドウ | visionos | [references/visionos/README.md](references/visionos/README.md) |
| Model3D・RealityView による 3D コンテンツ表示 | visionos | [references/visionos/README.md](references/visionos/README.md) |
| ornament・glassBackgroundEffect・hoverEffect の適用 | visionos | [references/visionos/README.md](references/visionos/README.md) |
| ObjectTrackingProvider・RoomTrackingProvider による物体・部屋認識 | visionos | [references/visionos/README.md](references/visionos/README.md) |
