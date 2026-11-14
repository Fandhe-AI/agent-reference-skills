---
source: https://docs.rs/fandhe-ai-backend-rocm/0.14.0/fandhe_ai_backend_rocm/
---

# backend-rocm

AMD GPU（ROCm）向けの条件付き・実験的バックエンドクレート。HIP / HIPRTC を `libloading` で実行時にロードし、HIPRTC でコンパイルしたカーネルを `tensor-core` の `BackendOps` 骨格として実行する。

- crate 名: `fandhe-ai-backend-rocm`（docs.rs `fandhe-ai-backend-rocm/0.14.0`）。0.14.0 で crates.io に公開され、facade `fandhe-ai` の通常依存
- `#[link]` を使わず `libamdhip64` / `libhiprtc` を実行時に dlopen するため、ROCm 非搭載環境でもビルド・テストが通る（`libloading` は許容依存の第 12 区分。`cudarc` の dynamic-loading と同じ cfg ベース方針）
- 対応する gfx target は allowlist の `GfxTarget::Gfx942`（CDNA3 / MI300X、wave64）のみ

## Signature / Usage

```rust
// lib.rs の公開 API の入口。ROCm 非搭載・ロード失敗・デバイス 0 台では false（panic しない）
pub fn is_available() -> bool
```

アプリケーションからは facade 経由で使う。HIP・HIPRTC・gfx942 の code object のロードがそろう ROCm 搭載ホストでだけ `Ok` になる。

Adapted (not in the official docs): `tape_for` の検証部分のみを取り出した最小例（`Device::Rocm(1)` は常に `Err`、ROCm が列挙されないホストでは `Rocm(0)` も `Err`）。

```rust
use fandhe_ai::{Device, available_devices, tape_for};

assert!(tape_for(Device::Rocm(1)).is_err());
if !available_devices().contains(&Device::Rocm(0)) {
    assert!(tape_for(Device::Rocm(0)).is_err());
}
```

## Options / Props

公開モジュールは `linalg` のみ（他は非公開モジュールで、型はクレートルートから再エクスポートされる）。

| Module | Description |
| --- | --- |
| `linalg` | GPU 線形代数の内部 opt-in ゲート `set_gpu_linalg_enabled` / `gpu_linalg_enabled`（既定 OFF）と、`RocmLinalgLu`（`inv`・`solve`・`det`）/ `RocmLinalgFactor`（`cholesky`・`qr`・`eigh`）。`double` カーネル |

主な型・関数（クレートルート）:

