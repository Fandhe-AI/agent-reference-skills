---
source: https://docs.rs/fandhe-ai-backend-cpu/0.11.0/fandhe_ai_backend_cpu/
---

# backend-cpu

`tensor-core` の計算グラフノードを CPU カーネルへ変換して実行するバックエンド。Rayon による並列化を利用する。

- crate 名: `fandhe-ai-backend-cpu`（docs.rs `fandhe-ai-backend-cpu/0.11.0`）

## Signature / Usage

```rust
use fandhe_ai_backend_cpu::CpuBackendOps;
use fandhe_ai_tensor_core::BackendOps;

let ops: &dyn BackendOps = &CpuBackendOps;
```

## Options / Props

モジュール構成:

| Module | Description |
| --- | --- |
| `gemm` | naive / blocked / parallel の 3 種の GEMM 実装 |
| `gemm_blis` | BLIS/GotoBLAS2 5-loop モデル。実行時 CPU 機能検出（NEON/AVX2/AVX-512） |
| `gemm_blis_bias_act` | bias 加算・活性化関数を融合した epilogue 付き GEMM |
| `fused_elementwise` | レジスタベースの単一パス elementwise 演算チェーン実行 |
| `memory` | CPU メモリ操作（確保・アップロード/ダウンロード・統計） |
| `reduction` | sum / max / mean の軸指定 reduction 演算 |
| `rmsnorm` | NEON + Rayon 並列化による融合 RMSNorm forward |
| `softmax` | NEON + Rayon 並列化による融合 softmax forward（0.11.0 で `run_log_softmax_f32` も再エクスポート） |
| `layer_norm` | LayerNorm forward（`LayerNormError` / `run_layer_norm_f32`。0.3.0 には無かった公開モジュール） |
| `linalg` | 線形代数（`LinalgError`。0.3.0 には無かった公開モジュール） |
| `parity` | バックエンド間の数値精度検証ユーティリティ |

0.11.0 のクレートルートには、このほか `BatchNormError` / `run_batch_norm_infer_f32` / `run_batch_norm_train_f32`、診断用のレポート型（`Gb10AffinityReport` / `SmallShapeCapReport` / `SmeReport` / `ThreadLimitReport` と対応する `*_report` 関数）が再エクスポートされている。`batch_norm` / `pooling` / `rnn_cell` / `sort_topk` / `unique` / `gather_scatter` などの実装モジュールは非公開。

主要な型:

| Name | Kind | Description |
| --- | --- | --- |
| `CpuBackendOps` | struct | `BackendOps` のゼロサイズ実装 |
| `CpuDeviceProvider` | struct | `std::thread::available_parallelism` 経由で論理コア数を公開するデバイスプロバイダ |
| `CpuMemory` | struct | `Arc<AllocationTracker>` を使うメモリ操作トラッカー |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- CUDA/Metal との数値一致は複合許容誤差（相対誤差 <1e-3 または絶対誤差 <1e-5）で検証される（`parity` モジュール）
- 境界チェックは最適化のための省略対象にしない方針（すべての実装で FMA ベースの GPU 互換演算を維持）

## Related

- [tensor-core](./tensor-core.md)
- [backend-cuda](./backend-cuda.md)
- [backend-metal](./backend-metal.md)
