# backend-cpu

`tensor-core` の計算グラフノードを CPU カーネルへ変換して実行するバックエンド。Rayon による並列化を利用する。

- crate 名: `fandhe-ai-backend-cpu`（docs.rs `fandhe-ai-backend-cpu/0.3.0`）

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
| `softmax` | NEON + Rayon 並列化による融合 softmax forward |
| `parity` | バックエンド間の数値精度検証ユーティリティ |

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
