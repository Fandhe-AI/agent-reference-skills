---
name: nvidia-cuda
description: >
  NVIDIA CUDA GPU 並列コンピューティングリファレンス。
  CUDA C++ / CUDA Python, kernel, nvcc, Unified Memory, CUDA Graphs,
  Cooperative Groups, Driver API, マルチ GPU。
  PTX ISA 命令セット, state space, MMA 命令。
  Blackwell チューニング, Streaming Multiprocessor, NVLink。
  CUTLASS / CuTe DSL / CuTe C++ GEMM, Tensor Core, tcgen05,
  Operator API, nsight-compute, compute-sanitizer。
user-invocable: false
---

# nvidia-cuda

NVIDIA CUDA — GPU 上で汎用並列計算を行うためのプログラミングモデル・ツールチェーン・ライブラリ群。
CUDA C++/Python によるカーネル記述、PTX ISA 命令セット、Blackwell アーキテクチャ向けチューニング、
CUTLASS/CuTe による高性能 GEMM 実装をカバーする。

## ディレクトリ構成

```text
skills/nvidia-cuda/
  SKILL.md
  references/
    programming-model/
      README.md
      introduction.md
      programming-model.md
      cuda-platform.md
      intro-to-cuda-cpp.md
      intro-to-cuda-python.md
      writing-cuda-kernels.md
      writing-tile-kernels.md
      asynchronous-execution.md
      understanding-memory.md
      nvcc.md
    advanced/
      README.md
      core/
        README.md
        advanced-host-programming.md
        advanced-kernel-programming.md
        driver-api.md
        multi-gpu-systems.md
        feature-survey.md
      features/
        README.md
        unified-memory.md
        cuda-graphs.md
        stream-ordered-memory-allocation.md
        cooperative-groups.md
        programmatic-dependent-launch.md
        green-contexts.md
        lazy-loading.md
        error-log-management.md
        async-barriers.md
        pipelines.md
        async-copies.md
        cluster-launch-control.md
        l2-cache-control.md
        memory-sync-domains.md
        inter-process-communication.md
        virtual-memory-management.md
        extended-gpu-memory.md
        dynamic-parallelism.md
        graphics-interop.md
        driver-entry-point-access.md
      appendices/
        README.md
        compute-capabilities.md
        environment-variables.md
        cpp-language-support.md
        cpp-language-extensions.md
        mathematical-functions.md
        device-callable-apis.md
        cuda-cpp-memory-model.md
        cuda-cpp-execution-model.md
    ptx-isa/
      README.md
      introduction.md
      programming-model.md
      machine-model.md
      syntax.md
      state-spaces-types-variables.md
      instruction-operands.md
      abi.md
      memory-consistency-model.md
      instruction-set-overview.md
      instructions-arithmetic.md
      instructions-comparison-logic.md
      instructions-data-movement.md
      instructions-texture-surface.md
      instructions-control-flow.md
      instructions-sync-communication.md
      instructions-matrix-multiply.md
      instructions-video-misc.md
      special-registers.md
      directives.md
      pragma-strings.md
      release-notes.md
    blackwell-tuning/
      README.md
      architecture.md
      best-practices.md
      streaming-multiprocessor.md
      memory-system.md
      nvlink.md
    cutlass/
      README.md
      cute-dsl/
        README.md
        overview.md
        functionality.md
        quick-start.md
        cute-dsl.md
        dsl-introduction.md
        dsl-code-generation.md
        dsl-control-flow.md
        dsl-jit-arg-generation.md
        dsl-dynamic-layout.md
        dsl-struct-types.md
        dsl-jit-caching.md
        dsl-jit-compilation-options.md
        dsl-types.md
        framework-integration.md
        debugging.md
        iket-profiling.md
        autotuning-gemm.md
        compile-with-tvm-ffi.md
        dsl-ahead-of-time-compilation.md
        naming-conventions.md
        deprecation-policy.md
        mma-intro.md
        mma-wmma-programming.md
        mma-wgmma-programming.md
        mma-tcgen05-programming.md
        limitations.md
        faqs.md
        api-overview.md
        api-cute.md
        api-cute-arch.md
        api-cute-runtime.md
        api-cute-nvgpu.md
        api-cute-nvgpu-common.md
        api-cute-nvgpu-warp.md
        api-cute-nvgpu-warpgroup.md
        api-cute-nvgpu-cpasync.md
        api-cute-nvgpu-tcgen05.md
        api-pipeline.md
        api-utils.md
        api-utils-sm90.md
        api-utils-sm100.md
      operator-api/
        README.md
        overview.md
        tutorials.md
        tutorial-000-gemm.md
        tutorial-001-gemm-fused-epilogue.md
        tutorial-002-bring-your-own-kernel.md
        tutorial-003-host-latency-best-practices.md
        tutorial-004-fake-tensors.md
        tutorial-005-grouped-gemm-contiguous-offset.md
        tutorial-006-block-scaled-gemm.md
        api-reference.md
        api-operator.md
        api-arguments.md
        api-discovery.md
        api-metadata.md
        api-misc.md
      cpp/
        README.md
        overview.md
        getting-started.md
        quickstart.md
        ide-setup.md
        build.md
        build-windows-visual-studio.md
        build-clang-host-compiler.md
        functionality.md
        terminology.md
        fundamental-types.md
        programming-guidelines.md
        gemm-heuristics.md
        efficient-gemm.md
        pipeline.md
        profiler.md
        gemm-performance-measurement.md
        dependent-kernel-launch.md
        blackwell.md
        blackwell-sm100-gemm.md
        blackwell-cluster-launch-control.md
        code-organization.md
        cute.md
        cute-quickstart.md
        cute-layout.md
        cute-layout-algebra.md
        cute-tensor.md
        cute-algorithms.md
        cute-mma-atom.md
        cute-gemm-tutorial.md
        cute-predication.md
        cute-tma-tensors.md
        cutlass-3x.md
        cutlass-3x-design.md
        cutlass-3x-backwards-compatibility.md
        gemm-api-3x.md
        cutlass-2x.md
        layout-2x.md
        gemm-api-2x.md
        tile-iterator-concept.md
        utilities.md
        grouped-scheduler.md
        implicit-gemm-convolution.md
  samples/
    README.md
    async-copy-pipeline.md
    cooperative-groups-reduction.md
    cuda-graph-explicit-nodes.md
    cuda-graph-stream-capture.md
    cute-dsl-gemm.md
    cutlass-cpp-device-gemm.md
    cutlass-operator-api-gemm.md
    explicit-memory-transfer.md
    multi-gpu-peer-to-peer.md
    shared-memory-tiled-matmul.md
    stream-ordered-allocation.md
    stream-overlap.md
    tile-kernel-vector-add.md
    unified-memory.md
    vector-add-kernel.md
  scripts/
    README.md
    install.md
    nvcc-build.md
    binary-utilities.md
    sanitize.md
    debug.md
    nsight-systems.md
    nsight-compute.md
    gpu-query.md
    cutlass-build.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`advanced/` `cutlass/` はサブディレクトリの README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

GB10 Grace Blackwell 実機のハードウェア仕様・DGX OS・PXE/fleet 運用・playbook 起動手順は `dgx-spark` スキル、
リモート接続管理・VS Code 起動等のデスクトップアプリ操作は `nvidia-sync` スキルを参照。
本スキルは CUDA C++/Python の書き方・PTX 命令・CUTLASS API を担当する。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| CUDA とは何か・GPU 階層モデル・CUDA プラットフォームの全体像を知りたい | programming-model | [references/programming-model/README.md](references/programming-model/README.md) |
| CUDA C++/Python でカーネルを書く、nvcc でビルドする、非同期実行・ストリームを扱う | programming-model | [references/programming-model/README.md](references/programming-model/README.md) |
| advanced カテゴリ全体の構成（core / features / appendices）を確認したい | advanced | [references/advanced/README.md](references/advanced/README.md) |
| Driver API・マルチ GPU・advanced host/kernel programming を調べたい | advanced/core | [references/advanced/core/README.md](references/advanced/core/README.md) |
| CUDA Graphs / Cooperative Groups / Unified Memory / VMM / IPC 等の機能 API を調べたい | advanced/features | [references/advanced/features/README.md](references/advanced/features/README.md) |
| Compute Capability・環境変数・C++ 言語拡張・メモリ/実行モデルの技術付録を調べたい | advanced/appendices | [references/advanced/appendices/README.md](references/advanced/appendices/README.md) |
| PTX 命令セット・state space・レジスタ・memory consistency model を調べたい | ptx-isa | [references/ptx-isa/README.md](references/ptx-isa/README.md) |
| Blackwell アーキテクチャ・SM occupancy・NVLink・メモリシステムのチューニングを知りたい | blackwell-tuning | [references/blackwell-tuning/README.md](references/blackwell-tuning/README.md) |
| CUTLASS/CuTe 全体のカテゴリ構成（CuTe DSL / Operator API / C++）を確認したい | cutlass | [references/cutlass/README.md](references/cutlass/README.md) |
| CuTe DSL (Python) で GEMM・MMA・レイアウトを書きたい | cutlass/cute-dsl | [references/cutlass/cute-dsl/README.md](references/cutlass/cute-dsl/README.md) |
| CUTLASS Operator API（Python、コンパイル済みカーネル呼び出し）を使いたい | cutlass/operator-api | [references/cutlass/operator-api/README.md](references/cutlass/operator-api/README.md) |
| CUTLASS C++ / CuTe C++ でテンプレートベースの GEMM カーネルを実装したい | cutlass/cpp | [references/cutlass/cpp/README.md](references/cutlass/cpp/README.md) |
| 典型的な使い方を知りたい（vector add, tiled matmul, GEMM, CUDA Graphs 等） | samples | [samples/README.md](samples/README.md) |
| インストール・nvcc ビルド・nsight プロファイリング・compute-sanitizer コマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
