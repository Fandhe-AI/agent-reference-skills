---
name: apple-silicon
description: >
  Apple Silicon GPU コンピュート／数値計算リファレンス。MSL の kernel 関数属性・address space・
  atomic/SIMD-group 関数、threadgroup sizing・argument buffer・indirect command buffer・
  unified memory・GPU counters、MPS/MPSGraph（MPSMatrix, MPSNDArray, MPSNNGraph）、
  MLX（mx.array, lazy evaluation, grad/vmap, mx.compile, mlx.nn, mlx.optimizers, distributed）。
user-invocable: false
---

# apple-silicon

Apple Silicon 上の GPU コンピュートと数値計算スタック。Metal Shading Language (MSL) の言語仕様、
compute dispatch のエンコーディングと unified memory 最適化、MPS/MPSGraph による行列演算・ニューラルネットワーク推論、
Apple 研究チーム発の配列フレームワーク MLX をカバーする。

## ディレクトリ構成

```text
skills/apple-silicon/
  SKILL.md
  references/
    metal-compute/
      README.md
      compute-pass-encoding.md
      threadgroup-sizing.md
      compute-pipeline-configuration.md
      indirect-command-buffers.md
      indirect-compute-commands.md
      gpu-counters.md
      counter-sample-buffers.md
      argument-buffers.md
      unified-memory.md
    msl/
      README.md
      data-types.md
      address-spaces.md
      function-qualifiers.md
      argument-attributes.md
      atomic-functions.md
      simdgroup-functions.md
      math-functions.md
      numerical-compliance.md
    mps/
      README.md
      mpskernel.md
      mpsimage.md
      image-filters.md
      mpsmatrix.md
      matrix-arithmetic.md
      matrix-decomposition-solve.md
      mpsndarray.md
      mpsnngraph.md
      cnn-kernels.md
      mpsgraph.md
      mpsgraph-tensor.md
      mpsgraph-executable.md
      mpsgraph-operations.md
      ray-tracing.md
    mlx/
      README.md
      array.md
      lazy-evaluation.md
      unified-memory-model.md
      function-transforms.md
      compilation.md
      nn-module.md
      optimizers.md
      nn-layers.md
      nn-losses-activations.md
      indexing.md
      saving-loading.md
      random.md
      linalg.md
      devices-streams.md
      memory-management.md
      fast-custom-kernels.md
      distributed.md
      tree-utils.md
  samples/
    README.md
    compute-kernel-dispatch.md
    nonuniform-threadgroup-dispatch.md
    shared-storage-mode-buffer.md
    resource-group-argument-buffer.md
    cpu-encoded-indirect-compute.md
    blit-and-compute-single-pass.md
    mpsgraph-matrix-multiplication.md
    mpsgraph-training-loop.md
    mps-image-filter.md
    mlx-array-lazy-evaluation.md
    mlx-unified-memory.md
    mlx-mlp-training-loop.md
    mlx-function-transforms.md
  scripts/
    README.md
    toolchain-setup.md
    metal-compile.md
    metal-symbols.md
    metal-binary-archives.md
    metal-dynamic-libraries.md
    metal-debug-env.md
    metal-performance-hud.md
    mlx-install.md
    mlx-distributed.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`samples/` `scripts/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

Metal の**レンダリング**パイプライン（`MTLRenderCommandEncoder` / `MTLRenderPipelineState`）・Core Animation・
Core Graphics・Core Image・SpriteKit・SceneKit は `apple-graphics` を参照。本スキルは Metal の**コンピュート**
（`MTLComputeCommandEncoder` 以下）・MSL 言語仕様・MPS/MPSGraph・MLX を担当する。
Core ML / Create ML による `.mlmodel` のオンデバイス推論・Vision・Natural Language・Speech は `apple-ml` を参照。
MLX のみ出典が developer.apple.com ではなく、Apple 研究チームが公開する OSS ドキュメント
（ml-explore.github.io）である点に注意する。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| compute pass のエンコーディング・threadgroup/grid サイズ計算・compute pipeline 設定を知りたい | metal-compute | [references/metal-compute/README.md](references/metal-compute/README.md) |
| argument buffer・indirect command buffer・GPU counter・unified memory (storage mode) を調べたい | metal-compute | [references/metal-compute/README.md](references/metal-compute/README.md) |
| MSL のデータ型・address space・kernel 関数属性・引数バインディング属性を調べたい | msl | [references/msl/README.md](references/msl/README.md) |
| MSL の atomic 関数・SIMD-group/quad-group 関数・数学関数・数値精度 (IEEE 754) 準拠を調べたい | msl | [references/msl/README.md](references/msl/README.md) |
| MPSKernel/MPSImage/MPSMatrix/MPSNDArray による画像フィルタ・行列演算・分解を調べたい | mps | [references/mps/README.md](references/mps/README.md) |
| MPSGraph/MPSNNGraph によるグラフ構築・実行・CNN 推論・ray tracing を調べたい | mps | [references/mps/README.md](references/mps/README.md) |
| MLX の array/dtype・lazy evaluation・indexing・保存/読み込みを調べたい | mlx | [references/mlx/README.md](references/mlx/README.md) |
| MLX の grad/vmap 等の関数変換・mx.compile・unified memory model・distributed を調べたい | mlx | [references/mlx/README.md](references/mlx/README.md) |
| mlx.nn のレイヤー/損失関数・mlx.optimizers・tree utils を調べたい | mlx | [references/mlx/README.md](references/mlx/README.md) |
| 典型的な使い方を知りたい（compute kernel dispatch, argument buffer, MPSGraph 学習ループ, MLX 学習ループ等） | samples | [samples/README.md](samples/README.md) |
| Metal Toolchain セットアップ・`.metal` のコンパイル/リンク・デバッグ環境変数・MLX インストールを知りたい | scripts | [scripts/README.md](scripts/README.md) |
