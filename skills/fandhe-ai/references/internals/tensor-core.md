---
source: https://docs.rs/fandhe-ai-tensor-core/0.14.0/fandhe_ai_tensor_core/
---

# tensor-core

`fandhe-ai` の全バックエンド共通のテンソル表現・デバイス抽象・メモリ管理を提供する基盤クレート。

- crate 名: `fandhe-ai-tensor-core`（docs.rs `fandhe-ai-tensor-core/0.14.0`）
- `Tensor` 型（ストライドレイアウト・共有ストレージ）と、CPU/CUDA/Metal 各バックエンドが実装する `BackendOps` トレイトの定義元

## Signature / Usage

```rust
use fandhe_ai_tensor_core::{Tensor, Device, DType, BackendOps};

// 各バックエンドが BackendOps を実装し、Device 経由でディスパッチされる
let ops = fandhe_ai_tensor_core::device::ops_for(Device::Cpu);
```

## Options / Props

公開モジュール構成（0.3.0 の 6 モジュール、0.11.0 の 27 モジュールから、0.14.0 で 31 モジュールへ増えた。`lib.rs` の `pub mod`）:

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
| `adaptive_pool3d` / `fractional_max_pool` | 0.11.0 → 0.14.0 で追加。3D Adaptive プーリング（`adaptive_avg_pool3d` / `adaptive_max_pool3d`）と FractionalMaxPool2d / 3d の窓表・ホスト参照カーネル（`autodiff` と `backend-cpu` が共通に呼ぶ単一情報源。窓は乱数標本からホストで 1 回だけ整数配列へ確定し `BackendOps` へ渡す） |
| `paged_kv` | 0.11.0 → 0.14.0 で追加。デバイス常駐 KV の引数型（`PagedKvLayout` / `PagedAttentionArgs` / `PagedAttentionPlan`）と、3 バックエンド共通の検証関数（`validate_paged_kv_append` / `validate_paged_attention`）・上限定数 |
| `tolerance` | 0.11.0 → 0.14.0 で追加。統一複合判定の許容誤差定数（`RELATIVE_TOLERANCE` = 1e-3、`ABSOLUTE_RESCUE_THRESHOLD` = 1e-5）と判定関数 `composite_close_f32`。`backend-cpu::parity` と `autodiff::create_graph` が共有し、`backend-cpu::parity` は再エクスポートする |

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
- 0.3.0 時点の型・トレイト・モジュールは 28 items だったが 0.14.0 では大幅に増えている。本ページはアーキテクチャ粒度（モジュール/主要型単位）で構成しており、公式の「per-item 展開禁止」方針に従い個別メソッドの逐一列挙はしていない
- 0.11.0 から 0.14.0 にかけて `BackendOps` にデバイス常駐系（`paged_kv_append` / `paged_attention_forward`、`gemm_fp32_strict_into_device` / `gemm_resident_lhs_device`、`mse_loss_device` / `relu_backward_mask_device`、`*_tracked` 版）、グループ別 optimizer step（`sgd_step_device_grouped` など）、3D Adaptive プーリング・FractionalMaxPool の窓（`adaptive_pool3d_avg` / `adaptive_pool3d_max` / `fractional_max_pool{2,3}d_windows`）のメソッドが追加された。既定実装を持つものは `Unsupported` 系で、バックエンドが実装したものだけが有効になる
- Source: https://docs.rs/fandhe-ai-tensor-core/0.14.0/fandhe_ai_tensor_core/（0.14.0, 取得日 2026-11-14）
- kernel fusion 関連（`FusionPlan` / `FusedOpKind` / `Activation` / `MAX_FUSED_CHAIN_LEN`）は [tensor-core-fusion](./tensor-core-fusion.md) を参照

## Related

- [tensor-core-fusion](./tensor-core-fusion.md)
- [backend-cpu](./backend-cpu.md)
- [backend-cuda](./backend-cuda.md)
- [backend-metal](./backend-metal.md)
