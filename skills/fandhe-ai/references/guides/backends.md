---
source: https://fandhe-ai.github.io/fandhe-ai/guides/backends/
---

# バックエンド構成

CPU・CUDA・Metal・ROCm の 4 バックエンドを Cargo feature ではなく `cfg`（`target_os` 等の条件付きコンパイル）で切り替える構成。CPU（rayon）は無条件依存の既定で、CUDA（cudarc）は動的ロード対応のため非搭載環境でもビルド可能、Metal（objc2 系）は macOS 環境のみ依存が分離される。ROCm（0.14.0 で追加）は HIP / HIPRTC を `libloading` で実行時にロードするため、ROCm 非搭載環境でもビルドできる（条件付き・実験的）。

## Signature / Usage

```rust
use fandhe_ai::{Device, tape_for};

// tape_for 自体は自動デバイス選択を行わない（fail-fast で BackendError を返すのみ）。
// 失敗時にどのバックエンドへフォールバックするかは呼び出し側の選択。
let tape = match tape_for(Device::Cuda(0)) {
    Ok(tape) => tape,
    Err(_) => tape_for(Device::Cpu)?,
};
```

## Options / Props

| API | 挙動 |
| --- | --- |
| `fandhe_ai::tape()` | CPU バックエンドを既定で使う。`Result` を返さない |
| `fandhe_ai::tape_for(Device)` | バックエンドを明示指定する。構築時検証を行うため `Result` を返す |
| `fandhe_ai::available_devices()` | 実行時に利用可能な `Device` を列挙する（`Cpu` → `Cuda(0..n)` → `Metal` → `Rocm(0)` の順。`Metal` は macOS のみ、`Rocm(0)` は HIP・HIPRTC・gfx942 の code object のロードがそろうときだけ含まれる）。`tape_for` に渡す候補の取得に使える |
| `fandhe_ai::tape_for(Device::Rocm(0))` | HIP・HIPRTC・gfx942 のロードがそろう ROCm 搭載ホストでだけ `Ok`（条件付き・実験的）。`Rocm(n >= 1)` と HIP 不在のホストは `DeviceUnavailable` を返す（panic しない） |

## Notes

- fail-fast 設計を採用しており、自動フォールバックは行わない。CUDA・Metal・ROCm は構築時に検証し、失敗した場合は `BackendError` を返す。どのバックエンドにフォールバックするかは呼び出し側の責任
- バックエンド間の丸め方針（FMA 契約）を揃えるため、CPU 参照実装は `f32::mul_add` を使用する。詳細な許容誤差の定義は本カテゴリの numerical-parity ページを参照

- ROCm は実機（AMD GPU）での実行確認が未実施（README・rustdoc に #3159・#3867 として明記）。AMD の ROCm / HIP プログラミングモデル自体は amd-rocm スキルが担当し、本ページは fandhe-ai の `Device` 切替の観点のみを扱う
- Source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/v0.14.0/crates/facade/src/lib.rs の `tape_for` / `available_devices` rustdoc、https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/fn.tape_for.html（0.14.0, 取得日 2026-11-14）。サイト原稿（上記 `source:`）は ROCm に言及しない
- デバイス列挙 `available_devices()` と CUDA / Metal のチューニングフラグ（TF32 GEMM・CUDA Graph・managed memory など）は `api/device.md` と `api/backend-tuning.md` を参照

## Related

- [backend-rocm](../internals/backend-rocm.md)
- [numerical-parity](./numerical-parity.md)
- [performance](./performance.md)
