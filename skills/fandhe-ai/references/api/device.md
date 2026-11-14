---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/enum.Device.html
---

# Device

テンソル演算の実行先デバイスを指定する enum。`Copy` を実装し値渡しが安価。`#[non_exhaustive]` で、別クレートの網羅 `match` には `_` 腕が要る。

## Signature / Usage

```rust
let tape = fandhe_ai::tape_for(Device::Cuda(0))?;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Cpu` | バリアント | CPU バックエンド。常に利用可能（`backend-cpu`） |
| `Cuda(usize)` | バリアント | CUDA GPU バックエンド。`usize` は `cudarc` のデバイス ordinal（`CudaContext::new(ordinal)` と対応）。CUDA ドライバ不在時は実行時に `BackendError::CudaUnavailable` を返す。全 OS でバリアント自体は存在するが、CUDA インストール済みの環境でのみ機能する |
| `Metal` | バリアント | macOS 限定の Metal バックエンド。feature flag ではなく条件付きコンパイルで制御される |
| `Rocm(usize)` | バリアント | ROCm（AMD GPU）バックエンド（条件付き・実験的）。`usize` は HIP のデバイス ID（`hipSetDevice` の引数）。HIP を `libloading` で実行時に動的ロードするため、ROCm 非搭載でも variant 自体は全 OS で存在しビルドが通る。初期は `Rocm(0)` だけが有効で、`Rocm(n)`（`n >= 1`）は `BackendError::DeviceUnavailable` を返す。HIP・HIPRTC・gfx942 のロードがそろわないとき `tape_for(Device::Rocm(_))` は `BackendError::DeviceUnavailable` を返す |

### Device 関連の関数

`fandhe_ai` クレートルートの自由関数（`Device` は外部型のため inherent メソッドを追加できず、`tape_for` と同型の自由関数として公開される）。

| Name | Type | Description |
| --- | --- | --- |
| `available_devices() -> Vec<Device>` | 関数 | 実行時に利用可能な `Device` を列挙する。順序は `Cpu` → `Cuda(0..n)`（ordinal 昇順、CUDA driver 不在なら 0 件）→ `Metal`（`cfg(target_os = "macos")` 限定、検出 0 件なら含まれない）→ `Rocm(0)`（HIP・HIPRTC・gfx942 の code object のロードがそろうときだけ 1 件。条件付き・実験的）。個別バックエンドの列挙失敗は panic せず除外する。返した各 `Device` に対する `tape_for` は `Ok` になることを意図するが、列挙後のデバイス状態変化（TOCTOU）は契約外 |
| `release_cached_memory(device: Device) -> Result<(), BackendError>` | 関数 | `device` のデバイスメモリプールがアイドル保持している分を即座に実解放する。プールを持たないバックエンド（CPU 等）は何もせず `Ok(())`。存在しないデバイス・範囲外 ordinal・driver 不在は `BackendError`（`tape_for` と同じ fail-fast） |
| `memory_pool_stats(device: Device) -> Result<Option<PoolStats>, BackendError>` | 関数 | デバイスメモリプールの統計スナップショット（診断用）。プールを持たないバックエンドは `Ok(None)` |

#### PoolStats

`#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]` の POD。全フィールド `pub u64`。単発の呼び出し内で全フィールドが厳密に同一時刻の値であることは要求されない（診断用）。

| Name | Type | Description |
| --- | --- | --- |
| `alloc_count` | `u64` | 新規物理確保の累積回数 |
| `reuse_count` | `u64` | フリーリストからの再利用ヒットの累積回数 |
| `cached_bytes` | `u64` | フリーリストが現在保持する総バイト数 |
| `pending_return_bytes` | `u64` | Metal 専用。GPU 完了待ちでフリーリストへ未合流の返却待ちバイト数（CUDA・CPU では常に 0） |
| `capacity_waste_bytes` | `u64` | 現在貸出中の全ハンドルについての内部断片化ストック量（`Σ(class_bytes − logical_bytes)`、リアルタイム値） |
| `released_bytes` | `u64` | `release_cached()` が個別解放に成功した累積バイト数（診断用） |

CUDA / Metal のチューニングフラグ（`set_cuda_tf32_gemm_enabled` 等）は `backend-tuning.md` を参照。

## Notes

- `Device::Rocm` は 0.14.0 で追加された variant で、追加と同時に `Device` が `#[non_exhaustive]` になった（rustdoc の記載: 以後の variant 追加を非破壊にするため）。`available_devices()` は ROCm 非搭載環境で HIP の動的ロード試行が 1 回増え、ROCm ホストでは初回に gfx942 の GEMM カーネルのコンパイルが走る（成功はプロセス全体でキャッシュ、失敗はキャッシュしない）
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/enum.Device.html（0.14.0, 取得日 2026-11-14）
- `Device::Metal` は `cfg(target_os = "macos")` 限定のバリアントで、macOS 以外のビルドには存在しない。`available_devices()` の内部実装も同じ cfg で分岐する
- CUDA は `cudarc` による動的ロードで、ドライバ欠如時は panic せず `BackendError` を返す fail-fast 設計
- `Clone`, `Copy`, `Debug`, `Eq`, `Hash`, `PartialEq` を実装し、`Send`, `Sync`, `Unpin` にも対応
- `Device::Cuda` / `Device::Metal` / `Device::Rocm` は本ライブラリ独自の enum バリアントで、nvidia-cuda の CUDA C++/PTX API・apple-silicon の Metal Shading Language（MSL）・amd-rocm の HIP / ROCm ランタイム API とは別物。fandhe-ai はこれらの上に実装された高レベルな Rust ラッパーであり、CUDA/PTX/MSL のカーネル記述そのものは扱わない

## Related

- [tape](./tape.md)
- [errors](./errors.md)
- [backend-tuning](./backend-tuning.md)
