---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/fn.set_cuda_gemm_precision.html
---

# CUDA / Metal 実行設定フラグとメモリプール

crate ルートの自由関数として公開されるバックエンド実行設定: デバイスメモリプールの解放・統計、CUDA の GEMM 精度（TF32 / 3×TF32）・CUDA Graph step capture・managed memory・pinned H2D、Metal の split-K GEMM、ONNX の GPU 実行、および GEMM チェックサム計測（`Var::matmul_checksum`）。いずれもプロセスワイドの設定で `Device` 単位ではなく、既定値は導入前の経路と出力が bit 同一になる側に固定されている。

## Signature / Usage

```rust
use fandhe_ai::{set_cuda_gemm_precision, CudaGemmPrecision, release_cached_memory, Device};

// 最初の CUDA デバイス初期化（tape_for(Device::Cuda(_))）より前に設定するフラグがある点に注意
set_cuda_gemm_precision(CudaGemmPrecision::Tf32x3);
let _ = release_cached_memory(Device::Cuda(0))?;
```

## Options / Props

メモリプール:

| Name | Type | Description |
| --- | --- | --- |
| `release_cached_memory(device: Device) -> Result<(), BackendError>` | 関数 | `device` のデバイスメモリプールがアイドル保持している分を即座に実解放する。プールを持たないバックエンド（CPU 等）は `Ok(())`。存在しないデバイス・範囲外 ordinal・driver 不在は `BackendError`（`tape_for` と同じ fail-fast） |
| `memory_pool_stats(device: Device) -> Result<Option<PoolStats>, BackendError>` | 関数 | プール統計のスナップショット（診断用）。プールを持たないバックエンドは `Ok(None)` |

CUDA（`#[cfg]` なし。いずれもプロセスワイドで全 CUDA device に作用）:

| Name | Type | Description |
| --- | --- | --- |
| `set_cuda_tf32_gemm_enabled(enabled: bool)` / `cuda_tf32_gemm_enabled() -> bool` | 関数 | TF32 Tensor Core 経路の opt-in。既定は無効（FP32 厳密）。有効時に TF32 カーネルが使用不能（cc < 8.0・NVRTC コンパイル失敗等）な環境では `gemm` が `BackendError` を返す（FP32 への黙示フォールバックなし）。適用範囲は `gemm_bias_act`・`gemm_resident_*`・学習経路を除く。`cuda_tf32_gemm_enabled()` は単発 `Tf32` のときのみ `true` |
| `set_cuda_gemm_precision(mode: CudaGemmPrecision)` / `cuda_gemm_precision() -> CudaGemmPrecision` | 関数 | GEMM 精度モード。既定 `Fp32Strict`。`Tf32x3` は f32 SIMT と bit 一致しない。有効時にモード固有のカーネルが使用不能な環境では `gemm` が `BackendError`。`set_cuda_tf32_gemm_enabled(false)` はどのモードからでも `Fp32Strict` に戻す |
| `CudaGemmPrecision` | `#[non_exhaustive] enum { Fp32Strict, Tf32, Tf32x3 }` | `Fp32Strict`: FP32 厳密（既定）、`Tf32`: TF32 Tensor Core 単発、`Tf32x3`: 3×TF32（split-single 法） |
| `set_cuda_graph_step_enabled(enabled: bool)` / `cuda_graph_step_enabled() -> bool` | 関数 | 学習 step の update 区間（`sgd_step_device_tracked`）を CUDA Graph で capture・再利用する opt-in。既定は無効。最初の CUDA デバイス初期化（`tape_for(Device::Cuda(_))` の最初の呼び出し）より前に呼ぶ必要があり、間に合わない場合は以降の学習 step が `BackendError::Unsupported`（fail-closed）。capture 対象は update 区間のみ（forward / backward は対象外）。CPU / Metal・opt-in OFF では `DeviceParamStore::step` は直接実行経路のまま |
| `cuda_graph_step_mode() -> CudaGraphStepMode` / `cuda_graph_step_stats() -> CudaGraphStepStats` | 関数 | 診断用。`CudaGraphStepMode` は `fandhe_ai_backend_cuda::graph::StepGraphMode` の型エイリアス（`Off` / `StreamOnly` / `On`。`StreamOnly` は環境変数 `FANDHE_AI_CUDA_GRAPH_STEP=stream-only` 専用で API からは設定できない）。`CudaGraphStepStats` は `StepGraphStats` の型エイリアスで、フィールドは `mode` / `captured` / `replayed` / `graph_launches` / `sgd_kernel_launches`（プロセス起動からの累積） |
| `set_cuda_managed_memory_enabled(enabled: bool)` / `cuda_managed_memory_enabled() -> bool` | 関数 | `DeviceBuffer` の確保（`alloc_zeroed` / `upload`）を managed memory（`cuMemAllocManaged`）へ opt-in で切り替える。既定は無効（device-only）。managed memory 非対応デバイスで有効にすると確保呼び出しが `BackendError::Unsupported`。出力は配置に依らず bit 同一。elementwise・rmsnorm・softmax 等は managed 化していない |
| `set_cuda_pinned_h2d_enabled(enabled: bool)` / `cuda_pinned_h2d_enabled() -> bool` | 関数 | H2D 転送を pinned ステージングバッファ経由にする opt-in。既定は無効。f32 経路と TF32 Tensor Core 経路が対象で、f16 Tensor Core 経路と elementwise / rmsnorm / softmax / transpose / mse は対象外。出力は bit 同一 |
| `set_cuda_onnx_gpu_execution_enabled(enabled: bool)` / `cuda_onnx_gpu_execution_enabled() -> bool` | 関数 | `OnnxModel::run` の CUDA 実行（ordinal 0 固定）の opt-in。既定は無効。CUDA driver 不在・ordinal 0 が無い環境では `run` 自体が `OnnxError::Execution` を返す（ホスト CPU への黙示フォールバックなし） |

