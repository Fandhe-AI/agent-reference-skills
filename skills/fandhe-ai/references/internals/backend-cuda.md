---
source: https://docs.rs/fandhe-ai-backend-cuda/0.3.0/fandhe_ai_backend_cuda/
---

# backend-cuda

`tensor-core` の計算グラフノードを NVRTC 経由でコンパイルした CUDA カーネルとして実行するバックエンド。

- crate 名: `fandhe-ai-backend-cuda`（docs.rs `fandhe-ai-backend-cuda/0.3.0`）
- `cudarc` を dynamic-loading 方式の無条件依存として使用し、CUDA toolkit 未インストール環境でもビルドが通る（実行時のみ toolkit を要求）

## Signature / Usage

```rust
use fandhe_ai_backend_cuda::CudaBackendOps;
use fandhe_ai_tensor_core::BackendOps;

// is_culib_present() のプローブでガードされ、toolkit 不在時は CudaError を返す（panic しない）
let ops: &dyn BackendOps = &CudaBackendOps;
```

## Options / Props

モジュール構成:

| Module | Description |
| --- | --- |
| `device` | CUDA デバイス初期化・メタデータ取得（`DeviceProvider` 実装） |
| `memory` | `MemoryOps` トレイトを実装するメモリ操作 |

主要な型・関数:

| Name | Kind | Description |
| --- | --- | --- |
| `CudaBackendOps` | struct | `BackendOps` のコア実装 |
| `CudaGemm` | struct | naive/tiled GEMM カーネル（f32/f16） |
| `CudaGemmAuto` | struct | naive/tiled/WMMA 経路を自動選択 |
| `CudaWmmaGemm` | struct | WMMA C++ API 経由の f16 Tensor Core GEMM |
| `CudaMmaGemm` | struct | `mma.sync`/`ldmatrix`/`cp.async` PTX を用いた f16 GEMM |
| `CudaMmaTf32Gemm` | struct | `mma.sync`（m16n8k8）による TF32 版 |
| `CudaElementwise` | struct | add/mul/relu/exp/tanh の 5 elementwise カーネル |
| `CudaRmsNorm` | struct | 1-pass/2-pass ルーティングを持つ融合 RMSNorm |
| `CudaSoftmax` | struct | FlashAttention-2 方式の online softmax |
| `CudaTranspose` | struct | naive / shared-memory transpose |
| `CudaError` | enum | 初期化・コンパイル失敗のエラー型 |
| `TileSelectionBasis` | enum | コストモデル方式とテーブル方式のタイル選択区別 |
| `compile_ptx()` | fn | 指定アーキテクチャ向け NVRTC コンパイル |
| `select_tile_config()` / `enumerate_tile_candidates()` | fn | GEMM タイル構成の静的選択・列挙 |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- CUDA C++ / PTX / CUTLASS のプログラミングモデル自体は nvidia-cuda スキルが担当。本ページは fandhe-ai の Rust バックエンド実装（`cudarc` 経由の呼び出し構造）のみを扱う
- カーネルキャッシュは process-in-memory LRU → ディスクキャッシュ → NVRTC 再コンパイルの順で解決する
- サイズ条件付きの swizzle（L2 再利用タイリング）は total tiles ≥2048 かつ M/N/K が測定済み閾値（M=N=K=4096 基準）を満たす場合のみ適用

## Related

- [tensor-core](./tensor-core.md)
- [backend-cpu](./backend-cpu.md)
- [backend-metal](./backend-metal.md)
