---
name: amd-rocm
description: >
  AMD ROCm / HIP GPU コンピューティングリファレンス。
  hipMalloc, hipLaunchKernelGGL, HIP Graph, HIPRTC, hipify,
  rocBLAS, MIOpen, RCCL, rocprofv3, amd-smi, rocminfo,
  CDNA1-4 / RDNA1-4, MI300 / MI350, gfx942, Matrix Core, wave32/64。
user-invocable: false
---

# amd-rocm

AMD ROCm — Instinct/Radeon GPU 上で汎用並列計算を行うためのソフトウェアスタック。
HIP プログラミングモデル・ランタイム API によるカーネル記述、rocBLAS/MIOpen/RCCL 等のライブラリ、
CDNA/RDNA アーキテクチャ向けチューニングをカバーする。

## ディレクトリ構成

```text
skills/amd-rocm/
  SKILL.md
  references/
    rocm-stack/
      README.md
      what-is-rocm.md
      core-sdk-overview.md
      math-compute-libraries.md
      communication-libraries.md
      runtime-and-compilers.md
      profiling-debugging-tools.md
      control-monitoring-tools.md
      media-storage-libraries.md
      install-linux.md
      install-deep-learning-frameworks.md
      install-docker-spack.md
      install-windows.md
      compatibility-and-release-history.md
      ai-ecosystem.md
      gpu-systems-infra.md
      toolkits.md
    hip/
      README.md
      programming-model.md
      hardware-implementation.md
      compilers-clr.md
      performance-guidelines.md
      cpp-language-extensions.md
      kernel-language-cpp-support.md
      hiprtc.md
      debugging-logging.md
      runtime-api-overview.md
      initialization-version.md
      device-management.md
      error-handling.md
      stream-management.md
      event-management.md
      asynchronous-execution.md
      execution-control-launch.md
      occupancy.md
      module-context-management.md
      memory-management.md
      host-memory.md
      device-memory.md
      unified-memory.md
      virtual-memory.md
      stream-ordered-allocator.md
      texture-surface.md
      graph-management.md
      cooperative-groups.md
      multi-device-peer-to-peer.md
      interop.md
      porting-cuda-to-hip.md
      cuda-to-hip-api-comparison.md
      hipify.md
      math-api.md
      env-variables.md
      deprecated-apis.md
      hardware-features.md
    gpu-arch/
      README.md
      gpu-architecture-overview.md
      gpu-arch-specs.md
      cdna-architecture.md
      rdna-architecture.md
      performance-optimization-guides.md
      mi100-microarchitecture.md
      mi250-microarchitecture.md
      mi300-microarchitecture.md
      precision-support.md
      mi300-mi200-performance-counters.md
      mi350-performance-counters.md
      isa-documentation.md
      machine-readable-isa.md
  samples/
    README.md
    vector-add-kernel.md
    explicit-memory-transfer.md
    shared-memory-tiled-matmul.md
    dynamic-shared-memory.md
    unified-memory.md
    stream-ordered-allocation.md
    stream-overlap.md
    hip-graph-stream-capture.md
    hip-graph-explicit-nodes.md
    cooperative-groups-reduction.md
    warp-shuffle-reduction.md
    multi-gpu-peer-to-peer.md
    occupancy-tuning.md
    hipify-cuda-to-hip.md
    event-timing.md
    device-query.md
    hiprtc-runtime-compilation.md
    rocblas-gemm.md
  scripts/
    README.md
    install.md
    hipcc-build.md
    hipify.md
    gpu-query.md
    profiling.md
    debug.md
    sanitize.md
    frameworks.md
    validation.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. そのカテゴリの `references/{category}/README.md`（`samples/` `scripts/` は直下の README.md）を参照して目的のページを特定する
3. 該当ページの `.md` を Read して詳細を確認する

CUDA C++/Python によるカーネル記述・PTX ISA 命令セット・CUTLASS/CuTe による GEMM 実装は `nvidia-cuda` スキルを参照。
本スキルは HIP プログラミングモデル・ランタイム API・ROCm ライブラリ群・CDNA/RDNA アーキテクチャを担当する。
HIP は CUDA API と 1:1 に近い命名を持つため（`hipMalloc` ↔ `cudaMalloc` 等）、
`references/hip/cuda-to-hip-api-comparison.md` と `references/hip/porting-cuda-to-hip.md` に CUDA との対応・移行手順をまとめている。

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照 README |
|--------|---------|------------|
| ROCm スタック全体像・Core SDK と Extras の違い・TheRock ビルドシステムを知りたい | rocm-stack | [references/rocm-stack/README.md](references/rocm-stack/README.md) |
| rocBLAS/MIOpen/RCCL 等の数値計算・通信ライブラリ、プロファイリング/監視ツール（rocprofv3, amd-smi）を調べたい | rocm-stack | [references/rocm-stack/README.md](references/rocm-stack/README.md) |
| Linux/Windows へのインストール手順・PyTorch/TensorFlow/JAX 導入・GPU/OS 互換性を知りたい | rocm-stack | [references/rocm-stack/README.md](references/rocm-stack/README.md) |
| HIP プログラミングモデル・カーネル記述・C++ 言語拡張・HIPRTC ランタイムコンパイルを調べたい | hip | [references/hip/README.md](references/hip/README.md) |
| HIP ランタイム API（デバイス/ストリーム/イベント/メモリ管理、HIP Graph、Cooperative Groups）を調べたい | hip | [references/hip/README.md](references/hip/README.md) |
| CUDA から HIP への移植・hipify によるコード変換・CUDA↔HIP API 対応表を知りたい | hip | [references/hip/README.md](references/hip/README.md) |
| CDNA/RDNA アーキテクチャ設計・MI100/MI250/MI300 マイクロアーキテクチャ・ISA/性能カウンタを調べたい | gpu-arch | [references/gpu-arch/README.md](references/gpu-arch/README.md) |
| 典型的な使い方を知りたい（vector add, HIP Graph, rocBLAS GEMM, hipify 変換等） | samples | [samples/README.md](samples/README.md) |
| インストール・hipcc ビルド・rocminfo/amd-smi・rocprofv3 プロファイリング・rocgdb デバッグコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
