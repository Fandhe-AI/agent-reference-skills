---
name: threejs
description: >
  Three.js (WebGL / WebGPU ベース 3D グラフィクスライブラリ) リファレンス。
  Scene, PerspectiveCamera, OrthographicCamera, WebGLRenderer, WebGPURenderer、
  BufferGeometry, BufferAttribute, Mesh, Group, InstancedMesh, SkinnedMesh、
  MeshStandardMaterial, MeshPhysicalMaterial, ShaderMaterial, node-materials (TSL)、
  DirectionalLight, PointLight, SpotLight, AmbientLight、
  TextureLoader, GLTFLoader, DRACOLoader, FBXLoader、
  AnimationMixer, AnimationClip, AnimationAction, KeyframeTrack、
  Vector3, Matrix4, Quaternion, Euler, Color, Raycaster, Box3、
  OrbitControls, TransformControls, WebXRManager。
user-invocable: false
---

# Three.js API リファレンス

Three.js — ブラウザ上で WebGL / WebGPU を活用する 3D グラフィクスライブラリ。
3D シーン構築・モデル読み込み・アニメーション・シェーダー実装時に参照する。

## ディレクトリ構成

```text
skills/threejs/
  SKILL.md
  references/
    getting-started/
      README.md
      installation.md
      creating-a-scene.md
      webgl-compatibility-check.md
      drawing-lines.md
      creating-text.md
      loading-3d-models.md
      libraries-and-plugins.md
      faq.md
      useful-links.md
    core/
      README.md
      BufferAttribute.md
      BufferGeometry.md
      Clock.md
      EventDispatcher.md
      GLBufferAttribute.md
      InstancedBufferAttribute.md
      InstancedBufferGeometry.md
      InstancedInterleavedBuffer.md
      InterleavedBuffer.md
      InterleavedBufferAttribute.md
      Layers.md
      Object3D.md
      Raycaster.md
      RenderTarget.md
      RenderTarget3D.md
      Timer.md
      TypedBufferAttributes.md
      Uniform.md
      UniformsGroup.md
    scenes/
      README.md
      Scene.md
      Fog.md
      FogExp2.md
    cameras/
      README.md
      Camera.md
      PerspectiveCamera.md
      OrthographicCamera.md
      ArrayCamera.md
      CubeCamera.md
      StereoCamera.md
    geometries/
      README.md
      BoxGeometry.md
      CapsuleGeometry.md
      CircleGeometry.md
      ConeGeometry.md
      CylinderGeometry.md
      DodecahedronGeometry.md
      EdgesGeometry.md
      ExtrudeGeometry.md
      IcosahedronGeometry.md
      LatheGeometry.md
      OctahedronGeometry.md
      PlaneGeometry.md
      PolyhedronGeometry.md
      RingGeometry.md
      ShapeGeometry.md
      SphereGeometry.md
      TetrahedronGeometry.md
      TorusGeometry.md
      TorusKnotGeometry.md
      TubeGeometry.md
      WireframeGeometry.md
    materials/
      README.md
      material.md
      mesh-basic-material.md
      mesh-depth-material.md
      mesh-distance-material.md
      mesh-lambert-material.md
      mesh-matcap-material.md
      mesh-normal-material.md
      mesh-phong-material.md
      mesh-physical-material.md
      mesh-standard-material.md
      mesh-toon-material.md
      line-basic-material.md
      line-dashed-material.md
      points-material.md
      shader-material.md
      raw-shader-material.md
      shadow-material.md
      sprite-material.md
      node-materials.md
    lights/
      README.md
      Light.md
      AmbientLight.md
      AmbientLightProbe.md
      DirectionalLight.md
      HemisphereLight.md
      HemisphereLightProbe.md
      LightProbe.md
      PointLight.md
      RectAreaLight.md
      SpotLight.md
    helpers/
      README.md
      ArrowHelper.md
      AxesHelper.md
      BoxHelper.md
      Box3Helper.md
      CameraHelper.md
      DirectionalLightHelper.md
      GridHelper.md
      HemisphereLightHelper.md
      PlaneHelper.md
      PointLightHelper.md
      PolarGridHelper.md
      SkeletonHelper.md
      SpotLightHelper.md
    objects/
      README.md
      BatchedMesh.md
      Bone.md
      ClippingGroup.md
      Group.md
      InstancedMesh.md
      LOD.md
      Line.md
      LineLoop.md
      LineSegments.md
      Mesh.md
      Points.md
      Skeleton.md
      SkinnedMesh.md
      Sprite.md
    textures/
      README.md
      Texture.md
      CanvasTexture.md
      CompressedTexture.md
      CompressedArrayTexture.md
      CompressedCubeTexture.md
      CubeTexture.md
      CubeDepthTexture.md
      Data3DTexture.md
      DataArrayTexture.md
      DataTexture.md
      DepthTexture.md
      ExternalTexture.md
      FramebufferTexture.md
      HTMLTexture.md
      Source.md
      VideoTexture.md
      VideoFrameTexture.md
    loaders/
      README.md
      Loader.md
      LoadingManager.md
      AnimationLoader.md
      AudioLoader.md
      BufferGeometryLoader.md
      Cache.md
      CompressedTextureLoader.md
      CubeTextureLoader.md
      DataTextureLoader.md
      FileLoader.md
      ImageBitmapLoader.md
      ImageLoader.md
      MaterialLoader.md
      ObjectLoader.md
      TextureLoader.md
    loaders-addons/
      README.md
      GLTFLoader.md
      DRACOLoader.md
      FBXLoader.md
      OBJLoader.md
      MTLLoader.md
      FontLoader.md
      SVGLoader.md
      EXRLoader.md
      HDRLoader.md
      KTX2Loader.md
      STLLoader.md
    animation/
      README.md
      AnimationAction.md
      AnimationClip.md
      AnimationMixer.md
      AnimationObjectGroup.md
      AnimationUtils.md
      KeyframeTrack.md
      PropertyBinding.md
      PropertyMixer.md
      tracks/
        README.md
        BooleanKeyframeTrack.md
        ColorKeyframeTrack.md
        NumberKeyframeTrack.md
        QuaternionKeyframeTrack.md
        StringKeyframeTrack.md
        VectorKeyframeTrack.md
    math/
      README.md
      Box2.md
      Box3.md
      Color.md
      Cylindrical.md
      Euler.md
      Frustum.md
      Interpolant.md
      Line3.md
      MathUtils.md
      Matrix2.md
      Matrix3.md
      Matrix4.md
      Plane.md
      Quaternion.md
      Ray.md
      Sphere.md
      Spherical.md
      SphericalHarmonics3.md
      Triangle.md
      Vector2.md
      Vector3.md
      Vector4.md
    renderers/
      README.md
      WebGLRenderer.md
      WebGLRenderTarget.md
      WebGLCubeRenderTarget.md
      WebGL3DRenderTarget.md
      WebGLArrayRenderTarget.md
      WebGPURenderer.md
      WebXRManager.md
      WebXRDepthSensing.md
    controls/
      README.md
      OrbitControls.md
      ArcballControls.md
      DragControls.md
      FirstPersonControls.md
      FlyControls.md
      MapControls.md
      PointerLockControls.md
      TrackballControls.md
      TransformControls.md
  samples/
    README.md
    basic-scene-setup.md
    load-gltf-model.md
    animating-with-animationmixer.md
    custom-buffer-geometry.md
    pbr-material-with-lights.md
    raycasting-mouse-interaction.md
    instanced-mesh.md
    post-processing-effect-composer.md
  scripts/
    README.md
    install.md
    vite-setup.md
    imports.md
    dev-server.md
    version.md
    draco.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| プロジェクト初期設定、最初のシーン作成、インストール方法を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| WebGL 互換確認、モデル読み込みの基礎、テキスト表示方法を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| BufferGeometry / BufferAttribute の構築方法を知りたい | core | [references/core/README.md](references/core/README.md) |
| Object3D の階層操作、Raycaster でのマウスピッキング、Clock でのデルタ管理を知りたい | core | [references/core/README.md](references/core/README.md) |
| シェーダーの Uniform / UniformsGroup 設定を知りたい | core | [references/core/README.md](references/core/README.md) |
| Scene にオブジェクト・ライト・霧を追加したい | scenes | [references/scenes/README.md](references/scenes/README.md) |
| Fog / FogExp2 で遠景をぼかしたい | scenes | [references/scenes/README.md](references/scenes/README.md) |
| PerspectiveCamera / OrthographicCamera を設定したい | cameras | [references/cameras/README.md](references/cameras/README.md) |
| CubeCamera でリアルタイム反射マップを作りたい | cameras | [references/cameras/README.md](references/cameras/README.md) |
| BoxGeometry / SphereGeometry 等の組み込みジオメトリを使いたい | geometries | [references/geometries/README.md](references/geometries/README.md) |
| ExtrudeGeometry / LatheGeometry でカスタム形状を作りたい | geometries | [references/geometries/README.md](references/geometries/README.md) |
| MeshStandardMaterial / MeshPhysicalMaterial で PBR マテリアルを設定したい | materials | [references/materials/README.md](references/materials/README.md) |
| ShaderMaterial / RawShaderMaterial でカスタム GLSL を書きたい | materials | [references/materials/README.md](references/materials/README.md) |
| WebGPU / TSL ノードマテリアルを使いたい | materials | [references/materials/README.md](references/materials/README.md) |
| DirectionalLight / PointLight / SpotLight でシーンを照らしたい | lights | [references/lights/README.md](references/lights/README.md) |
| AmbientLight や LightProbe で間接光を設定したい | lights | [references/lights/README.md](references/lights/README.md) |
| AxesHelper / GridHelper / CameraHelper でデバッグ補助を表示したい | helpers | [references/helpers/README.md](references/helpers/README.md) |
| SkeletonHelper / DirectionalLightHelper でアニメーションやライトを可視化したい | helpers | [references/helpers/README.md](references/helpers/README.md) |
| Mesh / Group / Sprite を配置・操作したい | objects | [references/objects/README.md](references/objects/README.md) |
| InstancedMesh で多数オブジェクトを1ドローコールで描画したい | objects | [references/objects/README.md](references/objects/README.md) |
| SkinnedMesh / Skeleton でスケルタルアニメーションを扱いたい | objects | [references/objects/README.md](references/objects/README.md) |
| Texture / CubeTexture / VideoTexture を設定したい | textures | [references/textures/README.md](references/textures/README.md) |
| DataTexture / DepthTexture でオフスクリーン処理をしたい | textures | [references/textures/README.md](references/textures/README.md) |
| TextureLoader / LoadingManager で読み込み進捗を管理したい | loaders | [references/loaders/README.md](references/loaders/README.md) |
| FileLoader / ObjectLoader / MaterialLoader を使いたい | loaders | [references/loaders/README.md](references/loaders/README.md) |
| GLTFLoader で .gltf / .glb モデルを読み込みたい | loaders-addons | [references/loaders-addons/README.md](references/loaders-addons/README.md) |
| DRACOLoader / KTX2Loader で圧縮アセットを扱いたい | loaders-addons | [references/loaders-addons/README.md](references/loaders-addons/README.md) |
| FBXLoader / OBJLoader / STLLoader で他形式モデルを読み込みたい | loaders-addons | [references/loaders-addons/README.md](references/loaders-addons/README.md) |
| AnimationMixer でアニメーションクリップを再生・フェード・クロスフェードしたい | animation | [references/animation/README.md](references/animation/README.md) |
| AnimationClip / KeyframeTrack でアニメーションを手動作成したい | animation | [references/animation/README.md](references/animation/README.md) |
| Vector3 / Matrix4 / Quaternion / Euler で座標変換を行いたい | math | [references/math/README.md](references/math/README.md) |
| Color / Box3 / Sphere / Frustum を使いたい | math | [references/math/README.md](references/math/README.md) |
| WebGLRenderer / WebGPURenderer を初期化・設定したい | renderers | [references/renderers/README.md](references/renderers/README.md) |
| WebGLRenderTarget でオフスクリーンレンダリング・ポストプロセスをしたい | renderers | [references/renderers/README.md](references/renderers/README.md) |
| WebXRManager で VR / AR セッションを管理したい | renderers | [references/renderers/README.md](references/renderers/README.md) |
| OrbitControls / TrackballControls でカメラを操作したい | controls | [references/controls/README.md](references/controls/README.md) |
| TransformControls / DragControls でオブジェクトをインタラクティブに操作したい | controls | [references/controls/README.md](references/controls/README.md) |
| 典型的な使い方・実装パターンを確認したい | samples | [samples/README.md](samples/README.md) |
| インストール・Vite セットアップ・import パターン・Draco 設定を知りたい | scripts | [scripts/README.md](scripts/README.md) |
