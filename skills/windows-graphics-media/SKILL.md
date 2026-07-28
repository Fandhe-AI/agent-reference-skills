---
name: windows-graphics-media
description: >
  Windows アプリ開発 (DirectX / WinRT メディア) のグラフィックス・メディア API リファレンス。
  Direct2D (ID2D1Factory, ID2D1DeviceContext, ID2D1Bitmap1, ID2D1Effect, ID2D1PathGeometry),
  DirectWrite (IDWriteFactory, IDWriteTextLayout, DWriteCore), Direct3D 11/12
  (D3D11CreateDevice, DXGI SwapChain, HLSL, D3D12 PipelineState), Windows.UI.Composition
  (Compositor, Visual, ExpressionAnimation, InteractionTracker, MicaController),
  カメラ・画面キャプチャ (MediaCapture, MediaFrameReader, GraphicsCaptureSession,
  Windows Studio Effects)、音声・動画再生 (MediaPlayer, MediaPlaybackSession,
  AudioGraph, MediaTranscoder, AdaptiveMediaSource)。
user-invocable: false
---

# Windows グラフィックス・メディア リファレンス

Windows アプリの描画・合成・カメラ・音声動画再生に関する公式ドキュメントを蒸留したリファレンス。
Direct2D/DirectWrite によるベクター描画とテキストレイアウト、Direct3D 11/12 による低レベル GPU 描画、
Windows.UI.Composition による合成ビジュアル層、MediaCapture によるカメラ/画面キャプチャ、
Windows.Media.Playback 系による音声・動画再生を扱う。
ユーザーのタスクに応じて適切な README.md を読み、そこから個別ファイルへ辿ること。

## ディレクトリ構成

```text
skills/windows-graphics-media/
  SKILL.md
  references/
    direct2d-directwrite/
      README.md
      id2d1factory.md
      id2d1factory1.md
      id2d1device.md
      id2d1devicecontext.md
      id2d1rendertarget.md
      id2d1bitmap1.md
      id2d1solidcolorbrush.md
      id2d1lineargradientbrush.md
      id2d1geometry.md
      id2d1pathgeometry.md
      id2d1geometrysink.md
      id2d1strokestyle.md
      id2d1effect.md
      d2d1createfactory.md
      direct2d-direct3d-interop.md
      wic-interop.md
      idwritefactory.md
      idwritetextformat.md
      idwritetextlayout.md
      idwritefontcollection.md
      dwrite-text-metrics.md
      dwritecore.md
    direct3d-directx/
      README.md
      dxgi-factory-adapter.md
      dxgi-swap-chain.md
      d3d11-device-context.md
      d3d11-resources.md
      d3d11-shaders-drawing.md
      d3d12-overview.md
      hlsl-shader-compilation.md
      directx-xaml-composition.md
      directx-winui3-integration.md
    composition-visuals/
      README.md
      compositor.md
      visual.md
      container-visual.md
      sprite-visual.md
      element-composition-preview.md
      expression-animation.md
      implicit-animation-collection.md
      composition-effect-brush.md
      interaction-tracker.md
      visual-interaction-source.md
      composition-surface-brush.md
      loaded-image-surface.md
      mica-controller.md
      desktop-acrylic-controller.md
    camera-capture/
      README.md
      media-capture.md
      media-capture-initialization-settings.md
      camera-capture-ui.md
      low-lag-photo-capture.md
      low-lag-media-recording.md
      media-frame-reader.md
      media-frame-source-group.md
      device-enumeration.md
      video-device-controller.md
      camera-stream-state.md
      graphics-capture-item.md
      graphics-capture-picker.md
      direct3d11-capture-frame-pool.md
      graphics-capture-session.md
      camera-capabilities-privacy.md
      windows-studio-effects.md
    audio-video-playback/
      README.md
      media-player.md
      media-playback-session.md
      media-playback-command-manager.md
      system-media-transport-controls.md
      media-player-element.md
      media-transport-controls.md
      media-source.md
      media-playback-item.md
      media-playback-list.md
      media-binder.md
      adaptive-media-source.md
      media-timeline-controller.md
      timed-text-source.md
      timed-metadata-track.md
      media-composition.md
      media-clip.md
      media-transcoder.md
      audio-graph.md
      audio-file-input-node.md
      audio-device-output-node.md
      audio-frame-input-node.md
      media-capture-integration.md
      drm-playready.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| Direct2D でベクター図形・ブラシ・ジオメトリを描画したい | direct2d-directwrite | [references/direct2d-directwrite/README.md](references/direct2d-directwrite/README.md) |
| DirectWrite でテキストレイアウト・フォント計測を行いたい | direct2d-directwrite | [references/direct2d-directwrite/README.md](references/direct2d-directwrite/README.md) |
| Direct2D と Direct3D/WIC の相互運用をしたい | direct2d-directwrite | [references/direct2d-directwrite/README.md](references/direct2d-directwrite/README.md) |
| Direct3D 11/12 でデバイス初期化・シェーダー描画パイプラインを組みたい | direct3d-directx | [references/direct3d-directx/README.md](references/direct3d-directx/README.md) |
| DXGI SwapChain や HLSL シェーダーコンパイルを扱いたい | direct3d-directx | [references/direct3d-directx/README.md](references/direct3d-directx/README.md) |
| DirectX の描画結果を WinUI 3 の XAML 上に組み込みたい | direct3d-directx | [references/direct3d-directx/README.md](references/direct3d-directx/README.md) |
| Compositor / Visual でカスタム合成ビジュアルツリーを構築したい | composition-visuals | [references/composition-visuals/README.md](references/composition-visuals/README.md) |
| ExpressionAnimation / InteractionTracker で入力連動アニメーションを実装したい | composition-visuals | [references/composition-visuals/README.md](references/composition-visuals/README.md) |
| Mica / Acrylic のシステム背景素材を適用したい | composition-visuals | [references/composition-visuals/README.md](references/composition-visuals/README.md) |
| MediaCapture でカメラから写真・動画・音声をキャプチャしたい | camera-capture | [references/camera-capture/README.md](references/camera-capture/README.md) |
| フォーカス・露出・ズームなどカメラデバイスを制御したい | camera-capture | [references/camera-capture/README.md](references/camera-capture/README.md) |
| 画面キャプチャ (GraphicsCaptureSession) や Windows Studio Effects を使いたい | camera-capture | [references/camera-capture/README.md](references/camera-capture/README.md) |
| MediaPlayer / MediaPlayerElement で動画・音声を再生したい | audio-video-playback | [references/audio-video-playback/README.md](references/audio-video-playback/README.md) |
| AdaptiveMediaSource / DRM でストリーミング再生や保護コンテンツを扱いたい | audio-video-playback | [references/audio-video-playback/README.md](references/audio-video-playback/README.md) |
| AudioGraph / MediaTranscoder / MediaComposition で音声処理・動画編集をしたい | audio-video-playback | [references/audio-video-playback/README.md](references/audio-video-playback/README.md) |

このスキルは DirectX (Direct2D/DirectWrite/Direct3D)、Windows.UI.Composition、WinRT メディア (カメラキャプチャ・音声動画再生) の API のみを扱う。コントロール UI は windows-winui-controls、レイアウト・スタイリング等の一般 UI は windows-winui-ui、Windows App SDK 全体像は windows-app-sdk が担当する。