| Name | Kind | Description |
| --- | --- | --- |
| `RocmBackendOps` | struct | `BackendOps` の実装（骨格は必須 9 メソッド）。`device()` は `Device::Rocm(0)`。`gemm` は `RocmGemmF32`、`sum`・`max`・`min`・`argmax`・`argmin` は HIPRTC 縮約カーネル。空縮約は CPU へ委譲 |
| `RocmDeviceProvider` | struct | `DeviceProvider` の実装。facade の `available_devices` / `tape_for` が存在検証に使う。`Device::Rocm(0)` の 1 台だけが対象 |
| `RocmGemmF32` / `RocmGemmBiasAct` | struct | f32 タイル GEMM と、bias・ReLU の epilogue を足した融合 GEMM（`gemm_resident_rhs` / `gemm_resident_lhs` / `gemm_fp32_strict_into` / `linear_forward_device` を結線） |
| `RocmElementwise` / `RocmScalarOp` / `RocmFusedElementwise` | struct | `add`・`mul`・`relu`・`exp`・`tanh`・`where_cond`・`masked_fill`・スカラー演算・融合 elementwise。ソース先頭の `#pragma clang fp contract(off)` で FMA への暗黙縮約を止める |
| `RocmReduce` / `RocmArgReduce` | struct | sum / max / min と argmax / argmin |
| `RocmSoftmax` / `RocmLogSoftmaxBackward` | struct | `softmax` / `log_softmax` / `log_softmax_backward`（最終軸限定・2 パス経路のみ） |
| `RocmNorm` | struct | rmsnorm・layer_norm・両 backward・batch_norm の train / infer |
| `RocmLoss` | struct | mse・huber/smooth_l1・bce・nll・kl_div と backward の 11 カーネル |
| `RocmRnnCell` | struct | LSTM / GRU の pointwise 段と backward の 5 カーネル |
| `RocmConstantPad` / `RocmIm2col` / `RocmPooling` | struct | `pad`、Conv2d の `im2col` / `col2im`、`max_pool2d` / `avg_pool2d` / `adaptive_avg_pool2d` |
| `RocmScan` / `RocmGatherScatter` / `RocmInterpolate` / `RocmSort` / `RocmUnique` | struct | cumsum / cumprod、gather / scatter / one_hot（`ScatterMode`）、nearest / bilinear 補間、sort / topk、unique |
| `RocmPagedKv` | struct | デバイス常駐 KV の `paged_kv_append` / `paged_attention_forward` |
| `WarpGeometry` / `WarpDefines` | struct | wave 幅 32 / 64 を HIP の `#define` として注入する部品 |
| `GfxTarget` / `parse_gcn_arch_name` | enum / fn | HIPRTC の `--gpu-architecture` に渡す target の allowlist（現状 `Gfx942` のみ）と、`gcnArchName` の完全一致照合 |
| `GemmF32Tile` / `GemmSource` / `render_gemm_f32_source` | struct / fn | f32 GEMM カーネルソースの生成 |
| `RocmError` | enum | ロード・コンパイル・実行の型付きエラー |

## Notes

- 公式が非サポートと明言する内部 crate（サポート境界は `fandhe-ai` のみ）。公開は facade の依存解決のため。facade は本クレートの型を再エクスポートせず、利用者は `Device::Rocm(0)` を `tape_for` / `available_devices` に渡す
- 条件付き・実験的。README は「実機（AMD GPU）での実行確認は未実施（#3159）」「facade 経由の実機 parity は未実施（#3867）」と明記している（ホスト側の検証は CPU 上の添字モデルと参照 GEMM の照合まで。実機テストは `#[ignore]`）
- HIP ライブラリ名の候補は Linux の `libamdhip64.so` のみ（Windows・macOS は候補空）。ライブラリ名・シンボル名は固定の `&'static str` で、環境変数や外部入力から組み立てない
- ハンドル（`libloading::Library`）と解決済み関数ポインタは 1 つの所有構造に同居させ、ポインタを構造の外へ出さない設計（`docs/backend-rocm-hip-ffi-decision.md` §4）
- 失敗は固定文言の `DeviceUnavailable`。成功した gfx 判定だけをプロセス全体でキャッシュし、失敗は固定しない（後から ROCm が使えるようになる環境で再試行できる）
- AMD の ROCm / HIP プログラミングモデル自体は amd-rocm スキルが担当。本ページは fandhe-ai の Rust バックエンド実装（`libloading` 経由の呼び出し構造）のみを扱う
- 版情報: ワークスペースのルート `Cargo.toml` と README（v0.14.0 タグ）は「公開準備済みで crates.io 未公開・0.14.0 で公開予定」と書いたままだが、crates.io に `fandhe-ai-backend-rocm` 0.14.0 が存在し facade 0.14.0 が通常依存に持つため、公開済みを正とする
- Source: https://docs.rs/fandhe-ai-backend-rocm/0.14.0/fandhe_ai_backend_rocm/（0.14.0, 取得日 2026-11-14）。設計の正本は `docs/backend-rocm-hip-ffi-decision.md`（https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/docs/backend-rocm-hip-ffi-decision.md）

## Related

- [tensor-core](./tensor-core.md)
- [backend-cpu](./backend-cpu.md)
- [backend-cuda](./backend-cuda.md)
- [backend-metal](./backend-metal.md)