Metal（以下 2 行は `#[cfg(target_os = "macos")]`。macOS 以外のビルドには存在しない）:

| Name | Type | Description |
| --- | --- | --- |
| `set_metal_split_k_gemm_enabled(enabled: bool)` / `metal_split_k_gemm_enabled() -> bool` | 関数（macOS 限定） | split-K 2 パス GEMM 経路の実行時 opt-out。既定は有効（`true`）。`false` にすると `dispatch_auto` が常に classic 経路に固定され、結線前（`fandhe-ai =0.8.0` 相当）と bit 同一の出力を返す。split-K 到達形状（K 支配的な非正方形状）では classic 経路と bit 一致しない。`gemm_bias_act` 融合カーネルは元々 classic のみで対象外 |
| `set_metal_onnx_gpu_execution_enabled(enabled: bool)` / `metal_onnx_gpu_execution_enabled() -> bool` | 関数（macOS 限定） | `OnnxModel::run` の Metal 実行の opt-in。既定は無効。CUDA 版と同じ fail-closed 方針。CUDA 版と Metal 版の両方が有効な場合は CUDA を優先する |

GEMM チェックサム計測:

| Name | Type | Description |
| --- | --- | --- |
| `Var::matmul_checksum(&self, other: &Var<'t>, readout: ChecksumReadout) -> Result<GemmChecksum, AutodiffError>` | メソッド | `C = self @ other` の全要素和をバックエンドの f64 reduction（`BackendOps::gemm_checksum`）で求める計測専用入口。テープへ記録せず（`push_eager` を呼ばない）backward の対象外。`readout` が `ChecksumOnly` なら `C` をホストへ download しない。バックエンドが未実装の場合は `BackendError::Unsupported` がそのまま伝播する |
| `ChecksumReadout` | `#[non_exhaustive] enum { ChecksumOnly, WithOutput }` | `ChecksumOnly`: checksum（8 バイト）のみ読み戻す。`WithOutput`: 加えて `C` 全体もホストへ download する |
| `GemmChecksum` | `struct { pub checksum: f64, pub output: Option<Tensor<f32>> }`（`Debug, Clone`） | `checksum`: `C` の全要素和（f64 アキュムレータ・固定順序で決定的。Metal は Neumaier 補償和で f64 相当）。`output`: `WithOutput` のときのみ `Some`（`BackendOps::gemm` と bit 同一の `Tensor<f32>`） |

## Notes

- 上記フラグはすべてプロセスワイド（`Device` 単位ではなく全スレッド・全デバイスに作用）。`Device` は外部型のため inherent メソッドを持てず、`tape_for` と同型の自由関数として公開される
- 有効化したモードが使用不能な環境では、いずれも FP32 厳密や host への黙示フォールバックをせず `BackendError` を返す（fail-closed）
- `fandhe_ai::*` の `set_cuda_*` は `nvidia-cuda` / `amd-rocm` スキルの CUDA / HIP ランタイム API とは別物で、ここでは fandhe-ai ライブラリ内部のバックエンド切り替えスイッチを指す
- `Device::Cuda` / `Device::Metal` の定義と `tape_for` / `available_devices` は `device.md` を参照

## Related

- [device](./device.md)
- [device-param-store](./device-param-store.md)
- [var-linalg](./var-linalg.md)
