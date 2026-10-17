---
source: https://docs.rs/fandhe-ai-backend-cuda/0.11.0/fandhe_ai_backend_cuda/
---

# backend-cuda

`tensor-core` の計算グラフノードを NVRTC 経由でコンパイルした CUDA カーネルとして実行するバックエンド。

- crate 名: `fandhe-ai-backend-cuda`（docs.rs `fandhe-ai-backend-cuda/0.11.0`）
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
| `graph` | 学習 step の update 区間の CUDA Graph capture（facade の `CudaGraphStepMode` / `set_cuda_graph_step_enabled` の実体。0.3.0 には無かった） |
| `precision` | GEMM 精度の設定（`CudaGemmPrecision`・TF32 opt-in。facade の `set_cuda_gemm_precision` / `set_cuda_tf32_gemm_enabled` の実体。0.3.0 には無かった） |
| `placement` | 0.3.0 には無かった公開モジュール |
| `fused_elementwise` / `fused_elementwise_model` | 融合 elementwise の実行とそのモデル（0.3.0 には無かった） |

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
| `CudaMmaTf32x3Gemm` / `ValidatedTf32x3Inputs` | struct | TF32x3 の `mma.sync` GEMM と検証済み入力（0.3.0 には無かった） |
| `CudaBce` / `CudaHuber` / `CudaKlDiv` / `CudaMse` / `CudaNll` / `CudaRnnCell` / `CudaReduce` / `CudaLayerNorm` / `CudaBatchNorm` / `CudaLogSoftmaxBackward` / `CudaNormBackward` | struct | 損失・正規化・RNN セル・縮約などのカーネル（0.11.0 で追加）。`CudaDevice` も再エクスポートされる |
| `pinned_h2d_enabled()` / `set_pinned_h2d_enabled()` | fn | pinned ホストメモリ経由の H2D 転送の opt-in（facade の `set_cuda_pinned_h2d_enabled` の実体） |
| `CudaError` | enum | 初期化・コンパイル失敗のエラー型 |
| `TileSelectionBasis` | enum | コストモデル方式とテーブル方式のタイル選択区別 |
| `compile_ptx()` | fn | 指定アーキテクチャ向け NVRTC コンパイル |
| `select_tile_config()` / `enumerate_tile_candidates()` | fn | GEMM タイル構成の静的選択・列挙 |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- CUDA C++ / PTX / CUTLASS のプログラミングモデル自体は nvidia-cuda スキルが担当。本ページは fandhe-ai の Rust バックエンド実装（`cudarc` 経由の呼び出し構造）のみを扱う
- `internal-diagnostics` feature でゲートされた項目（`diagnostics` モジュール・`gemm_variant_selection`・タイル／TMA／stream-K 系の診断型）は公開面に含めず記載しない
- カーネルキャッシュは process-in-memory LRU → ディスクキャッシュ → NVRTC 再コンパイルの順で解決する
- サイズ条件付きの swizzle（L2 再利用タイリング）は total tiles ≥2048 かつ M/N/K が測定済み閾値（M=N=K=4096 基準）を満たす場合のみ適用

## Related

- [tensor-core](./tensor-core.md)
- [backend-cpu](./backend-cpu.md)
- [backend-metal](./backend-metal.md)
