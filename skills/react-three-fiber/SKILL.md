---
name: react-three-fiber
description: >
  React Three Fiber (R3F, three.js 用 React レンダラー @react-three/fiber v9) のリファレンス。
  R3F Canvas props, createRoot, useFrame, useThree, useLoader, extend, attach, primitive, args,
  piercing, pointer イベント / pointer capture, frameloop demand / invalidate, ThreeElements 型,
  @react-three/test-renderer, @react-three/eslint-plugin, React Native (Expo), v9 移行。
user-invocable: false
---

# React Three Fiber (R3F)

対象バージョン: `@react-three/fiber` 9.8.2（GitHub tag `v9.8.2`、commit `d74622ea8ed717f7212d7e19d65ff3e325508389`、npm latest 9.8.2）。同梱: `@react-three/test-renderer` 9.1.1、`@react-three/eslint-plugin` 0.1.2。取得日 2026-10-17。

- tag 時点の `package.json` / CHANGELOG は 9.8.1 のまま。9.8.2 の変更は GitHub Release 本文にのみ記載
- 公式ドキュメントサイトのルートは tag と同一。サイトの `/next` は v10 alpha のため参照禁止（v10.0.0-alpha.5 / canary は未収録）
- three.js 本体のクラス API（geometry / material / loader / renderer）は threejs スキル、`@theatre/r3f` は theatrejs スキルの担当。`@react-three/drei` は別パッケージで未収録

## ディレクトリ構成

```text
skills/react-three-fiber/
  SKILL.md
  references/
    getting-started/
      README.md
      introduction.md
      installation.md
      how-it-works.md
      react-native.md
      v9-migration-guide.md
    canvas/
      README.md
      canvas.md
      create-root.md
      defaults.md
      errors-and-fallbacks.md
      renderers.md
      tree-shaking.md
      updating-configuration.md
      webgpu.md
    hooks/
      README.md
      root-state.md
      use-frame.md
      use-graph.md
      use-instance-handle.md
      use-loader.md
      use-three.md
    objects/
      README.md
      attach.md
      constructor-arguments.md
      declaring-objects.md
      disposal.md
      piercing-nested-properties.md
      primitive.md
      shader-material-uniforms.md
      shortcuts.md
      third-party-objects.md
    events/
      README.md
      customizing-events.md
      event-data.md
      event-handlers.md
      event-propagation.md
      event-target-and-prefix.md
      pointer-capture.md
      raycast-without-interaction.md
    exports/
      README.md
      act.md
      add-effect.md
      advance.md
      apply-props.md
      build-graph.md
      create-portal.md
      events.md
      extend.md
      flush-sync.md
      invalidate.md
      other-exports.md
    performance/
      README.md
      concurrency.md
      instancing.md
      level-of-detail.md
      movement-regression.md
      nested-loading.md
      on-demand-rendering.md
      performance-monitoring.md
      pitfalls-mounting-and-objects.md
      pitfalls-state-and-loops.md
      reusing-geometries-materials.md
    testing-tooling/
      README.md
      eslint-no-clone-in-loop.md
      eslint-no-new-in-loop.md
      eslint-plugin.md
      test-instance.md
      test-renderer-act.md
      test-renderer-create.md
      test-renderer-fire-event.md
      test-renderer-lifecycle.md
      test-renderer-scene-graph.md
      testing-overview.md
    typescript/
      README.md
      exported-types.md
      extend-types.md
      extending-default-elements.md
      three-elements.md
      typing-with-useref.md
  samples/
    README.md
    basic-animations.md
    basic-example.md
    events-and-interaction.md
    loading-gltf-models.md
    loading-obj-fbx-stl-models.md
    loading-progress.md
    loading-textures.md
    testing-with-test-renderer.md
    your-first-scene.md
  scripts/
    README.md
    install.md
    react-native.md
    tooling.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md` を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| R3F の概要・仕組み・v8 → v9 移行を知りたい | getting-started | [references/getting-started/README.md](references/getting-started/README.md) |
| Canvas の props、独自 root（createRoot）、WebGPU、レンダラー差し替えを設定したい | canvas | [references/canvas/README.md](references/canvas/README.md) |
| useFrame / useThree / useLoader / RootState を使いたい | hooks | [references/hooks/README.md](references/hooks/README.md) |
| three.js オブジェクトを JSX で宣言・attach・args・primitive・dispose したい | objects | [references/objects/README.md](references/objects/README.md) |
| pointer イベント、propagation、pointer capture、event target を扱いたい | events | [references/events/README.md](references/events/README.md) |
| extend / invalidate / advance / createPortal / applyProps などの export を調べたい | exports | [references/exports/README.md](references/exports/README.md) |
| on-demand rendering、instancing、LOD、pitfalls など性能を改善したい | performance | [references/performance/README.md](references/performance/README.md) |
| test-renderer でテストしたい、ESLint ルールを導入したい | testing-tooling | [references/testing-tooling/README.md](references/testing-tooling/README.md) |
| ThreeElements 型拡張、useRef の型付け、公開型を調べたい | typescript | [references/typescript/README.md](references/typescript/README.md) |
| 典型的な使い方（最初のシーン、アニメーション、モデル読み込み）を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・React Native・ツール導入コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
