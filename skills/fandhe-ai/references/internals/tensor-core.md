# tensor-core

`fandhe-ai` の全バックエンド共通のテンソル表現・デバイス抽象・メモリ管理を提供する基盤クレート。

- crate 名: `fandhe-ai-tensor-core`（docs.rs `fandhe-ai-tensor-core/0.3.0`）
- `Tensor` 型（ストライドレイアウト・共有ストレージ）と、CPU/CUDA/Metal 各バックエンドが実装する `BackendOps` トレイトの定義元

## Signature / Usage

```rust
use fandhe_ai_tensor_core::{Tensor, Device, DType, BackendOps};

// 各バックエンドが BackendOps を実装し、Device 経由でディスパッチされる
let ops = fandhe_ai_tensor_core::device::ops_for(Device::Cpu);
```

## Options / Props

モジュール構成（6 モジュール）:

| Module | Description |
| --- | --- |
| `buffer` | デバイス常駐バッファとメモリ操作の抽象（`BufferHandle` / `MemoryOps`） |
| `device` | バックエンド抽象層。デバイス列挙・選択（`DeviceProvider`, `ops_for`, `enumerate_all`） |
| `dispatch` | GEMM カーネルのルーティング・選択規則（`select_gemm_kernel`, `GemmShape`） |
| `memory_stats` | アロケータ計測フック（`MemoryStats`, `AllocationTracker`） |
| `pool` | サイズクラス方式のバッファプーリング（`PoolConfig`, `PooledMemory`, `PoolZeroFill`） |
| `typed` | コンパイル時固定次元の API 層（`FixedVec`, `FixedMat`, `BatchedFeatures`） |

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
- 型・トレイト・モジュールは 28 items あるが、本ページはアーキテクチャ粒度（モジュール/主要型単位）で構成しており、公式の「per-item 展開禁止」方針に従い個別メソッドの逐一列挙はしていない
- kernel fusion 関連（`FusionPlan` / `FusedOpKind` / `Activation` / `MAX_FUSED_CHAIN_LEN`）は [tensor-core-fusion](./tensor-core-fusion.md) を参照

## Related

- [tensor-core-fusion](./tensor-core-fusion.md)
- [backend-cpu](./backend-cpu.md)
- [backend-cuda](./backend-cuda.md)
- [backend-metal](./backend-metal.md)
