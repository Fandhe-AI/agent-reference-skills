---
source: https://docs.rs/fandhe-ai-tensor-core/0.11.0/fandhe_ai_tensor_core/
---

# tensor-core

`fandhe-ai` の全バックエンド共通のテンソル表現・デバイス抽象・メモリ管理を提供する基盤クレート。

- crate 名: `fandhe-ai-tensor-core`（docs.rs `fandhe-ai-tensor-core/0.11.0`）
- `Tensor` 型（ストライドレイアウト・共有ストレージ）と、CPU/CUDA/Metal 各バックエンドが実装する `BackendOps` トレイトの定義元

## Signature / Usage

```rust
use fandhe_ai_tensor_core::{Tensor, Device, DType, BackendOps};

// 各バックエンドが BackendOps を実装し、Device 経由でディスパッチされる
let ops = fandhe_ai_tensor_core::device::ops_for(Device::Cpu);
```

## Options / Props

公開モジュール構成（0.3.0 の 6 モジュールから 27 モジュールへ増えた。`lib.rs` の `pub mod`）:

| Module | Description |
| --- | --- |
| `buffer` | デバイス常駐バッファとメモリ操作の抽象（`BufferHandle` / `MemoryOps`。0.11.0 で `DeviceBuffer` / `DeviceBufferView` が再エクスポートされる） |
| `device` | バックエンド抽象層。デバイス列挙・選択（`DeviceProvider`, `ops_for`, `enumerate_all`） |
| `dispatch` | GEMM カーネルのルーティング・選択規則（`select_gemm_kernel`, `GemmShape`） |
| `memory_stats` | アロケータ計測フック（`MemoryStats`, `AllocationTracker`） |
| `pool` | サイズクラス方式のバッファプーリング（`PoolConfig`, `PooledMemory`, `PoolZeroFill`） |
| `pool_core` | プール統計（`PoolStats`。facade の `memory_pool_stats` が返す型） |
| `typed` | コンパイル時固定次元の API 層（`FixedVec`, `FixedMat`, `BatchedFeatures`） |
| `alloc` | ホスト arena によるバッファ回収（opt-in。`Gradients` の drop 時などに使われる） |
| `cast` | dtype 変換（`CastDType` / `CastElement` / `cast_from_f32` / `cast_to_f32`。`Tensor::cast` / `to_f32` の実体） |
| `creation` | テンソル生成（`arange` / `linspace` / `eye` / `zeros_like` / `ones_like` / `CreationError`） |
| `rng` | グローバル RNG・`Generator`・`RngError`（`manual_seed` / `randn` などの実体） |
| `data` | Dataset / DataLoader 系（facade の `data` モジュールの実体） |
| `io` | npy / npz の読み書き（`NpyError`。facade の `interop::npy` の実体） |
| `binning` / `cumulative` / `fft` / `fold` / `indexed_update` / `interpolate` / `lrn` / `max_unpool` / `pad_modes` / `pool3d` / `conv_transpose3d` / `scalar_op` / `stat_reduce` / `weight_reparam` | 0.3.0 以降に追加された演算群のカーネル側の型・実体（`autodiff` の `*_ops.rs` から呼ばれる）。`scalar_op` は `ScalarBinaryOp` / `ScalarUnaryOp` |

主要トレイト・型:

| Name | Kind | Description |
| --- | --- | --- |
| `BackendOps` | trait | CPU/CUDA/Metal 各バックエンドが実装するカーネルエントリポイント |
| `Element` | trait | テンソル要素型の最小抽象 |
| `Tensor` | struct | ストライドレイアウト・共有ストレージを持つコアテンソル型 |
| `Device` | enum | `Cpu` / `Cuda` / `Metal` |
| `DType` | enum | 要素型（現状 F32 が主） |
| `ShapeError` / `BackendError` | enum | 形状不一致・バックエンドエラー |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- 0.3.0 時点の型・トレイト・モジュールは 28 items だったが 0.11.0 では大幅に増えている。本ページはアーキテクチャ粒度（モジュール/主要型単位）で構成しており、公式の「per-item 展開禁止」方針に従い個別メソッドの逐一列挙はしていない
- kernel fusion 関連（`FusionPlan` / `FusedOpKind` / `Activation` / `MAX_FUSED_CHAIN_LEN`）は [tensor-core-fusion](./tensor-core-fusion.md) を参照

## Related

- [tensor-core-fusion](./tensor-core-fusion.md)
- [backend-cpu](./backend-cpu.md)
- [backend-cuda](./backend-cuda.md)
- [backend-metal](./backend-metal.md)
